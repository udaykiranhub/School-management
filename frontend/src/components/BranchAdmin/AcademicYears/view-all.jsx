// components/ViewAcademicYears.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // If using React Router for navigation
import { toast } from "react-toastify";
import Allapi from "../../../common";
import { useContext } from "react";
import { mycon } from "../../../store/Mycontext";

const ViewAcademicYears = () => {
  const { c_branch, branchdet } = useContext(mycon);

  const [academicYears, setAcademicYears] = useState([]);

  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        const response = await fetch(Allapi.getAcademicYears.url(c_branch), {
          method: Allapi.getAcademicYears.method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch academic years");
        }

        const res = await response.json();
        console.log("academic years is", res.data);
        setAcademicYears(res.data);
      } catch (error) {
        console.error("Error fetching academic years:", error);
        toast.error("Failed to fetch academic years");
      }
    };

    fetchAcademicYears();
  }, [c_branch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this academic year?")) {
      try {
        const response = await fetch(Allapi.deleteAcademicYear.url(id), {
          method: Allapi.deleteAcademicYear.method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          toast.success("Academic year deleted successfully");
          // Update the list of academic years after deletion
          setAcademicYears(academicYears.filter((year) => year._id !== id));
        } else {
          toast.error(data.message || "Failed to delete academic year");
        }
      } catch (error) {
        console.error("Error deleting academic year:", error);
        toast.error("An error occurred while deleting the academic year");
      }
    }
  };

  return (
    <div className=" relative bg-white p-6 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        Academic Years for Branch
        <div className="font-bold capitalize text-2xl">
          {branchdet ? branchdet.name : "Loading"}
        </div>
      </h2>
      <Link
        to="/branch-admin/academic-year/add"
        className=" absolute top-5 right-5 bg-red-400 p-3 text-white hover:text-white hover:bg-red-700"
      >
        Add Academic Year
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-300 shadow-md rounded mb-4">
          <thead>
            <tr>
              <th className="border-b-2 p-3">#</th>
              <th className="border-b-2 p-3">Academic Year</th>
              <th className="border-b-2 p-3">Start Date</th>
              <th className="border-b-2 p-3">End Date</th>
              <th className="border-b-2 p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {academicYears.map((year, index) => (
              <tr key={year._id}>
                <td className="border-b p-3">{index + 1}</td>
                <td className="border-b p-3">
                  {year.year}{" "}
                  <button className="bg-blue-500 text-white p-3 m-2 hover:bg-blue-700">
                    Add classes
                  </button>
                </td>
                <td className="border-b p-3">
                  {new Date(year.startDate).toLocaleDateString()}
                </td>
                <td className="border-b p-3">
                  {new Date(year.endDate).toLocaleDateString()}
                </td>
                <td className="border-b p-3">
                  <Link
                    to={`/edit-academic-year/${year._id}`} // Replace with your edit academic year route
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(year._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAcademicYears;
