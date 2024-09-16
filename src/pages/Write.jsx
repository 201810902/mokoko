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
import { useSelector } from "react-redux";

const Write = () => {
  const navigate = useNavigate();
  // const user = authService.currentUser;
  const nickName = useSelector((state) => state.user.value.nickName);
  class Post {
    constructor(category, postTitle, post, date, userId) {
      this.category = category;
      this.postTitle = postTitle;
      this.post = post; //포스트 내용
      this.date = date;
      this.userId = nickName;
    }
  }
  const postConverter = {
    toFirestore: (post) => {
      return {
        category: post.category,
        postTitle: post.postTitle,
        post: post.post,
        date: post.date,
        userId: nickName,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Post(
        data.category,
        data.postTitle,
        data.post,
        data.date,
        data.nickName
      );
    },
  };
  const [currentDate, setCurrentDate] = useState(new Date());
  const [inputData, setInputData] = useState({
    category: "",
    postTitle: "",
    post: "",
    date: currentDate,
    userId: nickName,
  });

  const storage = getStorage();
  const storageRef = ref(storage);
  const postRef = ref(storage);
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setInputData((prevData) => ({ ...prevData, [name]: value }));
    // console.log(inputData.value);
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleQuillChange = (value) => {
    setInputData((prevData) => ({ ...prevData, post: value }));
  };

  useEffect(() => {
    console.log(inputData);
  }, [inputData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirm("글을 등록하시겠습니까?")) {
      return;
    } else {
      try {
        const post = new Post(
          inputData.category,
          inputData.postTitle,
          inputData.post,
          inputData.date,
          inputData.loginUser.nickName
        );

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
        await setDoc(doc(userDocRef, "post", docId), { id: docId });

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
            <option value="질문게시판">❓ 궁금해요</option>
            <option value="비틱게시판">😋 비틱게시판</option>
            <option value="자모앨범">📸 자모앨범</option>
            <option value="건의합니다">🙋🏻 건의합니다</option>
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
