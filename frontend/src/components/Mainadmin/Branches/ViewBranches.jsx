import React, { useState, useEffect } from "react";
import Allapi from "../../../common";
import { FiEdit, FiTrash, FiUserPlus } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateBranch from "./UpdateBranch";
import { Link } from "react-router-dom";

const ViewBranches = () => {
  const [branches, setBranches] = useState([]);
  const [edit, setEdit] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    fetchBranches();
  }, []);

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

  const handleDelete = async (branchId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this branch?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${Allapi.deletebranch.url}/${branchId}`, {
        method: Allapi.deletebranch.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (res.success) {
        toast.success("Branch deleted successfully");
        fetchBranches();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  const handleAssignAdmin = (branch) => {
    setSelectedBranch(branch);
    setShowAdminModal(true);
  };

  const submitAdmin = async () => {
    try {
      const response = await fetch(Allapi.assignAdmin.url, {
        method: Allapi.assignAdmin.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...adminDetails, branchId: selectedBranch._id }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Branch admin assigned successfully!");
        setShowAdminModal(false);
        fetchBranches();
      } else {
        toast.error("Failed to assign admin");
      }
    } catch (error) {
      console.error("Error assigning admin:", error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <ToastContainer autoClose={2000} />
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Branch Management
      </h2>
      <div className="flex justify-end mb-6 space-x-4">
        <Link to="/admin/branch/create" className="btn btn-primary">
          Create Branch
        </Link>
        <Link to="/admin/admins/view-all-admins" className="btn btn-secondary">
          View all Branch Admins
        </Link>
      </div>
      {branches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <div
              key={branch._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{branch.name}</h3>
                {!branch.branchAdmin ? (
                  <button
                    onClick={() => handleAssignAdmin(branch)}
                    className="btn btn-outline"
                  >
                    <FiUserPlus className="mr-1" />
                    Assign Admin
                  </button>
                ) : (
                  <span className="badge badge-success">Assigned</span>
                )}
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium">Street:</span> {branch.street}
                </p>
                <p>
                  <span className="font-medium">Colony:</span> {branch.colony}
                </p>
                <p>
                  <span className="font-medium">Village/Town:</span> {branch.villageTown}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {branch.phone}
                </p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setEdit(branch)}
                  className="btn btn-link text-blue-500 hover:text-blue-700"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(branch._id)}
                  className="btn btn-link text-red-500 hover:text-red-700"
                >
                  <FiTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No branches found.</p>
      )}

      {showAdminModal && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
            <h3 className="text-lg font-bold mb-4">Assign Admin</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={adminDetails.name}
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, name: e.target.value })
                }
                className="input"
              />
              <input
                type="text"
                placeholder="Username"
                value={adminDetails.username}
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, username: e.target.value })
                }
                className="input"
              />
              <input
                type="password"
                placeholder="Password"
                value={adminDetails.password}
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, password: e.target.value })
                }
                className="input"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowAdminModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button onClick={submitAdmin} className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {edit && <UpdateBranch data={edit} onClose={() => setEdit(null)} />}
    </div>
  );
};

export default ViewBranches;
