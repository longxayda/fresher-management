import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "utils";

const DeliveryReportListTableSlice = createSlice({
	name: "DeliveryReportListTableSlice",
	initialState: {
		status: "idle",
		deliveryReportList: [],
		reportItem: {},
	},
	reducers: {
		newReportItem: (state, action) => {
			state.reportItem = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDeliveryReportList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchDeliveryReportList.fulfilled, (state, action) => {
				state.deliveryReportList = action.payload;
				state.status = "idle";
			})
			.addCase(updateDeliveryReportList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(updateDeliveryReportList.fulfilled, (state, action) => {
				state.deliveryReportList = state.deliveryReportList.map((item) => {
					if (item.id === action.payload.id) {
						return action.payload;
					} else {
						return item;
					}
				});
				state.status = "idle";
			})
			.addCase(deleteDeliveryReportList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(deleteDeliveryReportList.fulfilled, (state, action) => {
				state.deliveryReportList = state.deliveryReportList.filter(
					(item) => !action.payload.includes(Number(item.id))
				);
				state.status = "idle";
			})
			.addCase(searchDeliveryReportList.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(searchDeliveryReportList.fulfilled, (state, action) => {
				state.deliveryReportList = action.payload;
				state.status = "idle";
			});
	},
});

export const fetchDeliveryReportList = createAsyncThunk(
	"deliveryReportList/fetchDeliveryReportList",
	async () => {
		try {
			const res = await axios.get(`${BASE_URL}/api/report/delivery/`);
			return res.data || [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);
export const createDeliveryReportList = createAsyncThunk(
	"deliveryReportList/fetchDeliveryReportList",
	async (value) => {
		try {
			await axios.post(`${BASE_URL}/api/report/delivery/`, value);
			return [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

export const updateDeliveryReportList = createAsyncThunk(
	"reportList/updateDeliveryReportList",
	async (value) => {
		try {
			const {isDeleted, ...obj} = value;
			const res = await axios.put(`${BASE_URL}/api/report/delivery/`, obj);
			return value;
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

export const deleteDeliveryReportList = createAsyncThunk(
	"reportList/deleteDeliveryReportList ",
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

export const searchDeliveryReportList = createAsyncThunk(
	"reportList/searchDeliveryReportList",
	async (value) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/delivery/search?keyword=${value}`
			);

			return res.data || [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

const {actions, reducer} = DeliveryReportListTableSlice;

export const {newReportItem} = actions;
export default reducer;
