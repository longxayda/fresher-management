import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "utils";

const NewOutputsReportSlice = createSlice({
	name: "NewOutputsReportSlice",
	initialState: {
		status: "",
		statusContent: "",
		outputsReport: [],
	},
	reducers: {
		changeOutputs: (state, action) => {
			state.outputsReport = state.outputsReport.map((item) => {
				if (item.courseCode === action.payload.courseCode) {
					return action.payload;
				} else {
					return item;
				}
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postOutputsReport.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(postOutputsReport.fulfilled, (state, action) => {
				state.outputsReport = action.payload;
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data fetch failed"
						: "Data is fetched successfully";
			});
	},
});

export const postOutputsReport = createAsyncThunk(
	"outputsReport/postOutputsReport",
	async (value) => {
		try {
			await axios.post(`${BASE_URL}/api/report/outputs`, value);
			return [];
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);

const {actions, reducer} = NewOutputsReportSlice;

export const {changeoutputs} = actions;
export default reducer;
