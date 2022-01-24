import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const initialFormValues = {
    email: "",
    password: "",
  };
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
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
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create account");
    }

    setLoading(false);
    setFormValues(initialFormValues);
  }

  return (
    <div
      className="modal fade"
      id="login"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="loginTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="loginTitle">
              Login
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group" id="email">
                <label htmlFor="email-login">Email</label>
                <input
                  id="email-login"
                  type="email"
                  ref={emailRef}
                  className="form-control"
                  value={formValues.email}
                  onChange={onChange}
                  name="email"
                  required
                />
              </div>
              <div className="form-group" id="password">
                <label htmlFor="password-login">Password</label>
                <input
                  id="password-login"
                  type="password"
                  ref={passwordRef}
                  className="form-control"
                  value={formValues.password}
                  onChange={onChange}
                  name="password"
                  required
                />
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <button
                disabled={loading}
                type="submit"
                className="btn mt-5 w-100 btn-primary"
              >
                Login
              </button>
            </form>
          </div>
          <div className="text-center mt-2 mb-4">
            Don't have an account?
            <button
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#signup"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
