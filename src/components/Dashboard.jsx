import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { projectFirestore } from "../firebase";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const id = currentUser.uid;
  const collectionRef = projectFirestore
    .collection("userData")
    .doc(id)
    .collection("trips");
  const { docs } = useFirestore("trips");

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this trip? You will lose all saved trip data"
    );
    if (confirm) {
      collectionRef.doc(id).delete();
    } else {
      return;
    }
  };

  const handleClick = (id) => {
    navigate(`/trip/${id}`);
  };

  useEffect(() => {
    docs &&
      docs.map((doc) =>
        collectionRef.doc(doc.id).set({ tripId: doc.id }, { merge: true })
      );
  }, [collectionRef, docs]);

  return (
    <div className="container-fluid w-75 account">
      <Navbar />
      <div className="text-center mt-5 text-light welcome">
        <h1>Your Trips</h1>
      </div>
      <div className="d-flex align-items-center justify-content-center mt-3">
        <button
          className="trip-photo-label"
          onClick={() => {
            navigate("/create-trip");
          }}
        >
          <span>+</span>
        </button>
      </div>
      <div className="row">
        {docs &&
          docs.map((doc) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12 img-container"
              key={doc.id}
            >
              <h3 className="text-center mt-2">{doc.tripName}</h3>
              <motion.div
                layout
                whileHover={{ opacity: 1 }}
                className="img-wrap"
              >
                <motion.img
                  src={doc.coverPhotoUrl}
                  alt="my trip"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => handleClick(doc.id)}
                />
              </motion.div>
              <div className="d-flex justify-content-between">
                <h4 className="mb-5">Location: {doc.tripLocation}</h4>
                <Link className="btn" to={`/edit-trip/${doc.tripId}`}>
                  <img
                    src="../images/edit.png"
                    alt="edit-trip"
                    width="35"
                    height="35"
                  />
                </Link>
              </div>
              <button
                className="delete-trip btn-close"
                onClick={() => handleDelete(doc.id)}
              ></button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
