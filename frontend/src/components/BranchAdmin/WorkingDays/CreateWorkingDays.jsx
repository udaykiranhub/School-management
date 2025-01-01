import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Allapi from "../../../common";
import { mycon } from "../../../store/Mycontext";

const CreateWorkingDays = () => {
  const { branchdet } = useContext(mycon);
  const [acid, setAcid] = useState("");
  const [currentAcademicYear, setCurrentAcademicYear] = useState("");
  const [workingDays, setWorkingDays] = useState({
    june: "",
    july: "",
    august: "",
    september: "",
    october: "",
    november: "",
    december: "",
    january: "",
    february: "",
    march: "",
    april: "",
  });

  // Fetch current academic year
  const curracad = async (bid) => {
    try {
      const response = await fetch(Allapi.getAcademicYears.url(bid), {
        method: Allapi.getAcademicYears.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch academic years");

      const res = await response.json();
      if (res.success && res.data.length > 0) {
        const latestAcademicYear = res.data
          .sort((a, b) => {
            const [startA, endA] = a.year.split("-").map(Number);
            const [startB, endB] = b.year.split("-").map(Number);
            return startB - startA || endB - endA;
          })[0];

        setAcid(latestAcademicYear._id);
        setCurrentAcademicYear(latestAcademicYear.year);
      }
    } catch (error) {
      toast.error("Failed to fetch academic year");
    }
  };

  const handleInputChange = (month, value) => {
    // Ensure the input value is a number, with no leading zeros, and max of 30
    const sanitizedValue = value.replace(/^0+/, ""); // Remove leading zeros
    const numericValue = parseInt(sanitizedValue, 10);

    if (!isNaN(numericValue) && numericValue <= 30) {
      setWorkingDays((prev) => ({
        ...prev,
        [month]: sanitizedValue,
      }));
    } else if (value === "") {
      // Allow clearing the input field
      setWorkingDays((prev) => ({
        ...prev,
        [month]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        branchId: branchdet._id,
        academicId: acid,
        months: Object.fromEntries(
          Object.entries(workingDays).map(([month, value]) => [month, parseInt(value, 10) || 0])
        ),
      };

      const response = await fetch(Allapi.addWorkingDays.url, {
        method: Allapi.addWorkingDays.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Working days added successfully");
        setWorkingDays({
          june: "",
          july: "",
          august: "",
          september: "",
          october: "",
          november: "",
          december: "",
          january: "",
          february: "",
          march: "",
          april: "",
        });
      } else {
        toast.error(result.message || "Failed to add working days");
      }
    } catch (error) {
      toast.error("An unexpected error occurred while adding working days");
      console.error("Submit error:", error);
    }
  };

  useEffect(() => {
    if (branchdet?._id) {
      curracad(branchdet._id);
    }
  }, [branchdet]);

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="p-8 mx-auto bg-white rounded-lg shadow-lg max-w-4xl">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">Add Working Days</h2>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Academic Year
          </label>
          <input
            type="text"
            value={currentAcademicYear}
            disabled
            className="w-full p-3 text-gray-700 border rounded bg-gray-50"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {Object.keys(workingDays).map((month) => (
            <div key={month}>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                {month.charAt(0).toUpperCase() + month.slice(1)}
              </label>
              <input
                type="number"
                value={workingDays[month]}
                onChange={(e) => handleInputChange(month, e.target.value)}
                className="w-full p-3 text-black bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter working days (max 30)"
                min="0"
                max="30"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full px-6 py-3 mt-6 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
        >
          Submit Working Days
        </button>

        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateWorkingDays;
