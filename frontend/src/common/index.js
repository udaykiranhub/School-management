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
};
export default Allapi;
