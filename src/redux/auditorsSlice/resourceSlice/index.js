
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { act } from "react-test-renderer";
import { resourceService } from "services/auditorsService/resourceService";

const resourceSlice = createSlice({
    name: "resource",
    initialState:{
        id: "",
        selectedIds: [],
        skillList: [],
        moduleList: [],
        levelList: [
            "Remember-Understand",
            "Apply",
            "Analysis-Evaluation",
            "Creation"
        ],
        questionList: [],
        dataModal: {},
        isOpenModalAddEdit: false,
        isOpenModalDetail: false,
        isOpenModalDelete: false,
        isMultipleDelete: false,
        form: {
            question: "",
            answer: "",
            skill: "",
            status: "Processing",
            level: "",
            module: "",
        },
        errors: {},
        isAddQuestion: false,
        messageAction: "",
        errorAction: false,
        deleteManyIds: [],
        headingToast: "",
        messageErrorApi: "",
        maxPage: "",
        isLoading: false,
        totalQuestion: '',
        isDeleteQuestion: false,
    },
    reducers:{
        idChange: (state, action) => {
            state.id = action.payload;
        },
        idFilterChange: (state, action) => {
            state.selectedIds = action.payload;
        },
        questionListChange: (state, action) => {
            state.questionList = action.payload;
        },
        dataModalChange: (state, action) =>{
            state.dataModal = action.payload;
        },
        isOpenModalAddEditChange: (state, action) =>{
            state.isOpenModalAddEdit = action.payload;
        },
        isOpenModalDetailChange: (state, action) =>{
            state.isOpenModalDetail = action.payload;
        },
        isOpenModalDeleteChange: (state, action) =>{
            state.isOpenModalDelete = action.payload;
        },
        isMultipleDeleteChange: (state, action) =>{
            state.isMultipleDelete = action.payload;
        },
        formChange: (state, action) =>{
            state.form = action.payload;
        },
        errorsChange: (state, action) => {
            state.errors = action.payload
        },
        isAddQuestionChange: (state, action) => {
            state.isAddQuestion = action.payload
        },
        messageActionChange: (state, action) => {
            state.messageAction = action.payload
        },
        errorActionChange: (state, action) => {
            state.errorAction = action.payload
        },
        deleteManyChange: (state, action) => {
            state.deleteManyIds = action.payload
        },
        headingToastChange: (state, action) => {
            state.headingToast = action.payload
        },
        messageErrorApiChange: (state, action) =>{
            state.messageErrorApi = action.payload
        },
        isDeleteQuestionChange: (state, action) => {
            state.isDeleteQuestion = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.fulfilled, (state, action)=>{
                state.questionList = action.payload.data
                state.maxPage = action.payload.maxPage
                state.isLoading = false
                state.totalQuestion = action.payload.totalItems
            })
            .addCase(fetchQuestions.pending, (state, action)=>{  
                state.isLoading = true
            })
            .addCase(fetchQuestions.rejected, (state, action)=>{
               
            })
            .addCase(fetchSearchQuestions.fulfilled, (state, action) => {
                state.questionList = action.payload.data
                state.maxPage = action.payload.maxPage
                state.isLoading = false
                state.searchInput = false
                state.totalQuestion = action.payload.totalItems
            })
            .addCase(fetchSearchQuestions.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchSearchQuestions.rejected, (state, action) => {
                state.totalQuestion = ""
                state.questionList = []
            })
            .addCase(fetchSkillList.fulfilled, (state, action) => {
                state.skillList = action.payload
            })
            .addCase(fetchSkillList.pending, (state, action) => {
            })
            .addCase(fetchSkillList.rejected, (state, action) => {
            })
            .addCase(fetchModule.fulfilled, (state,action) => {
                state.moduleList = action.payload
            })
            .addCase(fetchModule.pending, (state,action) => {
            })
            .addCase(fetchModule.rejected, (state,action) => {
            })
            .addCase(addQuestion.fulfilled, (state, action) => {
                if(state.questionList.length != 20){
                    const newList = state.questionList.concat(action.payload.data)
                    state.questionList = newList
                } 
                state.errorAction = action.payload.error
                state.messageAction = action.payload.message
                state.totalQuestion++
            })
            .addCase(addQuestion.pending, (state, action) => {
            })
            .addCase(addQuestion.rejected, (state, action) => {
                state.errorAction = true;
                state.messageAction = action.payload.message
            })
            .addCase(updateQuestion.fulfilled, (state, action) => {
                const index = state.questionList.findIndex(
                    (question) => question.id === action.payload.data.id
                )
                state.questionList[index] = action.payload.data
                state.errorAction = action.payload.error
                state.messageAction = action.payload.message
            })
            .addCase(updateQuestion.pending, (state, action) => {  
            })
            .addCase(updateQuestion.rejected, (state, action) => {
                state.errorAction = true;
                state.messageAction = action.payload.message
            })
            .addCase(deleteOneQuestion.fulfilled, (state, action) => {
                state.isDeleteQuestion = true
                const index = state.questionList.findIndex(
                    (question) => question.id === state.id
                )
                state.id = "";
                state.questionList.splice(index, 1)
                state.errorAction = action.payload.error
                state.messageAction = action.payload.message
                state.totalQuestion--
            })
            .addCase(deleteOneQuestion.pending, (state, action) => {
            })
            .addCase(deleteOneQuestion.rejected, (state, action) => {
                state.errorAction = true;
                state.messageAction = action.payload.message
            })
            .addCase(deleteManyQuestion.fulfilled, (state, action) =>{
                state.isDeleteQuestion = true
                const deleteIdSuccess = action.payload.error ? (
                    state.deleteManyIds.filter(
                    (item) => !action.payload.data.includes(item)
                )) : (state.deleteManyIds)

                const newList = state.questionList.filter(
                    (item) => !deleteIdSuccess.includes(item.id)
                )
                state.questionList = newList
                state.totalQuestion -= state.deleteManyIds.length
                state.deleteManyIds = []
                state.errorAction = action.payload.error
                state.messageAction = action.payload.message
            })
            .addCase(deleteManyQuestion.pending, (state, action) =>{
            })
            .addCase(deleteManyQuestion.rejected, (state, action) =>{
                state.errorAction = true;
                state.messageAction = action.payload.message
            })
            
    }
})

export const fetchQuestions = createAsyncThunk(
    'resource/fetchQuestions', async (params, thunkAPI) => {
        const res = await resourceService.getQuestionList(params.data);
        if(res?.success === false && res.success != null){
            params.notify(
                "tr",
                res.response.message,
                "danger",
                "nc-icon nc-settings-gear-64"
            )
            return thunkAPI.rejectWithValue(res.response)
        }
        return res.data
    }
)
export const fetchSearchQuestions = createAsyncThunk(
    'resource/fetchSearchQuestions', async (params, thunkAPI) => {
        const res = await resourceService.getSearchQuestionList(params.currentPage, params.keyword);
        if(res?.success === false && res.success != null){
            params.notify(
                "tr",
                res.response.message,
                "danger",
                "nc-icon nc-settings-gear-64"
            )
            return thunkAPI.rejectWithValue(res.response)
        }
        return res.data
    }
)
export const fetchSkillList = createAsyncThunk(
    'resource/fetchSkillList', async (notify, thunkAPI) => {
        const res = await resourceService.getSkillList();
        if(res?.success === false && res.success != null){
            notify(
                "tr",
                res.response.message,
                "danger",
                "nc-icon nc-settings-gear-64"
            )
            return thunkAPI.rejectWithValue(res.response)
        }
        return res.data
    }
)
export const fetchModule = createAsyncThunk(
    'resource/fetchModule', async (notify, thunkAPI) => {
        const res = await resourceService.getModuleList();
        if(res?.success === false && res.success != null){
            notify(
                "tr",
                res.response.message,
                "danger",
                "nc-icon nc-settings-gear-64"
            )
            return thunkAPI.rejectWithValue(res.response)
        }
        return res.data
    }
)
export const addQuestion = createAsyncThunk(
    'resource/addQuestion', async (params,thunkAPI) => {
        const res = await resourceService.createNewQuestion(params.data)
        if(res?.success === false && res.success != null){
            params.notify(
                "tr",
                res.response.message,
                "danger",
                "nc-icon nc-settings-gear-64"
            )
            return thunkAPI.rejectWithValue(res.response)
        }
        params.notify(
            "tr",
            res.data.message,
            "info",
            "nc-icon nc-check-2"
        )
        return res.data
    }
)

export const updateQuestion = createAsyncThunk(
    'resource/updateQuestion', async (params,thunkAPI) => {
        const res = await resourceService.updateCurrentQuestion(params.data)
        if(res?.success === false && res.success != null){
            params.notify(
                "tr",
                res.response.message,
                "danger",
                "nc-icon nc-settings-gear-64"
            )
            return thunkAPI.rejectWithValue(res.response)
        }
        params.notify(
            "tr",
            res.data.message,
            "info",
            "nc-icon nc-check-2"
        )
        return res.data
    }
)

export const deleteOneQuestion = createAsyncThunk(
    'resource/deleteOneQuestion', async (params,thunkAPI) => {
        const res = await resourceService.deleteOneQuestionResource(params.data);
        if(res?.success === false && res.success != null){
            params.notify(
                "tr",
                res.response.message,
                "danger",
                "nc-icon nc-settings-gear-64"
            )
            return thunkAPI.rejectWithValue(res.response)
        }
        params.notify(
            "tr",
            res.data.message,
            "info",
            "nc-icon nc-check-2"
        )
        return res.data
}
)

export const deleteManyQuestion = createAsyncThunk(
    'resource/deleteManyQuestion', async (params, thunkAPI) => {
        const res = await resourceService.deleteManyQuestionResource(params.data)
        if(res?.success === false && res.success != null){
            params.notify(
                "tr",
                res.response.message,
                "danger",
                "nc-icon nc-settings-gear-64"
            )
            return thunkAPI.rejectWithValue(res.response)
        }
        params.notify(
            "tr",
            res.data.error ? (res.data.message + ' [' + res.data.data + ']') : res.data.message,
            res.data.error ? "danger" : "info",
            res.data.error ? "nc-icon nc-settings-gear-64" : "nc-icon nc-check-2"
        )
        return res.data
}
)
export const {  idChange, 
                idFilterChange, 
                questionListChange,
                dataModalChange,
                isOpenModalAddEditChange,
                isOpenModalDetailChange,
                isOpenModalDeleteChange,
                isMultipleDeleteChange,
                formChange,
                errorsChange,
                isAddQuestionChange,
                messageActionChange,
                errorActionChange,
                deleteManyChange,
                headingToastChange,
                messageErrorApiChange,
                isDeleteQuestionChange
            } = resourceSlice.actions;
export default resourceSlice.reducer;
