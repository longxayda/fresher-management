import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "utils";

const DetailFresherReportSlice = createSlice({
	name: "DetailFresherReportSlice",
	initialState: {
		status: "",
		statusContent: "",
		detailFresherReport: [],
		numPage: 1,
	},
	reducers: {
		updateDetailFresherReport: (state, action) => {
			state.detailFresherReport = state.detailFresherReport.map((item) => {
				if (item.id === action.payload.id) {
					return action.payload;
				} else {
					return item;
				}
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDetailFresherReport.pending, (state, action) => {
				state.status = "";
			})
			.addCase(fetchDetailFresherReport.fulfilled, (state, action) => {
				state.detailFresherReport =
					action.payload?.outputReportItemEntityList || [];
				state.numPage = action.payload?.numPage || 1;
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data fetch failed"
						: "Data is fetched successfully";
			})
			.addCase(deleteDetailFresherReport.pending, (state, action) => {
				state.status = "";
			})
			.addCase(deleteDetailFresherReport.fulfilled, (state, action) => {
				state.detailFresherReport = state.detailFresherReport.filter(
					(item) => !action.payload.includes(Number(item.id))
				);
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data delete failed"
						: "Data is deleted successfully";
			})
			.addCase(searchDetailFresherReport.pending, (state, action) => {
				state.status = "";
			})
			.addCase(searchDetailFresherReport.fulfilled, (state, action) => {
				state.detailFresherReport =
					action.payload?.outputReportItemEntityList.filter(
						(item) => !item.isSheetSVTT
					) || [];
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data delete failed"
						: "Data is deleted successfully";
			});
	},
});

export const fetchDetailFresherReport = createAsyncThunk(
	"DetailFresherReport/fetchDetailFresherReport",
	async ({id, page, num}) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/outputs/sheet/fresher/${id}?page=${page}&num=${num}`
			);
			return res.data;
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);

export const deleteDetailFresherReport = createAsyncThunk(
	"detailFresherReport/deleteDetailFresherReport ",
	async (value) => {
		try {
			await axios.post(`${BASE_URL}/api/report/outputs/items/delete`, {
				listId: value,
			});

			return value;
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);

export const searchDetailFresherReport = createAsyncThunk(
	"Report/searchDetailFresherReport",
	async ({outputId, value}) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/outputs/${outputId}/items/search?keyword=${value}`
			);
			console.log(res.data);
			return res.data;
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);

const {actions, reducer} = DetailFresherReportSlice;

export const {updateDetailFresherReport} = actions;
export default reducer;
