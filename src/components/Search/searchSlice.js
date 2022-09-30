import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

import {BASE_URL} from "utils";

const filtersSlice = createSlice({
	name: "filters",
	initialState: {status: "idle", searchResult: [], searchValue: ""},
	reducers: {
		// IMMER
		searchText: (state, action) => {
			state.searchValue = action.payload;
		}, // action creators
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchFilterChange.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(searchFilterChange.fulfilled, (state, action) => {
				state.searchResult = action.payload?.weeklyReportEntityList || [];
				state.status = "idle";
			})
			.addCase(searchFilterChangeDetail.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(searchFilterChangeDetail.fulfilled, (state, action) => {
				state.searchResult = action.payload;
				state.status = "idle";
			});
	},
});
export const searchFilterChange = createAsyncThunk(
	"search/searchFilterChange",
	async (value) => {
		try {
			const res = await axios.get(
				`${BASE_URL}/api/report/weekly/search?keyword=${value}`
			);
			return res.data;
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);
export const searchFilterChangeDetail = createAsyncThunk(
	"search/searchFilterChangeDetail",
	async (obj) => {
		try {
			const {searchText, weeklyId} = obj;
			const res = await axios.get(
				`${BASE_URL}/api/report/weekly/${weeklyId}/items/search?keyword=${searchText}&num=${10}`
			);
			return res?.data?.weeklyReportItemList || [];
		} catch (error) {
			console.log(error);
			return [];
		}
	}
);

const {actions, reducer} = filtersSlice;

export const {searchText} = actions;
export default reducer;
