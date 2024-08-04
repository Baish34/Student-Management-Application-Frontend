import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "../features/students/studentsSlice";
import schoolReducer from "../features/school/schoolSlice";
import teachersReducer from "../features/teachers/teacherSlice";

export default configureStore({
  reducer: {
    students: studentsReducer,
    school: schoolReducer,
    teachers: teachersReducer,
  },
});
