import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "utils";
const OutputsReportTableSlice = createSlice({
	name: "OutputsReportTableSlice",
	initialState: {
		status: "",
		statusContent: "",
		outputsReport: [],
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
			.addCase(fetchOutputsReport.pending, (state, action) => {
				state.status = "";
			})
			.addCase(fetchOutputsReport.fulfilled, (state, action) => {
				state.numPage = action.payload?.numPage || 1;
				state.outputsReport = action.payload?.outputReportEntityList || [];
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data fetch failed"
						: "Data is fetched successfully";
			})
			.addCase(updateOutputsReport.pending, (state, action) => {
				state.status = "";
			})
			.addCase(updateOutputsReport.fulfilled, (state, action) => {
				state.outputsReport = state.outputsReport.map((item) => {
					if (item.id === action.payload.id) {
						return action.payload;
					} else {
						return item;
					}
				});
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data update failed"
						: "Data is updated successfully";
			})
			.addCase(deleteOutputsReport.pending, (state, action) => {
				state.status = "";
			})
			.addCase(deleteOutputsReport.fulfilled, (state, action) => {
				state.outputsReport = state.outputsReport.filter(
					(item) => !action.payload.includes(Number(item.id))
				);
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data delete failed"
						: "Data is deleted successfully";
			})
			.addCase(searchOutputsReport.pending, (state, action) => {
				state.status = "";
			})
			.addCase(searchOutputsReport.fulfilled, (state, action) => {
				state.outputsReport = action.payload;
				state.status = "";
			});
	},
});

export const fetchOutputsReport = createAsyncThunk(
	"OutputsReport/fetchOutputsReport",
	async ({page, num}) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/outputs?page=${page}&num=${num}`
			);

			return res.data;
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);

export const updateOutputsReport = createAsyncThunk(
	"Report/updateOutputsReport",
	async (value) => {
		try {
			const {id, reportName} = value;
			const newValue = {id, reportName};

			const res = await axios.put(`${BASE_URL}/api/report/outputs`, newValue);

			return value;
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);

export const deleteOutputsReport = createAsyncThunk(
	"Report/deleteOutputsReport ",
	async (value) => {
		try {
			const res = await axios.post(`${BASE_URL}/api/report/outputs/delete`, {
				listId: value,
			});
			return value;
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);
export const searchOutputsReport = createAsyncThunk(
	"Report/searchOutputsReport",
	async (value) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/outputs/search?keyword=${value}`
			);

			return res.data?.outputReportEntityList || [];
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);

const {actions, reducer} = OutputsReportTableSlice;

export const {newReportItem} = actions;
export default reducer;
