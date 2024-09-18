import { doc, getDoc } from "firebase/firestore";
import { dbService } from "../../firebase.js";
//user 문서에서 닉네임 가져오는 코드
export const fetchUserNickName = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const userRef = doc(dbService, "User", userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    throw new Error("User not found");
  }
  const userData = userDoc.data();

  return userData.nickName;
};
