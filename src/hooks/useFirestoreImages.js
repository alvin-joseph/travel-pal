import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { projectFirestore } from "../firebase";

const useFirestoreImages = (id) => {
  const [pics, setPics] = useState([]);
  const { currentUser } = useAuth();
  const userId = currentUser.uid;

  useEffect(() => {
    const unsub = projectFirestore
      .collection("userData")
      .doc(userId)
      .collection("trips")
      .doc(id)
      .collection("images")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let pictures = [];
        snap.forEach((img) => {
          pictures.push({ ...img.data(), id: img.id });
        });
        setPics(pictures);
      });

    return () => unsub();
  }, [id, userId]);

  return { pics };
};

export default useFirestoreImages;
