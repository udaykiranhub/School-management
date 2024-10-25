import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mycon } from "../../../store/Mycontext";
import { useContext } from "react";
import Allapi from "../../../common";

const AddTown = () => {
  const { branchdet } = useContext(mycon);
  console.log("brder is", branchdet);
  const curr_Acad = branchdet
    ? branchdet.academicYears
      ? branchdet.academicYears[0]
      : ""
    : "";
  console.log("curr acac id is", curr_Acad);
  const token = localStorage.getItem("token");
  const [townName, setTownName] = useState("");
  const [amount, setAmount] = useState("");
  const [halt, setHalt] = useState("");
  const [halts, setHalts] = useState([]);
  const [towns, setTowns] = useState([]);
  const [editingTown, setEditingTown] = useState(null);

  // Fetch towns on component load
  useEffect(() => {
    const fetchTowns = async (curr_Acad) => {
      try {
        const response = await fetch(Allapi.getallTowns.url(curr_Acad), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const res = await response.json();
        console.log("response we get  is", res.data);
        if (res.success) {
          setTowns(res.data);
          console.log("towns are", towns);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (
      branchdet &&
      branchdet.academicYears &&
      branchdet.academicYears.length > 0
    ) {
      const currentAcademicYear = branchdet.academicYears[0];
      console.log("fetch towns calling");
      fetchTowns(currentAcademicYear);
    }
  }, [towns]);

  // Add halt (route) to the town
  const addHalt = () => {
    if (halt && !halts.includes(halt)) {
      setHalts([...halts, halt]);
      setHalt("");
    }
  };

  // Add or update a town
  const addOrUpdateTown = async (curr_Acad) => {
    if (!townName || !amount || halts.length === 0) {
      toast.error("Please fill out all fields.");
      return;
    }

    const newTown = { townName, amount, halts, academicId: curr_Acad };

    try {
      if (editingTown !== null) {
        // Update existing town
        const response = await fetch(`/api/towns/${editingTown._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTown),
        });
        if (response.ok) {
          setTowns(
            towns.map((town) => (town._id === editingTown._id ? newTown : town))
          );
          setEditingTown(null);
          toast.success("Town updated successfully");
        }
      } else {
        // Add new town
        const response = await fetch(Allapi.addTown.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass token in the request
          },
          body: JSON.stringify(newTown),
        });
        if (response.success) {
          toast.success(response.message);
          fetchTowns(curr_Acad);
        }
        // if (!response.ok) {
        //   const errorData = await response.json();
        //   throw new Error(errorData.message);
        // }
        // const data = await response.json();
        // setTowns([...towns, data]);
        // toast.success("Town added successfully");
      }

      // Clear form fields
      setTownName("");
      setAmount("");
      setHalts([]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete a specific halt
  const deleteHalt = (index) => {
    setHalts(halts.filter((_, haltIndex) => haltIndex !== index));
  };

  // Delete an entire town
  const deleteTown = async (id) => {
    try {
      await fetch(`/api/towns/${id}`, { method: "DELETE" });
      setTowns(towns.filter((town) => town._id !== id));
      toast.success("Town deleted successfully");
    } catch (error) {
      toast.error("Failed to delete town");
    }
  };

  // Edit town
  const editTown = (town) => {
    setTownName(town.townName);
    setAmount(town.amount);
    setHalts(town.halts);
    setEditingTown(town);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">
          {editingTown !== null ? "Edit Town" : "Add Town"}
        </h2>

        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Town Name"
            value={townName}
            onChange={(e) => setTownName(e.target.value)}
            className="border p-3 rounded w-full focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-3 rounded w-full focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Add Halt (Route)"
            value={halt}
            onChange={(e) => setHalt(e.target.value)}
            className="border p-3 rounded flex-grow focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addHalt}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow"
          >
            <FaPlus className="inline-block mr-2" /> Add Halt
          </button>
        </div>

        {halts.length > 0 && (
          <ul className="list-disc pl-6 mb-6">
            {halts.map((halt, index) => (
              <li
                key={index}
                className="mb-2 flex justify-between items-center"
              >
                {halt}
                <button
                  onClick={() => deleteHalt(index)}
                  className="ml-3 text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => addOrUpdateTown(curr_Acad)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded shadow mb-6 w-full"
        >
          {editingTown !== null ? "Update Town" : "Add Town"}
        </button>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">All Towns</h3>
        {towns.length > 0 ? (
          towns.map((town) => (
            <div
              key={town._id}
              className="border p-4 rounded-lg shadow mb-6 bg-gray-50"
            >
              <h4 className="text-lg font-semibold text-indigo-700">
                {town.townName}
              </h4>
              <p className="text-gray-600">Amount: {town.amount}</p>
              <p className="text-gray-600">Halts:</p>
              <ul className="list-disc pl-6 mb-4">
                {town.halts.map((halt, index) => (
                  <li key={index} className="text-gray-600">
                    {halt}
                  </li>
                ))}
              </ul>
              <div className="flex space-x-4">
                <button
                  onClick={() => editTown(town)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => deleteTown(town._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No towns added yet.</p>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddTown;
