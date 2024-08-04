import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  fetchStudentById,
  deleteStudent,
} from "../features/students/studentsSlice";
import Header from "./Header";

const StudentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentId } = useParams();
  const { students, status, error } = useSelector((state) => state.students);

  const studentData = students.find((student) => student._id === studentId);
  console.log("Student data:", studentData);

  useEffect(() => {
    if (!studentData) {
      dispatch(fetchStudentById(studentId));
    }
  }, [dispatch, studentId, studentData]);

  const handleDelete = () => {
    dispatch(deleteStudent(studentId)).then(() => {
      navigate("/");
    });
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Header />
      {studentData ? (
        <div className="container pt-3">
          <h1>Student Detail</h1>
          <p>Name: {studentData.name}</p>
          <p>Age: {studentData.age}</p>
          <p>Grade: {studentData.grade}</p>
          <p>Attendance: {studentData.attendance}</p>
          <p>Marks: {studentData.marks}</p>
          <Link
            to={`/edit-student/${studentId}`}
            className="btn btn-warning text-primary"
            style={{ textDecoration: "underline", marginRight: "10px" }}
          >
            Edit Details
          </Link>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      ) : (
        <p>Student not found</p>
      )}
    </>
  );
};

export default StudentDetails;
