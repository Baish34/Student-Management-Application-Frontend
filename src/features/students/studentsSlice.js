import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(
      "https://d1e1b103-ca20-4b8f-8480-40ec65921b39-00-3uxv6fen0d71b.janeway.replit.dev/students",
    );
    return response.data;
  },
);

export const fetchStudentById = createAsyncThunk(
  "students/fetchStudentById",
  async (id) => {
    const response = await axios.get(
      `https://d1e1b103-ca20-4b8f-8480-40ec65921b39-00-3uxv6fen0d71b.janeway.replit.dev/students/${id}`,
    );
    return response.data;
  },
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (student) => {
    const response = await axios.post(
      "https://d1e1b103-ca20-4b8f-8480-40ec65921b39-00-3uxv6fen0d71b.janeway.replit.dev/students",
      student,
    );
    return response.data;
  },
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, ...student }) => {
    const response = await axios.put(
      `https://d1e1b103-ca20-4b8f-8480-40ec65921b39-00-3uxv6fen0d71b.janeway.replit.dev/students/${id}`,
      student,
    );
    return response.data;
  },
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await axios.delete(
      `https://d1e1b103-ca20-4b8f-8480-40ec65921b39-00-3uxv6fen0d71b.janeway.replit.dev/students/${id}`,
    );
    return id;
  },
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    error: null,
    filter: "All",
    sortBy: "name",
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchStudentById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.status = "succeeded";
        const student = action.payload;
        const existingStudent = state.students.find(
          (s) => s._id === student._id,
        );
        if (!existingStudent) {
          state.students.push(student);
        }
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const updatedStudent = action.payload;
        const existingStudent = state.students.find(
          (student) => student._id === updatedStudent._id,
        );
        if (existingStudent) {
          Object.assign(existingStudent, updatedStudent);
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student._id !== action.payload,
        );
      });
  },
});

export const { setFilter, setSortBy } = studentsSlice.actions;

export default studentsSlice.reducer;
