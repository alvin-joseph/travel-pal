import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { currentUser } = useAuth();
  const id = currentUser.uid;

  useEffect(() => {
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore
      .collection("userData")
      .doc(id)
      .collection("trips");

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        collectionRef.add({ tripImages: { url, createdAt } }, { merge: true });
        setUrl(url);
      }
    );
  }, [file, id]);

  return { progress, url, error };
};

export default useStorage;
