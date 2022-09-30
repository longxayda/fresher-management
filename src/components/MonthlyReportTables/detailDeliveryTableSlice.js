import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "utils";

const DetailDeliverySlice = createSlice({
	name: "DetailDeliverySlice",
	initialState: {
		status: "idle",
		detailDelivery: [],
		reportItem: {},
	},
	reducers: {
		changeCourses: (state, action) => {
			state.detailDelivery = state.detailDelivery.map((item) => {
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
			.addCase(postHistoryReport.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(postHistoryReport.fulfilled, (state, action) => {
				state.detailDelivery = action.payload;
				state.status = "idle";
			})
			.addCase(deleteDetailDelivery.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(deleteDetailDelivery.fulfilled, (state, action) => {
				state.detailDelivery = state.detailDelivery.filter(
					(item) => item.id !== action.payload
				);
				state.status = "idle";
			})
			.addCase(searchDetailDelivery.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(searchDetailDelivery.fulfilled, (state, action) => {
				state.detailDelivery = action.payload;
				state.status = "idle";
			});
	},
});

export const fetchDetailDelivery = createAsyncThunk(
	"deliveryReportList/fetchDetailDelivery",
	async (id) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/delivery/course/${id}`
			);

			return res.data || [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

export const postHistoryReport = createAsyncThunk(
	"detailDelivery/postHistoryReport",
	async (value) => {
		try {
			const res = await axios.post(`${BASE_URL}/api/report/history`, value);

			return [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);
export const searchDetailDelivery = createAsyncThunk(
	"detailDelivery/searchDetailDelivery",
	async (value) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/delivery/course/search?keyword=${value}`,
				value
			);

			return res.data || [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);
export const deleteDetailDelivery = createAsyncThunk(
	"reportList/deleteDetailDelivery ",
	async (id) => {
		try {
			const res = await axios.post(
				`${BASE_URL}/api/report/delivery/course/${id}`,
				value
			);
			return id;
		} catch (error) {
			console.log(error);
		}
	}
);
const {actions, reducer} = DetailDeliverySlice;

export const {changeCourses} = actions;
export default reducer;
