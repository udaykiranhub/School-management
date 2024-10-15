// import { getBranchAdmin } from "../../../backend/controller/Usercontroller";

const backapi = "http://localhost:3490";

const Allapi = {
  login: {
    url: `${backapi}/api/signin`,
    method: "Post",
  },
  admin: {
    url: `${backapi}/api/addadmin`,
    method: "Post",
  },

  createBranch: {
    url: `${backapi}/api/branch/create-branch`,
    method: "Post",
  },
  getBranches: {
    url: `${backapi}/api/branch/get-branches`,
    method: "Get",
  },
  deletebranch: {
    url: `${backapi}/api/branch/delete-branch`,
    method: "DELETE",
  },
  updateBranch: {
    url: `${backapi}/api/branch/update-branch`,
    method: "PUT",
  },

  assignAdmin: {
    url: `${backapi}/api/branch/assign-admin`,
    method: "POST",
  },
  getAllBranchAdmins: {
    url: `${backapi}/api/branch/alladmins`,
    method: "GET",
  },

  deleteBranchAdmin: {
    url: (adminId) => `${backapi}/api/branch/del-admin/${adminId}`,
    method: "DELETE",
  },
  getBranchAdmin: {
    url: (adminId) => `${backapi}/api/branch/admin/${adminId}`,
    method: "GET",
  },
  editBranchAdmin: {
    url: (adminId) => `${backapi}/api/branch/edit-admin/${adminId}`,
    method: "PUT",
  },
  getBranchById: {
    url: (branchId) => `${backapi}/api/branch/get-branch/${branchId}`,
    method: "GET",
  },

  addAcademicYear: {
    url: (branchId) => `${backapi}/api/academic/add/${branchId}`,
    method: "POST",
  },
  getAcademicYears: {
    url: (branchId) => `${backapi}/api/academic/view/${branchId}`,
    method: "GET",
  },
  deleteAcademicYear: {
    url: (branchid,academicId) => `${backapi}/api/academic/delete/${branchid}/${academicId}`,
    method: "DELETE",
  },
  editAcademicYear: {
    url: (academicId) => `${backapi}/api/academic/edit/${academicId}`,
    method: "PUT",
  },
};
export default Allapi;
