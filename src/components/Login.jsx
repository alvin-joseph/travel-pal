import React, { useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const initialFormValues = {
    email: "",
    password: "",
  };
  const { login } = useAuth();
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

    try {
      setError("");
      setLoading(true);
      await login(formValues.email.trim(), formValues.password);
      setFormValues(initialFormValues);
      const unsub = auth.onAuthStateChanged((authObj) => {
        unsub();
        if (authObj) {
          navigate(`/dashboard/${authObj.uid}`);
        }
      });
    } catch (e) {
      setError(e.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();
      if (authObj) {
        navigate(`/dashboard/${authObj.uid}`);
      }
    });
  }, [navigate]);

  return (
    <div className="container d-flex align-items-center justify-content-center account">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
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
            {error && (
              <div className="alert alert-danger mt-4" role="alert">
                {error}
              </div>
            )}
            <div className="text-center mt-2">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="btn mt-5 w-100 btn-primary"
            >
              Login
            </button>
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

export default Login;
