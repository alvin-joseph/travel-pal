import React from "react";
import useFirestoreTripData from "../hooks/useFirestoreTripData";
import { motion } from "framer-motion";

const Notes = ({ tripId, collectionRef }) => {
  const { tripData } = useFirestoreTripData(tripId, "notes");

  const handleDelete = (id) => {
    collectionRef.collection("notes").doc(id).delete();
  };
  return (
    <div className="row">
      {tripData &&
        tripData.map((note) => (
          <div className="col-12 mb-5" key={note.id}>
            <motion.div layout className="note-card">
              <div className="note-title p-3">
                <h4>{note.noteTitle}</h4>
              </div>
              <div className="note-text p-3 h5">
                <p>{note.noteText}</p>
                <div className="note-btn">
                  <button
                    className="btn-close p-3"
                    onClick={() => handleDelete(note.id)}
                  ></button>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
    </div>
  );
};

export default Notes;
