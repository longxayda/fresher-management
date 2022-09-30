import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "utils";

const DetailOutputsReportSlice = createSlice({
	name: "DetaildetailOutputsReportSlice",
	initialState: {
		status: "",
		statusContent: "",
		detailOutputsReport: [],
	},
	reducers: {
		changeOutputs: (state, action) => {
			state.detailOutputsReport = state.detailOutputsReport.map((item) => {
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
			.addCase(updateDetailOutputsReport.pending, (state, action) => {
				state.status = "";
			})
			.addCase(updateDetailOutputsReport.fulfilled, (state, action) => {
				state.detailOutputsReport = action.payload;
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data update failed"
						: "Data is updated successfully";
			});
	},
});

export const updateDetailOutputsReport = createAsyncThunk(
	"reportList/updateDetaiOutputsReport",
	async (value) => {
		try {
			const res = await axios.put(
				`${BASE_URL}/api/report/outputs/items`,
				value
			);
			return [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

const {actions, reducer} = DetailOutputsReportSlice;

export const {changeoutputs} = actions;
export default reducer;
