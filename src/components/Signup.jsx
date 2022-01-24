import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const initialFormValues = {
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
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

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

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
      id="signup"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="signupTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="signupTitle">
              Sign Up
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
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group" id="password">
                <label htmlFor="password-input">Password</label>
                <input
                  id="password-input"
                  type="password"
                  ref={passwordRef}
                  className="form-control"
                  value={formValues.password}
                  onChange={onChange}
                  name="password"
                  required
                />
              </div>
              <div className="form-group" id="password-confirm">
                <label htmlFor="password-confirm-input">
                  Password Confirmation
                </label>
                <input
                  id="password-confirm-input"
                  type="password"
                  ref={passwordConfirmRef}
                  className="form-control"
                  value={formValues.passwordConfirm}
                  onChange={onChange}
                  name="passwordConfirm"
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
                Sign Up
              </button>
            </form>
          </div>
          <div className="text-center mt-2 mb-4">
            Already have an account?
            <button
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#login"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
