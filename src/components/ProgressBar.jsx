import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useStorageImages from "../hooks/useStorageImages";

const ProgressBar = ({ file, setFile, id }) => {
  // const { url, progress } = useStorageImages(file, id);

  // useEffect(() => {
  //   if (url) {
  //     setFile(null);
  //   }
  // }, [url, setFile]);

  return null();
  // <motion.div
  //   className="progress-bar"
  //   initial={{ width: 0 }}
  //   animate={{ width: progress + "%" }}
  // ></motion.div>
};

export default ProgressBar;
