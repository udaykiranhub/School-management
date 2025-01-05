import React, { useState, useEffect } from 'react';
import { Book, Users, ClipboardList, Clock } from 'lucide-react';

const TeacherDashboard = () => {
  const [stats, setStats] = useState({
    totalClasses: 0,
    totalStudents: 0,
    upcomingExams: 0,
    attendancePercentage: 0
  });

  // TODO: Fetch actual stats from your API
  useEffect(() => {
    // Simulated data for now
    setStats({
      totalClasses: 5,
      totalStudents: 150,
      upcomingExams: 2,
      attendancePercentage: 92
    });
  }, []);

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Teacher Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Book}
          title="Total Classes"
          value={stats.totalClasses}
          color="bg-blue-500"
        />
        <StatCard
          icon={Users}
          title="Total Students"
          value={stats.totalStudents}
          color="bg-green-500"
        />
        <StatCard
          icon={ClipboardList}
          title="Upcoming Exams"
          value={stats.upcomingExams}
          color="bg-yellow-500"
        />
        <StatCard
          icon={Clock}
          title="Attendance Rate"
          value={`${stats.attendancePercentage}%`}
          color="bg-purple-500"
        />
      </div>

      {/* Add more dashboard content here */}
    </div>
  );
};

export default TeacherDashboard;