import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { projectFirestore } from "../firebase";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const id = currentUser.uid;
  const collectionRef = projectFirestore
    .collection("userData")
    .doc(id)
    .collection("trips");
  const { docs } = useFirestore();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch {
      alert("Failed to log out");
    }
  }

  const handleDelete = (id) => {
    collectionRef.doc(id).delete();
  };

  const handleClick = (id) => {
    navigate(`/trip/${id}`);
  };

  return (
    <div className="container-fluid w-75 account">
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid mt-3">
          <h1 className="navbar-brand mb-0">
            <img
              src="../images/travel-app.png"
              alt=""
              width="30"
              height="29"
              className="d-inline-block align-text-top"
            />
            Welcome to Travel Pal
          </h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle h4"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="../images/account2.png"
                    alt=""
                    width="35"
                    height="35"
                    className="d-inline-block align-text-top"
                  />
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
              className="col-lg-3 col-md-6 col-sm-12 img-container"
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
              <h4>Location: {doc.tripLocation}</h4>
              <button
                className="delete-trip mb-4 btn-close"
                onClick={() => handleDelete(doc.id)}
              ></button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
