import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="home">
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        <Signup />
        <Login />
      </div>
    </div>
  );
}

export default App;
