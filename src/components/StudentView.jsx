import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/students/studentsSlice";
import Header from "./Header";
import StudentList from "./StudentList";
import { Link } from "react-router-dom";

const StudentView = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.students);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [dispatch, status]);

  return (
    <div>
      <Header />
      <div className="container mt-3">
        {status === "loading" && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <h1>Student View</h1>
        <Link
          to="/add-student"
          className="btn btn-warning text-primary"
          style={{ textDecoration: "underline" }}
        >
          Add Student
        </Link>
        <StudentList />
      </div>
    </div>
  );
};

export default StudentView;
