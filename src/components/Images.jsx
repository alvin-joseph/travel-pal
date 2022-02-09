import React, { useState } from "react";
import { motion } from "framer-motion";
import { projectStorage, timestamp } from "../firebase";

const Images = ({ tripData, collectionRef, setClickedId }) => {
  const [count, setCount] = useState(0);
  const [caption, setCaption] = useState("");
  const [picId, setPicId] = useState("");

  const onChange = (e) => {
    setCaption(e.target.value);
    setCount(e.target.value.length);
  };

  const handleClick = (id) => {
    setClickedId(id);
  };

  const handleId = (id) => {
    setPicId(id);
  };

  const handleDelete = (id, fileName) => {
    collectionRef.collection("images").doc(id).delete();
    projectStorage.ref(fileName).delete();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    collectionRef
      .collection("images")
      .doc(picId)
      .update({ createdAt: timestamp() });
    await collectionRef
      .collection("images")
      .doc(picId)
      .set({ caption }, { merge: true });
    setCaption("");
    setCount(0);
    setPicId("");
  }
  return (
    <div className="row">
      {tripData &&
        tripData.map((pic) => (
          <div
            className="col-lg-3 col-md-6 col-sm-12 img-container"
            key={pic.id}
          >
            <motion.div
              layout
              whileHover={{ opacity: 1 }}
              className="img-wrap"
              onClick={() => handleClick(pic.id)}
              data-bs-toggle="modal"
              data-bs-target="#trip-img"
            >
              <motion.img
                src={pic.url}
                alt="my trip"
                data-bs-target="#trip-carousel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />
            </motion.div>
            <button
              className="delete-img btn-close"
              onClick={() => handleDelete(pic.id, pic.fileName)}
            ></button>
            <div className="d-flex justify-content-center">
              {pic.caption ? (
                <p className="mb-4">{pic.caption}</p>
              ) : (
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#captionModal"
                  className="btn mb-4"
                  onClick={() => handleId(pic.id)}
                >
                  <img
                    src="../images/add.png"
                    alt="edit-trip"
                    width="25"
                    height="25"
                  />
                </button>
              )}
            </div>
          </div>
        ))}
      <div
        className="modal fade"
        id="captionModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="captionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="captionModalLabel">
                Add Caption?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group h5">
                  <label htmlFor="caption-title" className="col-form-label">
                    {`Caption (${count}/40 Characters)`}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="caption-title"
                    value={caption}
                    onChange={onChange}
                    name="caption"
                    maxLength={40}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  data-bs-dismiss="modal"
                >
                  Add Caption
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
