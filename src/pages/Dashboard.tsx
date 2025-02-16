import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Pencil, Trash, BookOpen, Search, PlusCircle, LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface Quiz {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/quizzes");
      setQuizzes(response.data);
    } catch {
      toast.error("Failed to load quizzes.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/quizzes/${id}`);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
      toast.success("Quiz deleted successfully!");
    } catch {
      toast.error("Failed to delete quiz.");
    }
    setLoading(false);
  };

  // 🔍 Filter quizzes based on search term
  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 text-indigo-700">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-3xl font-bold">📚 My Quiz Collection</h1>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-md"
              onClick={() => navigate("/create")}
            >
              <PlusCircle className="w-5 h-5" /> Add Quiz
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 border border-red-500 text-red-500 px-5 py-2 rounded-lg shadow-md hover:bg-red-500 hover:text-white"
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/");
                toast.success("Logged out successfully");
              }}
            >
              <LogOut className="w-5 h-5" /> Logout
            </motion.button>
          </div>
        </div>

        <div className="relative my-6">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="🔍 Search quizzes..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-12 h-12 text-indigo-600" />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => (
              <motion.div key={quiz.id} whileHover={{ scale: 1.02 }}>
                <Card className="p-4 bg-white shadow-xl rounded-lg hover:shadow-2xl transition-all">
                  <CardContent className="flex flex-col gap-3">
                    <h3 className="text-xl font-semibold text-gray-800">📝 {quiz.title}</h3>
                    <p className="text-gray-600">{quiz.description}</p>
                    <div className="text-sm text-gray-500">
                      📅 Created on: {new Date(quiz.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex justify-between">
                      <Button
                        size="sm"
                        className="bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center gap-1"
                        onClick={() => navigate(`/edit/${quiz.id}`)}
                      >
                        <Pencil className="w-4 h-4" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="bg-red-50 text-red-600 hover:bg-red-100 flex items-center gap-1"
                        onClick={() => handleDelete(quiz.id)}
                      >
                        <Trash className="w-4 h-4" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-3">No quizzes found.</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
