import React, { useEffect, useState } from "react";
import useFirestoreUserData from "../hooks/useFirestoreUserData";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const [error, setError] = useState("");
  const [foundUsername, setFoundUsername] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const id = currentUser.uid;
  const { userInfo } = useFirestoreUserData();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/");
    } catch {
      setError("Failed to log out");
    }
  }

  useEffect(() => {
    userInfo.map((user) => {
      if (user.username) {
        setFoundUsername(true);
      }
      return foundUsername;
    });
  }, [userInfo, foundUsername]);

  return (
    <div className="container d-flex align-items-center justify-content-center account">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center">Profile</h3>
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          {foundUsername ? (
            <Link to="/edit-username" className="btn btn-primary w-100 mt-3">
              Edit Username
            </Link>
          ) : (
            <Link to="/add-username" className="btn btn-primary w-100 mt-3">
              Add Username
            </Link>
          )}
          {error && (
            <div className="alert alert-danger mt-4" role="alert">
              {error}
            </div>
          )}
          <div className="text-center mt-4 mb-3">
            <Link className="btn" to={`/dashboard/${id}`}>
              Back to Dashboard
            </Link>
          </div>
          <div className="text-center mt-3 mb-3">
            <Link className="btn" onClick={handleLogout} to="/">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
