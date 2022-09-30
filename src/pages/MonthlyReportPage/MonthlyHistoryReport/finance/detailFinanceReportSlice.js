import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "utils";

const DetailFinanceReportSlice = createSlice({
	name: "FinanceReportSlice",
	initialState: {
		status: "idle",
		detailFinanceReport: [],
		reportItem: {},
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDetailFinanceReport.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchDetailFinanceReport.fulfilled, (state, action) => {
				state.detailFinanceReport = action.payload;
				state.status = "idle";
			})
			.addCase(updateFinanceReportList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(updateFinanceReportList.fulfilled, (state, action) => {
				state.detailFinanceReport = action.payload;
				state.status = "idle";
			})
			.addCase(deleteFinanceReportList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(deleteFinanceReportList.fulfilled, (state, action) => {
				state.detailFinanceReport = state.detailFinanceReport.filter(
					(item) => !action.payload.includes(Number(item.id))
				);
				state.status = "idle";
			});
	},
});

export const fetchDetailFinanceReport = createAsyncThunk(
	"DetailFinanceReport/fetchDetailFinanceReport",
	async (reportId) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/history/sheet/finance-obligation/${reportId}`
			);
			return res.data.financeObligationReportItemResponseList || [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

export const updateFinanceReportList = createAsyncThunk(
	"reportList/updateFinanceReportList",
	async (value) => {
		try {
			const res = await axios.put(
				`${BASE_URL}/api/report/history/sheet/course/items`,
				value
			);
			return value;
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

export const deleteFinanceReportList = createAsyncThunk(
	"reportList/deleteFinanceReportList ",
	async (value) => {
		try {
			const res = await axios.post(
				`${BASE_URL}/api/report/history/sheet/course/items/delete`,
				value
			);
			return value.listId;
		} catch (error) {
			console.log(error);
		}
	}
);

const {actions, reducer} = DetailFinanceReportSlice;

export const {} = actions;
export default reducer;
