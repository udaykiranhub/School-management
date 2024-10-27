import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import Home from "./pages/Home.jsx";
import ViewAll from "./components/BranchAdmin/Classes/ViewAll.jsx";
import Aboutus from "./pages/Aboutus.jsx";
import Contactus from "./pages/Contactus.jsx";
import AdmissionEnquiry from "./pages/AdmissionEnquiry.jsx";
import Feesubmission from "./pages/Feesubmission.jsx";
import Login from "./pages/Login.jsx";
import Adminlayout from "./pages/Mainadminlayout.jsx";
import Dashboard from "./components/Mainadmin/Dahboard.jsx";
import CreateBranch from "./components/Mainadmin/Branches/CreateBranch.jsx";
import UpdateBranch from "./components/Mainadmin/Branches/UpdateBranch.jsx";
import DeleteBranch from "./components/Mainadmin/Branches/DeleteBranch.jsx";
import ViewBranches from "./components/Mainadmin/Branches/ViewBranches.jsx";
import ViewBadmin from "./components/Mainadmin/BranchAdmin/ViewBadmin.jsx";
import BranchAdminlayout from "./pages/BranchAdminLayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Bdashboard from "./components/BranchAdmin/Dashboard.jsx";
import Add from "./components/BranchAdmin/AcademicYears/Add.jsx";
import ViewAcademicYears from "./components/BranchAdmin/AcademicYears/view-all.jsx";
import AddClass from "./components/BranchAdmin/Classes/AddClass.jsx";
import AddAcademicYear from "./components/BranchAdmin/AcademicYears/Add.jsx";
import Addsection from "./components/BranchAdmin/Sections/Addsection.jsx";
import ViewSections from "./components/BranchAdmin/Sections/Viewsec.jsx";
import AddFeeType from "./components/BranchAdmin/FeeTypes/AddFeeTypes.jsx";
import AddTown from "./components/BranchAdmin/Transport/AddTown.jsx";
import AddBus from "./components/BranchAdmin/Transport/AddBus.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <Aboutus />,
      },
      {
        path: "/contact-us",
        element: <Contactus />,
      },
      {
        path: "/fee-submission",
        element: <Feesubmission />,
      },
      {
        path: "/admission-enquiry",
        element: <AdmissionEnquiry />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: <Adminlayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "branch",

            children: [
              {
                path: "create",
                element: <CreateBranch />,
              },

              {
                path: "view",
                element: <ViewBranches />,
              },
            ],
          },
          {
            path: "admins",
            children: [
              {
                path: "view-all-admins",
                element: <ViewBadmin />,
              },
            ],
          },
        ],
      },
      {
        path: "/branch-admin",
        element: <BranchAdminlayout />,
        children: [
          {
            path: "",
            element: <Bdashboard />,
          },
          {
            path: "class/view-all/:acid",
            element: <ViewAll />,
          },
          {
            path: "class/view-all",
            element: <Add />,
          },
          {
            path: "academic-year",

            children: [
              {
                path: "add",
                element: <Add />,
              },

              {
                path: "view",
                element: <ViewAcademicYears />,
              },
              {
                path: "add-class/",
                element: <AddAcademicYear />,
              },
              {
                path: "add-class/:acid",
                element: <AddClass />,
              },
              {
                path: "add-section/:classId",
                element: <Addsection />,
              },
              {
                path: "view-sections",
                element: <ViewSections />,
              },
            ],
          },
          {
            path: "fee-type/:acid",
            element: <AddFeeType />,
          },
          {
            path: "transport",
            children: [
              {
                path: "add-town",
                element: <AddTown />,
              },
              {
                path: "add-bus",
                element: <AddBus />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />

    <RouterProvider router={Router} />
  </React.StrictMode>
);
