import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalStudents: 0,
  averageAttendance: 0,
  averageMarks: 0,
  topStudent: null,
  totalTeachers: 0,
};

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    updateSchoolStats: (state, action) => {
      state.totalStudents = action.payload.totalStudents;
      state.averageAttendance = action.payload.averageAttendance;
      state.averageMarks = action.payload.averageMarks;
    },
    setTopStudent: (state, action) => {
      state.topStudent = action.payload;
    },
    setTotalTeachers(state, action) {
      state.totalTeachers = action.payload;
    },
  },
});

export const { updateSchoolStats, setTopStudent, setTotalTeachers } =
  schoolSlice.actions;

export default schoolSlice.reducer;
