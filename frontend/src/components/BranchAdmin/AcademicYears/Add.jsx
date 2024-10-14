// components/AddAcademicYear.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import Allapi from "../../../common";
import { mycon } from "../../../store/Mycontext";
import { useContext } from "react";
import { Link } from "react-router-dom";
const AddAcademicYear = () => {
  const [year, setYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { c_branch, branchdet } = useContext(mycon);
  console.log("c_branch is", c_branch);
  console.log("branch_det is", branchdet);

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
      console.log("respone get is", res);
      if (res.success) {
        toast.success("Academic year added successfully");
        setYear("");
        setStartDate("");
        setEndDate("");
      } else {
        toast.error(res.message || "Failed to add academic year");
      }
    } catch (error) {
      console.error("Error adding academic year:", error);
      toast.error("An error occurred while adding the academic year");
    }
  };

  return (
    <div className="relative bg-white p-6 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        {branchdet ? branchdet.name : "Loading"} branch
      </h2>
      <Link
        to="/branch-admin/academic-year/view"
        className=" absolute top-5 right-5 bg-red-400 p-3 text-white hover:text-white hover:bg-red-700"
      >
        View all Academic Years
      </Link>
      <h2 className="text-xl font-semibold mb-4">Add New Academic Year</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Academic Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="e.g., 2024-2025"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Academic Year
        </button>
      </form>
    </div>
  );
};

export default AddAcademicYear;
