import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "utils";

const DetailCoursesReportSlice = createSlice({
	name: "coursesReportSlice",
	initialState: {
		status: "",
		statusContent: "",
		detailCoursesReport: [],
		detailCoursesReportItem: {},
		numPage: 1,
	},
	reducers: {
		addItem: (state, action) => {
			state.detailCoursesReportItem = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDetailCoursesReport.pending, (state, action) => {
				state.status = "";
			})
			.addCase(fetchDetailCoursesReport.fulfilled, (state, action) => {
				console.log(action.payload);
				state.detailCoursesReport =
					action.payload?.historyCourseEntityList || [];
				state.numPage = action.payload?.numPage || 1;
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data fetch failed"
						: "Data is fetched successfully";
			})
			.addCase(updateCoursesReportList.pending, (state, action) => {
				state.status = "";
			})
			.addCase(updateCoursesReportList.fulfilled, (state, action) => {
				state.detailCoursesReport = action.payload;
				action.payload === "AxiosError" || "undefined" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError" || "undefined"
						? "Data update failed"
						: "Data is update successfully";
			})
			.addCase(deleteCoursesReportList.pending, (state, action) => {
				state.status = "";
			})
			.addCase(deleteCoursesReportList.fulfilled, (state, action) => {
				state.detailCoursesReport = state.detailCoursesReport.filter(
					(item) => !action.payload.includes(Number(item.id))
				);
				action.payload === "AxiosError" || "undefined" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError" || "undefined"
						? "Data delete failed"
						: "Data is deleted successfully";
			});
	},
});

export const fetchDetailCoursesReport = createAsyncThunk(
	"DetailCoursesReport/fetchDetailCoursesReport",
	async ({id, page, num}) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/history/sheet/courses/${id}?page=${page}&num=${num}`
			);
			return res.data;
		} catch (error) {
			console.log(error.name);
			return error.name;
		}
	}
);

export const updateCoursesReportList = createAsyncThunk(
	"reportList/updateCoursesReportList",
	async (value) => {
		try {
			const res = await axios.put(
				`${BASE_URL}/api/report/history/sheet/course/items`,
				value
			);
			return value;
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);

export const deleteCoursesReportList = createAsyncThunk(
	"reportList/deletecoursesReportList ",
	async (value) => {
		try {
			await axios.post(
				`${BASE_URL}/api/report/history/sheet/course/items/delete`,
				{listId: value}
			);
			return value;
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);
const {actions, reducer} = DetailCoursesReportSlice;

export const {addItem} = actions;
export default reducer;
