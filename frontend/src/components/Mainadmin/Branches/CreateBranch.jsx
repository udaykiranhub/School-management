import React, { useState } from "react";

const CreateBranch = () => {
  const [name, setName] = useState("");

  const handleCreate = async () => {
    const response = await fetch("/api/branches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (response.ok) {
      setName("");
    }
  };

  return (
    <div className="bg-slate-200 w-[35vw] ml-12">
      <h2 className="text-2xl">Create Branch</h2>
      <input
        className="border p-2 w-full my-2"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Branch Name"
      />
      <button className="bg-blue-500 text-white p-2" onClick={handleCreate}>
        Create Branch
      </button>
    </div>
  );
};

export default CreateBranch;
