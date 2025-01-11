import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allapi from '../../../common';
import { mycon } from '../../../store/Mycontext';

const EnterMarks = () => {
  const { branchdet } = useContext(mycon);
  const [acid, setAcid] = useState('');
  const [currentAcademicYear, setCurrentAcademicYear] = useState('');

  // Form states
  const [examList, setExamList] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [uniqueClasses, setUniqueClasses] = useState([]);
  const [uniqueSections, setUniqueSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  // Data states
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [filteredExams, setFilteredExams] = useState([]);

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
        setCurrentAcademicYear(latestAcademicYear.year);
      }
    } catch (error) {
      toast.error("Failed to fetch academic year");
    }
  };

  const fetchAllExams = async () => {
    try {
      const response = await fetch(Allapi.getEveryExam.url(branchdet._id), {
        method: Allapi.getEveryExam.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        setExamList(result.data);
        // Extract unique classes
        const classes = [...new Map(result.data.map(exam =>
          [exam.classId._id, { id: exam.classId._id, name: exam.classId.name }]
        )).values()];
        setUniqueClasses(classes);
      } else {
        toast.error("Failed to fetch exams");
      }
    } catch (error) {
      toast.error("Error fetching exams");
    }
  };

  const fetchStudents = async (classId, sectionId) => {
    if (!classId || !sectionId) return;

    try {
      const response = await fetch(Allapi.getStudentsBySection.url(sectionId), {
        method: Allapi.getStudentsBySection.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ classId })
      });

      const result = await response.json();
      if (result.success && result.data) {
        setStudents(result.data);

        // Only initialize marks data if we have both students and exam subjects
        if (selectedExam?.subjects) {
          const initialMarks = {};
          result.data.forEach(student => {
            initialMarks[student._id] = {};
            selectedExam.subjects.forEach(subject => {
              initialMarks[student._id][subject.name] = '';
            });
          });
          setMarksData(initialMarks);
        }
      } else {
        console.warn("No students found or invalid response format");
      }
    } catch (error) {
      console.warn("Error in fetchStudents:", error);
      // Only show error toast if the request actually failed
      if (!error.message.includes('aborted')) {
        toast.error("Error fetching students");
      }
    }
  };
  useEffect(() => {
    if (branchdet?._id) {
      curracad(branchdet._id);
    }
  }, [branchdet]);

  useEffect(() => {
    if (acid) {
      fetchAllExams();
    }
  }, [acid]);

  // Update sections when class is selected
  useEffect(() => {
    if (selectedClass) {
      const sections = examList
        .filter(exam => exam.classId._id === selectedClass)
        .map(exam => ({
          id: exam.sectionId._id,
          name: exam.sectionId.name
        }));
      const uniqueSections = [...new Map(sections.map(section =>
        [section.id, section]
      )).values()];
      setUniqueSections(uniqueSections);
      setSelectedSection('');
      setSelectedExam(null);
    }
  }, [selectedClass]);

  // Update available exams when section is selected
  useEffect(() => {
    if (selectedClass && selectedSection) {
      const exams = examList.filter(exam =>
        exam.classId._id === selectedClass &&
        exam.sectionId._id === selectedSection
      );
      setFilteredExams(exams);
      setSelectedExam(null);
    }
  }, [selectedClass, selectedSection]);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedSection('');
    setSelectedExam(null);
    setMarksData({});
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setSelectedExam(null);
    setMarksData({});
  };

  const handleExamChange = (e) => {
    const exam = filteredExams.find(ex => ex._id === e.target.value);
    setSelectedExam(exam);
    setMarksData({});
    if (exam) {
      fetchStudents(selectedClass, selectedSection);
    }
  };

  const handleMarksChange = (studentId, subject, value) => {
    if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= subject.marks)) {
      setMarksData(prev => ({
        ...prev,
        [studentId]: {
          ...prev[studentId],
          [subject.name]: value
        }
      }));
    }
  };

  const validateMarks = () => {
    let isValid = true;
    let hasAtLeastOneMark = false;

    Object.entries(marksData).forEach(([studentId, subjects]) => {
      Object.entries(subjects).forEach(([subjectName, mark]) => {
        if (mark !== '') {
          hasAtLeastOneMark = true;
          const subject = selectedExam.subjects.find(s => s.name === subjectName);
          const markValue = parseFloat(mark);
          if (isNaN(markValue) || markValue < 0 || markValue > subject.marks) {
            isValid = false;
          }
        }
      });
    });

    if (!hasAtLeastOneMark) {
      toast.error("Please enter marks for at least one student");
      return false;
    }

    if (!isValid) {
      toast.error("Please ensure all entered marks are valid");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validateMarks()) return;

      const submissionPromises = Object.entries(marksData)
        .filter(([_, subjects]) => Object.values(subjects).some(mark => mark !== ''))
        .map(async ([studentId, subjects]) => {
          const submission = {
            examId: selectedExam._id,
            academicId: acid,
            classId: selectedClass,
            sectionId: selectedSection,
            studentId,
            subjectMarks: Object.entries(subjects)
              .filter(([_, mark]) => mark !== '')
              .map(([subjectName, mark]) => ({
                subjectId: selectedExam.subjects.find(s => s.name === subjectName)?._id,
                marksObtained: parseFloat(mark)
              }))
          };

          try {
            const response = await fetch(Allapi.addMarks.url(branchdet._id), {
              method: Allapi.addMarks.method,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(submission)
            });

            const result = await response.json();

            if (response.ok) {
              return { studentId, status: 'success' };
            }

            if (response.status === 400 && result.message?.includes("already exist")) {
              return { studentId, status: 'exists', message: result.message };
            }

            return { studentId, status: 'error', message: result.message };
          } catch (error) {
            return { studentId, status: 'error', message: error.message };
          }
        });

      const results = await Promise.all(submissionPromises);

      const successful = results.filter(r => r.status === 'success').length;
      const existing = results.filter(r => r.status === 'exists').length;
      const errors = results.filter(r => r.status === 'error').length;

      if (successful > 0) {
        toast.success(`Successfully added marks for ${successful} students.`);
        setSelectedExam(null);
        setSelectedClass('');
        setSelectedSection('');
        setMarksData({});
      }

      if (existing > 0) {
        toast.warning(`${existing} students already had marks recorded.`);
      }

      if (errors > 0) {
        toast.error(`Failed to add marks for ${errors} students.`);
      }
    } catch (error) {
      toast.error("An unexpected error occurred while submitting marks.");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="p-8 mx-auto bg-white rounded-lg shadow-lg max-w-7xl">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">Enter Student Marks</h2>

        {/* Academic Year Display */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Academic Year
          </label>
          <input
            type="text"
            value={currentAcademicYear}
            disabled
            className="w-full p-3 text-gray-700 border rounded bg-gray-50"
          />
        </div>

        {/* Selection Fields */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
          {/* Class Selection */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Class
            </label>
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="w-full p-3 text-gray-700 bg-white border rounded"
            >
              <option value="">Select Class</option>
              {uniqueClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          {/* Section Selection */}
          {selectedClass && (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Section
              </label>
              <select
                value={selectedSection}
                onChange={handleSectionChange}
                className="w-full p-3 text-gray-700 bg-white border rounded"
              >
                <option value="">Select Section</option>
                {uniqueSections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Exam Selection */}
          {selectedSection && (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Exam
              </label>
              <select
                value={selectedExam?._id || ''}
                onChange={handleExamChange}
                className="w-full p-3 text-gray-700 bg-white border rounded"
              >
                <option value="">Select Exam</option>
                {filteredExams.map((exam) => (
                  <option key={exam._id} value={exam._id}>
                    {exam.examName}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Marks Table */}
        {selectedExam && students.length > 0 && selectedExam?.subjects?.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full bg-white border border-collapse border-gray-300">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="p-4 font-semibold text-left text-gray-700 border-r border-gray-300">
                    Student Name
                  </th>
                  {selectedExam.subjects.map(subject => (
                    <th key={subject._id} className="p-4 font-semibold text-left text-gray-700 border-r border-gray-300">
                      <div>{subject.name}</div>
                      <div className="text-xs text-gray-500">
                        Max: {subject.marks} | Pass: {subject.passMarks}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={student._id} className={idx !== students.length - 1 ? 'border-b border-gray-300' : ''}>
                    <td className="p-4 font-medium text-gray-700 border-r border-gray-300">
                      {student.name}
                    </td>
                    {selectedExam.subjects.map(subject => (
                      <td key={`${student._id}-${subject._id}`} className="p-4 border-r border-gray-300">
                        <input
                          type="number"
                          value={marksData[student._id]?.[subject.name] || ''}
                          onChange={(e) => handleMarksChange(student._id, subject, e.target.value)}
                          min="0"
                          max={subject.marks}
                          className="w-full text-center text-gray-700 bg-transparent border-none focus:outline-none"
                          placeholder="0"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={handleSubmit}
              className="w-full px-6 py-3 mt-6 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
            >
              Submit Marks
            </button>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default EnterMarks;