import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAt,
  endAt,
  startAfter,
} from "firebase/firestore";
import { dbService } from "../../firebase";
import { fetchUserNickName } from "../utils/userService";
import Community from "../pages/Community";
import { useSelector } from "react-redux";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
  loading: false,
};

class Post {
  constructor(
    category,
    postTitle,
    post,
    date,
    userId,
    viewCount,
    likeCount,
    replyNumber
  ) {
    this.category = category;
    this.postTitle = postTitle;
    this.post = post; //포스트 내용
    this.date = date;
    this.userId = userId;
    this.viewCount = viewCount;
    this.likeCount = likeCount;
    this.replynumber = replyNumber;
  }
}
const postConverter = {
  toFirestore: (post) => {
    return {
      category: post.category,
      postTitle: post.postTitle,
      post: post.post,
      date: post.date, //저장된 ISO 문자열
      // userId: userId, -> 원래 write.jsx에서 분리해오면서 아래줄로 수정
      userId: post.userId,
      viewCount: post.viewCount,
      replyNumber: post.replyNumber,
      likeCount: post.likeCount,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Post(
      data.category,
      data.postTitle,
      data.post,
      new Date(data.date),
      data.userId,
      data.viewCount,
      data.replyNumber,
      data.likeCount
    );
  },
};
const persistConfig = {
  key: "post",
  storage,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ category, sort }) => {
    if (!category) {
      throw new Error("Category is required");
    }

    const q = query(
      collection(dbService, category),
      orderBy("date", sort),
      limit(15)
    ); //페이지네이션 시작점
    const querySnapshot = await getDocs(q); //처음부터 가져오기

    const postsWithNickNames = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const postData = doc.data();
        const userNickName = await fetchUserNickName(postData.userId);

        return {
          id: doc.id,
          ...postData,
          userNickName,
        };
      })
    );
    return postsWithNickNames;
  }
);

//게시글 ID로 글 조회하기
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id) => {
    const docRef = doc(dbService, "community", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const postData = docSnap.data();
      const userNickName = await fetchUserNickName(postData.userId);

      return {
        id: docSnap.id,
        ...postData,
        userNickName,
      };
    } else {
      throw new Error("No Such document!");
    }
  }
);

//비동기 액션 생성자
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post, { rejectWithValue }) => {
    try {
      const userNickName = await fetchUserNickName(post.userId);
      console.log("nickName:", userNickName);

      //firestore에 문서 추가
      const collectionRef = collection(dbService, post.category);
      const docRef = await addDoc(collectionRef, { ...post, userNickName });
      const docId = docRef.id;

      //사용자 문서에 작성한 포스트 정보 업데이트
      const userRef = doc(dbService, "User", post.userId);
      await updateDoc(userRef, { postNumber: post.userPostNumber + 1 });

      //새 게시글 문서 업데이트
      await setDoc(doc(dbService, post.category, docId), { id: docId });
      return { ...post, id: docId, userNickName };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action) => {
      const { id, ...updates } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        Object.assign(existingPost, updates);
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        const existingPostIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (existingPostIndex >= 0) {
          state.posts[existingPostIndex] = action.payload;
        } else {
          state.posts.push(action.payload);
        }

        state.posts = [action.payload];
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

//persistReducer 적용
const persistedPostReducer = persistReducer(persistConfig, postSlice.reducer);

// export default postSlice.reducer;
export default persistedPostReducer; //persistReducer로 감싸서 export
export const { addPost, updatePost, deletePost } = postSlice.actions;

//Post 클래스와 postConverter export 추가
export { Post, postConverter };
