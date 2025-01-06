import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TeacherSidebar from './TeacherSideBar';

const TeacherLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen w-full ">
      <TeacherSidebar 
        isSidebarOpen={isSidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      <main 
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <div className="h-full min-h-screen w-full p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TeacherLayout;