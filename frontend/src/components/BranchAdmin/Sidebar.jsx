import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { mycon } from "../../store/Mycontext";
import { useContext } from "react";

import {
  FaHome,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaSignOutAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const BranchAdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");
  const { branchdet, c_acad } = useContext(mycon);
  console.log("sidebar branchdet is", branchdet);
  console.log("c_acad is", c_acad);
  const c_acid = branchdet
    ? branchdet.academicYears
      ? branchdet.academicYears[0]
      : ""
    : "";

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? "" : menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryTime");
    localStorage.removeItem("userData");

    toast.error("Logged out Successfully");
    navigate("/login");
  };

  return (
    <aside className="hidden  sidebar min-w-[260px] h-[112vh] bg-blue-950 text-white flex-col gap-2 items-center justify-start md:flex">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <img
          src="/path-to-logo.png"
          alt="School Logo"
          className="h-10 w-10 rounded-full mr-2"
        />
        <span className="text-xl font-semibold">Branch Admin</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-4">
        {/* Dashboard Link */}
        <Link
          to="/branch-admin"
          className={`flex items-center p-2 rounded hover:bg-gray-700  ${location.pathname === "/branch-admin" ? "bg-gray-700" : ""
            }`}
        >
          <FaHome className="mr-3" />
          Dashboard
        </Link>

        {/* Academic Year Management */}
        <div>
          <button
            onClick={() => handleMenuClick("academic-year")}
            className={`flex items-center w-full p-2 rounded bg-gray-700 text-black hover:bg-gray-700 hover:text-slate-300 ${activeMenu === "academic-year" ? "bg-gray-700 text-white" : ""
              }`}
          >
            <FaCalendarAlt className="mr-3" />
            Academic Year
          </button>
          {activeMenu === "academic-year" && (
            <div className="flex flex-col pl-6 mt-2 space-y-2">
              <Link
                to="/branch-admin/academic-year/add"
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaPlus className="mr-2" />
                Add Academic Year
              </Link>
              <Link
                to="/branch-admin/academic-year/view"
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaEdit className="mr-2" />
                view All Academic Years
              </Link>
            </div>
          )}
        </div>

        {/* Class Management */}
        <div>
          <button
            onClick={() => handleMenuClick("classes")}
            className={`flex items-center w-full p-2 rounded bg-gray-700 text-black hover:bg-gray-700 hover:text-slate-300 ${activeMenu === "classes" ? "bg-gray-700 text-black" : "text-black"
              }`}
          >
            <FaChalkboardTeacher className="mr-3" />
            Class Management
          </button>
          {activeMenu === "classes" && (
            <div className="flex flex-col pl-6 mt-2 space-y-2">
              <Link
                to={`/branch-admin/academic-year/add-class/${branchdet.academicYears.length <= 0
                  ? ""
                  : branchdet.academicYears[0]
                  }`}
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaPlus className="mr-2" />
                Add Class
              </Link>
              <Link
                to={`/branch-admin/class/view-all/${branchdet.academicYears.length <= 0
                  ? ""
                  : branchdet.academicYears[0]
                  }`}
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaEdit className="mr-2" />
                View All Class
              </Link>
            </div>
          )}
        </div>

        {/* Section Management */}
        <div>
          <button
            onClick={() => handleMenuClick("sections")}
            className={`flex items-center w-full p-2 rounded bg-gray-700 text-black hover:bg-gray-700 hover:text-slate-300 ${activeMenu === "sections" ? "bg-gray-700 text-white" : ""
              }`}
          >
            <FaChalkboardTeacher className="mr-3" />
            Section Management
          </button>
          {activeMenu === "sections" && (
            <div className="flex flex-col pl-6 mt-2 space-y-2">
              <Link
                to="/branch-admin/academic-year/view-sections"
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaEdit className="mr-2" />
                View-sections
              </Link>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => handleMenuClick("Fee-controller")}
            className={`flex items-center w-full p-2 rounded bg-gray-700 text-black hover:bg-gray-700 hover:text-slate-300 ${activeMenu === "Fee-controller" ? "bg-gray-700 text-white" : ""
              }`}
          >
            <FaMoneyCheckAlt className="mr-3" />
            Fee controller
          </button>
          {activeMenu === "Fee-controller" && (
            <div className="flex flex-col pl-6 mt-2 space-y-2">
              <Link
                to={`/branch-admin/fee-type/${branchdet.academicYears.length <= 0
                  ? ""
                  : branchdet.academicYears[0]
                  }`}
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaPlus className="mr-2" />
                Set Fee Types
              </Link>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => handleMenuClick("transport")}
            className={`flex items-center w-full p-2 rounded bg-gray-700 text-black hover:bg-gray-700 hover:text-slate-300 ${activeMenu === "transport"
              ? "bg-gray-700 text-black"
              : "text-black"
              }`}
          >
            <FaChalkboardTeacher className="mr-3" />
            Transport
          </button>
          {activeMenu === "transport" && (
            <div className="flex flex-col pl-6 mt-2 space-y-2">
              <Link
                to="/branch-admin/transport/add-town"
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaPlus className="mr-2" />
                Add Towns
              </Link>
              <Link
                to="/branch-admin/transport/add-bus"
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaEdit className="mr-2" />
                Add Bus
              </Link>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => handleMenuClick("students")}
            className={`flex items-center w-full p-2 rounded bg-gray-700 text-black hover:bg-gray-700 hover:text-slate-300 ${activeMenu === "students"
              ? "bg-gray-700 text-black"
              : "text-black"
              }`}
          >
            <FaChalkboardTeacher className="mr-3" />
            Students
          </button>
          {activeMenu === "students" && (
            <div className="flex flex-col pl-6 mt-2 space-y-2">
              <Link
                to={`/branch-admin/add-student/${branchdet.academicYears.length <= 0
                  ? ""
                  : branchdet.academicYears[0]
                  }`}
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaPlus className="mr-2" />
                Add Students
              </Link>
              <Link
                to={`/branch-admin/students-report/${branchdet.academicYears.length <= 0
                  ? ""
                  : branchdet.academicYears[0]
                  }`}
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaEdit className="mr-2" />
                View All
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => handleMenuClick("exams")}
            className={`flex items-center w-full p-2 rounded bg-gray-700 text-black hover:bg-gray-700 hover:text-slate-300 ${activeMenu === "exams"
              ? "bg-gray-700 text-black"
              : "text-black"
              }`}
          >
            <FaChalkboardTeacher className="mr-3" />
            Exams
          </button>
          {activeMenu === "exams" && (
            <div className="flex flex-col pl-6 mt-2 space-y-2">
              <Link
                to={`/branch-admin/exam/create-timetable`}
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaPlus className="mr-2" />
                Create TimeTable
              </Link>
              <Link
                to={`/branch-admin/exam/view-timetable`}
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaEdit className="mr-2" />
                View TimeTable
              </Link>
            </div>
          )}
        </div>



        <div>
          <button
            onClick={() => handleMenuClick("marks")} // Change "exams" to "marks"
            className={`flex items-center w-full p-2 rounded bg-gray-700 text-black hover:bg-gray-700 hover:text-slate-300 ${activeMenu === "marks"
              ? "bg-gray-700 text-black"
              : "text-black"
              }`}
          >
            <FaChalkboardTeacher className="mr-3" />
            Marks
          </button>
          {activeMenu === "marks" && ( // Change "exams" to "marks"
            <div className="flex flex-col pl-6 mt-2 space-y-2">
              <Link
                to={`/branch-admin/marks/enter`} // Link to the "Enter Marks" page
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaPlus className="mr-2" />
                Enter Marks
              </Link>
              <Link
                to={`/branch-admin/marks/view`} // Link to the "View Marks" page
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaEdit className="mr-2" />
                View Marks
              </Link>
            </div>



          )}
        </div>
        {/* tecachers */}
        <div>
          <button
            onClick={() => handleMenuClick("teachers")}
            className={`flex items-center w-full p-2 rounded bg-gray-700 text-black hover:bg-gray-700 hover:text-slate-300 ${activeMenu === "teachers" ? "bg-gray-700 text-black" : "text-black"
              }`}
          >
            <FaChalkboardTeacher className="mr-3" />
            Teachers
          </button>
          {activeMenu === "teachers" && (
            <div className="flex flex-col pl-6 mt-2 space-y-2">
              <Link
                to={`/branch-admin/add-teacher`}
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaPlus className="mr-2" />
                Add Teacher
              </Link>
              <Link
                to={`/branch-admin/view-teachers`}
                className="flex items-center p-2 rounded hover:bg-gray-600"
              >
                <FaEdit className="mr-2" />
                View Teacher
              </Link>
            </div>
          )}
        </div>











      </nav>

      {/* Logout Button */}
      <button
        className="flex items-center p-2 my-4 mx-4 bg-red-500 text-white hover:bg-red-700 rounded shadow-lg"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="mr-3" />
        Logout
      </button>
    </aside>
  );
};

export default BranchAdminSidebar;
