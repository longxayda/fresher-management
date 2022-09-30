import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "utils";

const newDeliveryTableSlice = createSlice({
	name: "NewDeliveryTable",
	initialState: {
		status: "idle",
		deliveryClasses: [],
		deliveryClassesInfo: [],
	},
	reducers: {
		// IMMER
		classesName: (state, action) => {
			state.classNameList = action.payload;
		},
		addClassName: (state, action) => {
			if (action.payload.length === 0) {
				state.classNameInfoList = [];
			} else {
				state.classNameInfoList.push(action.payload);
			}
		},
		deleteClassesInfo: (state, action) => {
			state.deliveryClassesInfo = state.deliveryClassesInfo.filter((item) => {
				return !action.payload.includes(Number(item.classId));
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDeliveryClassesInfo.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchDeliveryClassesInfo.fulfilled, (state, action) => {
				state.deliveryClassesInfo.push(action.payload);
				state.status = "idle";
			})
			.addCase(updateDeliveryClassesInfo.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(updateDeliveryClassesInfo.fulfilled, (state, action) => {
				state.deliveryClassesInfo = action.payload;
				state.status = "idle";
			})
			.addCase(fetchDeliveryClasses.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchDeliveryClasses.fulfilled, (state, action) => {
				state.deliveryClasses = action.payload;
				state.status = "idle";
			});
	},
});
export const fetchDeliveryClassesInfo = createAsyncThunk(
	"newDeliveryReport/fetchDeliveryClassesInfo",
	async (id) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/delivery/course/basic/${id}`
			);
			return res.data;
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);
export const updateDeliveryClassesInfo = createAsyncThunk(
	"newDeliveryReport/updateDeliveryClassesInfo",
	async ({value, idReport, idClass}) => {
		try {
			await axios.post(
				`${BASE_URL}/api/report/delivery/course/1/${idClass}`,
				value
			);
			return [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

export const fetchDeliveryClasses = createAsyncThunk(
	"newDeliveryReport/fetchDeliveryClasses",
	async () => {
		try {
			const res = await axios.get(`${BASE_URL}/api/classes?page=1&limit=10`);
			console.log(res.data);
			return res.data.listResult;
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

const {actions, reducer} = newDeliveryTableSlice;

export const {classesName, addClassName, deleteClassesInfo} = actions;
export default reducer;
