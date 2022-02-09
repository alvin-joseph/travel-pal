import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import SelectedImage from "./SelectedImage";
import CreateNote from "./CreateNote";
import Notes from "./Notes";
import Images from "./Images";
import useFirestore from "../hooks/useFirestore";
import useFirestoreTripData from "../hooks/useFirestoreTripData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { projectFirestore } from "../firebase";
import { format, parseISO } from "date-fns";

const TripPage = () => {
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [clickedId, setClickedId] = useState("");
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const types = ["image/png", "image/jpeg"];
  const { docs } = useFirestore();
  const { tripId } = useParams();
  const { tripData } = useFirestoreTripData(tripId, "images");
  const userId = currentUser.uid;
  const collectionRef = projectFirestore
    .collection("userData")
    .doc(userId)
    .collection("trips")
    .doc(tripId);

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch {
      alert("Failed to log out");
    }
  }

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
              <h2>
                {format(parseISO(doc.tripStartDate), "MMM do, yyyy")} -{" "}
                {format(parseISO(doc.tripEndDate), "MMM do, yyyy")}
              </h2>
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
      <Images
        tripData={tripData}
        collectionRef={collectionRef}
        setClickedId={setClickedId}
      />
      <SelectedImage
        clickedId={clickedId}
        setClickedId={setClickedId}
        pics={tripData}
      />
      <div className="mt-5 welcome">
        <h3>
          <u>Notes</u>
        </h3>
      </div>
      <div className="d-flex align-items-center justify-content-center mt-3">
        <button
          className="trip-photo-label notes-label mb-5"
          data-bs-toggle="modal"
          data-bs-target="#notesModal"
        >
          <span>+</span>
        </button>
      </div>
      <CreateNote tripId={tripId} />
      <Notes tripId={tripId} collectionRef={collectionRef} />
    </div>
  );
};

export default TripPage;
