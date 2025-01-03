import React, { useState, useEffect, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Printer } from 'lucide-react';
import Allapi from '../../../common';
import { mycon } from '../../../store/Mycontext';

// Print styles
const printStyles = `
  @media print {
    @page { 
      size: landscape;
      margin: 0.5cm;
    }
    body {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .no-print {
      display: none !important;
    }
    .print-break-inside-avoid {
      page-break-inside: avoid !important;
    }
  }
`;

const ProgressReport = () => {
  const { branchdet } = useContext(mycon);
  const [acid, setAcid] = useState('');
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedExams, setSelectedExams] = useState([]);
  const [availableExams, setAvailableExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [examResults, setExamResults] = useState([]);
  const [attendance, setAttendance] = useState({});

  // Get current academic year
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
    setSelectedStudent(null);
    setSelectedExams([]);
    setAvailableExams([]);

    if (!classId) return;

    try {
      const selectedClass = classes.find(cls => cls._id === classId);
      if (!selectedClass) return;

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
    setSelectedExams([]);
    setSelectedStudent(null);

    if (!sectionId || !selectedClass) return;

    try {
      const response = await fetch(
        Allapi.getAllExams.url(selectedClass, sectionId, branchdet._id),
        {
          method: Allapi.getAllExams.method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setAvailableExams(result.data);
      }
    } catch (error) {
      toast.error("Failed to fetch exams");
    }
  };

  const fetchStudents = async () => {
    if (!selectedSection || selectedExams.length === 0) return;
    try {
      setLoading(true);
      const response = await fetch(
        Allapi.getStudentsBySection.url(selectedSection),
        {
          method: Allapi.getStudentsBySection.method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setStudents(result.data.sort((a, b) => a.name.localeCompare(b.name)));
      }
    } catch (error) {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const fetchExamResults = async (studentId) => {
    try {
      setLoading(true);
      const promises = selectedExams.map(async (exam) => {
        // First get exam details to get subject information
        const examDetailsResponse = await fetch(
          Allapi.getExamById.url(exam._id, branchdet._id),
          {
            method: Allapi.getExamById.method,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const examDetails = await examDetailsResponse.json();
        
        if (!examDetails.success) {
          throw new Error('Failed to fetch exam details');
        }

        // Then get student's marks for this exam
        const marksResponse = await fetch(
          Allapi.getMarksByStudent.url(studentId, branchdet._id),
          {
            method: Allapi.getMarksByStudent.method,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const marksResult = await marksResponse.json();

        if (!marksResult.success) {
          throw new Error('Failed to fetch marks');
        }

        // Find the marks for this specific exam
        const examMarks = marksResult.data.find(mark => mark.examId._id === exam._id);
        
        if (!examMarks) {
          return {
            examType: exam.examName,
            subjects: examDetails.data.subjects.map(subject => ({
              name: subject.name,
              marks: 0,
              maxMarks: subject.marks,
              passMarks: subject.passMarks
            }))
          };
        }

        // Map the marks to subjects
        const subjectResults = examDetails.data.subjects.map(subject => {
          const subjectMark = examMarks.subjectMarks.find(
            mark => mark.subjectId === subject._id
          );

          return {
            name: subject.name,
            marks: subjectMark ? subjectMark.marksObtained : 0,
            maxMarks: subject.marks,
            passMarks: subject.passMarks
          };
        });

        return {
          examType: exam.examName,
          subjects: subjectResults
        };
      });

      const results = await Promise.all(promises);
      setExamResults(results);
    } catch (error) {
      console.error('Error fetching exam results:', error);
      toast.error('Failed to fetch exam results');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentDetails = async (studentId) => {
    try {
      setLoading(true);
      const response = await fetch(
        Allapi.getstudentbyId.url(studentId),
        {
          method: Allapi.getstudentbyId.method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setStudentData(result.data);
        await fetchExamResults(studentId);
        // Fetch attendance data here if needed
      }
    } catch (error) {
      toast.error("Failed to fetch student details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSection && selectedExams.length > 0) {
      fetchStudents();
    }
  }, [selectedSection, selectedExams]);

  const handleExamSelect = (examId) => {
    const exam = availableExams.find(e => e._id === examId);
    if (exam && !selectedExams.some(e => e._id === exam._id)) {
      setSelectedExams([...selectedExams, exam]);
    }
  };

  const removeExam = (examId) => {
    setSelectedExams(selectedExams.filter(exam => exam._id !== examId));
  };

  const calculateGrade = (percentage) => {
    if (percentage >= 91) return 'A1';
    if (percentage >= 81) return 'A2';
    if (percentage >= 71) return 'B1';
    if (percentage >= 61) return 'B2';
    if (percentage >= 51) return 'C1';
    if (percentage >= 41) return 'C2';
    if (percentage >= 35) return 'D';
    return 'E';
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <style>{printStyles}</style>
      
      {!showReport ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Progress Report Generator</h2>
          
          {/* Selection Form */}
          <div className="space-y-6">
            {/* Class Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => handleClassChange(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>{cls.name}</option>
                ))}
              </select>
            </div>

            {/* Section Selection */}
            {selectedClass && (
              <div>
                <label className="block text-sm font-medium mb-2">Section</label>
                <select
                  value={selectedSection}
                  onChange={(e) => handleSectionChange(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Section</option>
                  {sections.map((section) => (
                    <option key={section._id} value={section._id}>{section.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Exam Selection */}
            {selectedSection && (
              <div>
                <label className="block text-sm font-medium mb-2">Exams</label>
                <select
                  onChange={(e) => handleExamSelect(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  value=""
                >
                  <option value="">Add Exam</option>
                  {availableExams
                    .filter(exam => !selectedExams.some(e => e._id === exam._id))
                    .map((exam) => (
                      <option key={exam._id} value={exam._id}>
                        {exam.examName}
                      </option>
                    ))}
                </select>

                {selectedExams.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedExams.map((exam) => (
                      <div
                        key={exam._id}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                      >
                        <span>{exam.examName}</span>
                        <button
                          onClick={() => removeExam(exam._id)}
                          className="hover:text-blue-900"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Students List */}
            {students.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Select Student</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => {
                                setSelectedStudent(student._id);
                                fetchStudentDetails(student._id);
                                setShowReport(true);
                              }}
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                              View Report
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Report View
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
          {/* Report Header */}
          <div className="flex justify-between items-center mb-6 print:hidden">
            <button
              onClick={() => setShowReport(false)}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              <Printer size={20} />
              <span>Print Report</span>
            </button>
          </div>

          {studentData && (
            <>
              {/* Student Details */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4">Progress Report</h1>
                <div className="grid grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                  <div>
                    <p><strong>Name:</strong> {studentData.name}</p>
                    <p><strong>Class:</strong> {studentData.class?.name}</p>
                  </div>
                  <div>
                    <p><strong>Roll No:</strong> {studentData.rollNo}</p>
                    <p><strong>Section:</strong> {studentData.section?.name}</p>
                  </div>
                </div>
              </div>

              {/* Exam Results */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Academic Performance</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 border">Subject</th>
                        {selectedExams.map(exam => (
                          <th key={exam._id} className="px-4 py-2 border">
                            {exam.examName}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {examResults[0]?.subjects.map((subject, index) => (
                        <tr key={subject.name}>
                          <td className="px-4 py-2 border font-medium">
                            {subject.name}
                          </td>
                          {examResults.map(result => {
                            const subjectResult = result.subjects[index];
                            const percentage = (subjectResult.marks / subjectResult.maxMarks) * 100;
                            return (
                              <td key={`${result.examType}-${subject.name}`} className="px-4 py-2 border text-center">
                                <div>{subjectResult.marks}/{subjectResult.maxMarks}</div>
                                <div className="text-sm text-gray-600">
                                  {percentage.toFixed(1)}% ({calculateGrade(percentage)})
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Grade Scale */}
              <div className="mt-8 print:mt-4">
                <h3 className="text-lg font-semibold mb-2">Grading Scale</h3>
                <table className="w-full text-sm border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-2 py-1 border">Grade</th>
                      <th className="px-2 py-1 border">A1</th>
                      <th className="px-2 py-1 border">A2</th>
                      <th className="px-2 py-1 border">B1</th>
                      <th className="px-2 py-1 border">B2</th>
                      <th className="px-2 py-1 border">C1</th>
                      <th className="px-2 py-1 border">C2</th>
                      <th className="px-2 py-1 border">D</th>
                      <th className="px-2 py-1 border">E</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-2 py-1 border font-medium">Marks %</td>
                      <td className="px-2 py-1 border">91-100</td>
                      <td className="px-2 py-1 border">81-90</td>
                      <td className="px-2 py-1 border">71-80</td>
                      <td className="px-2 py-1 border">61-70</td>
                      <td className="px-2 py-1 border">51-60</td>
                      <td className="px-2 py-1 border">41-50</td>
                      <td className="px-2 py-1 border">35-40</td>
                      <td className="px-2 py-1 border">Below 35</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Signatures */}
              <div className="mt-12 grid grid-cols-3 gap-8 print:mt-8">
                <div className="text-center">
                  <div className="h-16"></div>
                  <div className="border-t border-gray-300">
                    <p className="mt-1">Class Teacher</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="h-16"></div>
                  <div className="border-t border-gray-300">
                    <p className="mt-1">Principal</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="h-16"></div>
                  <div className="border-t border-gray-300">
                    <p className="mt-1">Parent's Signature</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProgressReport;