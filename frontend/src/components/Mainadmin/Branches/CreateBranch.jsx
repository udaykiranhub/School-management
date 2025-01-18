import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import Allapi from "../../../common/index";
import { Link } from "react-router-dom";

const CreateBranch = () => {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [colony, setColony] = useState("");
  const [villageTown, setVillageTown] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!name || !street || !colony || !villageTown || !phone) {
      toast.error("Please fill out all fields.");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return false;
    }

    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const response = await fetch(Allapi.createBranch.url, {
        method: Allapi.createBranch.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, street, colony, villageTown, phone }),
      });

      if (response.ok) {
        setName("");
        setStreet("");
        setColony("");
        setVillageTown("");
        setPhone("");
        toast.success("Branch created successfully!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create branch.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <ToastContainer />
      <div
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl"
        style={{ boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)" }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6">
          Create Branch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Branch Name"
            style={{ backgroundColor: "#f5f7fa" }}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Street"
            style={{ backgroundColor: "#f5f7fa" }}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            type="text"
            value={colony}
            onChange={(e) => setColony(e.target.value)}
            placeholder="Colony"
            style={{ backgroundColor: "#f5f7fa" }}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            type="text"
            value={villageTown}
            onChange={(e) => setVillageTown(e.target.value)}
            placeholder="Village/Town"
            style={{ backgroundColor: "#f5f7fa" }}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            style={{ backgroundColor: "#f5f7fa" }}
          />
          <Link
            to="/admin/branch/view"
            className="text-center bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            View All Branches
          </Link>
        </div>

        <button
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            "Create Branch"
          )}
        </button>
      </div>
    </Container>
  );
};

export default CreateBranch;
