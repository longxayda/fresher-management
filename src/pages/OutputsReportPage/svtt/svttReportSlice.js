import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "utils";

const SVTTReportSlice = createSlice({
	name: "SVTTReportSlice",
	initialState: {
		status: "",
		statusContent: "",
		svttReportList: [],
	},
	reducers: {
		changeSVTT: (state, action) => {
			state.svttReportList = state.svttReportList.map((item) => {
				if (item.id === action.payload.id) {
					return action.payload;
				} else {
					return item;
				}
			});
		},
		deleteSVTTReportList: (state, action) => {
			state.svttReportList = state.svttReportList.filter((item) => {
				return !action.payload.includes(Number(item.id));
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSVTTReportList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchSVTTReportList.fulfilled, (state, action) => {
				state.svttReportList = action.payload;
				state.outputsReport = action.payload;
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data fetch failed"
						: "Data is fetched successfully";
			});
	},
});

export const fetchSVTTReportList = createAsyncThunk(
	"svttReportList/fetchSVTTReportList",
	async (month) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/outputs/sheet/svtt/${month}/data`
			);
			console.log(res?.data);
			return res?.data?.outputReportItemEntityList || [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

const {actions, reducer} = SVTTReportSlice;

export const {changeSVTT, deleteSVTTReportList} = actions;
export default reducer;
