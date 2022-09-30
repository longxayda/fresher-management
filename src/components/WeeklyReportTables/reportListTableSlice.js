import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {formatDate} from "utils";

import {BASE_URL} from "utils";

const ReportListTableSlice = createSlice({
	name: "ReportListTable",
	initialState: {
		status: "",
		statusContent: "",
		reportList: [],
		deleteList: [],
		numPage: 1,
	},
	reducers: {
		deleteReportList: (state, action) => {
			state.deleteList = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchReportList.pending, (state, action) => {
				state.status = "";
			})
			.addCase(fetchReportList.fulfilled, (state, action) => {
				state.reportList = action.payload?.weeklyReportEntityList || [];
				state.numPage = action.payload?.numPage || 1;
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data fetch failed"
						: "Data is fetched successfully";
			})
			.addCase(destroyReportList.pending, (state, action) => {
				state.status = "";
			})
			.addCase(destroyReportList.fulfilled, (state, action) => {
				state.reportList = state.reportList.filter(
					(item) => !action.payload.includes(Number(item.id))
				);
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data delete failed"
						: "Data is deleted successfully";
			})
			.addCase(filterDateReportList.pending, (state, action) => {
				state.status = "";
			})
			.addCase(filterDateReportList.fulfilled, (state, action) => {
				state.reportList = action.payload;
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data delete failed"
						: "Data is deleted successfully";
			})
			.addCase(updateReportList.fulfilled, (state, action) => {
				let currentItem = state.reportList.find(
					(item) => item.id === action.payload
				);
				currentItem = action.payload;
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data update failed"
						: "Data is updated successfully";
			});
	},
});
export const fetchReportList = createAsyncThunk(
	"reportList/fetchReportList",
	async ({page, num}) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/weekly?page=${page}&num=${num}`
			);
			return res.data;
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);

export const updateReportList = createAsyncThunk(
	"reportList/updateReportList",
	async (value) => {
		try {
			const res = await axios.put(`${BASE_URL}/api/report/weekly`, value);
			return res.data;
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);

export const destroyReportList = createAsyncThunk(
	"reportList/destroyReportList",
	async (value) => {
		try {
			await axios.post(`${BASE_URL}/api/report/weekly/delete`, {
				listId: value,
			});
			return value;
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);
export const filterDateReportList = createAsyncThunk(
	"reportList/filterDateReportList",
	async ({startDate, endDate}) => {
		try {
			const start = formatDate(startDate);
			const end = formatDate(endDate);
			const res = await axios.get(
				`${BASE_URL}/api/report/weekly/${start}/${end}`
			);
			return res?.data?.weeklyReportEntityList || [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

const {actions, reducer} = ReportListTableSlice;

export const {deleteReportList} = actions;
export default reducer;
