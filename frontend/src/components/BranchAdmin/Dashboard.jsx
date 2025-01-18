import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Allapi from "../../common";
import { FaBell, FaSearch } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/logo.png";

const BranchAdminDashboard = () => {
  const [branchdet, setBranchdet] = useState(null);
  const token = localStorage.getItem("token");
  const [c_user, setc_user] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setc_user(decoded);
        fetchBranchById(decoded?.branch);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const fetchBranchById = async (id) => {
    try {
      const response = await fetch(Allapi.getBranchById.url(id), {
        method: Allapi.getBranchById.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      if (res.success) {
        setBranchdet(res.data);
      } else {
        toast.error("Failed to fetch branch details");
      }
    } catch (error) {
      console.error("Error fetching branch by ID:", error);
      toast.error("Error occurred while fetching branch details");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-1" />
            <div className="flex items-center space-x-4">
              <img
                src={logo}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-blue-800 mb-2">
              Welcome, {c_user?.name} Sir!
            </h2>
            <p className="text-gray-600 mb-4">
              Here's an overview of your branch's activities and statistics.
            </p>

            {branchdet && (
              <div className="border-t pt-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Branch Details
                </h3>
                <div className="grid gap-2 text-gray-800">
                  <p><span className="font-medium">Branch Name:</span> {branchdet.name}</p>
                  <p><span className="font-medium">Phone:</span> {branchdet.phone}</p>
                  <p><span className="font-medium">Address:</span> {`${branchdet.street}, ${branchdet.colony}, ${branchdet.villageTown}`}</p>
                </div>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900">Total Students</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">320</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900">Total Teachers</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">20</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900">Total Classes</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">10</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900">Fees Collected</h3>
              <p className="text-3xl font-bold text-orange-600 mt-2">₹15,00,000</p>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Class Attendance</h3>
              <div className="aspect-[16/9] bg-gray-100 rounded-lg"></div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Student Grades Overview</h3>
              <div className="aspect-[16/9] bg-gray-100 rounded-lg"></div>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Announcements</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-blue-600 mr-3"></span>
                <span>Upcoming Parent-Teacher Meetings</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-blue-600 mr-3"></span>
                <span>Branch staff meeting scheduled for Friday</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-blue-600 mr-3"></span>
                <span>Student field trip scheduled next month</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-600">
            &copy; 2024 Vivekanadha School - {branchdet ? branchdet.name : "Loading..."} Branch. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BranchAdminDashboard;