import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import Sidebar from "../components/BranchAdmin/Sidebar";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { mycon } from "../store/Mycontext";
import Allapi from "../common";

import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaCalendarAlt,
  FaMoneyBill,
  FaSchool,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaSearch,
} from "react-icons/fa";
import Header from "../components/Header";
import Login from "./Login";
const BranchAdminlayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [c_user, setc_user] = useState(null);
  const [c_branch, setc_branch] = useState(null);
  const [branchdet, setBranchdet] = useState(null);
  const [c_acad, setc_acad] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        setc_user(decoded);
        setc_branch(decoded.branch);
        if (decoded.branch) {
          fetchBranchById(decoded.branch);
        }
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
      console.log("response is", res);
      if (res.success) {
        setBranchdet(res.data);
        console.log("branchdet in admin  is", branchdet);
        // console.log("Branch data fetched successfully:", res.data);
      } else {
        toast.error("Failed to fetch branch details");
      }
    } catch (error) {
      console.error("Error fetching branch by ID:", error);
      toast.error("Error occurred while fetching branch details");
    }
  };
  function onclose() {
    setadminhandle((prev) => !prev);
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryTime");
    toast.error("Logged out Succesfully");
    navigate("/login");
  };

  return (
    <mycon.Provider
      value={{ c_branch, branchdet, c_acad, setc_acad, setBranchdet }}
    >
      <>
        {c_user ? (
          <>
            {c_user.role == "BranchAdmin" ? (
              <>
                <div className="w-full  bg-slate-700  flex ">
                  <div className="">
                    <Sidebar ishidden={false} />
                  </div>
                  <div>
                    <main className="min-w-[83vw]  ">
                      <Outlet />
                    </main>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>You Are Not Authorized</div>
              </>
            )}
          </>
        ) : (
          <>
            <Login />
          </>
        )}
      </>
    </mycon.Provider>
  );
};

export default BranchAdminlayout;
