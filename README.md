# School Management System

This project is a **React-based School Management System** designed to manage and streamline various administrative and academic functionalities of a sc


-**BranchAdmin**
-**Teacher**
-**Student**


### General Features:
- **Home Page:** A landing page providing an overview of the school.
- **About Us Page:** Information about the school’s history and mission.
- **Contact Us Page:** Contact details for inquiries.
- **Login System:** Secure login for administrators, branch admins, teachers, and students.
- **Toast Notifications:** Integrated notifications using `react-toastify`.

### Main Admin Features:
- **Dashboard:** Overview of key statistics.
- **Branch Management:**
  - Create, view, and manage branches.
- **Branch Admin Management:**
  - View all branch administrators.

### Branch Admin Features:
- **Dashboard:** Detailed branch statistics.
- **Academic Year Management:**
  - Add and view academic years.
  - Add and view classes.
  - Add and view sections.
- **Exams and Marks:**
  - Create and view exam timetables.
  - Enter, update, and view marks.
  - Generate hall tickets.
- **Attendance Management:**
  - Add and view attendance records.
- **Enquiry Management:**
  - Create and view admission enquiries.
- **Fee Management:**
  - Define fee types.
  - View fee reports.
- **Teacher Management:**
  - Add, view, and assign teachers.
  - Track teacher performance.
- **Transport Management:**
  - Add towns and buses.
- **Progress Reports:**
  - Generate student progress reports.
- **Strength Reports:**
  - View strength reports.
- **Syllabus Management:**
  - Create and view syllabi.
- **Vehicle Reports:**
  - Generate transport vehicle reports.

### Teacher Features:
- **Dashboard:** Overview of teaching assignments and notifications.
- **Class Management:**
  - View class schedules.
- **Homework:**
  - Create and view homework assignments.
- **Portfolio:**
  - Edit teacher portfolios.
- **Marks Management:**
  - Enter and manage marks.
- **Attendance Management:**
  - View and update attendance.

### Student Features (Under Development):
- Ability to view timetables, marks, attendance, and progress reports.

## Project Structure

```
/src
|-- App.jsx
|-- index.jsx
|-- pages/
|   |-- Home.jsx
|   |-- Aboutus.jsx
|   |-- Contactus.jsx
|   |-- AdmissionEnquiry.jsx
|   |-- Feesubmission.jsx
|   |-- Login.jsx
|   |-- Mainadminlayout.jsx
|   |-- BranchAdminLayout.jsx
|
|-- components/
    |-- Mainadmin/
    |   |-- Dashboard.jsx
    |   |-- Branches/
    |   |   |-- CreateBranch.jsx
    |   |   |-- ViewBranches.jsx
    |   |-- BranchAdmin/
    |       |-- ViewBadmin.jsx
    |
    |-- BranchAdmin/
        |-- Dashboard.jsx
        |-- AcademicYears/
        |   |-- Add.jsx
        |   |-- View-all.jsx
        |-- Classes/
        |   |-- AddClass.jsx
        |   |-- ViewAll.jsx
        |-- Marks/
        |   |-- EnterMarks.jsx
        |   |-- UpdateMarks.jsx
        |   |-- ViewMarks.jsx
        |   |-- CreateHallTicket.jsx
        |-- Sections/
        |   |-- Addsection.jsx
        |   |-- Viewsec.jsx
        |-- Students/
        |   |-- AddStudents.jsx
        |   |-- StudentEdit.jsx
        |   |-- FeeReport.jsx
        |   |-- StudentsReports.jsx
        |-- Enquiry/
        |   |-- AddEnquiry.jsx
        |   |-- ViewEnquiry.jsx
        |-- Teachers/
        |   |-- AddTeacher.jsx
        |   |-- ViewTeachers.jsx
        |   |-- AssignTeachers.jsx
        |   |-- ViewPerformance.jsx
        |-- WorkingDays/
        |   |-- CreateWorkingDays.jsx
        |   |-- ViewWorkingDays.jsx
        |-- Syllabus/
        |   |-- CreateSyllabus.jsx
        |   |-- ViewSyllabus.jsx
        |-- VehicleReport/
        |   |-- ShowReport.jsx
        |-- StrengthReports/
        |   |-- StrengthReports.jsx
        |-- Attendance/
        |   |-- AddAttendance.jsx
        |   |-- ViewAttendance.jsx
        |-- ProgressReport/
            |-- ProgressReport.jsx

```



## Dependencies
- **React**
- **React Router Dom**
- **Bootstrap**
- **React Toastify**

## Usage
- Use the admin credentials to access the admin dashboard.
- Navigate through various pages to manage branches, teachers, students, and academic activities.

## Contribution
Contributions are welcome! Feel free to fork the repository and submit pull requests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For queries, contact Uday Kiran Pedda at peddaudaykiran1@gmail.com.

