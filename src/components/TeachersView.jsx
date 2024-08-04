import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../features/teachers/teacherSlice";
import Header from "./Header";
import TeacherList from "./TeacherList";
import { Link } from "react-router-dom";

const TeachersView = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.teachers);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTeachers());
    }
  }, [dispatch, status]);

  return (
    <div>
      <Header />
      <div className="container mt-3">
        {status === "loading" && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <h1 className="mb-2">Teachers View</h1>
        <Link
          to="/add-teacher"
          className="btn btn-warning text-primary"
          style={{ textDecoration: "underline" }}
        >
          Add Teacher
        </Link>
        <TeacherList />
      </div>
    </div>
  );
};

export default TeachersView;
