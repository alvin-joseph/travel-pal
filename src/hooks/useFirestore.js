import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { projectFirestore } from "../firebase";

const useFirestore = () => {
  const [docs, setDocs] = useState([]);
  const { currentUser } = useAuth();
  const id = currentUser.uid;

  useEffect(() => {
    const unsub = projectFirestore
      .collection("userData")
      .doc(id)
      .collection("trips")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    return () => unsub();
  }, [id]);
  return { docs };
};

export default useFirestore;
