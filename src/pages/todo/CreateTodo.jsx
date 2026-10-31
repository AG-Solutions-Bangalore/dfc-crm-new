import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import { toast } from "sonner";
import { BackButton, CreateButton } from "../../components/common/ButtonColors";
import { ListTodo, ArrowLeft } from "lucide-react";

const CreateTodo = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    todo_branch: "",
    todo_description: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState([]);

  const fetchBranch = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/api/web-fetch-branch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBranch(response.data?.branch || []);
    } catch (error) {
      console.error("Error fetching Todo Branch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranch();
  }, []);

  const onInputChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("addIndiv");
    if (!form.checkValidity()) {
      toast.error("Please fill all required fields");
      setIsButtonDisabled(false);
      return;
    }

    const data = {
      todo_branch: todo.todo_branch,
      todo_description: todo.todo_description,
    };

    setIsButtonDisabled(true);
    axios({
      url: BASE_URL + "/api/web-create-todo",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.data.code === 200 || res.data.code === "200") {
          toast.success(res.data.msg);
          navigate("/todo-list");
          setTodo({
            todo_branch: "",
            todo_description: "",
          });
        } else if (res.data.code === 400 || res.data.code === "400") {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Error creating task");
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  const FormLabel = ({ children, required }) => (
    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const inputClass =
    "w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#142747] focus:border-[#142747] transition-colors";

  return (
    <Layout>
      <div className="space-y-4">
        {/* Banner Header */}
        <div className="bg-[#0A1D3D] text-white p-4 rounded-xl flex justify-between items-center shadow-xs border-b-2 border-[#F56616]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <ListTodo className="h-5 w-5 text-[#F56616]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Create New Task
              </h2>
              <p className="text-xs text-gray-300">
                Assign actionable task or reminder to a branch
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/todo-list")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xs border border-gray-100 p-6">
          <form onSubmit={handleSubmit} id="addIndiv" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <FormLabel required>Branch</FormLabel>
                <select
                  name="todo_branch"
                  value={todo.todo_branch}
                  onChange={onInputChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select Branch</option>
                  {branch.map((option) => (
                    <option key={option.branch_name} value={option.branch_name}>
                      {option.branch_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-1 md:col-span-2">
                <FormLabel required>Task Description</FormLabel>
                <textarea
                  name="todo_description"
                  value={todo.todo_description}
                  onChange={onInputChange}
                  className={inputClass}
                  required
                  rows={3}
                  placeholder="Enter detailed description of the task or instruction..."
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <button
                type="submit"
                className={CreateButton}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? "Submitting..." : "Submit Task"}
              </button>

              <button
                type="button"
                className={BackButton}
                onClick={() => navigate("/todo-list")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTodo;
