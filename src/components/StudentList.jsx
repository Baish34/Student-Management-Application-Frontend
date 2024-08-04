import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StudentList = () => {
  const students = useSelector((state) => state.students.students);

  return (
    <div>
      <h2 className="mt-3">Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <Link to={`/student-details/${student._id}`}>{student.name} (Age:{student.age})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;

// Create a studentform component for adding new students and to edit student details. Name, age, grade, gender(as radio buttons), attendance, marks. When a user clicks on the add student button from the student view, a form should appear to add student which includes name, age, grade , gender and a add button. And when user clicks on any student from the studentList in the studentview then there will be the details of that student and a edit details button. When the user clicks on the edit details button, a form will appear with name age gender grade marks and attendance and a update button. Name, age and grade will be pre-filled and user can edit marks, attendance and gender and when user clicks on update button, then the data should be updated in the database.
