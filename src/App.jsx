import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Mypage from "./pages/Mypage";
import SignUp from "./pages/SignUp";
import FindId from "./pages/FindId";
import ViewCharacter from "./pages/ViewCharacter";
import Gallery from "./pages/Gallery";
import Questions from "./pages/Questions";
import Tactics from "./pages/Tactics";
import Suggestion from "./pages/Suggestion";
import Bragging from "./pages/Bragging";
import Write from "./pages/Write";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="findid" element={<FindId />} />
        <Route path="/write" element={<Write />} />
        <Route path="/viewCharacter" element={<ViewCharacter />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/tactics" element={<Tactics />} />
        <Route path="/suggestion" element={<Suggestion />} />
        <Route path="/bragging" element={<Bragging />} />
      </Routes>
    </>
  );
}

export default App;
