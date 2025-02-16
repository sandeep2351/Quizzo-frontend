import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        password,
      });

      if (response.data.success) {
        navigate("/dashboard");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Signup failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-10 rounded-2xl shadow-2xl backdrop-blur-lg relative"
      >
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="mx-auto h-16 w-16 bg-purple-600 text-white flex items-center justify-center rounded-full shadow-lg"
          >
            <span className="text-3xl">🚀</span>
          </motion.div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Join the Adventure ✨</h2>
          <p className="text-sm text-gray-500 -ml-8">Create your account & enjoy amazing Quizzes!</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSignup}>
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 p-4 rounded-md">
              <p className="text-sm text-red-600">⚠️ {error}</p>
            </motion.div>
          )}

          <div className="space-y-3">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="👤 Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="🔒 Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-4 bg-purple-600 text-white rounded-lg font-semibold text-lg transition-all hover:bg-purple-700 focus:ring-4 focus:ring-purple-400"
          >
            {isLoading ? "🚀 Signing up..." : "Sign up now ✨"}
          </motion.button>

          <p className="text-center text-sm text-gray-500 mt-3">
            Already have an account?{' '}
            <Link to="/" className="text-purple-600 hover:underline">Login here</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
