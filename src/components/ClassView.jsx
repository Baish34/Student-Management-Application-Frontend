import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  setFilter,
  setSortBy,
} from "../features/students/studentsSlice";
import Header from "./Header";

const ClassView = () => {
  const dispatch = useDispatch();
  const { students, filter, sortBy } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const filteredStudents = students.filter((student) => {
    if (filter === "All") return true;
    if (filter === "Boys") return student.gender === "Male";
    if (filter === "Girls") return student.gender === "Female";
    return true;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "marks") return b.marks - a.marks;
    if (sortBy === "attendance") return b.attendance - a.attendance;
    return 0;
  });

  return (
    <>
      <Header />
      <div className="container pt-3">
        <h1>Class View</h1>
        <div>
          <label className="pe-2">Filter by Gender:</label>
          <select value={filter} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
        </div>
        <br />
        <div>
          <label className="pe-2">Sort by:</label>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="marks">Marks</option>
            <option value="attendance">Attendance</option>
          </select>
        </div>
        <br />
        <ul>
          {sortedStudents.map((student) => (
            <li key={student._id}>
              <p>
                {student.name} - {student.gender} - Marks: {student.marks} -
                Attendance: {student.attendance}
              </p>{" "}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ClassView;
