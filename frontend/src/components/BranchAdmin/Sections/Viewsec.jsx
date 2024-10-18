import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaUserPlus, FaSave } from "react-icons/fa";
import Allapi from "../../../common";
import { mycon } from "../../../store/Mycontext";

// const classOptions = [
//   "LKG",
//   "UKG",
//   "First",
//   "Second",
//   "Third",
//   "Fourth",
//   "Fifth",
//   "Sixth",
//   "Seventh",
//   "Eighth",
//   "Ninth",
//   "Tenth",
// ];

const ViewSections = () => {
  const {  branchdet } = useContext(mycon);
  // console.log("branchdet in viewsec is", branchdet);
  // const curr_acad = branchdet ? branchdet.academicYears[0] : "";
  // console.log(curr_acad)

  const [selectedClass, setSelectedClass] = useState("");
  const [sections, setSections] = useState([]);
  const [editSection, setEditSection] = useState(null);
  const [editSectionName, setEditSectionName] = useState("");
  const [classes, setClasses] = useState([]);

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
      console.log("hai");
      const result = await response.json();
      if (result.success) {
        console.log("c_ad is", curr_acad);
        console.log(result.data, "are the classes");
        setClasses(result.data);
      } else {
        toast.error(result.message || "Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      toast.error("Error fetching classes");
    }
  };

  // Fetch sections for the selected class
  const fetchSections = async (className) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(Allapi.getSectionsByClass.url(className), {
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

  useEffect(() => {
    // Check if branchdet and academicYears are available before fetching classes
    if (branchdet && branchdet.academicYears && branchdet.academicYears.length > 0) {
      const currentAcademicYear = branchdet.academicYears[0];
      fetchClasses(currentAcademicYear);  // Fetch classes based on current academic year
    } else {
      console.log("Branch details or academic years not available yet.");
    }
  }, [branchdet]);  // This will re-run only when branchdet changes
  
  // Fetch sections when selected class changes
  useEffect(() => {
    console.log("branchdet is iseeffect", branchdet);

    if (branchdet && branchdet.academicYears && branchdet.academicYears.length > 0) {
      const currentAcademicYear = branchdet.academicYears[0];
      fetchClasses(currentAcademicYear);  // Fetch classes based on current academic year
    } else {
      console.log("Branch details or academic years not available yet.");
    }
    if (selectedClass) {
      fetchSections(selectedClass);
    }
  }, [selectedClass]);

  // Handle class selection
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  // // Handle section name update
  // const handleUpdateSection = async (sectionId) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await fetch(Allapi.updateSection.url(sectionId), {
  //       method: Allapi.updateSection.method,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ name: editSectionName }),
  //     });
  //     const result = await response.json();

  //     if (result.success) {
  //       toast.success("Section updated successfully");
  //       setEditSection(null);
  //       setEditSectionName("");
  //       fetchSections(selectedClass); // Refresh sections list
  //     } else {
  //       toast.error(result.message || "Failed to update section");
  //     }
  //   } catch (error) {
  //     console.error("Error updating section:", error.message);
  //     toast.error(`Error updating section: ${error.message}`);
  //   }
  // };

  // // Handle section deletion
  // const handleDeleteSection = async (classId, sectionId) => {
  //   if (window.confirm("Are you sure you want to delete this section?")) {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await fetch(
  //         Allapi.deleteSection.url(classId, sectionId),
  //         {
  //           method: Allapi.deleteSection.method,
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       const result = await response.json();
  //       if (result.success) {
  //         toast.error("Section deleted successfully");
  //         fetchAllSections(classId);
  //       } else {
  //         toast.error(result.message || "Failed to delete section");
  //       }
  //     } catch (error) {
  //       toast.error("Error deleting section");
  //     }
  //   }
  // };

  return (
    <div className="mt-16 p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-2xl">
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
            <li
              key={section._id}
              className="flex items-center justify-between py-2"
            >
              {editSection === section._id ? (
                <input
                  type="text"
                  value={editSectionName}
                  onChange={(e) => setEditSectionName(e.target.value)}
                  className="p-2 border rounded-md"
                />
              ) : (
                <span className="text-black">{section.name}</span>
              )}
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-500 transition flex items-center"
                  onClick={() =>
                    alert(`Add students to section: ${section.name}`)
                  }
                >
                  <FaUserPlus />
                  <span className="ml-1">Add Students</span>
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ViewSections;
