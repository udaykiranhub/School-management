import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash2 } from 'lucide-react';
import Allapi from '../../../common';
import { mycon } from '../../../store/Mycontext';

const ViewTimeTable = () => {
  const { branchdet } = useContext(mycon);
  const [acid, setAcid] = useState('');
  const [wholeData, setWholeData] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [sections, setSections] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);

  const curracad = async (bid) => {
    try {
      const response = await fetch(Allapi.getAcademicYears.url(bid), {
        method: Allapi.getAcademicYears.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch academic years");

      const res = await response.json();
      if (res.success && res.data.length > 0) {
        const latestAcademicYear = res.data
          .sort((a, b) => {
            const [startA, endA] = a.year.split("-").map(Number);
            const [startB, endB] = b.year.split("-").map(Number);
            return startB - startA || endB - endA;
          })[0];

        setAcid(latestAcademicYear._id);
      }
    } catch (error) {
      toast.error("Failed to fetch academic year");
    }
  };

  const fetchWholedata = async () => {
    try {
      const response = await fetch(Allapi.getClasses.url(acid), {
        method: Allapi.getClasses.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        setWholeData(result.data);
      } else {
        toast.error(result.message || "Failed to fetch class data");
      }
    } catch (error) {
      toast.error("Error fetching class data");
    }
  };

  const fetchSections = async (classId) => {
    try {
      const selectedClass = wholeData.find(cls => cls._id === classId);
      if (!selectedClass) {
        toast.error("Class not found");
        return;
      }

      const response = await fetch(Allapi.getSectionsByClass.url(selectedClass.name, acid), {
        method: Allapi.getSectionsByClass.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setSections(result.data);
      } else {
        toast.error("Failed to fetch sections");
      }
    } catch (error) {
      toast.error("Error fetching sections");
    }
  };

  const fetchExams = async () => {
    if (!selectedClass || !selectedSection  || !branchdet?._id) return;
    
    setLoading(true);
    try {
      const response = await fetch(Allapi.getAllExams.url(selectedClass, selectedSection, branchdet._id), {
        method: Allapi.getAllExams.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setExams(result.data);
      } else {
        toast.error("Failed to fetch exams");
      }
    } catch (error) {
      toast.error("Error fetching exams");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExam = async (examId) => {
    if (!window.confirm('Are you sure you want to delete this exam?')) return;

    try {
      const response = await fetch(Allapi.deleteExam.url(examId), {
        method: Allapi.deleteExam.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Exam deleted successfully");
        fetchExams(); // Refresh the list
      } else {
        toast.error(result.message || "Failed to delete exam");
      }
    } catch (error) {
      toast.error("Error deleting exam");
    }
  };

  useEffect(() => {
    if (branchdet?._id) {
      curracad(branchdet._id);
    }
  }, [branchdet]);

  useEffect(() => {
    if (acid) {
      fetchWholedata();
    }
  }, [acid]);

  useEffect(() => {
    if (selectedClass) {
      fetchSections(selectedClass);
      setSelectedSection('');
      setExams([]);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass && selectedSection) {
      fetchExams();
    }
  }, [selectedClass, selectedSection]);
  console.log("exams data is: ",exams);
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="max-w-6xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-indigo-700">View Exam TimeTable</h2>

        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Class</option>
              {wholeData.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500"
              disabled={!selectedClass}
            >
              <option value="">Select Section</option>
              {sections.map((section) => (
                <option key={section._id} value={section._id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-16 h-16 border-4 border-indigo-500 rounded-full animate-spin border-t-transparent"></div>
          </div>
        ) : exams.length > 0 ? (
          <div className="mt-6">
            {exams.map((exam) => (
              <div key={exam._id} className="mb-8 overflow-hidden bg-white rounded-lg shadow">
                <div className="flex items-center justify-between px-6 py-4 bg-indigo-50">
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-700">{exam.examName}</h3>
                    <p className="text-sm text-gray-600">
                      Class: {exam.classId.name} | Section: {exam.sectionId.name} | 
                      Academic Year: {exam.academicId.year}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteExam(exam._id)}
                    className="p-2 text-red-500 transition-colors rounded-full hover:bg-red-50"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th className="px-6 py-3">Subject</th>
                          <th className="px-6 py-3">Total Marks</th>
                          <th className="px-6 py-3">Pass Marks</th>
                          <th className="px-6 py-3">Date</th>
                          <th className="px-6 py-3">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exam.subjects.map((subject, index) => (
                          <tr key={index} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{subject.name}</td>
                            <td className="px-6 py-4">{subject.marks}</td>
                            <td className="px-6 py-4">{subject.passMarks}</td>
                            <td className="px-6 py-4">{new Date(subject.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4">{subject.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : selectedClass && selectedSection ? (
          <div className="py-8 text-center text-gray-500">
            No exam timetables found for the selected class and section.
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            Please select a class and section to view exam timetables.
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default ViewTimeTable;