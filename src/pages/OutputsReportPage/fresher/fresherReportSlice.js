import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "utils";

const FresherReportSlice = createSlice({
	name: "FresherReportSlice",
	initialState: {
		status: "",
		statusContent: "",
		fresherReportList: [],
	},
	reducers: {
		changeFresher: (state, action) => {
			state.fresherReportList = state.fresherReportList.map((item) => {
				if (item.id === action.payload.id) {
					return action.payload;
				} else {
					return item;
				}
			});
		},
		deleteFresherReport: (state, action) => {
			state.fresherReportList = state.fresherReportList.filter((item) => {
				return !action.payload.includes(item.classCode);
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFresherReportList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchFresherReportList.fulfilled, (state, action) => {
				state.fresherReportList = action.payload;
				state.outputsReport = action.payload;
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data fetch failed"
						: "Data is fetched successfully";
			});
	},
});

export const fetchFresherReportList = createAsyncThunk(
	"FresherReportList/fetchFresherReportList",
	async (month) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/outputs/sheet/fresher/${month}/data`
			);

			return res.data.outputReportItemEntityList || [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

const {actions, reducer} = FresherReportSlice;

export const {changeFresher, deleteFresherReport} = actions;
export default reducer;
