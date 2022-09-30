import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "utils";
const AddNewReportTableSlice = createSlice({
	name: "AddNewReportTable",
	initialState: {
		status: "idle",
		adminList: [],
		trainerList: [],
		modal: false,
	},
	reducers: {
		ToggleModal: (state, action) => {
			state.modal = action.payload;
		}, // action creators
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAdminList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchAdminList.fulfilled, (state, action) => {
				state.adminList = action.payload;
				state.status = "idle";
			})
			.addCase(fetchTrainerList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchTrainerList.fulfilled, (state, action) => {
				state.trainerList = action.payload;
				state.status = "idle";
			});
	},
});
export const fetchAdminList = createAsyncThunk(
	"admins/fetchAdminList",
	async (classId) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/class/${classId}/admins`
			);
			return res.data;
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);
export const fetchTrainerList = createAsyncThunk(
	"trainers/fetchTrainerList",
	async (classId) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/class/${classId}/trainers`
			);
			return res.data;
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

const {actions, reducer} = AddNewReportTableSlice;

export const {ToggleModal} = actions;
export default reducer;
