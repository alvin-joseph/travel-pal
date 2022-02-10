import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { projectFirestore } from "../firebase";

const useFirestoreUserData = () => {
  const [userInfo, setUserInfo] = useState([]);
  const { currentUser } = useAuth();
  const id = currentUser.uid;

  useEffect(() => {
    const unsub = projectFirestore
      .collection("userData")
      .doc(id)
      .collection("userInfo")
      .onSnapshot((snap) => {
        let information = [];
        snap.forEach((doc) => {
          information.push({ ...doc.data(), id: doc.id });
        });
        setUserInfo(information);
      });

    return () => unsub();
  }, [id]);
  return { userInfo };
};

export default useFirestoreUserData;
