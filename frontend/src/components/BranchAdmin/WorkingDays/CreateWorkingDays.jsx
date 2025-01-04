// import React, { useContext, useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Allapi from "../../../common";
// import { mycon } from "../../../store/Mycontext";

// const CreateWorkingDays = () => {
//   const { branchdet } = useContext(mycon);
//   const [acid, setAcid] = useState("");
//   const [currentAcademicYear, setCurrentAcademicYear] = useState("");
//   const [workingDays, setWorkingDays] = useState({
//     june: "",
//     july: "",
//     august: "",
//     september: "",
//     october: "",
//     november: "",
//     december: "",
//     january: "",
//     february: "",
//     march: "",
//     april: "",
//   });

//   // Fetch current academic year
//   const curracad = async (bid) => {
//     try {
//       const response = await fetch(Allapi.getAcademicYears.url(bid), {
//         method: Allapi.getAcademicYears.method,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       if (!response.ok) throw new Error("Failed to fetch academic years");

//       const res = await response.json();
//       if (res.success && res.data.length > 0) {
//         const latestAcademicYear = res.data
//           .sort((a, b) => {
//             const [startA, endA] = a.year.split("-").map(Number);
//             const [startB, endB] = b.year.split("-").map(Number);
//             return startB - startA || endB - endA;
//           })[0];

//         setAcid(latestAcademicYear._id);
//         setCurrentAcademicYear(latestAcademicYear.year);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch academic year");
//     }
//   };

//   const handleInputChange = (month, value) => {
//     // Ensure the input value is a number, with no leading zeros, and max of 30
//     const sanitizedValue = value.replace(/^0+/, ""); // Remove leading zeros
//     const numericValue = parseInt(sanitizedValue, 10);

//     if (!isNaN(numericValue) && numericValue <= 30) {
//       setWorkingDays((prev) => ({
//         ...prev,
//         [month]: sanitizedValue,
//       }));
//     } else if (value === "") {
//       // Allow clearing the input field
//       setWorkingDays((prev) => ({
//         ...prev,
//         [month]: "",
//       }));
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         branchId: branchdet._id,
//         academicId: acid,
//         months: Object.fromEntries(
//           Object.entries(workingDays).map(([month, value]) => [month, parseInt(value, 10) || 0])
//         ),
//       };

//       const response = await fetch(Allapi.addWorkingDays.url, {
//         method: Allapi.addWorkingDays.method,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         toast.success("Working days added successfully");
//         setWorkingDays({
//           june: "",
//           july: "",
//           august: "",
//           september: "",
//           october: "",
//           november: "",
//           december: "",
//           january: "",
//           february: "",
//           march: "",
//           april: "",
//         });
//       } else {
//         toast.error(result.message || "Failed to add working days");
//       }
//     } catch (error) {
//       toast.error("An unexpected error occurred while adding working days");
//       console.error("Submit error:", error);
//     }
//   };

//   useEffect(() => {
//     if (branchdet?._id) {
//       curracad(branchdet._id);
//     }
//   }, [branchdet]);

//   return (
//     <div className="min-h-screen px-4 py-8 bg-gray-100">
//       <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
//         <h2 className="mb-6 text-3xl font-bold text-gray-800">Add Working Days</h2>

//         <div className="mb-6">
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Academic Year
//           </label>
//           <input
//             type="text"
//             value={currentAcademicYear}
//             disabled
//             className="w-full p-3 text-gray-700 border rounded bg-gray-50"
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-6">
//           {Object.keys(workingDays).map((month) => (
//             <div key={month}>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 {month.charAt(0).toUpperCase() + month.slice(1)}
//               </label>
//               <input
//                 type="number"
//                 value={workingDays[month]}
//                 onChange={(e) => handleInputChange(month, e.target.value)}
//                 className="w-full p-3 text-black bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter working days (max 30)"
//                 min="0"
//                 max="30"
//               />
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="w-full px-6 py-3 mt-6 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
//         >
//           Submit Working Days
//         </button>

//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default CreateWorkingDays;


import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Allapi from "../../../common";
import { mycon } from "../../../store/Mycontext";

const WorkingDays = () => {
  const { branchdet } = useContext(mycon);
  const [acid, setAcid] = useState("");
  const [currentAcademicYear, setCurrentAcademicYear] = useState("");
  const [workingDays, setWorkingDays] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
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

  const fetchWorkingDays = async (branchId, academicId) => {
    try {
      const response = await fetch(
        Allapi.getWorkingDays.url(branchId, academicId),
        {
          method: Allapi.getWorkingDays.method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = await response.json();
      if (result.success) {
        setWorkingDays(result.data);
        setFormData(result.data.months);
      }
    } catch (error) {
      console.error("Error fetching working days:", error);
      // Don't show error toast here as no data might be normal for new entries
    }
  };

  const handleInputChange = (month, value) => {
    // Remove leading zeros and ensure value is between 0 and 30
    const sanitizedValue = value.replace(/^0+/, "");
    const numValue = sanitizedValue === "" ? "" : Math.min(Math.max(Number(sanitizedValue), 0), 30);

    setFormData((prev) => ({
      ...prev,
      [month]: numValue.toString(),
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        branchId: branchdet._id,
        academicId: acid,
        months: Object.fromEntries(
          Object.entries(formData).map(([month, value]) => [
            month,
            parseInt(value, 10) || 0,
          ])
        ),
      };

      const isUpdate = workingDays !== null;
      const apiConfig = isUpdate ? Allapi.updateWorkingDays : Allapi.addWorkingDays;
      const url = isUpdate 
        ? apiConfig.url(branchdet._id, acid)
        : apiConfig.url;

      const response = await fetch(url, {
        method: apiConfig.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(isUpdate ? { months: payload.months } : payload),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Working days ${isUpdate ? 'updated' : 'added'} successfully`);
        setWorkingDays(result.data);
        setIsEditing(false);
      } else {
        toast.error(result.message || `Failed to ${isUpdate ? 'update' : 'add'} working days`);
      }
    } catch (error) {
      toast.error(`An unexpected error occurred while ${workingDays ? 'updating' : 'adding'} working days`);
      console.error("Submit error:", error);
    }
  };

  useEffect(() => {
    if (branchdet?._id) {
      curracad(branchdet._id);
    }
  }, [branchdet]);

  useEffect(() => {
    if (branchdet?._id && acid) {
      fetchWorkingDays(branchdet._id, acid);
    }
  }, [branchdet, acid]);

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="p-8 mx-auto bg-white rounded-lg shadow-lg max-w-7xl">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">
          {workingDays && !isEditing ? "View Working Days" : "Manage Working Days"}
        </h2>

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

        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-collapse border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="p-4 font-semibold text-left text-gray-700 border-r border-gray-300">
                  Month
                </th>
                <th className="p-4 font-semibold text-left text-gray-700 border-r border-gray-300">
                  Working Days
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(formData).map((month) => (
                <tr key={month}>
                  <td className="p-4 font-medium text-gray-700 border-r border-gray-300">
                    {month.charAt(0).toUpperCase() + month.slice(1)}
                  </td>
                  <td className="p-4 border-r border-gray-300">
                    {workingDays && !isEditing ? (
                      <span className="text-black">
                        {workingDays.months[month] || "Not set"}
                      </span>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={formData[month]}
                        onChange={(e) => handleInputChange(month, e.target.value)}
                        className="w-full p-3 text-black bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter days (0-30)"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {workingDays && !isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 mt-6 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
          >
            Edit Working Days
          </button>
        ) : (
          <div className="flex justify-end mt-6 space-x-4">
            {workingDays && (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData(workingDays.months);
                }}
                className="px-6 py-3 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSubmit}
              className="px-6 py-3 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
            >
              {workingDays ? "Save Changes" : "Submit Working Days"}
            </button>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default WorkingDays;