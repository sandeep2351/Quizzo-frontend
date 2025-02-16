import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,  // Allow sending cookies if required
        }
      );
  
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg border border-gray-200"
      >
        <div className="text-center">
          <motion.div whileHover={{ scale: 1.1 }} className="text-5xl">🔑</motion.div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-800">
            Welcome Back! 👋
          </h2>
          <p className="text-gray-500 text-sm mt-2">Access your account and continue your journey!</p>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleLogin}>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            >
              ⚠️ {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              id="username"
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="👤 Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              id="password"
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="🔒 Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-300 shadow-lg"
          >
            {isLoading ? "⏳ Logging in..." : "🚀 Login"}
          </motion.button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up here
            </Link>
          </p>
          <p className="text-center text-sm text-gray-600">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
