import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchStudentById,
  addStudent,
  updateStudent,
} from "../features/students/studentsSlice";
import Header from "./Header";

const StudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentId } = useParams();
  const { students, status } = useSelector((state) => state.students);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
    gender: "",
    attendance: "",
    marks: "",
  });

  const studentData = students.find((student) => student._id === studentId);

  useEffect(() => {
    if (studentId && !studentData) {
      dispatch(fetchStudentById(studentId));
    } else if (studentData) {
      setFormData({
        name: studentData.name,
        age: studentData.age,
        grade: studentData.grade,
        gender: studentData.gender,
        attendance: studentData.attendance,
        marks: studentData.marks,
      });
    }
  }, [dispatch, studentId, studentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (studentId) {
      dispatch(updateStudent({ id: studentId, ...formData }));
    } else {
      dispatch(addStudent(formData));
    }
    navigate("/");
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="container pt-3">
        <h1>{studentId ? "Edit Student" : "Add Student"}</h1>
        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="text"
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="Grade"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label className="me-2">Gender:</label>
            <div className="radio-group form-check-inline pb-3">
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                className="me-2"
                required
              />
              <label htmlFor="male"> Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                className="mx-2"
                required
              />
              <label htmlFor="female"> Female</label>
            </div>
          </div>
          {studentId && (
            <>
              <div className="form-group">
                <input
                  type="number"
                  id="attendance"
                  name="attendance"
                  value={formData.attendance}
                  placeholder="Attendance"
                  onChange={handleChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="number"
                  id="marks"
                  name="marks"
                  value={formData.marks}
                  placeholder="Marks"
                  onChange={handleChange}
                />
              </div>
              <br />
            </>
          )}
          <button type="submit" className="btn btn-primary">
            {studentId ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </>
  );
};

export default StudentForm;
