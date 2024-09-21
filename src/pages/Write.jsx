import "./Write.css";
import SideMenu from "../component/SideMenu";
import Logo from "../component/Logo";
import Profile from "../component/Profile";
import { useState, useEffect } from "react";
import debounce from "../utils/debounce";
import ReactQuill from "react-quill-new";
import "quill/dist/quill.snow.css";
import { authService, dbService, fbStorage } from "../../firebase";
import { collection, doc, addDoc, updateDoc, setDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "firebase/auth";
import { createPost, addPost } from "../redux/post.js";

const Write = () => {
  const navigate = useNavigate();
  // const user = authService.currentUser;
  const user = useSelector((state) => state.user.value);
  const userId = user.uid;
  const userNickname = user.nickName;
  const newpostNumb = user.postNumber;
  const dispatch = useDispatch();
  const userDocRef = doc(dbService, "User", userId);
  const postCollectionRef = collection(userDocRef, "post");
  const BackButtonListener = () => {
    // useEffect(() => {
    //   const handlePopState = (e) => {
    //     confirm(
    //       "이 페이지에서 나가면 작성중인 내용이 저장되지 않습니다. 나가시겠습니까?"
    //     )
    //       ? navigate(-1)
    //     : console.log("이동하지 않음");
    //   };
    //   return () => {
    //     second;
    //   };
    // }, [third]);
  };
  class Post {
    constructor(category, postTitle, post, date, userId, viewCount) {
      this.category = category;
      this.postTitle = postTitle;
      this.post = post; //포스트 내용
      this.date = date;
      this.userId = userId;
      this.viewCount = viewCount;
    }
  }
  const postConverter = {
    toFirestore: (post) => {
      return {
        category: post.category,
        postTitle: post.postTitle,
        post: post.post,
        date: post.date, //저장된 ISO 문자열
        userId: userId,
        viewCount: post.viewCount,
        replyNumber: post.replyNumber,
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
        data.replyNumber
      );
    },
  };
  const [currentDate, setCurrentDate] = useState(new Date());
  const [inputData, setInputData] = useState({
    category: "",
    postTitle: "",
    post: "",
    date: currentDate,
    userId: user.uid,
    viewCount: 0,
    replyNumber: 0,
  });

  const storage = getStorage();
  const storageRef = ref(storage);
  const postRef = ref(storage);
  console.log("게시글 수", user.postNumber);
  const newPostNum = user.postNumber;
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setInputData((prevData) => ({ ...prevData, [name]: value }));
    // console.log(inputData.value);
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleQuillChange = (value) => {
    setInputData((prevData) => ({ ...prevData, post: value }));
  };

  // useEffect(() => {
  //   console.log(inputData);
  // }, [inputData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirm("글을 등록하시겠습니까?")) {
      return;
    } else {
      try {
        const post = {
          category: inputData.category,
          postTitle: inputData.postTitle,
          post: inputData.post,
          date: inputData.date,
          userId: inputData.userId,
          viewCount: inputData.viewCount,
          replyNumber: inputData.replyNumber,
        };

        const collectionRef = collection(
          dbService,
          inputData.category
        ).withConverter(postConverter);
        const docRef = await addDoc(collectionRef, post); //여기까지 작성한 문서+작성자 UID 업로드
        //문서추가후 DocumentReference 반환
        const docId = docRef.id; // 생성된 문서의 ID 가져오기
        //사용자 문서에서 postNumber 업데이트
        const userRef = doc(dbService, "User", user.uid);
        await updateDoc(userRef, { postNumber: user.postNumber + 1 });
        //유저정보에 작성한 게시물 수 +1

        //게시글 컬렉션에 생성된 문서의 ID를 추가한다.
        // const postDocRef = doc(postCollectionRef, docId);
        // await addDoc(postDocRef, { id: docId });
        // await setDoc(doc(userDocRef, "post", docId), { id: docId });

        await setDoc(doc(dbService, inputData.category, docId), { ...post });

        dispatch(addPost(post)); //비동기 액션 디스패치
        console.log("Document successfully written!");
        alert("🌱 게시글이 정상적으로 등록되었습니다. 🌱 ");
        navigate(`/${inputData.category}`);
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    }
  };
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link"],
      ["image"],
    ],
  };
  return (
    <div className="write">
      <Logo />
      <Profile />
      <form className="writingForm" onSubmit={handleSubmit}>
        <h1 className="writingHeader">새 글 쓰기</h1>
        <div className="category">
          {/*포스트 해당 게시판 선택*/}
          <select
            className="selectCategory"
            name="category"
            value={inputData.category}
            onChange={handleChange}
          >
            <option value="none"> 게시판을 선택하세요</option>
            <option value="community">💬 자유게시판</option>
            <option value="Tactics">⚔️ 공략게시판</option>
            <option value="question">❓ 궁금해요</option>
            <option value="bragging">😋 비틱게시판</option>
            <option value="gallery">📸 자모앨범</option>
            <option value="suggestion">🙋🏻 건의합니다</option>
          </select>

          <label htmlFor="write">
            <input
              id="postTitle"
              name="postTitle"
              className="postTitle"
              placeholder="제목을 입력해주세요"
              aria-required="true"
              onChange={handleChange}
            />
          </label>
        </div>
        <label htmlFor="postArea" className="visually-hidden">
          내용
        </label>
        {/* <textarea rows="50" cols="100" className="postArea"></textarea> */}
        <ReactQuill
          style={{ width: "725px", height: "400px" }}
          modules={modules}
          value={inputData.post}
          onChange={handleQuillChange}
        />
        <div className="submitSection">
          <button type="sumbit" className="postSubmitBtn">
            작성 완료
          </button>
        </div>
      </form>
    </div>
  );
};
export default Write;
