import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessages } from "./counterAPI";

const initialState = {
  messages: [],
};

export const getUserAsync = createAsyncThunk(
  "user/getUser",
  async ({ _ }, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await getMessages();

      return response.data.messages;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    dummy: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {})
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(getUserAsync.rejected, (state, action) => {});
  },
});

export const { dummy } = counterSlice.actions;

export const counterState = (state) => state.counter;

export default counterSlice.reducer;
