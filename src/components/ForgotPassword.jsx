import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const initialFormValues = {
    email: "",
  };
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
    setFormValues(initialFormValues);
  }

  return (
    <div className="container d-flex align-items-center justify-content-center account">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">Password Reset</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group" id="email">
              <label htmlFor="email-input">Email</label>
              <input
                id="email-input"
                type="email"
                ref={emailRef}
                className="form-control"
                value={formValues.email}
                onChange={onChange}
                name="email"
                required
              />
            </div>
            {error && (
              <div className="alert alert-danger mt-4" role="alert">
                {error}
              </div>
            )}
            {message && (
              <div className="alert alert-success mt-4" role="alert">
                {message}
              </div>
            )}
            <button
              disabled={loading}
              type="submit"
              className="btn mt-3 w-100 btn-primary"
            >
              Reset Password
            </button>
            <div className="text-center mt-4">
              <Link className="btn" to="/login">
                Login
              </Link>
            </div>
          </form>
          <div className="text-center mt-2 mb-4">
            Don't have an account?
            <Link className="btn" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
