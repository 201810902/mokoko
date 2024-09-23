import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { collection, doc, addDoc, updateDoc, setDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { dbService } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";

class Reply {
  constructor(postId, userId, date, reply, likeCount) {
    this.postId = postId;
    this.userId = userId;
    this.replyDate = date;
    this.reply = reply;
    this.likeCount = likeCount;
  }
}

//firebase와 상호작용하는 converter
const replyConverter = {
  toFirestore: (reply) => {
    return {
      postId: reply.postId,
      userId: reply.userId,
      replyDate: reply.replyDate,
      reply: reply.reply,
      likeCount: reply.likeCount,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Reply(
      data.postId,
      data.userId,
      new Date(data.replyDate),
      data.raply,
      data.likeCount
    );
  },
};

//초기상태
const initialState = {
  reply: [],
  status: "idle",
  error: null,
  loading: false,
};

//댓글 생성 Thunk
export const createReply = createAsyncThunk(
  "replies/createReply",
  async (reply, { rejectedWithValue }) => {
    try {
      const collectionRef = collection(
        dbService,
        "posts",
        reply.postId,
        "replies"
      ).withConverter(replyConverter);
      const docRef = await addDoc(collectionRef, reply);
      const replyId = docRef.id;

      const userRef = doc(dbService, "User", reply.userId);
      await updateDoc(userRef);

      //새 댓글(문서) 업데이트
      await setDoc(doc(dbService, "posts", reply.postId, "replies", replyId), {
        id: replyId,
      });
      return { ...reply, id: replyId };
    } catch (error) {
      return isRejectedWithValue(error.message);
    }
  }
);

const replySlice = createSlice({
  name: "replies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReply.fulfilled, (state, action) => {
        state.replies.push(action.payload);
        state.loading = false;
      })
      .addCase(createReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default replySlice.reducer;
