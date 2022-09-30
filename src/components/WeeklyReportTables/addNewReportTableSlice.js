import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "utils";

const AddNewReportTableSlice = createSlice({
	name: "AddNewReportTable",
	initialState: {
		status: "",
		statusContent: "",
		classNameList: [],
		classNameInfoList: [],
		classNameInfoItem: {},
	},
	reducers: {
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
		updateClassName: (state, action) => {
			state.classNameInfoList = action.payload;
		},
		deleteClassName: (state, action) => {
			state.classNameInfoList = state.classNameInfoList.filter((item) => {
				return !action.payload.includes(Number(item.classId));
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchClassNameList.pending, (state, action) => {
				state.status = "";
			})
			.addCase(fetchClassNameList.fulfilled, (state, action) => {
				state.classNameList = action.payload;
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data fetch failed"
						: "Data is fetched successfully";
			})
			.addCase(fetchClassNameInfoItem.pending, (state, action) => {
				state.status = "";
			})
			.addCase(fetchClassNameInfoItem.fulfilled, (state, action) => {
				state.classNameInfoItem = action.payload;
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data delete failed"
						: "Data is deleted successfully";
			})
			.addCase(createNewReport.pending, (state, action) => {
				state.status = "";
			})
			.addCase(createNewReport.fulfilled, (state, action) => {
				state.classNameInfoList = action.payload;
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Report create failed"
						: "Report is created successfully";
			})
			.addCase(addNewReport.pending, (state, action) => {
				state.status = "";
			})
			.addCase(addNewReport.fulfilled, (state, action) => {
				state.classNameInfoList = action.payload;
				state.status = action.payload === "AxiosError" ? "Danger" : "Success";
				state.statusContent =
					action.payload === "AxiosError"
						? "Data add failed"
						: "Data is added successfully";
			});
	},
});
export const fetchClassNameList = createAsyncThunk(
	"classesName/fetchClassNameList",
	async () => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/classes/status/in-progress`
			);
			return res.data || [];
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);
export const fetchClassNameInfoItem = createAsyncThunk(
	"classesNameInfo/fetchClassNameInfoItem",
	async (classId) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/weekly/class/${classId}/info`
			);
			if (res?.data) {
				const result = {...res.data, classId};
				return result;
			}
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);

export const createNewReport = createAsyncThunk(
	"classesNameInfo/createNewReport",
	async (value) => {
		try {
			await axios.post(`${BASE_URL}/api/report/weekly`, value);
			return [];
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);
export const addNewReport = createAsyncThunk(
	"classesNameInfo/addNewReport",
	async (value) => {
		try {
			await axios.put(`${BASE_URL}/api/report/weekly/items`, value);
			return [];
		} catch (error) {
			console.log(error);
			return error.name;
		}
	}
);

const {actions, reducer} = AddNewReportTableSlice;

export const {classesName, addClassName, updateClassName, deleteClassName} =
	actions;
export default reducer;
