import React, { useState, useEffect } from "react";
import useFirestore from "../hooks/useFirestore";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { projectFirestore, projectStorage, timestamp } from "../firebase";
import { useParams } from "react-router-dom";

const EditTrip = () => {
  const initialFormValues = {
    tripName: "",
    tripLocation: "",
    tripStartDate: "",
    tripEndDate: "",
    coverPhoto: "default",
  };
  const { currentUser } = useAuth();
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(null);
  const navigate = useNavigate();
  const id = currentUser.uid;
  const [formValues, setFormValues] = useState(initialFormValues);
  const { tripId } = useParams();
  const { docs } = useFirestore();
  const docRef = projectFirestore
    .collection("userData")
    .doc(id)
    .collection("trips")
    .doc(tripId);

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    docs &&
      docs
        .filter((doc) => doc.tripId === tripId)
        .map((filteredDoc) =>
          setFormValues({
            tripName: filteredDoc.tripName,
            tripLocation: filteredDoc.tripLocation,
            tripStartDate: filteredDoc.tripStartDate,
            tripEndDate: filteredDoc.tripEndDate,
            coverPhoto: formValues.coverPhoto,
          })
        );
    const storageRef = projectStorage.ref(
      formValues.coverPhoto.toLowerCase() + ".jpg"
    );

    const getUrl = async () => {
      const url = await storageRef.getDownloadURL();
      setCoverPhotoUrl(url);
    };

    getUrl();
    return () => setCoverPhotoUrl() && setFormValues();
  }, [formValues.coverPhoto, tripId, docs]);

  async function handleSubmit(e) {
    e.preventDefault();
    docRef.update({ createdAt: timestamp() });
    await docRef.update({
      tripName: formValues.tripName,
      tripLocation: formValues.tripLocation,
      tripStartDate: formValues.tripStartDate,
      tripEndDate: formValues.tripEndDate,
      coverPhoto: formValues.coverPhoto,
      coverPhotoUrl,
    });
    setFormValues(initialFormValues);
    setCoverPhotoUrl(null);
    navigate(`/dashboard/${id}`);
  }

  return (
    <div className="container d-flex align-items-center justify-content-center account">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">Edit your trip</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="tripCoverPhoto" className="w-100 mt-3">
                  Pick Cover Photo
                </label>
                <select
                  id="tripCoverPhoto"
                  type="file"
                  className="form-control-file"
                  name="coverPhoto"
                  value={formValues.coverPhoto}
                  onChange={onChange}
                >
                  <option defaultValue="default">Default</option>
                  <option value="beach">Beach</option>
                  <option value="city">City</option>
                  <option value="outdoors">Outdoors</option>
                  <option value="resort">Resort</option>
                  <option value="family">Family</option>
                </select>
              </div>
              <div className="col-6 mt-3">
                <img
                  className="img-thumbnail"
                  src={coverPhotoUrl}
                  alt="trip cover"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="tripName">Trip Name</label>
              <input
                id="tripName"
                type="text"
                className="form-control"
                value={formValues.tripName}
                onChange={onChange}
                name="tripName"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="tripLocation">Trip location</label>
              <input
                id="tripLocation"
                type="text"
                className="form-control"
                value={formValues.tripLocation}
                onChange={onChange}
                name="tripLocation"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="tripStartDate">Start Date</label>
              <input
                id="tripStartDate"
                type="date"
                className="form-control"
                value={formValues.tripStartDate}
                onChange={onChange}
                name="tripStartDate"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="tripEndDate">End Date</label>
              <input
                id="tripEndDate"
                type="date"
                className="form-control"
                value={formValues.tripEndDate}
                onChange={onChange}
                name="tripEndDate"
                required
                min={formValues.tripStartDate}
              />
            </div>
            <button type="submit" className="btn mt-5 w-100 btn-primary">
              Edit Trip
            </button>
          </form>
          <div className="text-center mt-2 mb-4">
            <Link className="btn" to={`/dashboard/${id}`}>
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTrip;
