import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allapi from '../../../common';
import { mycon } from '../../../store/Mycontext';

const ViewMarks = () => {
  const { branchdet } = useContext(mycon);
  const [acid, setAcid] = useState('');
  const [currentAcademicYear, setCurrentAcademicYear] = useState('');
  const [examId, setExamId] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  
  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [marksData, setMarksData] = useState({
    examName: '',
    className: '',
    sectionName: '',
    passStudents: [],
    failStudents: [],
    subjectReport: []
  });

  // Fetch current academic year
  useEffect(() => {
    if (branchdet?._id) {
      const fetchAcademicYear = async () => {
        try {
          const response = await fetch(Allapi.getAcademicYears.url(branchdet._id), {
            method: Allapi.getAcademicYears.method,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          
          const res = await response.json();
          if (res.success && res.data.length > 0) {
            const latestYear = res.data.sort((a, b) => {
              const [startA] = a.year.split("-").map(Number);
              const [startB] = b.year.split("-").map(Number);
              return startB - startA;
            })[0];
            
            setAcid(latestYear._id);
            setCurrentAcademicYear(latestYear.year);
          }
        } catch (error) {
          toast.error("Failed to fetch academic year");
        }
      };
      fetchAcademicYear();
    }
  }, [branchdet]);

  // Fetch classes when academic year is set
  useEffect(() => {
    if (acid) {
      const fetchClasses = async () => {
        try {
          const response = await fetch(Allapi.getClasses.url(acid), {
            method: Allapi.getClasses.method,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const result = await response.json();
          if (result.success) {
            setClasses(result.data);
          }
        } catch (error) {
          toast.error("Failed to fetch classes");
        }
      };
      fetchClasses();
    }
  }, [acid]);

  const handleClassChange = async (classId) => {
    setSelectedClass(classId);
    setSelectedSection('');
    try {
      const selectedClass = classes.find(cls => cls._id === classId);
      const response = await fetch(Allapi.getSectionsByClass.url(selectedClass.name, acid), {
        method: Allapi.getSectionsByClass.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setSections(result.data);
      }
    } catch (error) {
      toast.error("Failed to fetch sections");
    }
  };

  const handleSectionChange = async (sectionId) => {
    setSelectedSection(sectionId);
    try {
      const response = await fetch(Allapi.getAllExams.url(selectedClass, sectionId), {
        method: Allapi.getAllExams.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setExams(result.data);
      }
    } catch (error) {
      toast.error("Failed to fetch exams");
    }
  };

  const fetchMarksData = async () => {
    if (!examId || !selectedClass || !selectedSection) {
      toast.error("Please select all required fields");
      return;
    }

    try {
      const response = await fetch(Allapi.getMarks.url(examId, selectedClass, selectedSection), {
        method: Allapi.getMarks.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      const result = await response.json();
      if (result.success) {
        setMarksData(result.data);
      } else {
        toast.error("Failed to fetch marks data");
      }
    } catch (error) {
      toast.error("Error fetching marks data");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="max-w-6xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-indigo-700">Marks View with Ranks</h2>
        
        {/* Filters Section */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Academic Year</label>
            <input
              type="text"
              value={currentAcademicYear}
              disabled
              className="w-full p-2 bg-gray-100 border rounded"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>{cls.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => handleSectionChange(e.target.value)}
              className="w-full p-2 border rounded"
              disabled={!selectedClass}
            >
              <option value="">Select Section</option>
              {sections.map((section) => (
                <option key={section._id} value={section._id}>{section.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Exam</label>
            <select
              value={examId}
              onChange={(e) => setExamId(e.target.value)}
              className="w-full p-2 border rounded"
              disabled={!selectedSection}
            >
              <option value="">Select Exam</option>
              {exams.map((exam) => (
                <option key={exam._id} value={exam._id}>{exam.examName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6 text-center">
          <button
            onClick={fetchMarksData}
            className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            View Results
          </button>
        </div>

        {/* Results Display */}
        {marksData.examName && (
          <div className="space-y-8">
            {/* Exam Details */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="mb-4 text-xl font-semibold">Exam Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-600">Exam Name:</p>
                  <p className="font-medium">{marksData.examName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Class:</p>
                  <p className="font-medium">{marksData.className}</p>
                </div>
                <div>
                  <p className="text-gray-600">Section:</p>
                  <p className="font-medium">{marksData.sectionName}</p>
                </div>
              </div>
            </div>

            {/* Pass Students */}
            <div className="overflow-x-auto">
              <h3 className="mb-4 text-xl font-semibold text-green-600">Pass Students</h3>
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left border">Rank</th>
                    <th className="p-3 text-left border">Name</th>
                    {marksData.passStudents[0]?.subjects.map((subject) => (
                      <th key={subject.name} className="p-3 text-left border">{subject.name}</th>
                    ))}
                    <th className="p-3 text-left border">Total</th>
                    <th className="p-3 text-left border">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {marksData.passStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td className="p-3 border">{index + 1}</td>
                      <td className="p-3 border">{student.name}</td>
                      {student.subjects.map((subject) => (
                        <td key={subject.name} className="p-3 border">{subject.marks}</td>
                      ))}
                      <td className="p-3 border">{student.total}</td>
                      <td className="p-3 border">{student.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Failed Students */}
            <div className="overflow-x-auto">
              <h3 className="mb-4 text-xl font-semibold text-red-600">Failed Students</h3>
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left border">Name</th>
                    {marksData.failStudents[0]?.subjects.map((subject) => (
                      <th key={subject.name} className="p-3 text-left border">{subject.name}</th>
                    ))}
                    <th className="p-3 text-left border">Total</th>
                    <th className="p-3 text-left border">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {marksData.failStudents.map((student) => (
                    <tr key={student.id} className="bg-yellow-50">
                      <td className="p-3 border">{student.name}</td>
                      {student.subjects.map((subject) => (
                        <td key={subject.name} className="p-3 border">{subject.marks}</td>
                      ))}
                      <td className="p-3 border">{student.total}</td>
                      <td className="p-3 border">{student.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Subject-wise Report */}
            <div className="overflow-x-auto">
              <h3 className="mb-4 text-xl font-semibold">Subject-wise Report</h3>
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left border">Subject</th>
                    <th className="p-3 text-left border">Pass Count</th>
                    <th className="p-3 text-left border">Fail Count</th>
                    <th className="p-3 text-left border">Total Students</th>
                  </tr>
                </thead>
                <tbody>
                  {marksData.subjectReport.map((subject) => (
                    <tr key={subject.name}>
                      <td className="p-3 border">{subject.name}</td>
                      <td className="p-3 border">{subject.passCount}</td>
                      <td className="p-3 border">{subject.failCount}</td>
                      <td className="p-3 border">{subject.totalCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default ViewMarks;