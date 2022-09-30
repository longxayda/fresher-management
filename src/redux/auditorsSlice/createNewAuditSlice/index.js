import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNewAuditService } from "services/auditorsService/createNewAuditService";
import { fetchSchedule } from 'redux/auditorsSlice/scheduleSlice'

const wrongMessage = 'Please try again';
const createNewAuditSlice = createSlice({
    name: 'newAudit',
    initialState: {
        auditList: [],
        moduleList: [],
        traineeList: [],
        traineeClassList: [],
        sessionList: [],
        currentValue: {
            audit: {},
            module: {},
            trainee: {},
            traineeClass: {},
            session: {},
            room: '',
            time: '',
            updated: {
                audit: false,
                traineeClass: false,
                post: false,
            },
        },
        isLoading: false,
    },
    reducers: {
        replaceCurrentValue: (state, action) => {
            const data = action?.payload || {};
            let newValue = state.currentValue;
            for (const [key, value] of Object.entries(data)) {
            newValue[key] = value;
            }
            state.currentValue = newValue;
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchAuditorList.fulfilled, (state, action) => {
            state.currentValue.updated["audit"] = true;
            state.auditList = action.payload;
        })
        .addCase(fetchAuditorList.pending, (state, action) => {  
            state.isLoading = true;
        })
        .addCase(fetchAuditorList.rejected, (state, action) => {
            console.log("[Error fetchAuditorList]", action.error.message);
        })
        .addCase(fetchTraineeClassList.fulfilled, (state, action) => {
            state.currentValue.updated["traineeClass"] = true;
            state.traineeClassList = action.payload;
        })
        .addCase(fetchTraineeClassList.pending, (state, action) => {  
            state.isLoading = true;
        })
        .addCase(fetchTraineeClassList.rejected, (state, action) => {
            console.log("[Error fetchTraineeClassList]", action.error.message);
        })
        .addCase(fetchModuleList.fulfilled, (state, action) => {
            state.moduleList = action.payload;
        })
        .addCase(fetchModuleList.pending, (state, action) => {
            state.isLoading = true;  
        })
        .addCase(fetchModuleList.rejected, (state, action) => {
            console.log("[Error fetchModuleList]", action.error.message);
        })
        .addCase(fetchSessionList.fulfilled, (state, action) => {
            state.sessionList = action.payload;
        })
        .addCase(fetchSessionList.pending, (state, action) => {  
            state.isLoading = true;
        })
        .addCase(fetchSessionList.rejected, (state, action) => {
            console.log("[Error fetchSessionList]", action.error.message);
        })
        .addCase(fetchTraineeList.fulfilled, (state, action) => {
            state.traineeList = action.payload;
        })
        .addCase(fetchTraineeList.pending, (state, action) => {
            state.isLoading = true;  
        })
        .addCase(fetchTraineeList.rejected, (state, action) => {
            console.log("[Error fetchTraineeList]", action.error.message);
        })
        .addCase(updateNewAudit.fulfilled, (state, action) => {
            state.currentValue.updated.post = true;
        })
        .addCase(updateNewAudit.pending, (state, action) => {
            state.isLoading = true;  
        })
        .addCase(updateNewAudit.rejected, (state, action) => {
            console.log("[Error updateNewAudit]", action.error.message);
        })
    }
})

export const fetchAuditorList = createAsyncThunk(
    'newAudit/fetchAuditorList', async (_, thunkAPI) => {
        const res = await createNewAuditService.getAuditorList();
        if(res.success != null && !res.success) {
            return thunkAPI.rejectWithValue(res.response)
        }
        return res.data;
    }
)

export const fetchTraineeClassList = createAsyncThunk(
    'newAudit/fetchTraineeClassList', async (_, thunkAPI) => {
        const res = await createNewAuditService.getTraineeClassList();
        if(res.success != null && !res.success) {
            return thunkAPI.rejectWithValue(res.response)
        }    
        return res.data;
    }
)

export const fetchModuleList = createAsyncThunk(
    'newAudit/fetchModuleList', async (params, thunkAPI) => {
        const res = await createNewAuditService.getModuleList(params.id);
        if(res.success != null && !res.success) {
            params.callnotify(wrongMessage, 'danger', 3);
            return thunkAPI.rejectWithValue(res.response)
        }  
        return res.data;
    }
)

export const fetchSessionList = createAsyncThunk(
    'newAudit/fetchSessionList', async (params, thunkAPI) => {
        const res = await createNewAuditService.getSessionList(params.id);
        if(res.success != null && !res.success) {
            params.callnotify(wrongMessage, "danger", 3);
            return thunkAPI.rejectWithValue(res.response)
        }
        const output = [];
        for (let i = 1; i <= Number(res.data); i++) {
            output.push(i);
        }
        return output;
    }
)

export const fetchTraineeList = createAsyncThunk(
    'newAudit/fetchTraineeList', async (params, thunkAPI) => {
        const res = await createNewAuditService.getTraineeList(params.id);
        if(res.success != null && !res.success) {
            params.callnotify(wrongMessage, "danger", 3);
            return thunkAPI.rejectWithValue(res.response);
        }

        return res.data;
    }
)

export const updateNewAudit = createAsyncThunk(
    'newAudit/updateNewAudit', async (payload, thunkAPI) => {
        const res = await createNewAuditService.addNewAudit(payload);
        if(res.success != null && !res.success) {
            return thunkAPI.rejectWithValue(res.response);
        }
        return res.data;
    }
)

export const {replaceAuditorSlice, replaceTraineeClassSlice, replaceModuleSlice, replaceSessionSlice, replaceCurrentValue} = createNewAuditSlice.actions;
export default createNewAuditSlice.reducer;