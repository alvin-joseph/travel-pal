import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { projectStorage, projectFirestore, timestamp } from "../firebase";

const useStorageImages = (file, id) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { currentUser } = useAuth();
  const userId = currentUser.uid;

  useEffect(() => {
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore
      .collection("userData")
      .doc(userId)
      .collection("trips")
      .doc(id)
      .collection("images");

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
        await collectionRef.add({ url, createdAt, fileName: file.name });
        setUrl(url);
      }
    );
  }, [file, userId, id]);

  return { progress, url, error };
};

export default useStorageImages;
