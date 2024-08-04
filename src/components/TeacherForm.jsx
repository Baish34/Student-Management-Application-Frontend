import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTeacher } from "../features/teachers/teacherSlice";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const TeacherForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    subject: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTeacher(formData));
    navigate("/teachers");
  };

  return (
    <>
      <Header />
      <div className="container pt-3">
        <h1>Add Teacher</h1>
        <form onSubmit={handleSubmit} className="teacher-form">
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
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
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
            <br />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default TeacherForm;
