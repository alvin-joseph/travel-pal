import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";

ReactDOM.render(
  <Router>
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);
