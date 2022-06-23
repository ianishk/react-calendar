import { createSlice } from "@reduxjs/toolkit";

const currentDate = new Date()
const [year, month, date] = [currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()]

const dateSlice = createSlice({
  name: "date",
  initialState: {
    selectedDate: {
        year,
        month,
        date
    }
  },
  reducers: {
    selectDate: (state, action) => {
      state.selectedDate = action.payload;
      
    }
  }
});

export const { selectDate } = dateSlice.actions;
export default dateSlice.reducer;
