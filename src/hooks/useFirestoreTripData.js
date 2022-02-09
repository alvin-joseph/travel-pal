import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { projectFirestore } from "../firebase";

const useFirestoreTripData = (id, collection) => {
  const [tripData, setTripData] = useState([]);
  const { currentUser } = useAuth();
  const userId = currentUser.uid;

  useEffect(() => {
    const unsub = projectFirestore
      .collection("userData")
      .doc(userId)
      .collection("trips")
      .doc(id)
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setTripData(documents);
      });

    return () => unsub();
  }, [id, userId, collection]);

  return { tripData };
};

export default useFirestoreTripData;
