import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import Sidebar from "../components/BranchAdmin/Sidebar";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        setc_user(decoded); // Set decoded user only once
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);
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
    <>
      {c_user ? (
        <>
          {c_user.role == "BranchAdmin" ? (
            <>
              <div className="w-full  bg-slate-700  flex ">
                <div className="">
                  <Sidebar />
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
  );
};

export default BranchAdminlayout;
