import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CalorieResult from "./pages/CalorieResult";
import MealTracker from "./pages/MealTracker";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calories" element={<CalorieResult />} />
        <Route path="/meals" element={<MealTracker />} />
      </Routes>
    </Router>
  );
};

export default App;
