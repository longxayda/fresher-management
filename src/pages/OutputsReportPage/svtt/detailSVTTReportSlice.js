import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "utils";

const DetailSVTTReportSlice = createSlice({
	name: "DetailSVTTReportSlice",
	initialState: {
		status: "",
		statusContent: "",
		detailSVTTReport: [],
		numPage: 1,
	},
	reducers: {
		updateDetailSVTTReport: (state, action) => {
			state.detailSVTTReport = state.detailSVTTReport.map((item) => {
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
			.addCase(fetchDetailSVTTReport.pending, (state, action) => {
				state.status = "";
			})
			.addCase(fetchDetailSVTTReport.fulfilled, (state, action) => {
				state.detailSVTTReport =
					action.payload?.outputReportItemEntityList || [];
				state.numPage = action.payload?.numPage || 1;
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data fetch failed"
						: "Data is fetched successfully";
			})
			.addCase(deleteDetailSVTTReport.pending, (state, action) => {
				state.status = "";
			})
			.addCase(deleteDetailSVTTReport.fulfilled, (state, action) => {
				state.detailSVTTReport = state.detailSVTTReport.filter(
					(item) => !action.payload.includes(Number(item.id))
				);
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data delete failed"
						: "Data is deleted successfully";
			})
			.addCase(searchDetailSVTTReport.pending, (state, action) => {
				state.status = "";
			})
			.addCase(searchDetailSVTTReport.fulfilled, (state, action) => {
				state.detailSVTTReport =
					action.payload?.outputReportItemEntityList.filter(
						(item) => item.isSheetSVTT === true
					) || [];
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data delete failed"
						: "Data is deleted successfully";
			});
	},
});

export const fetchDetailSVTTReport = createAsyncThunk(
	"DetailSVTTReport/fetchDetailSVTTReport",
	async ({id, page, num}) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/outputs/sheet/svtt/${id}?page=${page}&num=${num}`
			);
			console.log(res.data);
			return res.data;
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);

export const deleteDetailSVTTReport = createAsyncThunk(
	"detailSVTTReport/deleteDetailSVTTReport ",
	async (value) => {
		try {
			await axios.post(`${BASE_URL}/api/report/outputs/items/delete`, {
				listId: value,
			});
			return value;
		} catch (error) {
			console.log(error);
			error.name;
		}
	}
);

export const searchDetailSVTTReport = createAsyncThunk(
	"Report/searchDetailSVTTReport",
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
const {actions, reducer} = DetailSVTTReportSlice;

export const {updateDetailSVTTReport} = actions;
export default reducer;
