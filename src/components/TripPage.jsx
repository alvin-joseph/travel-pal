import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import SelectedImage from "./SelectedImage";
import useFirestore from "../hooks/useFirestore";
import useFirestoreImages from "../hooks/useFirestoreImages";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

const TripPage = () => {
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [clickedId, setClickedId] = useState("");
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const types = ["image/png", "image/jpeg"];
  const { docs } = useFirestore();
  const { tripId } = useParams();
  const { pics } = useFirestoreImages(tripId);
  const userId = currentUser.uid;

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch {
      alert("Failed to log out");
    }
  }

  const handleClick = (id) => {
    setClickedId(id);
  };

  const handleDelete = (id) => {
    // projectFirestore.collection("images").doc(id).delete();
  };

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
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
            Welcome
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
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/dashboard/${userId}`}>
                      Back to Dashboard
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {docs &&
        docs
          .filter((doc) => doc.tripId === tripId)
          .map((doc) => (
            <div key={doc.id} className="text-center mt-5 text-light welcome">
              <h1>{doc.tripName}</h1>
            </div>
          ))}
      <div className="mt-5 text-light welcome">
        <h3>
          <u>Photos</u>
        </h3>
      </div>
      <form className="trip-form">
        <div className="form-group">
          <label htmlFor="tripPhoto" className="trip-photo-label">
            <span>+</span>
          </label>
          <input
            id="tripPhoto"
            type="file"
            className="form-control-file trip-input"
            onChange={changeHandler}
          />
          {error && (
            <div className="text-center alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {file && (
            <div className="text-center alert alert-success" role="alert">
              {file.name}
            </div>
          )}
          <div className="output">
            {file && <ProgressBar file={file} setFile={setFile} id={tripId} />}
          </div>
        </div>
      </form>
      <div className="row">
        {pics &&
          pics.map((pic) => (
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
                onClick={() => handleDelete(pic.id)}
              ></button>
            </div>
          ))}
      </div>
      <SelectedImage
        clickedId={clickedId}
        setClickedId={setClickedId}
        docs={pics}
      />
    </div>
  );
};

export default TripPage;
