import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  checkedIDs: [],
};
const checkboxFRSlice = createSlice({
  name: "checkbox",
  initialState,
  reducers: {
    toggleCheckbox: (state, action) => {
      const id = action.payload;
      const index = state.checkedIDs.indexOf(id);
      if (index === -1) {
        state.checkedIDs.push(id);
      } else {
        state.checkedIDs.splice(index, 1);
      }
    },
    selectAllCheckbox: (state, action) => {
      // handle select all checkbox
      if (action.payload.checked) {
        state.checkedIDs = action.payload.idsArray;
      } else {
        state.checkedIDs = [];
      }
    },
    resetAllCheckbox: (state, action) => {
      state.checkedIDs = [];
    },
  },
});
export const { toggleCheckbox, selectAllCheckbox, resetAllCheckbox } =
  checkboxFRSlice.actions;
export default checkboxFRSlice.reducer;
