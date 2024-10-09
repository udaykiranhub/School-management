import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Addadmin from "../components/Addadmin";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
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
const Adminlayout = () => {
  const navigate = useNavigate();
  const [adminhandle, setadminhandle] = useState(false);
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [admdata, setadmdata] = useState();
  const admindata = JSON.parse(localStorage.getItem("userData"));
  console.log("stored user dta", admindata);
  const { name, username, role } = admindata;

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
      {token ? (
        <>
          <div className="w-full  bg-slate-700  flex  ">
            <div className="">
              <Sidebar />
            </div>
            <div>
              <main className="min-w-[83vw]">
                <Outlet />
              </main>
            </div>
          </div>

          {adminhandle && <Addadmin onclose={onclose} />}
        </>
      ) : (
        <>
          {alert("you need to login")}
          <Login />
        </>
      )}
    </>
  );
};

export default Adminlayout;
