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
  getStudentCountByAcademicYear: {
    url: (academicId) => `${backapi}/api/academic/allstudents/${academicId}`,
    method: "GET",
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
  getStudentsBySection: {
    url: (sectionId) => `${backapi}/api/students/get-student/${sectionId}`,
    method: "POST",
  },
  getstudentbyId: {
    url: (sid) => `${backapi}/api/students/get-student/${sid}`,
    method: "GET",
  },
  deletestudentbyId: {
    url: (sid) => `${backapi}/api/students/delete-student/${sid}`,
    method: "DELETE",
  },
  editstudentbyId: {
    url: (sid) => `${backapi}/api/students/edit-student/${sid}`,
    method: "PUT",
  },
  addExam: {
    url: `${backapi}/api/exams/add-exam`,
    method: "POST",
  },
  getAllExams: {
    url: (classId, sectionId, branchId) =>
      `${backapi}/api/exams/all-exams/${classId}/${sectionId}/${branchId}`,
    method: "GET",
  },
  deleteExam: {
    url: (examId) => `${backapi}/api/exams/delete-exam/${examId}`,
    method: "DELETE",
  },
  getEveryExam: {
    url: (branchId) => `${backapi}/api/exams/all-exams/${branchId}`,
    method: "GET",
  },
  addMarks: {
    url: (branchId) => `${backapi}/api/marks/${branchId}`,
    method: "POST",
  },
  updateMarks: {
    url: (id, bid) => `${backapi}/api/marks/${id}/${bid}`,
    method: "PUT"
  },
  getAllMarks: {
    url: (branchId) => `${backapi}/api/marks/${branchId}`,
    method: "GET",
  },
  getMarksByStudent: {
    url: (studentId, branchId) => `${backapi}/api/marks/${studentId}/${branchId}`,
    method: "GET",
  },
  getMarksReport: {
    url: (examId, classId, sectionId, branchId) =>
      `${backapi}/api/marks/report/${examId}/${classId}/${sectionId}/${branchId}`,
    method: "GET",
  },
  addSyllabus: {
    url: (bid) => `${backapi}/api/syllabus/${bid}/syllabus`,
    method: "POST"
  },
  getAllSyllabus: {
    url: (bid, acid) => `${backapi}/api/syllabus/${bid}/syllabus/${acid}`,
    method: "GET"
  },
  updateSyllabus: {
    url: (bid, sid) => `${backapi}/api/syllabus/${bid}/syllabus/${sid}`,
    method: "PUT"
  },
  deleteSyllabus: {
    url: (id) => `${backapi}/api/syllabus/${id}`,
    method: "DELETE"
  },
  getExamById: {
    url: (exid, bid) => `${backapi}/api/marks/exam/${exid}/${bid}`,
    method: "GET"
  },

  // Teacher endpoints
  addTeacher: {
    url: `${backapi}/api/teachers/add-teacher`,
    method: "POST"  // Make sure method is uppercase
  },
  getTeachers: {
    url: (academicId) => `${backapi}/api/teachers/all-teachers/${academicId}`,
    method: "GET"
  },
  getTeacherById: {
    url: (teacherId) => `${backapi}/api/teachers/get-teacher/${teacherId}`,
    method: "GET"
  },
  updateTeacher: {
    url: (teacherId) => `${backapi}/api/teachers/edit-teacher/${teacherId}`,
    method: 'PUT'
  },
  deleteTeacher: {
    url: (teacherId) => `${backapi}/api/teachers/delete-teacher/${teacherId}`,
    method: "DELETE"
  },

  addEnquiry: {
    url: `${backapi}/api/enquiry`,
    method: "POST"
  },
  getEnquiries: {
    url: (branchId) => `${backapi}/api/enquiry/branch/${branchId}`,
    method: "GET"
  },
  getEnquiry: {
    url: (id) => `${backapi}/api/enquiry/${id}`,
    method: "GET"
  },
  updateEnquiryStatus: {
    url: (id) => `${backapi}/api/enquiry/${id}/status`,
    method: "PATCH"
  }
  ,
  assignTeacher: {
    url: `${backapi}/api/teachersassingn/assign`,
    method: "POST"
  },
  getTeacherAssignments: {
    url: (academicYear) => `${backapi}/api/teachersassingn/assignments?academicYear=${academicYear}`,
    method: "GET"
  },
  updateTeacherAssignment: {
    url: (assignmentId) => `${backapi}/api/teachersassingn/assignment/${assignmentId}`,
    method: "PUT"
  },
  removeTeacherAssignment: {
    url: (assignmentId) => `${backapi}/api/teachersassingn/assignment/${assignmentId}`,
    method: "DELETE"
  },
  addWorkingDays: {
    url: `${backapi}/api/workingdays`,
    method: "POST"
  },
  getWorkingDays: {
    url: (bid, acid) => `${backapi}/api/workingdays/${bid}/${acid}`,
    method: "GET"
  },
  updateWorkingDays: {
    url: (bid, acid) => `${backapi}/api/workingdays/${bid}/${acid}`,
    method: "PUT"
  },
  getVehicleStudents: {
    url: (busId) => `${backapi}/api/buses/vehicle-students/${busId}`,
    method: "GET"
  },
  addAttendance: {
    url: `${backapi}/api/attendance/add`,
    method: "POST"
  },
  getAbsentees: {
    url: `${backapi}/api/attendance/get-absentees`,
    method: "GET"
  },
  getMonthlyAbsents: {
    url: `${backapi}/api/attendance/monthly-absents`,
    method: "GET"
  },
  updateAbsentees: {
    url: `${backapi}/api/attendance/update-absentees`,
    method: "PUT"
  },
  getMonthlyAbsents: {
    url: `${backapi}/api/attendance/monthly-absents`,
    method: "GET"

  },
  createHomeWork:{
    url: `${backapi}/api/homework/`,
    method:"POST"
  },
  getHomeworks:{
    url: `${backapi}/api/homework/`,
    method:"GET"
  },
  deleteHomework:{
      url: `${backapi}/api/homework/`,
      method:"delete"
  }


};





export default Allapi;

// url: `${backapi}/api/branch/create-branch`,