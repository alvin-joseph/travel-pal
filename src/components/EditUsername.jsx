import React, { useEffect, useRef, useState } from "react";
import useFirestoreUserData from "../hooks/useFirestoreUserData";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { projectFirestore } from "../firebase";

const AddUsername = () => {
  const usernameRef = useRef();
  const [count, setCount] = useState(0);
  const [docId, setDocId] = useState("");
  const [username, setUsername] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const id = currentUser.uid;
  const collectionRef = projectFirestore
    .collection("userData")
    .doc(id)
    .collection("userInfo");
  const { userInfo } = useFirestoreUserData();

  const onChange = (e) => {
    setCount(e.target.value.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await collectionRef
      .doc(docId)
      .update({ username: usernameRef.current.value });
    navigate(`/dashboard/${id}`);
  };

  useEffect(() => {
    userInfo.map((user) => setUsername(user.username));
    userInfo.map((user) => setDocId(user.id));
  }, [userInfo]);

  return (
    <div className="container d-flex align-items-center justify-content-center account">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">Edit Username</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group" id="email">
              <label htmlFor="username-input">{`Username (${count}/20 Characters)`}</label>
              <input
                id="username-input"
                type="text"
                ref={usernameRef}
                className="form-control"
                onChange={onChange}
                defaultValue={username}
                maxLength={20}
                required
              />
            </div>
            <button type="submit" className="btn mt-5 w-100 btn-primary">
              Edit
            </button>
          </form>
          <div className="text-center mt-3 mb-4">
            <Link className="btn" to={`/profile`}>
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsername;
