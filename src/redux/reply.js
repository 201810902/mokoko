import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  setDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { dbService } from "../../firebase";
import { fetchUserNickName } from "../utils/userService";

//Reply 클래스 정의
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
  async (reply, { rejectWithValue }) => {
    try {
      const collectionRef = collection(
        dbService,
        "community",
        reply.postId, //post문서
        "replies" //replies 컬렉션
      ).withConverter(replyConverter);

      //Firestore에 댓글 등록(추가)
      const docRef = await addDoc(collectionRef, reply);
      const replyId = docRef.id;

      //댓글 ID post DB에 추가
      await setDoc(
        doc(dbService, "community", reply.postId, "replies", replyId),
        {
          ...reply,
          id: replyId,
        }
      );
      //유저정보 업데이트(예시)
      const userRef = doc(dbService, "User", reply.userId, "replies");
      await updateDoc(userRef, {
        replyIds: arrayUnion(replyId),
      });
      return { ...reply, id: replyId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//댓글 가져와서 렌더링하기
export const fetchReply = createAsyncThunk(
  "replis/fetchReply",
  async ({ postId }) => {
    const docRef = doc(dbService, "community", postId, "replies");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const replyData = docSnap.data();
      const userNickName = await fetchUserNickName(replyData.userId);
      return {
        id: docSnap.id,
        ...replyData,
        userNickName,
      };
    } else {
      throw new Error("no Such Reply");
    }
  }
);

//내 userId로 내가 쓴 댓글 모두 조회하기
//sd;fjas;ldkfjas;gkrltlfgdjtlqkf

const replySlice = createSlice({
  name: "replies",
  initialState,
  reducers: {
    addReply: (state, action) => {
      state.replies.push(action.payload);
    },
    updateReply: (state, action) => {
      const { id, ...updates } = action.payload;
      const existingReply = state.replies.find((reply) => reply.id === id);
      if (existingReply) {
        Object.assign(existingReply, updates);
      }
    },
    deleteReply: (state, action) => {
      state.reply = state.replies.filter((reply) => reply.id !== action.reply);
    },
  },
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
export const { addReply, updateReply, deleteReply } = replySlice.actions;

export { Reply, replyConverter };
