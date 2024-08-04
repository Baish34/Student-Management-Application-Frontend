import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    const response = await axios.get(
      "https://d1e1b103-ca20-4b8f-8480-40ec65921b39-00-3uxv6fen0d71b.janeway.replit.dev/teachers",
    );
    return response.data;
  },
);

export const addTeacher = createAsyncThunk(
  "teachers/addTeacher",
  async (teacher) => {
    const response = await axios.post(
      "https://d1e1b103-ca20-4b8f-8480-40ec65921b39-00-3uxv6fen0d71b.janeway.replit.dev/teachers",
      teacher,
    );
    return response.data;
  },
);

export const deleteTeacher = createAsyncThunk(
  "teachers/deleteTeacher",
  async (id) => {
    await axios.delete(
      `https://d1e1b103-ca20-4b8f-8480-40ec65921b39-00-3uxv6fen0d71b.janeway.replit.dev/teachers/${id}`,
    );
    return id;
  },
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    teachers: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.teachers.push(action.payload);
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter(
          (teacher) => teacher._id !== action.payload,
        );
      });
  },
});

export default teachersSlice.reducer;
