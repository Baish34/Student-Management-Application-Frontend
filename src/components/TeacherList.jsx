import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeacher } from "../features/teachers/teacherSlice";

const TeacherList = () => {
  const dispatch = useDispatch();
  const { teachers, status, error } = useSelector((state) => state.teachers);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="pt-3 pb-2">Teachers List</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher._id}>
            {teacher.name} - {teacher.age} - {teacher.gender} -{" "}
            {teacher.subject}
            <button
              onClick={() => dispatch(deleteTeacher(teacher._id))}
              className="btn btn-danger ms-2 mb-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
