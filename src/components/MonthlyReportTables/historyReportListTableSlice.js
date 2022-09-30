import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "utils";
const HistoryReportListTableSlice = createSlice({
	name: "HistoryReportListTableSlice",
	initialState: {
		status: "idle",
		historyReportList: [],
		reportItem: {},
		numPage: 1,
	},
	reducers: {
		newReportItem: (state, action) => {
			state.reportItem = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHistoryReportList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchHistoryReportList.fulfilled, (state, action) => {
				state.historyReportList =
					action.payload?.historyMonthlyReportEntityList || [];
				state.status = "idle";
				state.numPage = action.payload?.numPage || 1;
			})
			.addCase(updateHistoryReportList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(updateHistoryReportList.fulfilled, (state, action) => {
				state.historyReportList = state.historyReportList.map((item) => {
					if (item.id === action.payload.id) {
						return action.payload;
					} else {
						return item;
					}
				});
				state.status = "idle";
			})
			.addCase(deleteHistoryReportList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(deleteHistoryReportList.fulfilled, (state, action) => {
				state.historyReportList = state.historyReportList.filter(
					(item) => !action.payload.includes(Number(item.id))
				);
				state.status = "idle";
			})
			.addCase(searchHistoryReportList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(searchHistoryReportList.fulfilled, (state, action) => {
				state.historyReportList = action.payload;
				state.status = "idle";
			});
	},
});

export const fetchHistoryReportList = createAsyncThunk(
	"historyReportList/fetchHistoryReportList",
	async ({page, num}) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/history?page=${page}&num=${num}`
			);

			return res.data;
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

export const updateHistoryReportList = createAsyncThunk(
	"reportList/updateHistoryReportList",
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

export const deleteHistoryReportList = createAsyncThunk(
	"reportList/deleteHistoryReportList ",
	async (value) => {
		try {
			await axios.post(`${BASE_URL}/api/report/history/delete`, value);
			return value.listId;
		} catch (error) {
			console.log(error);
		}
	}
);
export const searchHistoryReportList = createAsyncThunk(
	"reportList/searchHistoryReportList",
	async (value) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/history/search?keyword=${value}`
			);

			return res.data?.historyMonthlyReportEntityList || [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

const {actions, reducer} = HistoryReportListTableSlice;

export const {newReportItem} = actions;
export default reducer;
