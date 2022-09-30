import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { penaltyService } from "services/fresherManagement/penaltyService";

const initialState = {
    value: [],
    isLoading: false,
    isProcessing: false,
};

export const bonusPenaltySlice = createSlice({
    name: "bonusPenalty",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBonusPenalty.pending, (state) => {
                state.isLoading = true;
                state.value = [];
            })
            .addCase(getBonusPenalty.fulfilled, (state, action) => {
                state.isLoading = false;
                state.value = action.payload;
            })
            .addCase(getBonusPenalty.rejected, (state, action) => {
                state.isLoading = false;
            })
            
            .addCase(addBonusPenalty.pending, (state) => {
                state.isProcessing = true;
            })
            .addCase(addBonusPenalty.fulfilled, (state, action) => {
                state.isProcessing = false;
                state.value.push(action.payload);
            })
            .addCase(addBonusPenalty.rejected, (state, action) => {
                state.isProcessing = false;
            })

            .addCase(deleteOneBonusPenalty.pending, (state) => {
                state.isProcessing = true;
            })
            .addCase(deleteOneBonusPenalty.fulfilled, (state, action) => {
                state.isProcessing = false;
                const index = state.value.findIndex(
                    (item) => item.id === action.payload
                );
                state.value.splice(index, 1);
            })
            .addCase(deleteOneBonusPenalty.rejected, (state) => {
                state.isProcessing = false;
            })

            .addCase(updateBonusPenalty.pending, (state) => {
                state.isProcessing = true;
            })
            .addCase(updateBonusPenalty.fulfilled, (state, action) => {
                state.isProcessing = false;
                const index = state.value.findIndex(
                    (item) => item.id === action.payload.id
                );
                state.value[index] = action.payload;
            })
            .addCase(updateBonusPenalty.rejected, (state) => {
                state.isProcessing  = false;
            })

            .addCase(deleteManyBonusPenalty.pending, (state) => {
                state.isProcessing = true;
            })
            .addCase(deleteManyBonusPenalty.fulfilled, (state, action) => {
                state.isProcessing = false;
                state.value = state.value.filter((item) => !action.payload.ids.includes(item.id));
            })
            .addCase(deleteManyBonusPenalty.rejected, (state) => {
                state.isProcessing = false;
            })
    },
});

export const getBonusPenalty = createAsyncThunk(
    "bonusPenalty/get",
    async (queryInfo, { rejectWithValue }) => {
        const { userId, queryParams } = queryInfo;
        const response = await penaltyService.getBonusPenalty(userId, queryParams);
        if (response?.success === false) {
            return rejectWithValue(response.response);
        }
        return response.data;
    }
);

export const addBonusPenalty = createAsyncThunk(
    "bonusPenalty/add",
    async (bonusPenalty, { rejectWithValue }) => {
        const response = await penaltyService.addBonusPenalty(bonusPenalty);
        if (response?.success === false) {
            return rejectWithValue(response.response);
        }
        return response.data;
    }
);

export const updateBonusPenalty = createAsyncThunk(
    "bonusPenalty/update",
    async (bonusPenalty, { rejectWithValue }) => {
        const { id, ...data } = bonusPenalty;
        const response = await penaltyService.updateBonusPenalty(data, id);
        if (response?.success === false) {
            return rejectWithValue(response.response.message);
        }
        return response.data;
    }
);

export const deleteOneBonusPenalty = createAsyncThunk(
    "bonusPenalty/deleteOne",
    async (id) => {
        const response = await penaltyService.deleteOneBonusPenalty(id);
        if (response?.success === false) {
            return rejectWithValue(response.response.message);
        }
        return id;
    }
);

export const deleteManyBonusPenalty = createAsyncThunk(
    "bonusPenalty/deleteMany",
    async (ids) => {
        const response = await penaltyService.deleteManyBonusPenalty(ids);
        if (response?.success === false) {
            return rejectWithValue(response.response.message);
        }
        return ids;
    }
);

export default bonusPenaltySlice.reducer;