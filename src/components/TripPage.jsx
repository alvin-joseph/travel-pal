import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import SelectedImage from "./SelectedImage";
import CreateNote from "./CreateNote";
import Notes from "./Notes";
import Images from "./Images";
import Navbar from "./Navbar";
import useFirestore from "../hooks/useFirestore";
import useFirestoreTripData from "../hooks/useFirestoreTripData";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { projectFirestore } from "../firebase";
import { format, parseISO } from "date-fns";

const TripPage = () => {
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [clickedId, setClickedId] = useState("");
  const { currentUser } = useAuth();
  const types = ["image/png", "image/jpeg"];
  const { docs } = useFirestore("trips");
  const { tripId } = useParams();
  const { tripData } = useFirestoreTripData(tripId, "images");
  const userId = currentUser.uid;
  const collectionRef = projectFirestore
    .collection("userData")
    .doc(userId)
    .collection("trips")
    .doc(tripId);

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
      <Navbar />
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
