import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CalorieResult from "./pages/CalorieResult";
import MealTracker from "./pages/MealTracker";
import PrivateRoute from "./routes/PrivateRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/calories"
          element={
            <PrivateRoute>
              <CalorieResult />
            </PrivateRoute>
          }
        />
        <Route
          path="/meals"
          element={
            <PrivateRoute>
              <MealTracker />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;