import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"
import { scheduleService } from "services/auditorsService/scheduleService";
const messageWrong = 'Please try again';
const scheduleSlice = createSlice({
    name: "schedule",
    initialState: {
        id: "",
        scheduleID: "",
        selectedIds: [],
        trainee: "",
        emailList: [],
        questionList: [],
        traineeList: [],
        dataModal: {},
        schedules: [],
        deleteManyIds: [],
        isLoading: false,
        isOpenModalEvaluate: false,
        errorAction: false,
        messageAction: false,
        totalSchedule:'',
        isOpenModalDelete: false,
        isMultipleDelete: false,
        questionSelectedList: [],
        totalItemEvaluation: "",
        form: {
            id: "",
            trainer: "",
            date: "",
            room: "",
        },
        Listtrainer: "",
        errors:{},
        isOpenEdit: false,
        fieldEvaluation: []

    },
    reducers: {
        idChange: (state, action) => {
            state.id = action.payload;
        },
        idFilterChange: (state, action) => {
            state.selectedIds = action.payload;
        },
        traineeListChange: (state, action) => {
            state.traineeList = action.payload;
        },
        dataModalChange: (state, action) => {
            state.dataModal = action.payload;
        },
        messageActionChange: (state, action) => {
            state.messageAction = action.payload
        },
        deleteManyChange: (state, action) => {
            state.deleteManyIds = action.payload
        },
        errorActionChange: (state, action) => {
            state.errorAction = action.payload
        },
        isOpenModalEvaluateChange: (state, action) => {
            state.isOpenModalEvaluate = action.payload;
        },
        isOpenModalDeleteChange: (state, action) =>{
            state.isOpenModalDelete = action.payload;
        },
        isMultipleDeleteChange: (state, action) =>{
            state.isMultipleDelete = action.payload;
        },
        setTrainee: (state, action) => {
            state.trainee = action.payload;
        },
        setQuestionList: (state, action) => {
            state.questionList = action.payload;
        },
        setScheduleID: (state, action) => {
            state.scheduleID = action.payload;
        },

        isOpenModalEditScheduleChange: (state, action) => {
            state.isOpenModalEditSchedule = action.payload;
        },
        deleteManyScheduleChange: (state, action) => {
            state.deleteManyIds = action.payload
        },
        addQuestion: (state, action) => {
            state.questionList.push(action.payload)
        },
        questionSelectedListChange: (state, action) => {
            state.questionSelectedList = action.payload
        },
        formChange: (state, action) =>{
            state.form = action.payload;
        },
        errorsChange: (state, action) => {
            state.errors = action.payload;
        },
        isOpenEditChange: (state, action) =>{
            state.isOpenEdit = action.payload;
        },
        addfieldEvaluationChange: (state, action) => {
            if (state.fieldEvaluation.length > 0) {
                let field;
                field = state.fieldEvaluation.find(
                    item => item.id == action.payload.id
                )
                if(field){
                    field.comment=action.payload.comment
                    field.score=action.payload.score

                }else{
                    state.fieldEvaluation.push(action.payload)
                }
            }
            else {
                state.fieldEvaluation.push(action.payload)
            }
        }

    },
    extraReducers: builder => {
        builder
            .addCase(fetchSchedule.fulfilled, (state, action) => {
                state.schedules = action.payload.map((p, key) => {
                    return (
                        {
                            ...p,
                            "no": key + 1,
                        }
                    )
                })
                state.isLoading = false;
            })
            .addCase(fetchSchedule.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchSchedule.rejected, (state, action) => {
                state.isLoading = false;
            })

            .addCase(fetchTraineeList.fulfilled, (state, action) => {
                state.traineeList = action.payload.map((p) => {
                    return (
                        {
                            ...p,
                            "action": p.grade,
                        }
                    )
                })
                state.isLoading = false;
            })
            .addCase(fetchTraineeList.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchTraineeList.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchQuestionList.fulfilled, (state, action) => {
                state.questionList = action.payload.data
                state.isLoading = false;
                state.totalItemEvaluation = action.payload.totalItems
            })
            .addCase(fetchQuestionList.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchQuestionList.rejected, (state, action) => {
                state.isLoading = false;
            })

            .addCase(updateSchedule.fulfilled, (state, action) => {
                const index = state.schedules.findIndex(
                    (schedules) => schedules.id === action.payload.data.id
                )
                state.schedules[index] = action.payload.data
                state.errorAction = action.payload.error
                state.messageAction = action.error.message
            })
            .addCase(updateSchedule.pending, (state, action) => {  
            })
            .addCase(updateSchedule.rejected, (state, action) => {

                console.log("[Error updateSchedule]", action.payload);
                state.errorAction = true;
                state.messageAction = action.error.message
            })
            .addCase(deleteOneSchedule.fulfilled, (state, action) => {
                const index = state.schedules.findIndex(
                    (schedules) => schedules.id === state.id
                )
                state.id = "";
                state.schedules.splice(index, 1)
                state.errorAction = action.payload.error
                state.messageAction = action.payload.message
                state.totalSchedule--
            })
            .addCase(deleteOneSchedule.pending, (state, action) => {
            })
            .addCase(deleteOneSchedule.rejected, (state, action) => {
                state.errorAction = true;
                state.messageAction = action.error.message
            })
            .addCase(deleteManySchedule.fulfilled, (state, action) =>{
                const newList = state.schedules.filter(
                    (item) => !state.deleteManyIds.includes(item.id)
                )
                state.schedules = newList
                state.totalSchedule -= state.deleteManyIds.length
                state.deleteManyIds = []
                state.errorAction = action.payload.error
                state.messageAction = action.payload.message
            })
            .addCase(deleteManySchedule.pending, (state, action) =>{
            })
            .addCase(deleteManySchedule.rejected, (state, action) =>{
                console.log("[Error deleteManySchedule]", action.payload);
                state.errorAction = true;
                state.messageAction = action.error.message

            })
            .addCase(addQuestionSchedule.fulfilled, (state, action) => {
                if (!action.payload.error) {
                    state.totalItemEvaluation += state.questionSelectedList.length
                }
            })
            .addCase(fetchTrainerList.fulfilled, (state, action) => {
                state.skillList = action.payload
            })
            .addCase(fetchTrainerList.pending, (state, action) => {
            })
            .addCase(fetchTrainerList.rejected, (state, action) => {
                console.log("[Error fetchTrainerList]", action.payload.message);
            })
    },
})

export const fetchSchedule = createAsyncThunk('schedule/ fetchSchedule', async (params, { rejectWithValue }) => {
    const res = await scheduleService.getSchedules()
    if (res.success != null && !res.success) {
        return rejectWithValue(res.response)
    }

    return res.data.data
})
export const fetchTraineeList = createAsyncThunk('schedule/ fetchTraineeList', async (params, { rejectWithValue }) => {
    const res = await scheduleService.getTrainees(params.id)
    if (res.success != null && !res.success) {
        params.notify(res.response.message || messageWrong, 'danger');
        return rejectWithValue(res.response)
    }

    return res.data.data
})
export const fetchQuestionList = createAsyncThunk('schedule/ fetchQuestionList', async (params, { rejectWithValue }) => {
    const res = await scheduleService.getQuestiones(params.id, params.idTrainee)
    if (res.success != null && !res.success) {
        params.notify(res.response.message || messageWrong, 'danger');
        return rejectWithValue(res.response)
    }
    return res.data
})

export const updateSchedule = createAsyncThunk('schedule/updateSchedule', async (params, thunkAPI) => {
    const res = await scheduleService.updateSelectedSchedule(params.data)
    if(res?.success === false && res.success != null){
        params.notify(
            "tr",
            res.response.message,
            "danger",
            "nc-icon nc-check-2"
        )
        return thunkAPI.rejectWithValue(res.response)
    }
    params.notify(
        "tr",
        res.data.message,
        "success",
        "nc-icon nc-check-2"
    )
    return res.data.data
})
export const addQuestionSchedule = createAsyncThunk('schedule/addQuestionSchedule', async (params, thunkAPI) => {
    const res = await scheduleService.addQuestion(params.idSchedule, params.IDtrainee, params.listIdQuestion)
    if (res.success != null && !res.success) {
        params.notify(res.response.message || messageWrong, 'danger');
        return thunkAPI.rejectWithValue(res.response)
    }
    return res.data
})
export const deleteQuestionEvaluate = createAsyncThunk('schedule/deleteQuetionEvaluate', async (params, thunkAPI) => {
    const res = await scheduleService.deleteQuetionEvaluate(params.idSchedule, params.IDtrainee, params.id)
    if (res.success != null && !res.success) {
        params.notify(res.response.message || messageWrong, 'danger');
        return thunkAPI.rejectWithValue(res.response)
    }
    return res.data
})

export const deleteOneSchedule = createAsyncThunk(
    'schedule/deleteOneSchedule', async (params,thunkAPI) => {
        const iddelete = [params.data]
        const res = await scheduleService.deleteOneSchedule(iddelete);
        if(res?.success === false && res.success != null){
            params.notify(
                "tr",
                res.response.message,
                "danger",
                "nc-icon nc-check-2"
            )
            return thunkAPI.rejectWithValue(res.response)
        }

        params.notify(
            "tr",
            res.data.message,
            "success",
            "nc-icon nc-check-2"
        )
        return res.data
}
)

export const deleteManySchedule = createAsyncThunk(
    'schedule/deleteManySchedule', async (params, thunkAPI) => {
        const res = await scheduleService.deleteManySchedule(params.data)
        if(res?.success === false && res.success != null){
            params.notify(
                "tr",
                res.response.message,
                "danger",
                "nc-icon nc-check-2"
            )
            return thunkAPI.rejectWithValue(res.response)
        }
        params.notify(
            "tr",
            res.data.message,
            "success",
            "nc-icon nc-check-2"
        )
        return res.data
}
)

export const fetchTrainerList = createAsyncThunk(
    'schedule/fetchTrainerList', async (notify, thunkAPI) => {
        const res = await scheduleService.getTrainerList();
        if(res?.success === false && res.success != null){
            notify(
                "tr",
                res.response.message,
                "danger",
                "nc-icon nc-check-2"
            )
            return thunkAPI.rejectWithValue(res.response)
        }
        return res.data
    }
)
export const {
    idChange,
    idFilterChange,
    detailListChange,
    dataModalChange,
    isOpenModalEvaluateChange,
    isOpenModalDeleteChange,
    isMultipleDeleteChange,
    deleteManyChange,
    setTrainee,
    setScheduleID,
    questionList,
    questionSelectedListChange,
    formChange,
    errorsChange,
    isOpenEditChange,
    addfieldEvaluationChange,

} = scheduleSlice.actions;
export default scheduleSlice.reducer;


