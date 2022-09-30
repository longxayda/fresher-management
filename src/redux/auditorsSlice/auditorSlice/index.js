import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { auditorServices } from "services/auditorsService/auditorServices";


function changeArray(array) {
    let temp = []
    for (let i = 0; i < array.length; i++) {
        temp[i] = {
            ...array[i],
            skillList: array[i].skillList.map((d) => d.skill),
        }
    }
    return temp
}

const auditorSlice = createSlice({
    name: 'auditor',
    initialState: {
        notifyContent: {
            message: '',
            type: '',
            icon: '',
        },
        selectedIds: [],
        skillOptions: [],
        auditorList: [],
        maxPage: 1,
        isAddModalOpen: false,
        isDelModalOpen: false,
        isMultiDel: false,
        isLoading: false,
    },
    reducers: {
        notifyContentChange: (state, action) => {
            state.notifyContent = action.payload
        },
        selectedIdsChange: (state, action) => {
            state.selectedIds = action.payload;
        },
        skillOptionsChange: (state, action) => {
            state.skillOptions = action.payload;
        },
        auditorListChange: (state, action) => {
            state.auditorList = action.payload;
        },
        addModalChange: (state, action) => {
            state.isAddModalOpen = action.payload;
        },
        delModalChange: (state, action) => {
            state.isDelModalOpen = action.payload;
        },
        multiDelChange: (state, action) => {
            state.isMultiDel = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getPageAuditorList.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.auditorList !== undefined && action.payload.totalOfPages !== undefined) {
                    if (action.payload.auditorList.length !== undefined)
                        state.auditorList = changeArray(action.payload.auditorList)
                    else 
                        state.auditorList.push(changeArray(action.payload.auditorList))
                    state.maxPage = action.payload.totalOfPages
                }
                else state.auditorList = [];
            })
            .addCase(getPageAuditorList.rejected, (state, action) => {
                state.auditorList = action.payload
                state.maxPage = 1;
                state.isLoading = false;
            })
            .addCase(getPageAuditorList.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addAuditor.fulfilled, (state, action) => {
            })
            .addCase(deleteAuditor.fulfilled, (state, action) => {
            })
    }
})

export const getPageAuditorList = createAsyncThunk(
    'auditor/getPageAuditorList', async (body, thunkAPI) => {
        try {
            let templist = [];
            const res = await auditorServices.getPageAuditorList(body);
            if (res?.data.error == false) {
                templist = res.data.data;
            }
            return templist;
        } catch (error) {
            thunkAPI.dispatch(notifyContentChange({
                message: 'Loading Auditor List failed, please try again later!',
                type: 'danger',
                icon: 'nc-icon nc-simple-remove',
            }))
            return thunkAPI.rejectWithValue([]);
        }
    }
)

export const addAuditor = createAsyncThunk(
    'auditor/addAuditor', async (body, thunkAPI) => {
        try {
            const res = await auditorServices.addAuditor(body.username);
            if (res.data.error == false) {
                thunkAPI.dispatch(getPageAuditorList(body))
                thunkAPI.dispatch(notifyContentChange({
                    message: res.data.message,
                    type: 'success',
                    icon: 'nc-icon nc-check-2',
                }))
            }
        } catch (error) {
            thunkAPI.dispatch(notifyContentChange({
                message: 'Add Auditor failed, please try again later!',
                type: 'danger',
                icon: 'nc-icon nc-simple-remove',
            }))
        }
    }
)

export const deleteAuditor = createAsyncThunk(
    'auditor/deleteAuditor', async (body, thunkAPI) => {
        try {
            const res = await auditorServices.deleteAuditor(body.ids);
            if (res.data.error == false) {
                thunkAPI.dispatch(getPageAuditorList(body))
                thunkAPI.dispatch(notifyContentChange({
                    message: res.data.message,
                    type: 'success',
                    icon: 'nc-icon nc-check-2',
                }))
            }
        } catch (error) {
            thunkAPI.dispatch(notifyContentChange({
                message: 'Delete Auditor failed, please try again later!',
                type: 'danger',
                icon: 'nc-icon nc-simple-remove',
            }))
        }
    }
)

export const {
    notifyContentChange,
    selectedIdsChange,
    skillOptionsChange,
    auditorListChange,
    addModalChange,
    delModalChange,
    multiDelChange,
} = auditorSlice.actions;

export default auditorSlice.reducer;