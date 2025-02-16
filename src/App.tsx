import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateEditQuiz from "./pages/CreateEditQuiz";
import Signup from "./pages/Signup";


function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateEditQuiz />} />
        <Route path="/edit/:id" element={<CreateEditQuiz />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
