import React, { useState, useEffect } from "react";
import Allapi from "../../../common";
import { FiEdit, FiTrash, FiUserPlus } from "react-icons/fi"; // React Icons for Edit, Delete, and Assign Admin

const ViewBranches = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchBranches();
  }, []);

  // Fetch branches from the API
  const fetchBranches = async () => {
    try {
      const response = await fetch(Allapi.getBranches.url, {
        method: Allapi.getBranches.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBranches(data.branches);
      } else {
        console.error("Failed to fetch branches");
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  // Handle Delete operation
  const handleDelete = async (branchId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this branch?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${Allapi.createBranch.url}/${branchId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        fetchBranches();
        alert("Branch deleted successfully");
      } else {
        console.error("Failed to delete branch");
      }
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  // Handle Assign Admin operation
  const handleAssignAdmin = (branchId) => {
    console.log(`Assigning admin to branch ${branchId}`);
    // Modal or Redirect for assigning admin
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Branch Management</h2>
      
      {branches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch) => (
            <div key={branch._id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{branch.name}</h3>
                {!branch.branchAdmin && (
                  <span className="text-yellow-500 text-sm font-medium">Needs Admin</span>
                )}
              </div>

              {/* Branch Details */}
              <div className="text-sm">
                <p className="text-gray-700 font-medium mb-2">
                  <span className="text-gray-900 font-semibold">Address: </span>
                  {branch.street}, {branch.colony}, {branch.villageTown}
                </p>
                <p className="text-gray-700 font-medium mb-2">
                  <span className="text-gray-900 font-semibold">Phone: </span>
                  {branch.phone}
                </p>

                {branch.branchAdmin ? (
                  <p className="text-green-600 font-medium">
                    <span className="text-gray-900 font-semibold">Admin: </span>
                    {branch.branchAdmin.name} ({branch.branchAdmin.email})
                  </p>
                ) : (
                  <button
                    onClick={() => handleAssignAdmin(branch._id)}
                    className="text-blue-500 hover:text-blue-700 mt-2 flex items-center"
                  >
                    <FiUserPlus className="mr-2" />
                    Assign Admin
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => console.log(`Edit ${branch.name}`)}
                  className="flex items-center text-blue-500 hover:text-blue-700"
                >
                  <FiEdit className="mr-2" />
                  
                </button>

                <button
                  onClick={() => handleDelete(branch._id)}
                  className="flex items-center text-red-500 hover:text-red-700"
                >
                  <FiTrash className="mr-2" />
                  
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No branches found.</p>
      )}
    </div>
  );
};

export default ViewBranches;
