import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, NotebookPen, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const quizSchema = z.object({
  title: z.string().min(3, "Quiz title must have at least 3 characters"),
  description: z.string().min(10, "Description must have at least 10 characters"),
});

type QuizFormData = z.infer<typeof quizSchema>;

const CreateEditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
  });

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/quizzes/${id}`)
        .then((response) => {
          setValue("title", response.data.title);
          setValue("description", response.data.description);
        })
        .catch(() => {
          toast.error("Error loading quiz details.");
        })
        .finally(() => setLoading(false));
    }
  }, [id, setValue]);

  const onSubmit = async (data: QuizFormData) => {
    setLoading(true);
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/quizzes/${id}`, data);
        toast.success("Quiz updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/quizzes", {
          ...data,
          createdAt: new Date().toISOString(),
        });
        toast.success("New quiz created successfully!");
      }
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex justify-center items-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 relative"
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 flex items-center"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Go Back
        </Button>

        <div className="flex items-center justify-center mb-6">
          <NotebookPen className="w-10 h-10 text-indigo-600" />
          <h2 className="text-3xl font-bold text-gray-900 ml-3">
            {isEditing ? "Modify Your Quiz" : "Design a New Quiz"}
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label className="text-lg font-medium text-gray-700">Title</Label>
            <Input
              {...register("title")}
              type="text"
              placeholder="Give your quiz a compelling title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label className="text-lg font-medium text-gray-700">Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Provide a brief description of the quiz"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-500 hover:border-gray-700 hover:text-gray-800"
                onClick={() => navigate("/dashboard")}
              >
                Discard
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : (isEditing ? "Save Changes" : "Create Quiz")}
              </Button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateEditQuiz;
