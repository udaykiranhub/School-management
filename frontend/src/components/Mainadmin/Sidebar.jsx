import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaBars,
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubmenu, setActiveSubmenu] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryTime");
    localStorage.removeItem("userData");

    toast.error("Logged out Successfully");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setActiveSubmenu("");
  };

  const handleSubmenuDisplay = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu("");
    } else {
      setActiveMenu(menu);
    }
  };

  const handleSubmenuClick = (submenu) => {
    setActiveSubmenu(submenu);
  };

  return (
    <div style={{minHeight:"100vh"}}>
      {/* Hamburger Icon for Small Screens */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-blue-600 p-2 rounded shadow-lg"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full bg-gradient-to-b from-blue-800 to-blue-950 text-white shadow-xl transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex md:w-[260px] flex-col gap-2 items-center`}
      >
        <div className="flex items-center justify-center h-20 border-b border-blue-700 w-full">
          <img src={logo} alt="Vidya Nidhi" className="h-12 w-12 rounded-full mr-2" />
          <span className="text-xl font-bold">Vivekananda</span>
        </div>

        <nav className="flex-1 px-4 py-6">
          {/* Dashboard Link */}
          <Link
            to="/admin"
            className={`flex items-center w-full p-3 my-3 rounded-lg text-sm font-medium ${
              activeMenu === "dashboard"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-200 hover:bg-blue-700 hover:text-white"
            }`}
            onClick={() => handleMenuClick("dashboard")}
          >
            <FaHome className="mr-3" />
            Dashboard
          </Link>

          {/* Branch Management */}
          <div className="relative">
            <button
              className={`flex items-center w-full p-3 my-3 rounded-lg text-sm font-medium ${
                activeMenu === "branch"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-200 hover:bg-blue-700 hover:text-white"
              }`}
              onClick={() => handleSubmenuDisplay("branch")}
            >
              <FaUserGraduate className="mr-3" />
              Branch Management
            </button>
            {activeMenu === "branch" && (
              <div className="flex flex-col gap-3 pl-6">
                <Link
                  to="/admin/branch/create"
                  className={`text-sm font-medium py-2 px-3 rounded-lg ${
                    activeSubmenu === "create"
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => handleSubmenuClick("create")}
                >
                  Create Branch
                </Link>
                <Link
                  to="/admin/branch/view"
                  className={`text-sm font-medium py-2 px-3 rounded-lg ${
                    activeSubmenu === "view-all"
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => handleSubmenuClick("view-all")}
                >
                  View All Branches
                </Link>
              </div>
            )}
          </div>

          {/* Academic Year Management */}
          <div className="relative">
            <button
              className={`flex items-center w-full p-3 my-3 rounded-lg text-sm font-medium ${
                activeMenu === "academic"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-200 hover:bg-blue-700 hover:text-white"
              }`}
              onClick={() => handleSubmenuDisplay("academic")}
            >
              <FaChalkboardTeacher className="mr-3" />
              Branch Admin
            </button>
            {activeMenu === "academic" && (
              <div className="flex flex-col gap-3 pl-6">
                <Link
                  to="/admin/admins/view-all-admins"
                  className={`text-sm font-medium py-2 px-3 rounded-lg ${
                    activeSubmenu === "academic-view-all"
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => handleSubmenuClick("academic-view-all")}
                >
                  View All Branch Admins
                </Link>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            className="flex items-center p-3 my-3 bg-red-600 text-white hover:bg-red-700 rounded-lg shadow-md text-sm font-medium"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Overlay for closing sidebar on small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
