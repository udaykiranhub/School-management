import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaUserPlus, FaSave } from "react-icons/fa";
import Allapi from "../../../common";
import { mycon } from "../../../store/Mycontext";
import './animation.css'; // Import the CSS file for animations

const ViewSections = () => {
  const { branchdet } = useContext(mycon);
  const [selectedClass, setSelectedClass] = useState("");
  const [sections, setSections] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [feeTypes, setFeeTypes] = useState([]);
  const [fees, setFees] = useState([{ feeType: "", amount: "" }]); // Array of fee objects

  const fetchClasses = async (curr_acad) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(Allapi.getClasses.url(curr_acad), {
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

  const fetchSections = async (className, curr_acad) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(Allapi.getSectionsByClass.url(className, curr_acad), {
        method: Allapi.getSectionsByClass.method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        setSections(result.data || []);
      } else {
        toast.error(result.message || "Failed to fetch sections");
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
      toast.error("Error fetching sections");
    }
  };

  const fetchFeeTypes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(Allapi.getAllFeeTypes.url, {
        method: Allapi.getAllFeeTypes.method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.success) {
        setFeeTypes(result.feeTypes);
      } else {
        toast.error(result.message || "Failed to fetch fee types");
      }
    } catch (error) {
      console.error("Error fetching fee types:", error);
      toast.error("Error fetching fee types");
    }
  };

  useEffect(() => {
    if (branchdet && branchdet.academicYears && branchdet.academicYears.length > 0) {
      const currentAcademicYear = branchdet.academicYears[0];
      fetchClasses(currentAcademicYear);
      fetchFeeTypes();
    }
  }, [branchdet]);

  useEffect(() => {
    if (selectedClass && branchdet && branchdet.academicYears.length > 0) {
      const currentAcademicYear = branchdet.academicYears[0];
      fetchSections(selectedClass, currentAcademicYear);
    }
  }, [selectedClass]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleAddFee = (section) => {
    setSelectedSection(section);
    setIsModalOpen(true);
    setFees([{ feeType: "", amount: "" }]); // Reset fees array
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFees([{ feeType: "", amount: "" }]); // Reset fees array
  };

  const handleFeeChange = (index, field, value) => {
    const updatedFees = [...fees];
    updatedFees[index][field] = value;
    setFees(updatedFees);
  };

  const handleAddFeeEntry = () => {
    setFees([...fees, { feeType: "", amount: "" }]); // Add new empty fee entry
  };

  const handleRemoveFeeEntry = (index) => {
    const updatedFees = fees.filter((_, i) => i !== index);
    setFees(updatedFees); // Remove fee entry by index
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Validate the fees array
    for (const fee of fees) {
      if (!fee.feeType || !fee.amount) {
        toast.error("Please fill in all fields for each fee entry");
        return;
      }
    }

    try {
      const response = await fetch(Allapi.addFeeStructure.url(selectedSection._id), {
        method: Allapi.addFeeStructure.method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fees }), // Send the entire fees array
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Fees added successfully");
        handleModalClose();
        fetchSections(selectedClass, branchdet.academicYears[0]);
      } else {
        toast.error(result.message || "Failed to add fee");
      }
    } catch (error) {
      console.error("Error adding fee:", error);
      toast.error("Error adding fee");
    }
  };

  return (
    <div className="mt-16 p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-2xl text-gray-700">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        View Sections
      </h2>
      <select
        value={selectedClass}
        onChange={handleClassChange}
        className="p-2 border rounded-md w-full mb-6"
      >
        <option value="">Select a class</option>
        {classes.map((cls) => (
          <option key={cls._id} value={cls.name}>
            {cls.name}
          </option>
        ))}
      </select>

      <ul className="divide-y divide-gray-300">
        {sections.length === 0 ? (
          <p className="text-gray-600 text-center">No sections available.</p>
        ) : (
          sections.map((section) => (
            <li key={section._id} className="flex items-center justify-between py-2">
              <span className="text-black">{section.name}</span>
              <div className="flex space-x-2">
                {section.fees && section.fees.length === 0 ? (
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-500 transition flex items-center"
                    onClick={() => handleAddFee(section)}
                  >
                    <FaSave />
                    <span className="ml-1">Add Fee</span>
                  </button>
                ) : (
                  <span className="text-gray-600"> View Fee</span>
                )}
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition flex items-center"
                  onClick={() => alert(`Add students to section: ${section.name}`)}
                >
                  <FaUserPlus />
                  <span className="ml-1">Add Students</span>
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Modal for adding fee */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg p-6 shadow-lg modal-animation`}>
            <h2 className="text-xl font-bold mb-4 text-gray-700">Add Fee for {selectedSection?.name}</h2>
            <form onSubmit={handleSubmit} className="text-gray-700">
              {fees.map((fee, index) => (
                <div key={index} className="flex mb-4">
                  <div className="w-1/2 mr-2">
                    <label className="block mb-1">Fee Type:</label>
                    <select
                      value={fee.feeType}
                      onChange={(e) => handleFeeChange(index, 'feeType', e.target.value)}
                      className="p-2 border rounded-md w-full"
                    >
                      <option value="">Select Fee Type</option>
                      {feeTypes.map((feeType) => (
                        <option key={feeType._id} value={feeType.name}>
                          {feeType.type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/2 ml-2">
                    <label className="block mb-1">Amount:</label>
                    <input
                      type="number"
                      value={fee.amount}
                      onChange={(e) => handleFeeChange(index, 'amount', e.target.value)}
                      className="p-2 border rounded-md w-full"
                      placeholder="Amount"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeeEntry(index)}
                    className="ml-2 mt-6 text-red-600 hover:text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddFeeEntry}
                className="mb-4 px-3 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
              >
                Add Another Fee
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
              >
                Save Fees
              </button>
              <button
                type="button"
                onClick={handleModalClose}
                className="px-4 py-2 ml-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewSections;
