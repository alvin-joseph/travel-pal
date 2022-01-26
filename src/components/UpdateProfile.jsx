import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const id = currentUser.uid;

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/profile");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="container d-flex align-items-center justify-content-center account">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">Update Profile</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group" id="email">
              <label htmlFor="email-input">Email</label>
              <input
                id="email-input"
                type="email"
                ref={emailRef}
                className="form-control"
                defaultValue={currentUser.email}
                required
              />
            </div>
            <div className="form-group mt-3" id="password">
              <label htmlFor="password-input">Password</label>
              <input
                id="password-input"
                type="password"
                ref={passwordRef}
                className="form-control"
                placeholder="Leave blank to keep the same"
              />
            </div>
            <div className="form-group mt-3" id="password-confirm">
              <label htmlFor="password-confirm-input">
                Password Confirmation
              </label>
              <input
                id="password-confirm-input"
                type="password"
                ref={passwordConfirmRef}
                className="form-control"
                placeholder="Leave blank to keep the same"
              />
            </div>
            {error && (
              <div className="alert alert-danger mt-4" role="alert">
                {error}
              </div>
            )}
            <button
              disabled={loading}
              type="submit"
              className="btn mt-5 w-100 btn-primary"
            >
              Update
            </button>
          </form>
          <div className="text-center mt-3 mb-4">
            <Link className="btn" to={`/dashboard/${id}`}>
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
