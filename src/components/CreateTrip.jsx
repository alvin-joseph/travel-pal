import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const initialFormValues = {
    tripName: "",
    tripLocation: "",
    tripStartDate: "",
    tripEndDate: "",
  };
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState(initialFormValues);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const types = ["image/png", "image/jpeg"];
  const id = currentUser.uid;

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match");
    // }

    // try {
    //   setError("");
    //   setLoading(true);
    //   await signup(emailRef.current.value, passwordRef.current.value);
    //   navigate(`/dashboard/${id}`);
    // } catch {
    //   setError("Failed to create account");
    // }

    // setLoading(false);
    // setFormValues(initialFormValues);
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
    <div className="container d-flex align-items-center justify-content-center account">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">Create your trip!</h5>
          <form onSubmit={handleSubmit}>
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
            <div className="form-group">
              <label htmlFor="tripCoverPhoto" className="w-100 mt-3">
                Upload Cover Photo
              </label>
              <input
                id="tripCoverPhoto"
                type="file"
                className="form-control-file"
                onChange={changeHandler}
              />
              {error && (
                <div
                  className="text-center alert alert-danger mt-4"
                  role="alert"
                >
                  {error}
                </div>
              )}
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
              Create Trip
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

export default CreateTrip;
