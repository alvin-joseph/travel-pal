import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import CreateTrip from "./components/CreateTrip";
import TripPage from "./components/TripPage";
import AddUsername from "./components/AddUsername";
import EditUsername from "./components/EditUsername";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import EditTrip from "./components/EditTrip";

function App() {
  return (
    <div className="App">
      <div className="home">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/:id"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/trip/:tripId"
            element={
              <PrivateRoute>
                <TripPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-username"
            element={
              <PrivateRoute>
                <AddUsername />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-username"
            element={
              <PrivateRoute>
                <EditUsername />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-trip"
            element={
              <PrivateRoute>
                <CreateTrip />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-trip/:tripId"
            element={
              <PrivateRoute>
                <EditTrip />
              </PrivateRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
