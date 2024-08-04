import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentView from "./components/StudentView";
import StudentDetails from "./components/StudentDetails";
import StudentForm from "./components/StudentForm";
import ClassView from "./components/ClassView";
import SchoolView from "./components/SchoolView";
import TeachersView from "./components/TeachersView";
import TeacherForm from "./components/TeacherForm";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<StudentView />} />
          <Route
            path="/student-details/:studentId"
            element={<StudentDetails />}
          />
          <Route path="/add-student" element={<StudentForm />} />
          <Route path="/edit-student/:studentId" element={<StudentForm />} />
          <Route path="/class-view" element={<ClassView />} />
          <Route path="/school-view" element={<SchoolView />} />
          <Route path="/teachers" element={<TeachersView />} />
          <Route path="/add-teacher" element={<TeacherForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
