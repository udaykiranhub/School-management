import React, { useEffect, useState } from "react";
import Allapi from "../../../common";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import EditAdminModal from "./UpdateBadmin"; // Import the Modal

const ViewBadmin = () => {
  const [admins, setAdmins] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await fetch(Allapi.getAllBranchAdmins.url, {
        method: Allapi.getAllBranchAdmins.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setAdmins(data.admins);
    } catch (error) {
      console.error("Error fetching branch admins:", error);
    }
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setModalOpen(true);
  };

  const handleDelete = async (adminId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(Allapi.deleteBranchAdmin.url(adminId), {
        method: Allapi.deleteBranchAdmin.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Branch admin deleted successfully");
        fetchAdmins(); // Refresh the list after deletion
      } else {
        toast.error("Failed to delete branch admin");
      }
    } catch (error) {
      console.error("Error deleting branch admin:", error);
      toast.error("Error occurred while deleting admin");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedAdmin(null);
  };

  const handleEditSubmit = async (updatedAdmin) => {
    try {
      const response = await fetch(Allapi.editBranchAdmin.url(updatedAdmin._id), {
        method: Allapi.editBranchAdmin.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAdmin),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Branch admin updated successfully");
        fetchAdmins(); // Refresh the list after update
        handleModalClose();
      } else {
        toast.error("Failed to update branch admin");
      }
    } catch (error) {
      console.error("Error updating branch admin:", error);
      toast.error("Error occurred while updating admin");
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 bg-gray-50 rounded-lg shadow-lg" 
    style={{minHeight:"100vh"}}
    >
      <ToastContainer autoClose={2000} />
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        All Branch Admins
      </h2>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <Link
          to="/admin/branch/create"
          className="mb-4 sm:mb-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm md:text-base"
        >
          Create Branch
        </Link>
        <Link
          to="/admin/branch/view"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm md:text-base"
        >
          View All Branches
        </Link>
      </div>

      {admins.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {admins.map((admin) => (
            <div
              key={admin._id}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              <p className="text-lg font-semibold text-gray-800">{admin.name}</p>
              <p className="text-sm text-gray-600">Username: {admin.username}</p>
              <p className="text-sm text-gray-600">
                Branch: {admin.branch ? admin.branch.name : "Unassigned"}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(admin)}
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                >
                  <FiEdit className="mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(admin._id)}
                  className="text-red-600 hover:text-red-800 flex items-center text-sm"
                >
                  <FiTrash className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">
          No branch admins found.
        </p>
      )}

      {isModalOpen && (
        <EditAdminModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          admin={selectedAdmin}
          onEdit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default ViewBadmin;
