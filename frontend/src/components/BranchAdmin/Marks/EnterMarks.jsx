import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allapi from '../../../common';
import { mycon } from '../../../store/Mycontext';

const EnterMarks = () => {
  const { branchdet } = useContext(mycon);
  const [acid, setAcid] = useState('');
  const [wholeData, setWholeData] = useState([]);
  const [currentAcademicYear, setCurrentAcademicYear] = useState('');
  
  // Form states
  const [examId, setExamId] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  
  // Data states
  const [exams, setExams] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subjectMarks, setSubjectMarks] = useState({});

  // Validation utilities
  const validateMarks = (marks) => {
    if (marks === '' || marks === null) return false;
    const numericMarks = parseFloat(marks);
    return !isNaN(numericMarks) && numericMarks >= 0 && numericMarks <= 100;
  };

  const formatMarksData = (data) => {
    const { examId, academicId, classId, sectionId, studentId, subjectMarks } = data;
    
    const formattedSubjectMarks = Object.entries(subjectMarks)
      .map(([subjectId, marks]) => ({
        subjectId,
        marksObtained: parseFloat(marks)
      }))
      .filter(mark => validateMarks(mark.marksObtained));

    return {
      examId,
      academicId,
      classId,
      sectionId,
      studentId,
      subjectMarks: formattedSubjectMarks
    };
  };

  const validateForm = () => {
    if (!examId || !selectedClass || !selectedSection || !selectedStudent) {
      toast.error("Please fill all required fields");
      return false;
    }

    const hasMarks = Object.values(subjectMarks).some(mark => validateMarks(mark));
    if (!hasMarks) {
      toast.error("Please enter valid marks for at least one subject");
      return false;
    }

    return true;
  };

  const curracad = async (bid) => {
    try {
      const response = await fetch(Allapi.getAcademicYears.url(bid), {
        method: Allapi.getAcademicYears.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch academic years");
      }

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

  const fetchExams = async (classId, sectionId) => {
    try {
      const response = await fetch(Allapi.getAllExams.url(classId, sectionId), {
        method: Allapi.getAllExams.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        const examNames = result.data.map(exam => ({
          _id: exam._id,
          examName: exam.examName
        }));
        setExams(examNames);
      } else {
        toast.error("Failed to fetch exams");
      }
    } catch (error) {
      toast.error("Error fetching exams");
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

  const fetchStudents = async (classId, sectionId) => {
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
      if (result.success) {
        setStudents(result.data);
      } else {
        toast.error(result.message || "Failed to fetch students");
      }
    } catch (error) {
      toast.error("Error fetching students");
    }
  };

  const fetchSubjects = async (classId) => {
    const selectedClassData = wholeData.find(c => c._id === classId);
    if (selectedClassData?.subjects) {
      const allSubjects = [
        ...(selectedClassData.subjects.mainSubjects || []),
        ...(selectedClassData.subjects.additionalSubjects || [])
      ];
      setSubjects(allSubjects);
      
      const initialMarks = {};
      allSubjects.forEach(subject => {
        initialMarks[subject] = '';
      });
      setSubjectMarks(initialMarks);
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

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setSelectedClass(classId);
    setSelectedSection('');
    setSelectedStudent('');
    fetchSections(classId);
    fetchSubjects(classId);
  };

  const handleSectionChange = (e) => {
    const sectionId = e.target.value;
    setSelectedSection(sectionId);
    setSelectedStudent('');
    if (selectedClass && sectionId) {
      fetchExams(selectedClass, sectionId);
      fetchStudents(selectedClass, sectionId);
    }
  };

  const handleMarksChange = (subject, value) => {
    if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
      setSubjectMarks(prev => ({
        ...prev,
        [subject]: value
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;

      const marksData = formatMarksData({
        examId,
        academicId: acid,
        classId: selectedClass,
        sectionId: selectedSection,
        studentId: selectedStudent,
        subjectMarks
      });

      const response = await fetch(Allapi.addMarks.url, {
        method: Allapi.addMarks.method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(marksData)
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success("Marks submitted successfully");
        // Reset form
        setExamId('');
        setSelectedClass('');
        setSelectedSection('');
        setSelectedStudent('');
        setSubjectMarks({});
      } else {
        throw new Error(result.message || "Failed to submit marks");
      }
    } catch (error) {
      toast.error(error.message || "Error submitting marks");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-indigo-700">Enter Student Marks</h2>

        {/* Academic Year Display */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Academic Year
          </label>
          <input
            type="text"
            value={currentAcademicYear}
            disabled
            className="w-full p-3 bg-gray-100 text-gray-900 border rounded focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Basic Details */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Exam
            </label>
            <select
              value={examId}
              onChange={(e) => setExamId(e.target.value)}
              className="w-full p-3 border rounded text-black focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Exam</option>
              {exams.map((exam) => (
                <option key={exam._id} value={exam._id}>
                  {exam.examName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Class
            </label>
            <select
              value={selectedClass}
              onChange={handleClassChange}
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
              onChange={handleSectionChange}
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

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Student
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500"
              disabled={!selectedSection}
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject Marks */}
        {subjects.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">Enter Marks</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {subjects.map((subject) => (
                <div key={subject} className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {subject}
                  </label>
                  <input
                    type="number"
                    value={subjectMarks[subject]}
                    onChange={(e) => handleMarksChange(subject, e.target.value)}
                    min="0"
                    max="100"
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter marks"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full px-6 py-3 mt-6 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
        >
          Submit Marks
        </button>

        <ToastContainer />
      </div>
    </div>
  );
};

export default EnterMarks;