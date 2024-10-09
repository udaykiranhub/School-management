import React, { useState, useEffect } from "react";
import DeleteBranch from "./DeleteBranch";

const ViewBranches = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    const response = await fetch("/api/branches");
    const data = await response.json();
    setBranches(data);
  };

  return (
    <div>
      <h2 className="text-2xl">All Branches</h2>
      <ul className="list-disc">
        {branches.map((branch) => (
          <li key={branch.id} className="my-2">
            {branch.name}
            <DeleteBranch
              branchId={branch.id}
              onDeleteSuccess={fetchBranches}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewBranches;
