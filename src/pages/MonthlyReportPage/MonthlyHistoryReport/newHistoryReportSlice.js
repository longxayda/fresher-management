import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "utils";

const NewHistoryReportSlice = createSlice({
	name: "NewHistoryReportSlice",
	initialState: {
		status: "idle",
		coursesReport: [],
		reportItem: {},
	},
	reducers: {
		changeCourses: (state, action) => {
			state.coursesReport = state.coursesReport.map((item) => {
				if (item.courseCode === action.payload.courseCode) {
					return action.payload;
				} else {
					return item;
				}
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postHistoryReport.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(postHistoryReport.fulfilled, (state, action) => {
				state.coursesReport = action.payload;
				state.status = "idle";
			});
	},
});

export const postHistoryReport = createAsyncThunk(
	"coursesReport/postHistoryReport",
	async (value) => {
		try {
			const res = await axios.post(`${BASE_URL}/api/report/history`, value);
			return [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

const {actions, reducer} = NewHistoryReportSlice;

export const {changeCourses} = actions;
export default reducer;
