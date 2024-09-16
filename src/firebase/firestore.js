import { doc, getDoc } from "firebase/firestore";
import { dbService } from "../../firebase"; //Firebase Firestore 인스턴스 import

export const fetchUserData = async (uid) => {
  try {
    if (!uid) {
      throw new Error("Invalid useId");
    }
    console.log("Fetching data for UID", uid); //디버깅용

    const docRef = doc(dbService, "User", uid); //Firestore 경로 정의
    //User는 Firestore의 컬렉션 이름
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("document data: ", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data", error);
    return null;
  }
};
