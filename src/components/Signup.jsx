import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useStateIfMounted } from "use-state-if-mounted";

const Signup = () => {
  const initialFormValues = {
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const { signup } = useAuth();
  const [error, setError] = useStateIfMounted("");
  const [loading, setLoading] = useStateIfMounted(false);
  const [formValues, setFormValues] = useStateIfMounted(initialFormValues);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (formValues.password !== formValues.passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(formValues.email.trim(), formValues.password);
      navigate(`/login`);
      setFormValues(initialFormValues);
    } catch (e) {
      setError(e.message);
    }

    setLoading(false);
  }

  return (
    <div className="container d-flex align-items-center justify-content-center account">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">Sign Up</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group" id="email">
              <label htmlFor="email-input">Email</label>
              <input
                id="email-input"
                type="email"
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
            <div className="form-group mt-3" id="password">
              <label htmlFor="password-input">Password</label>
              <input
                id="password-input"
                type="password"
                className="form-control"
                value={formValues.password}
                onChange={onChange}
                name="password"
                required
              />
            </div>
            <div className="form-group mt-3" id="password-confirm">
              <label htmlFor="password-confirm-input">
                Password Confirmation
              </label>
              <input
                id="password-confirm-input"
                type="password"
                className="form-control"
                value={formValues.passwordConfirm}
                onChange={onChange}
                name="passwordConfirm"
                required
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
              Sign Up
            </button>
          </form>
          <div className="text-center mt-2 mb-4">
            Already have an account?
            <Link className="btn" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
