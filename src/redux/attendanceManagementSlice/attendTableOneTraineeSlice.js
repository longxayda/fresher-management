
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const attendTableOneTraineeSlice = createSlice({
  name: 'attendTableOneTraineeSlice',
  initialState: {
    classes: ['HCM22_CPL_REACT_01', 'HCM22_CPL_JAVA_01', 'HCM22_CPL_REACT_02'],
    months: ['June - 2022', 'July - 2022', 'August - 2022'],
    attendResponses: [
      {
        trainee_id: 76586282,
        firstName: "neck-eyciv",
        lastName: "bead-1v2sq",
        monthlyAttendanceResponses: [
          {
            "date": "2022-06-01",
            "status": "P"
          },
          {
            "date": "2022-06-02",
            "status": "P"
          },
          {
            "date": "2022-06-03",
            "status": "P"
          },
          {
            "date": "2022-06-06",
            "status": "P"
          },
          {
            "date": "2022-06-07",
            "status": "P"
          },
          {
            "date": "2022-06-08",
            "status": "P"
          },
          {
            "date": "2022-06-09",
            "status": "P"
          },
          {
            "date": "2022-06-10",
            "status": "P"
          },
          {
            "date": "2022-06-11",
            "status": "P"
          },

          {
            "date": "2022-06-14",
            "status": "P"
          },
          {
            "date": "2022-06-15",
            "status": "P"
          },
          {
            "date": "2022-06-16",
            "status": "P"
          },
          {
            "date": "2022-06-17",
            "status": "P"
          },
          {
            "date": "2022-06-18",
            "status": "P"
          },

          {
            "date": "2022-06-21",
            "status": "P"
          },
          {
            "date": "2022-06-22",
            "status": "P"
          },
          {
            "date": "2022-06-23",
            "status": "P"
          },

          {
            "date": "2022-06-25",
            "status": "P"
          },

          {
            "date": "2022-06-28",
            "status": "P"
          },
          {
            "date": "2022-06-29",
            "status": "P"
          },
          {
            "date": "2022-06-30",
            "status": "P"
          },

        ]
      },
      
    ],
  },
  reducers: {
  },
});

const { actions, reducer } = attendTableOneTraineeSlice;
export default reducer;