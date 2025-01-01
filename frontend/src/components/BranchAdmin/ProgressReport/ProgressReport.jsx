import React, { useState, useEffect, useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { Printer } from 'lucide-react';
import Allapi from '../../../common';
import { mycon } from '../../../store/Mycontext';

const ProgressReport = () => {
    const { branchdet } = useContext(mycon);
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
    const [workingDays, setWorkingDays] = useState(null);
    const [attendance, setAttendance] = useState({});
    const reportRef = useRef();

    const subjects = ['Telugu', 'English', 'Hindi', 'Maths', 'Social', 'Science'];
    const months = [
        'June', 'July', 'August', 'September', 'October',
        'November', 'December', 'January', 'February', 'March'
    ];

    useEffect(() => {
        if (branchdet?.academicYears?.[0]) {
            fetchClasses();
        }
    }, [branchdet]);

    const fetchClasses = async () => {
        try {
            setLoading(true);
            const response = await fetch(Allapi.getClasses.url(branchdet.academicYears[0]), {
                method: Allapi.getClasses.method,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            if (result.success) {
                setClasses(result.data);
            }
        } catch (error) {
            toast.error('Failed to fetch classes');
        } finally {
            setLoading(false);
        }
    };

    const fetchSections = async (classId) => {
        if (!classId) return;
        try {
            setLoading(true);
            const selectedClass = classes.find(cls => cls._id === classId);
            const response = await fetch(
                Allapi.getSectionsByClass.url(selectedClass.name, branchdet.academicYears[0]),
                {
                    method: Allapi.getSectionsByClass.method,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            const result = await response.json();
            if (result.success) {
                setSections(result.data);
            }
        } catch (error) {
            toast.error('Failed to fetch sections');
        } finally {
            setLoading(false);
        }
    };

    const fetchExamTypes = async () => {
        if (!selectedSection) return;
        try {
            setLoading(true);
            const response = await fetch(
                Allapi.getAllExams.url(selectedClass, selectedSection, branchdet._id),
                {
                    method: Allapi.getAllExams.method,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            const result = await response.json();
            if (result.success) {
                setAvailableExams(result.data.map(exam => exam.examName));
            }
        } catch (error) {
            toast.error('Failed to fetch exam types');
        } finally {
            setLoading(false);
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
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            const result = await response.json();
            if (result.success) {
                const sortedStudents = result.data.sort((a, b) => a.name.localeCompare(b.name));
                setStudents(sortedStudents);
            }
        } catch (error) {
            toast.error('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    const fetchStudentDetails = async (studentId) => {
        if (!studentId) return;
        try {
            const response = await fetch(Allapi.getstudentbyId.url(studentId), {
                method: Allapi.getstudentbyId.method,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const result = await response.json();
            if (result.success) {
                setStudentData(result.data);
                fetchAllExamResults(studentId);
                fetchAttendance(studentId);
            }
        } catch (error) {
            toast.error('Failed to fetch student details');
        }
    };

    const fetchAttendance = async (studentId) => {
        try {
            // Mock attendance data - replace with actual API call
            const mockAttendance = months.reduce((acc, month) => {
                acc[month] = {
                    present: Math.floor(Math.random() * 5) + 20,
                    total: Math.floor(Math.random() * 5) + 25
                };
                return acc;
            }, {});
            setAttendance(mockAttendance);
        } catch (error) {
            toast.error('Failed to fetch attendance');
        }
    };

    const fetchAllExamResults = async (studentId) => {
        try {
            const promises = selectedExams.map(async (examType) => {
                const response = await fetch(
                    Allapi.getMarksReport.url(examType, selectedClass, selectedSection, branchdet._id),
                    {
                        method: Allapi.getMarksReport.method,
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                const result = await response.json();
                if (result.success) {
                    const studentResult = result.data.passStudents.concat(result.data.failStudents)
                        .find(s => s._id === studentId);
                    return {
                        examType,
                        results: studentResult?.subjects || []
                    };
                }
                return null;
            });

            const results = await Promise.all(promises);
            setExamResults(results.filter(Boolean));
        } catch (error) {
            toast.error('Failed to fetch exam results');
        }
    };

    useEffect(() => {
        if (selectedClass) {
            fetchSections(selectedClass);
            setSelectedSection('');
            setSelectedStudent(null);
            setSelectedExams([]);
            setAvailableExams([]);
        }
    }, [selectedClass]);

    useEffect(() => {
        if (selectedSection) {
            fetchExamTypes();
            setSelectedExams([]);
            setSelectedStudent(null);
        }
    }, [selectedSection]);

    useEffect(() => {
        if (selectedSection && selectedExams.length > 0) {
            fetchStudents();
            setSelectedStudent(null);
        }
    }, [selectedSection, selectedExams]);

    useEffect(() => {
        if (selectedStudent) {
            fetchStudentDetails(selectedStudent);
        }
    }, [selectedStudent]);

    const handleExamTypeChange = (e) => {
        const value = e.target.value;
        if (!selectedExams.includes(value) && value) {
            setSelectedExams([...selectedExams, value]);
        }
    };

    const removeExamType = (examType) => {
        setSelectedExams(selectedExams.filter(type => type !== examType));
    };

    const handlePrint = () => {
        if (reportRef.current) {
            window.print();
        }
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {!showReport ? (
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6">Student Assessment Report</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Select Class
                            </label>
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Select Class</option>
                                {classes.map((cls) => (
                                    <option key={cls._id} value={cls._id}>{cls.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Select Section
                            </label>
                            <select
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}
                                className="w-full p-2 border rounded-md"
                                disabled={!selectedClass}
                            >
                                <option value="">Select Section</option>
                                {sections.map((section) => (
                                    <option key={section._id} value={section._id}>{section.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {selectedSection && availableExams.length > 0 && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">
                                Select Exam Types
                            </label>
                            <div className="space-y-4">
                                <select
                                    onChange={handleExamTypeChange}
                                    className="w-full p-2 border rounded-md"
                                    value=""
                                >
                                    <option value="">Add Exam Type</option>
                                    {availableExams.filter(exam => !selectedExams.includes(exam)).map((examType) => (
                                        <option key={examType} value={examType}>{examType}</option>
                                    ))}
                                </select>

                                {selectedExams.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedExams.map((examType) => (
                                            <div key={examType}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
                                            >
                                                <span>{examType}</span>
                                                <button
                                                    onClick={() => removeExamType(examType)}
                                                    className="text-blue-800 hover:text-blue-900"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {selectedSection && selectedExams.length > 0 && students.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-4 text-black">Students</h3>
                            <div className="overflow-x-auto text-black">
                                <table className="min-w-full bg-white border border-gray-300 text-black">
                                    <thead className="bg-gray-50 text-black">
                                        <tr>
                                            <th className="py-2 px-4 border-b text-left text-black">S.No</th>
                                            <th className="py-2 px-4 border-b text-left text-black">Student Name</th>
                                            <th className="py-2 px-4 border-b text-center text-black">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student, index) => (
                                            <tr key={student._id} className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border-b text-black">{index + 1}</td>
                                                <td className="py-2 px-4 border-b text-black">{student.name}</td>
                                                <td className="py-2 px-4 border-b text-center">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedStudent(student._id);
                                                            setShowReport(true);
                                                        }}
                                                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
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
            ) : (
                <div className="max-w-5xl mx-auto">
                    <div className="mb-6 flex justify-between items-center print:hidden">
                        <button
                            onClick={() => {
                                setShowReport(false);
                                setSelectedStudent(null);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            ← Back
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            <Printer size={20} />
                            <span>Print Report</span>
                        </button>
                    </div>

                    {studentData && (
                        <div ref={reportRef} className="bg-white p-8 rounded-lg shadow-md text-black">
                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-bold text-black">Student Assessment Report</h1>
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    <div className="text-left">
                                        <p><span className="font-semibold text-black">Name:</span> {studentData.name}</p>
                                        <p><span className="font-semibold text-black">Class:</span> {studentData.class.name}</p>
                                    </div>
                                    <div className="text-left">
                                        <p><span className="font-semibold text-black">ID No:</span> {studentData.idNo}</p>
                                        <p><span className="font-semibold text-black">Section:</span> {studentData.section.name}</p>
                                    </div>
                                    <div className="text-left">
                                        <p><span className="font-semibold text-black ">Father Name:</span> {studentData.fatherName}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <table className="w-full border-collapse border border-gray-300 text-black">
                                    <thead>
                                        <tr className="bg-gray-100 text-black">
                                            <th className="border border-gray-300 p-2 text-black">Subject</th>
                                            {selectedExams.map(type => (
                                                <th key={type} className="border border-gray-300 p-2 text-black">{type}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subjects.map(subject => (
                                            <tr key={subject}>
                                                <td className="border border-gray-300 p-2 font-medium text-black">{subject}</td>
                                                {selectedExams.map(examType => {
                                                    const examResult = examResults.find(r => r.examType === examType);
                                                    const subjectResult = examResult?.results.find(s => s.name === subject);
                                                    return (
                                                        <td key={examType} className=" text-black border border-gray-300 p-2 text-center">
                                                            {subjectResult?.marks || '-'}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className="border border-gray-300 p-2 font-medium text-black">Total Marks Obtained</td>
                                            {selectedExams.map(examType => {
                                                const examResult = examResults.find(r => r.examType === examType);
                                                const total = examResult?.results.reduce((sum, subject) => sum + subject.marks, 0) || 0;
                                                return (
                                                    <td key={examType} className=" text-black border border-gray-300 p-2 text-center font-medium">
                                                        {total || '-'}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-2 font-medium text-black">Grade</td>
                                            {selectedExams.map(examType => {
                                                const examResult = examResults.find(r => r.examType === examType);
                                                const total = examResult?.results.reduce((sum, subject) => sum + subject.marks, 0) || 0;
                                                const maxTotal = examResult?.results.reduce((sum, subject) => sum + subject.maxMarks, 0) || 0;
                                                const percentage = maxTotal > 0 ? (total / maxTotal) * 100 : 0;
                                                return (
                                                    <td key={examType} className="border border-gray-300 p-2 text-center font-medium text-black">
                                                        {total ? calculateGrade(percentage) : '-'}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6">
                                <h3 className="font-semibold mb-2 text-black">Attendance</h3>
                                <table className="w-full border-collapse border border-gray-300 text-black">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            {months.map(month => (
                                                <th key={month} className="border border-gray-300 p-2 text-black">{month}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {months.map(month => {
                                                const monthData = attendance[month] || { present: 0, total: 0 };
                                                return (
                                                    <td key={month} className="border border-gray-300 p-2 text-center text-black">
                                                        {monthData.present}/{monthData.total}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8 grid grid-cols-3 gap-4">
                                <div className="text-center text-black">
                                    <p className="font-semibold text-black">Class Teacher's Signature</p>
                                    <div className="mt-8 border-t border-gray-400 text-black"></div>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold text-black">Principal's Signature</p>
                                    <div className="mt-8 border-t border-gray-400 text-black"></div>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold text-black">Parent's Signature</p>
                                    <div className="mt-8 border-t border-gray-400 text-black"></div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="font-semibold mb-2 text-black">Grade Scale</h3>
                                <table className="w-full border-collapse border border-gray-300 text-sm">
                                    <thead>
                                        <tr className="bg-gray-100 text-black">
                                            <th className="border border-gray-300 p-1 text-black">Grade</th>
                                            <th className="border border-gray-300 p-1 text-black">A1</th>
                                            <th className="border border-gray-300 p-1 text-black">A2</th>
                                            <th className="border border-gray-300 p-1 text-black">B1</th>
                                            <th className="border border-gray-300 p-1 text-black">B2</th>
                                            <th className="border border-gray-300 p-1 text-black">C1</th>
                                            <th className="border border-gray-300 p-1 text-black">C2</th>
                                            <th className="border border-gray-300 p-1 text-black">D</th>
                                            <th className="border border-gray-300 p-1 text-black">E</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-300 p-1 font-semibold text-black">Marks %</td>
                                            <td className="border border-gray-300 p-1 text-black">91-100</td>
                                            <td className="border border-gray-300 p-1 text-black">81-90</td>
                                            <td className="border border-gray-300 p-1 text-black">71-80</td>
                                            <td className="border border-gray-300 p-1 text-black">61-70</td>
                                            <td className="border border-gray-300 p-1 text-black">51-60</td>
                                            <td className="border border-gray-300 p-1 text-black">41-50</td>
                                            <td className="border border-gray-300 p-1 text-black">35-40</td>
                                            <td className="border border-gray-300 p-1 text-black">0-34</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProgressReport;