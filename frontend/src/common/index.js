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
    url: (branchid, academicId) =>
      `${backapi}/api/academic/delete/${branchid}/${academicId}`,
    method: "DELETE",
  },
  editAcademicYear: {
    url: (academicId) => `${backapi}/api/academic/edit/${academicId}`,
    method: "PUT",
  },
  addClass: {
    url: `${backapi}/api/classes/create-class`,
    method: "POST",
  },
  getClasses: {
    url: (curr_acad) => `${backapi}/api/classes/get-classes/${curr_acad}`,
    method: "GET",
  },
  deleteClass: {
    url: (classId) => `${backapi}/api/classes/delete-class/${classId}`,
    method: "DELETE",
  },
  getClassDetails: {
    url: (classId) => `${backapi}/api/classes/get-class/${classId}`,
    method: "GET",
  },
  addSection: {
    url: (classId) => `${backapi}/api/sections/addsection/${classId}`,
    method: "POST",
  },
  getSections: {
    url: (classId) => `${backapi}/api/sections/getallsections/${classId}`,
    method: "GET",
  },
  updateSection: {
    url: (secId) => `${backapi}/api/sections/update/${secId}`,
    method: "PUT",
  },
  deleteSection: {
    url: (classId, sectionId) =>
      `${backapi}/api/sections/delete/${classId}/${sectionId}`,
    method: "DELETE",
  },
  getSectionsByClass: {
    url: (className, curr_acad) =>
      `${backapi}/api/sections/getall/${className}/${curr_acad}`,
    method: "GET",
  },
  updateClass: {
    url: (classId) => `${backapi}/api/classes/update/${classId}`,
    method: "PUT",
  },
  AddFeeType: {
    url: `${backapi}/api/Fee-types/add/`,
    method: "POST",
  },
  getAllFeeTypes: {
    url: (acid) => `${backapi}/api/Fee-types/allfeetype/${acid}`,
    method: "GET",
  },
  updateFeeType: {
    url: (feeTypeId) => `${backapi}/api/Fee-types/update/${feeTypeId}`,
    method: "PUT",
  },
  deleteFeeType: {
    url: (feeTypeId) => `${backapi}/api/Fee-types/delete/${feeTypeId}`,
    method: "DELETE",
  },
  addFeeStructure: {
    url: (sectionId) => `${backapi}/api/Fee-types/fees-section/${sectionId}`,
    method: "POST",
  },
  deleteFeeStructure: {
    url: (sectionId, feeId) =>
      `${backapi}/api/Fee-types/fees-section/${sectionId}/del/${feeId}`,
    method: "DELETE",
  },
  addTown: {
    url: `${backapi}/api/towns/add`,
    method: "POST",
  },
  getallTowns: {
    url: (academicId) => `${backapi}/api/towns/alltowns/${academicId}`,
    method: "GET",
  },
  editTown: {
    url: (townId) => `${backapi}/api/towns/edit/${townId}`,
    method: "PUT",
  },
  deleteTown: {
    url: (townId) => `${backapi}/api/towns/del/${townId}`,
    method: "DELETE",
  },
  addBus: {
    url: `${backapi}/api/buses/add-bus`,
    method: "POST",
  },
  getAllBuses: {
    url: (academicId) => `${backapi}/api/buses/all-buses/${academicId}`,
    method: "GET",
  },
  getByPlaceBus: {
    url: (academicId) => `${backapi}/api/buses/getBusByPlace/${academicId}`,
    method: "POST",
  },
  updateBus: {
    url: (BusId) => `${backapi}/api/buses/upd-bus/${BusId}`,
    method: "PUT",
  },
  deleteBus: {
    url: (BusId) => `${backapi}/api/buses/del-bus/${BusId}`,
    method: "DELETE",
  },
  addStudent: {
    url: `${backapi}/api/students/add-student`,
    method: "POST",
  },
};

export default Allapi;
