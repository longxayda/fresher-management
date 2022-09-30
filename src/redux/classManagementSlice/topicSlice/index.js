import { createSlice } from "@reduxjs/toolkit";
import { topicServices } from "services/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListTopic = createAsyncThunk(
    "class/getListTopic",
    async(id) => {
        const res = await topicServices.getListTopic(id);
        if (res.data.topics){
            return res.data.topics;
        } else {
            rejectWithValue(null);
        }
    }
);

export const createTopic = createAsyncThunk(
    "class/createTopic",
    async({body,id}) => {
        const res = await topicServices.createTopic(body,id);
        if (res.data){
            return res.data;
        } else {
            rejectWithValue(null);
        }
    }
);

const initialState = {
    listTopic:[],
    isLoading: false,
    isErrorTopic: false,
    isSuccessTopic: undefined,
};

export const topicSlice = createSlice({
    name: "topicModule",
    initialState,
    reducers: {
        resetTopic: (state) => {
            state.isErrorTopic = false;
            state.isSuccessTopic = undefined;
        },
    },
    extraReducers: {
        [getListTopic.pending]: (state, action) => {
            state.isLoading = true;
            state.isErrorTopic = false;
        },
        [getListTopic.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isErrorTopic = false;
            state.listTopic = action.payload;
        },
        [getListTopic.rejected]: (state, action) => {
            state.isErrorTopic = true;
            state.isLoading = false;
        },
        [createTopic.pending]: (state, action) => {
            state.isLoading = true;
            state.isSuccessTopic = undefined;
        },
        [createTopic.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccessTopic = true;
        },
        [createTopic.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccessTopic = false;
        },
    },
});

export const { resetTopic } = topicSlice.actions;

export default topicSlice.reducer;