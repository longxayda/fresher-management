import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "utils";

const DetailReportTableSlice = createSlice({
	name: "DetailReportTable",
	initialState: {
		status: "",
		statusContent: "",
		detailReportList: [],
		detailReportItem: {},
		deleteDetailList: [],
		numPage: 1,
	},
	reducers: {
		updateItem: (state, action) => {
			state.detailReportList = action.payload;
		},
		addItem: (state, action) => {
			state.detailReportItem = action.payload;
		},
		destroyDetailList: (state, action) => {
			state.deleteDetailList = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDetailReportList.pending, (state, action) => {
				state.status = "";
			})
			.addCase(fetchDetailReportList.fulfilled, (state, action) => {
				state.numPage = action.payload?.numPage || 1;
				state.detailReportList = action.payload?.weeklyReportItemList || [];
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data fetch failed"
						: "Data is fetched successfully";
			})
			.addCase(updateDetailReportList.pending, (state, action) => {
				state.status = "";
			})
			.addCase(updateDetailReportList.fulfilled, (state, action) => {
				state.detailReportList = action.payload;
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data update failed"
						: "Data is updated successfully";
			})
			.addCase(destroyDetailReportList.pending, (state, action) => {
				state.status = "";
			})
			.addCase(destroyDetailReportList.fulfilled, (state, action) => {
				state.detailReportList = state.detailReportList.filter(
					(item) => !action.payload.includes(Number(item.id))
				);
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data delete failed"
						: "Data is deleted successfully";
			});
	},
});
export const fetchDetailReportList = createAsyncThunk(
	"reportListDetail/fetchDetailReportList",
	async ({weeklyReportId, page, num}) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/weekly/${weeklyReportId}?page=${page}&num=${num}`
			);
			return res.data;
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);

export const updateDetailReportList = createAsyncThunk(
	"reportList/updateDetailReportList",
	async (reportList) => {
		try {
			let newValue = [];
			reportList.forEach((item) => {
				const {admin, trainer, updateBy, updateAt, note, id} = item;
				newValue.push({admin, trainer, updateBy, updateAt, note, id});
			});
			const res = await axios.put(
				`${BASE_URL}/api/report/weekly/items`,
				newValue
			);
			return reportList;
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);

export const destroyDetailReportList = createAsyncThunk(
	"reportList/destroyDetailReportList",
	async (value) => {
		try {
			const res = await axios.post(
				`${BASE_URL}/api/report/weekly/items/delete`,
				{
					listId: value,
				}
			);
			return value;
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);
const {actions, reducer} = DetailReportTableSlice;

export const {updateItem, addItem, destroyDetailList} = actions;
export default reducer;
