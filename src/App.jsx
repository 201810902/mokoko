import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Mypage from "./pages/Mypage";
import SignUp from "./pages/SignUp";
import FindId from "./pages/FindId";
import ViewCharacter from "./pages/ViewCharacter";
// import Bragging from "./pages/Bragging";
import Write from "./pages/Write";
import Viewer from "./pages/Viewer";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="findid" element={<FindId />} />
        <Route path="/write" element={<Write />} />
        <Route path="/viewCharacter" element={<ViewCharacter />} />
        <Route path="/posts/:id" element={<Viewer />} />
        <Route path="/:category" element={<Community />} />
      </Routes>
    </>
  );
}

export default App;
