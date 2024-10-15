import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Allapi from "../../../common";
import { mycon } from "../../../store/Mycontext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const AddAcademicYear = () => {
  const [year, setYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { c_branch, branchdet, setc_acad } = useContext(mycon);

  useEffect(() => {
    // Trigger the slide-down animation when the component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(Allapi.addAcademicYear.url(c_branch), {
        method: Allapi.addAcademicYear.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          year,
          startDate,
          endDate,
        }),
      });

      const res = await response.json();
      if (res.success) {
        setYear("");
        setStartDate("");
        setEndDate("");
        if (res.sortedAcademicYears) {
          setc_acad(res.sortedAcademicYears[0]);
        }
        toast.success("Acdemic Year Added");
      } else {
        toast.error(res.message || "Failed to add academic year");
      }
    } catch (error) {
      console.error("Error adding academic year:", error);
      toast.error("An error occurred while adding the academic year");
    }
  };

  return (
    <div
      className={`relative bg-white p-8 rounded-lg shadow-lg m-6 mx-auto max-w-2xl transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {branchdet ? `${branchdet.name} Branch` : "Loading..."}
      </h2>
      <ToastContainer />

      <Link
        to="/branch-admin/academic-year/view"
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
      >
        View Academic Years
      </Link>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Add New Academic Year
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Academic Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            placeholder="e.g., 2024-2025"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 transition-all font-semibold"
        >
          Add Academic Year
        </button>
      </form>
    </div>
  );
};

export default AddAcademicYear;
