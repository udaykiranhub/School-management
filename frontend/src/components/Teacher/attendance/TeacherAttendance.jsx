


// // import React, { useState, useEffect } from 'react';
// // import { jwtDecode } from "jwt-decode";
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import Allapi from '../../../common';

// // const TeacherAttendance = () => {
// //   const token = localStorage.getItem("token");
// //   const decoded = token ? jwtDecode(token) : null;

// //   // States for teacher data
// //   const [teacherSubjects, setTeacherSubjects] = useState([]);
// //   const [teacherAssignment, setTeacherAssignment] = useState(null);

// //   // States for form selections
// //   const [viewType, setViewType] = useState('daily');
// //   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
// //   const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
// //   const [formData, setFormData] = useState({
// //     subject: '',
// //     className: '',
// //     sectionName: ''
// //   });

// //   // States for data
// //   const [students, setStudents] = useState([]);
// //   const [absentees, setAbsentees] = useState([]);
// //   const [monthlyAbsents, setMonthlyAbsents] = useState({});
// //   const [hasAttendanceData, setHasAttendanceData] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [selectedAbsentees, setSelectedAbsentees] = useState([]);

// //   // Load teacher data on component mount
// //   useEffect(() => {
// //     if (token && decoded?.teacherData) {
// //       try {
// //         if (decoded.teacherData?.teachingSubjects) {
// //           setTeacherSubjects(decoded.teacherData.teachingSubjects);
// //         }
// //         fetchTeacherAssignments(decoded.teacherData._id);
// //       } catch (error) {
// //         console.error("Error loading teacher data:", error);
// //         toast.error("Error loading teacher data");
// //       }
// //     }
// //   }, [token]);

// //   // Fetch teacher assignments
// //   const fetchTeacherAssignments = async (teacherId) => {
// //     try {
// //       if (!decoded?.teacherData?.academic_id) {
// //         toast.error("Academic ID not found");
// //         return;
// //       }

// //       const response = await fetch(Allapi.getTeacherAssignments.url(decoded.teacherData.academic_id), {
// //         method: Allapi.getTeacherAssignments.method,
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to fetch teacher assignments');
// //       }

// //       const result = await response.json();
// //       if (result.success) {
// //         const currentTeacherAssignment = result.data.find(
// //           (assignment) => assignment.teacherId === teacherId
// //         );
// //         setTeacherAssignment(currentTeacherAssignment);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching teacher assignments:", error);
// //       toast.error("Error loading assignments");
// //     }
// //   };

// //   // Get available class sections based on teacher assignment
// //   const getAvailableClassSections = () => {
// //     if (!teacherAssignment || !formData.subject) return [];

// //     const classSections = [];
// //     teacherAssignment.classAssignments.forEach(classAssignment => {
// //       classAssignment.sections.forEach(section => {
// //         if (section.subject.toLowerCase() === formData.subject.toLowerCase()) {
// //           classSections.push({
// //             className: classAssignment.className,
// //             sectionName: section.sectionName,
// //             sectionId: section.sectionId
// //           });
// //         }
// //       });
// //     });
// //     return classSections;
// //   };

// //   // Fetch students when section is selected
// //   useEffect(() => {
// //     if (!formData.className || !formData.sectionName) {
// //       setStudents([]);
// //       return;
// //     }

// //     const fetchStudents = async () => {
// //       try {
// //         setLoading(true);
// //         const classObj = teacherAssignment.classAssignments.find(c => c.className === formData.className);
// //         console.log("formadata classname", formData.className);
// //         console.log("clssobj", classObj.id);

// //         if (!classObj) {
// //           throw new Error('Class not found');
// //         }
// //         console.log("section name", formData.sectionName)
// //         const sectionObj = classObj.sections.find(s => s.sectionName === formData.sectionName);
// //         console.log("section objr", sectionObj._id);

// //         if (!sectionObj || !sectionObj._id) {
// //           throw new Error('Section not found or invalid section ID');
// //         }

// //         const response = await fetch(Allapi.getStudentsBySection.url(sectionObj._id), {
// //           method: Allapi.getStudentsBySection.method,
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           }
// //         });

// //         if (!response.ok) {
// //           throw new Error('Failed to fetch students');
// //         }

// //         const data = await response.json();
// //         if (data.success) {
// //           setStudents(data.data || []);
// //           if (viewType === 'daily') {
// //             fetchDailyAttendance(sectionObj.sectionId);
// //           } else {
// //             fetchMonthlyAttendance(sectionObj.sectionId);
// //           }
// //         }
// //       } catch (error) {
// //         console.error("Error fetching students:", error);
// //         toast.error(error.message || "Error loading students");
// //         setStudents([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     if (teacherAssignment) {
// //       fetchStudents();
// //     }
// //   }, [formData.className, formData.sectionName, viewType, selectedDate, selectedMonth]);

// //   // Fetch daily attendance
// //   const fetchDailyAttendance = async (sectionId) => {
// //     if (!decoded?.teacherData?.branchId || !decoded?.teacherData?.academic_id || !formData.className) {
// //       return;
// //     }

// //     try {
// //       const response = await fetch(
// //         `${Allapi.getAbsentees.url}?branchId=${decoded.teacherData.branchId}&academicId=${decoded.teacherData.academic_id}&classId=${formData.className}&sectionId=${sectionId}&date=${selectedDate}`,
// //         {
// //           method: Allapi.getAbsentees.method,
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error('Failed to fetch daily attendance');
// //       }

// //       const data = await response.json();
// //       console.log("data:", data);
// //       if (data.success) {
// //         setHasAttendanceData(data.data && data.data.length > 0);
// //         setAbsentees(data.data[0]?.absentees || []);
// //         setSelectedAbsentees(data.data[0]?.absentees.map(student => student._id) || []);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching daily attendance:", error);
// //       toast.error("Error loading attendance");
// //     }
// //   };

// //   // Fetch monthly attendance
// //   const fetchMonthlyAttendance = async (sectionId) => {
// //     if (!decoded?.teacherData?.branchId || !decoded?.teacherData?.academic_id || !formData.className) {
// //       return;
// //     }

// //     try {
// //       const monthNumber = new Date(selectedMonth + '-01').getMonth() + 1;
// //       const response = await fetch(
// //         `${Allapi.getMonthlyAbsents.url}/${decoded.teacherData.branchId}/${decoded.teacherData.academic_id}/${formData.className}/${sectionId}/${monthNumber}`,
// //         {
// //           method: Allapi.getMonthlyAbsents.method,
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error('Failed to fetch monthly attendance');
// //       }

// //       const data = await response.json();
// //       if (data.success) {
// //         setHasAttendanceData(data.data && data.data.length > 0);
// //         const absentsMap = {};
// //         data.data.forEach(item => {
// //           absentsMap[item.studentId] = item.absentCount;
// //         });
// //         setMonthlyAbsents(absentsMap);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching monthly attendance:", error);
// //       toast.error("Error loading monthly attendance");
// //     }
// //   };

// //   // Handle attendance update
// //   const handleUpdateAttendance = async () => {
// //     if (!formData.className || !formData.sectionName) {
// //       toast.error("Please select class and section");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       const classObj = teacherAssignment.classAssignments.find(c => c.className === formData.className);
// //       const sectionObj = classObj.sections.find(s => s.sectionName === formData.sectionName);

// //       if (!sectionObj || !sectionObj.sectionId) {
// //         throw new Error('Invalid section data');
// //       }

// //       const response = await fetch(Allapi.updateAbsentees.url, {
// //         method: Allapi.updateAbsentees.method,
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({
// //           branchId: decoded.teacherData.branchId,
// //           academicId: decoded.teacherData.academic_id,
// //           classId: classObj.classId,
// //           sectionId: sectionObj.sectionId,
// //           date: selectedDate,
// //           absentees: selectedAbsentees
// //         })
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to update attendance');
// //       }

// //       const data = await response.json();
// //       if (data.success) {
// //         toast.success("Attendance updated successfully");
// //         setIsEditing(false);
// //         fetchDailyAttendance(sectionObj.sectionId);
// //       } else {
// //         toast.error(data.message || "Failed to update attendance");
// //       }
// //     } catch (error) {
// //       console.error("Error updating attendance:", error);
// //       toast.error(error.message || "Error updating attendance");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Handle checkbox change for attendance
// //   const handleCheckboxChange = (studentId) => {
// //     setSelectedAbsentees(prev => {
// //       if (prev.includes(studentId)) {
// //         return prev.filter(id => id !== studentId);
// //       } else {
// //         return [...prev, studentId];
// //       }
// //     });
// //   };

// //   return (
// //     <div className="min-h-screen p-6 bg-gray-100">
// //       <ToastContainer />
// //       <h1 className="mb-6 text-2xl font-bold text-gray-800">Teacher Attendance</h1>

// //       {/* View Type Selection */}
// //       <div className="mb-6">
// //         <div className="flex space-x-4">
// //           <button
// //             onClick={() => setViewType('daily')}
// //             className={`px-4 py-2 rounded ${viewType === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
// //           >
// //             Daily View
// //           </button>
// //           <button
// //             onClick={() => setViewType('monthly')}
// //             className={`px-4 py-2 rounded ${viewType === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
// //           >
// //             Monthly View
// //           </button>
// //         </div>
// //       </div>

// //       {/* Selection Form */}
// //       <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
// //         {/* Date/Month Selection */}
// //         <div>
// //           <label className="block mb-2 text-sm font-medium text-gray-700">
// //             {viewType === 'daily' ? 'Select Date' : 'Select Month'}
// //           </label>
// //           <input
// //             type={viewType === 'daily' ? 'date' : 'month'}
// //             value={viewType === 'daily' ? selectedDate : selectedMonth}
// //             onChange={(e) => viewType === 'daily'
// //               ? setSelectedDate(e.target.value)
// //               : setSelectedMonth(e.target.value)
// //             }
// //             className="w-full p-2 border border-gray-300 rounded"
// //           />
// //         </div>

// //         {/* Subject Selection */}
// //         <div>
// //           <label className="block mb-2 text-sm font-medium text-gray-700">
// //             Subject
// //           </label>
// //           <select
// //             value={formData.subject}
// //             onChange={(e) => setFormData({
// //               ...formData,
// //               subject: e.target.value,
// //               className: '',
// //               sectionName: ''
// //             })}
// //             className="w-full p-2 border border-gray-300 rounded"
// //           >
// //             <option value="">Select Subject</option>
// //             {teacherSubjects.map((subject) => (
// //               <option key={subject._id} value={subject.name}>
// //                 {subject.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Class & Section Selection */}
// //         {formData.subject && (
// //           <div>
// //             <label className="block mb-2 text-sm font-medium text-gray-700">
// //               Class & Section
// //             </label>
// //             <select
// //               value={`${formData.className}-${formData.sectionName}`}
// //               onChange={(e) => {
// //                 const [className, sectionName] = e.target.value.split('-');
// //                 setFormData({ ...formData, className, sectionName });
// //               }}
// //               className="w-full p-2 border border-gray-300 rounded"
// //             >
// //               <option value="">Select Class & Section</option>
// //               {getAvailableClassSections().map((cs, index) => (
// //                 <option
// //                   key={index}
// //                   value={`${cs.className}-${cs.sectionName}`}
// //                 >
// //                   {cs.className} - {cs.sectionName}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //         )}
// //       </div>

// //       {/* Attendance Table */}
// //       {loading ? (
// //         <div className="text-center">Loading...</div>
// //       ) : students.length > 0 ? (
// //         hasAttendanceData ? (
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full bg-white rounded shadow-md">
// //               <thead className="bg-gray-50">
// //                 <tr>
// //                   <th className="px-4 py-2 text-left">S.No</th>
// //                   <th className="px-4 py-2 text-left">ID No</th>
// //                   <th className="px-4 py-2 text-left">Name</th>
// //                   {viewType === 'daily' ? (
// //                     <th className="px-4 py-2 text-center">Absent</th>
// //                   ) : (
// //                     <th className="px-4 py-2 text-center">Absent Days</th>
// //                   )}
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {students.map((student, index) => (
// //                   <tr key={student._id} className="border-b hover:bg-gray-50">
// //                     <td className="px-4 py-2">{index + 1}</td>
// //                     <td className="px-4 py-2">{student.idNo}</td>
// //                     <td className="px-4 py-2">{student.name}</td>
// //                     {viewType === 'daily' ? (
// //                       <td className="px-4 py-2 text-center">
// //                         {isEditing ? (
// //                           <input
// //                             type="checkbox"
// //                             checked={selectedAbsentees.includes(student._id)}
// //                             onChange={() => handleCheckboxChange(student._id)}
// //                             className="w-4 h-4"
// //                           />
// //                         ) : (
// //                           absentees.some(a => a._id === student._id) ? 'Yes' : 'No'
// //                         )}
// //                       </td>
// //                     ) : (
// //                       <td className="px-4 py-2 text-center">
// //                         {monthlyAbsents[student._id] || 0}
// //                       </td>
// //                     )}
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>

// //             {viewType === 'daily' && (
// //               <div className="flex justify-center mt-6">
// //                 <button
// //                   onClick={() => {
// //                     if (isEditing) {
// //                       handleUpdateAttendance();
// //                     } else {
// //                       setIsEditing(true);
// //                     }
// //                   }}
// //                   className={`px-6 py-2 rounded ${isEditing ? 'bg-green-500' : 'bg-blue-500'} text-white`}
// //                   disabled={loading}
// //                 >
// //                   {isEditing ? 'Save Changes' : 'Edit Attendance'}
// //                 </button>
// //                 {isEditing && (
// //                   <button
// //                     onClick={() => {
// //                       setIsEditing(false);
// //                       setSelectedAbsentees(absentees.map(student => student._id));
// //                     }}
// //                     className="px-6 py-2 ml-4 text-white bg-gray-500 rounded"
// //                     disabled={loading}
// //                   >
// //                     Cancel
// //                   </button>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         ) : (
// //           <div className="p-8 text-center bg-white rounded-lg shadow">
// //             <p className="text-lg text-gray-600">
// //               No attendance data found for the selected {viewType === 'daily' ? 'date' : 'month'}
// //             </p>
// //           </div>
// //         )
// //       ) : formData.sectionName ? (
// //         <div className="text-center text-gray-600">
// //           No students found in this section
// //         </div>
// //       ) : null}
// //     </div>
// //   );
// // };

// // export default TeacherAttendance;

import React, { useState, useEffect, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import Allapi from '../../../common';

const TeacherAttendance = () => {
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;

  // View type state
  const [viewType, setViewType] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  // Teacher data states
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [teacherAssignment, setTeacherAssignment] = useState(null);
  const [students, setStudents] = useState([]);

  // Form data state
  const [formData, setFormData] = useState({
    subject: '',
    className: '',
    sectionName: '',
    classId: '',
    sectionId: ''
  });

  // Attendance states
  const [absentees, setAbsentees] = useState([]);
  const [monthlyAbsents, setMonthlyAbsents] = useState({});
  const [hasAttendanceData, setHasAttendanceData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAbsentees, setSelectedAbsentees] = useState([]);

  // Load teacher data on mount
  useEffect(() => {
    if (token && decoded?.teacherData) {
      try {
        if (decoded.teacherData?.teachingSubjects) {
          setTeacherSubjects(decoded.teacherData.teachingSubjects);
        }
        fetchTeacherAssignments(decoded.teacherData._id);
      } catch (error) {
        console.error("Error loading teacher data:", error);
        toast.error("Error loading teacher data");
      }
    }
  }, [token]);

  // Fetch teacher assignments
  const fetchTeacherAssignments = async (teacherId) => {
    try {
      if (!decoded?.teacherData?.academic_id) {
        toast.error("Academic ID not found");
        return;
      }

      const response = await fetch(
        Allapi.getTeacherAssignments.url(decoded.teacherData.academic_id),
        {
          method: Allapi.getTeacherAssignments.method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const result = await response.json();
      if (result.success) {
        const currentTeacherAssignment = result.data.find(
          (assignment) => assignment.teacherId === teacherId
        );
        setTeacherAssignment(currentTeacherAssignment);
      }
    } catch (error) {
      console.error("Error fetching teacher assignments:", error);
      toast.error("Error loading assignments");
    }
  };

  // Get available class sections
  const getAvailableClassSections = () => {
    if (!teacherAssignment || !formData.subject) return [];

    const classSections = [];
    teacherAssignment.classAssignments.forEach(classAssignment => {
      classAssignment.sections.forEach(section => {
        if (section.subject.toLowerCase() === formData.subject.toLowerCase()) {
          classSections.push({
            className: classAssignment.className,
            sectionName: section.sectionName,
            classId: classAssignment.classId,
            sectionId: section.sectionId
          });
        }
      });
    });
    return classSections;
  };

  // Fetch students when section is selected
  useEffect(() => {
    if (!formData.classId || !formData.sectionId) {
      setStudents([]);
      return;
    }

    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          Allapi.getStudentsBySection.url(formData.sectionId),
          {
            method: Allapi.getStudentsBySection.method,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        const data = await response.json();
        if (data.success) {
          const sortedStudents = (data.data || []).sort((a, b) => a.idNo - b.idNo);
          setStudents(sortedStudents);
          if (viewType === 'daily') {
            fetchDailyAttendance();
          } else {
            fetchMonthlyAttendance();
          }
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error("Error loading students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [formData.classId, formData.sectionId, viewType, selectedDate, selectedMonth]);

  // Fetch daily attendance
  const fetchDailyAttendance = async () => {
    if (!decoded?.teacherData?.branchId || !formData.classId || !formData.sectionId) return;

    try {
      const response = await fetch(
        `${Allapi.getAbsentees.url}?branchId=${decoded.teacherData.branchId}&academicId=${decoded.teacherData.academic_id}&classId=${formData.classId}&sectionId=${formData.sectionId}&date=${selectedDate}`,
        {
          method: Allapi.getAbsentees.method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();
      if (data.success) {
        setHasAttendanceData(data.data && data.data.length > 0);
        setAbsentees(data.data[0]?.absentees || []);
        setSelectedAbsentees(data.data[0]?.absentees.map(student => student._id) || []);
      }
    } catch (error) {
      console.error("Error fetching daily attendance:", error);
      toast.error("Error loading attendance");
    }
  };

  // Fetch monthly attendance
  const fetchMonthlyAttendance = async () => {
    if (!decoded?.teacherData?.branchId || !formData.classId || !formData.sectionId) return;

    try {
      const monthNumber = new Date(selectedMonth + '-01').getMonth() + 1;
      const response = await fetch(
        `${Allapi.getMonthlyAbsents.url}/${decoded.teacherData.branchId}/${decoded.teacherData.academic_id}/${formData.classId}/${formData.sectionId}/${monthNumber}`,
        {
          method: Allapi.getMonthlyAbsents.method,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();
      if (data.success) {
        setHasAttendanceData(data.data && data.data.length > 0);
        const absentsMap = {};
        data.data.forEach(item => {
          absentsMap[item.studentId] = item.absentCount;
        });
        setMonthlyAbsents(absentsMap);
      }
    } catch (error) {
      console.error("Error fetching monthly attendance:", error);
      toast.error("Error loading monthly attendance");
    }
  };

  // Handle attendance update
  const handleUpdateAttendance = async () => {
    if (!formData.classId || !formData.sectionId) {
      toast.error("Class and section information is missing");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(Allapi.updateAbsentees.url, {
        method: Allapi.updateAbsentees.method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          branchId: decoded.teacherData.branchId,
          academicId: decoded.teacherData.academic_id,
          classId: formData.classId,
          sectionId: formData.sectionId,
          date: selectedDate,
          absentees: selectedAbsentees
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Attendance updated successfully");
        setIsEditing(false);
        fetchDailyAttendance();
      } else {
        toast.error(data.message || "Failed to update attendance");
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      toast.error("Error updating attendance");
    } finally {
      setLoading(false);
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (studentId) => {
    setSelectedAbsentees(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <ToastContainer />
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Teacher Attendance</h1>

      {/* View Type Selection */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setViewType('daily')}
            className={`px-4 py-2 rounded ${viewType === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Daily View
          </button>
          <button
            onClick={() => setViewType('monthly')}
            className={`px-4 py-2 rounded ${viewType === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Monthly View
          </button>
        </div>
      </div>

      {/* Selection Form */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
        {/* Date/Month Selection */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {viewType === 'daily' ? 'Select Date' : 'Select Month'}
          </label>
          <input
            type={viewType === 'daily' ? 'date' : 'month'}
            value={viewType === 'daily' ? selectedDate : selectedMonth}
            onChange={(e) => viewType === 'daily'
              ? setSelectedDate(e.target.value)
              : setSelectedMonth(e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Subject Selection */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Subject
          </label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData({
              ...formData,
              subject: e.target.value,
              className: '',
              sectionName: '',
              classId: '',
              sectionId: ''
            })}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Subject</option>
            {teacherSubjects.map((subject) => (
              <option key={subject._id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Class & Section Selection */}
        {formData.subject && (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Class & Section
            </label>
            <select
              value={`${formData.className}-${formData.sectionName}`}
              onChange={(e) => {
                const [className, sectionName] = e.target.value.split('-');
                const sections = getAvailableClassSections();
                const selectedSection = sections.find(
                  s => s.className === className && s.sectionName === sectionName
                );

                setFormData({
                  ...formData,
                  className,
                  sectionName,
                  classId: selectedSection?.classId || '',
                  sectionId: selectedSection?.sectionId || ''
                });
              }}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Class & Section</option>
              {getAvailableClassSections().map((cs, index) => (
                <option
                  key={index}
                  value={`${cs.className}-${cs.sectionName}`}
                >
                  {cs.className} - {cs.sectionName}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Attendance Table */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : students.length > 0 ? (
        hasAttendanceData ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">S.No</th>
                  <th className="px-4 py-2 text-left">ID No</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  {viewType === 'daily' ? (
                    <th className="px-4 py-2 text-center">Absent</th>
                  ) : (
                    <th className="px-4 py-2 text-center">Absent Days</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{student.idNo}</td>
                    <td className="px-4 py-2">{`${student.name} ${student.surname || ''}`}</td>
                    {viewType === 'daily' ? (
                      <td className="px-4 py-2 text-center">
                        {isEditing ? (
                          <input
                            type="checkbox"
                            checked={selectedAbsentees.includes(student._id)}
                            onChange={() => handleCheckboxChange(student._id)}
                            className="w-4 h-4"
                          />
                        ) : (
                          absentees.some(a => a._id === student._id) ? 'Yes' : 'No'
                        )}
                      </td>
                    ) : (
                      <td className="px-4 py-2 text-center">
                        {monthlyAbsents[student._id] || 0}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {viewType === 'daily' && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => {
                    if (isEditing) {
                      handleUpdateAttendance();
                    } else {
                      setIsEditing(true);
                    }
                  }}
                  className={`px-6 py-2 rounded ${isEditing ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                  disabled={loading}
                >
                  {isEditing ? 'Save Changes' : 'Edit Attendance'}
                </button>
                {isEditing && (
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedAbsentees(absentees.map(student => student._id));
                    }}
                    className="px-6 py-2 ml-4 text-white bg-gray-500 rounded"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-lg shadow">
            <p className="text-lg text-gray-600">
              No attendance data found for the selected {viewType === 'daily' ? 'date' : 'month'}
            </p>
          </div>
        )
      ) : formData.sectionId ? (
        <div className="text-center text-gray-600">
          No students found in this section
        </div>
      ) : null}
    </div>
  );
};

export default TeacherAttendance;