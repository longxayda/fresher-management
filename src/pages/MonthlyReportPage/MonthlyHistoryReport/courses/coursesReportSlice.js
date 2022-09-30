import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "utils";

const coursesReportSlice = createSlice({
	name: "coursesReportSlice",
	initialState: {
		status: "idle",
		coursesReport: [],
		reportItem: {},
	},
	reducers: {
		changeCourses: (state, action) => {
			state.coursesReport = state.coursesReport.map((item) => {
				if (item.id === action.payload.id) {
					return action.payload;
				} else {
					return item;
				}
			});
		},
		deleteCoursesReport: (state, action) => {
			state.coursesReport = state.coursesReport.filter((item) => {
				return !action.payload.includes(Number(item.id));
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCoursesReport.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchCoursesReport.fulfilled, (state, action) => {
				state.coursesReport = action.payload;
				state.status = "idle";
			})
			.addCase(updatecoursesReportList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(updatecoursesReportList.fulfilled, (state, action) => {
				state.coursesReportList = state.coursesReportList.map((item) => {
					if (item.id === action.payload.id) {
						return action.payload;
					} else {
						return item;
					}
				});
				state.status = "idle";
			})
			.addCase(deletecoursesReportList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(deletecoursesReportList.fulfilled, (state, action) => {
				state.coursesReport = state.coursesReport.filter(
					(item) => !action.payload.includes(Number(item.id))
				);
				state.status = "idle";
			});
	},
});

export const fetchCoursesReport = createAsyncThunk(
	"coursesReport/fetchCoursesReport",
	async ({month, year}) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/history/sheet/courses/${month}/${year}/data`
			);

			return res.data.historyCourseEntityList;
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

export const updatecoursesReportList = createAsyncThunk(
	"reportList/updatecoursesReportList",
	async (value) => {
		try {
			const {id, reportName} = value;
			const newValue = {id, reportName};

			const res = await axios.put(`${BASE_URL}/api/report/history`, newValue);
			return value;
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

export const deletecoursesReportList = createAsyncThunk(
	"reportList/deletecoursesReportList ",
	async (value) => {
		try {
			const res = await axios.post(
				`${BASE_URL}/api/report/history/delete`,
				value
			);
			return value.listId;
		} catch (error) {
			console.log(error);
		}
	}
);

const {actions, reducer} = coursesReportSlice;

export const {changeCourses, deleteCoursesReport} = actions;
export default reducer;
