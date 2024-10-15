import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Allapi from "../../../common/index";
import { FaTrash, FaPlusCircle } from 'react-icons/fa'; // Icons for buttons

const ViewAllClasses = () => {
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(Allapi.getClasses.url, {
        method: Allapi.getClasses.method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        setClasses(result.data);
      } else {
        toast.error(result.message || "Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      toast.error("Error fetching classes");
    }
  };

  const handleDelete = async (classId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(Allapi.deleteClass.url(classId), {
        method: Allapi.deleteClass.method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Class deleted successfully");
        fetchClasses(); // Refresh the class list
      } else {
        toast.error(result.message || "Failed to delete class");
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      toast.error("Error deleting class");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="mt-16 p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">All Classes</h2>

      {classes.length === 0 ? (
        <p className="text-gray-600 text-center">No classes found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-4 py-2 text-left text-gray-800">Class Name</th>
              <th className="px-4 py-2 text-left text-gray-800">Subjects</th>
              <th className="px-4 py-2 text-left text-gray-800">Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem._id} className="hover:bg-gray-100 transition">
                <td className="border px-4 py-2 text-gray-700">{classItem.name}</td>
                <td className="border px-4 py-2 text-gray-700">
                  {classItem.subjects.length > 0 ? classItem.subjects.join(', ') : "No subjects assigned"}
                </td>
                <td className="border px-4 py-2 flex space-x-2">
                  <Link
                    to={`/branch-admin/class/add-section/${classItem._id}`} // Link to add section route for this class
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition flex items-center"
                  >
                    <FaPlusCircle />
                    <span className="ml-1">Add Section</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(classItem._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-500 transition flex items-center"
                  >
                    <FaTrash />
                    <span className="ml-1">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAllClasses;
