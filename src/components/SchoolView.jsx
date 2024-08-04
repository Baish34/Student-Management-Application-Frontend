import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/students/studentsSlice";
import { fetchTeachers } from "../features/teachers/teacherSlice";
import {
  updateSchoolStats,
  setTopStudent,
  setTotalTeachers,
} from "../features/school/schoolSlice";
import Header from "./Header";

const SchoolView = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const { teachers } = useSelector((state) => state.teachers);
  const {
    totalStudents,
    averageAttendance,
    averageMarks,
    topStudent,
    totalTeachers,
  } = useSelector((state) => state.school);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    if (students.length > 0) {
      const totalStudents = students.length;
      const sumAttendance = students.reduce(
        (sum, student) => sum + (student.attendance || 0),
        0,
      );
      const sumMarks = students.reduce(
        (sum, student) => sum + (student.marks || 0),
        0,
      );
      const averageAttendance = (sumAttendance / totalStudents).toFixed(2);
      const averageMarks = (sumMarks / totalStudents).toFixed(2);
      const topStudent = students.reduce(
        (prev, current) => (prev.marks > current.marks ? prev : current),
        {},
      );

      dispatch(
        updateSchoolStats({ totalStudents, averageAttendance, averageMarks }),
      );
      dispatch(setTopStudent(topStudent));
    }
  }, [students, dispatch]);

  useEffect(() => {
    if (teachers.length > 0) {
      const totalTeachers = teachers.length;
      dispatch(setTotalTeachers(totalTeachers));
    }
  }, [teachers, dispatch]);

  return (
    <>
      <Header />
      <div className="container pt-3">
        <h1>School View</h1>
        <p>Total Students: {totalStudents}</p>
        <p>Average Attendance: {averageAttendance}</p>
        <p>Average Marks: {averageMarks}</p>
        <p>Top Student: {topStudent ? topStudent.name : "-"}</p>
        <p>Total Teachers: {totalTeachers}</p>
      </div>
    </>
  );
};

export default SchoolView;
