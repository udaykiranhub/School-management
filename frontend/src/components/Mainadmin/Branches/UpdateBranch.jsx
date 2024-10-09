import React, { useState, useEffect } from "react";

const UpdateBranch = ({ branchId }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    fetchBranch();
  }, []);

  const fetchBranch = async () => {
    const response = await fetch(`/api/branches/${branchId}`);
    const data = await response.json();
    setName(data.name);
  };

  const handleUpdate = async () => {
    const response = await fetch(`/api/branches/${branchId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (response.ok) {
      // handle success message or state
    }
  };

  return (
    <div>
      <h2 className="text-2xl">Update Branch</h2>
      <input
        className="border p-2 w-full my-2"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="bg-green-500 text-white p-2" onClick={handleUpdate}>
        Update Branch
      </button>
    </div>
  );
};

export default UpdateBranch;
