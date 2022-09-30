import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "utils";

const financeReportSlice = createSlice({
	name: "financeReport",
	initialState: {
		status: "idle",
		financeReportList: [],
	},
	reducers: {
		deleteFinanceReport: (state, action) => {
			state.classNameInfoList = state.financeReportList.filter((item) => {
				return !action.payload.includes(Number(item.id));
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFinanceReport.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchFinanceReport.fulfilled, (state, action) => {
				state.financeReportList = action.payload;
				state.status = "idle";
			})
			.addCase(deleteFinanceReportList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(deleteFinanceReportList.fulfilled, (state, action) => {
				state.financeReportList = state.financeReportList.filter(
					(item) => !action.payload.includes(Number(item.id))
				);
				state.status = "idle";
			});
	},
});

export const fetchFinanceReport = createAsyncThunk(
	"financeReport/fetchFinanceReport",
	async (date) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/history/sheet/finance-obligation/data`
			);
			return res.data.financeObligationReportItemResponseList || [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

export const updatefinancesReportList = createAsyncThunk(
	"reportList/updatefinancesReportList",
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

export const deleteFinanceReportList = createAsyncThunk(
	"reportList/deletefinancesReportList ",
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

const {actions, reducer} = financeReportSlice;

export const {newReportItem} = actions;
export default reducer;
