import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EvaluationServices } from "services/auditorsService/evaluationServices";

const messageWrong = 'Please try again';

const evaluationSlice = createSlice({
    name: 'evaluation',
    initialState: {
        traineeLoading: false,
        detailLoading: false,
        class: '',
        session: '',
        maxPage: '1',
        currentPage: 1,
        trainee: {},
        classes: [],
        sessions: [],
        trainees: [],
        evaluate: [],
    },
    reducers: {
        changeClass: (state, action) => {
            state.class = action.payload;
            state.currentPage = 1;
        },
        changeSession: (state, action) => {
            state.session = action.payload;
            state.currentPage = 1;
        },
        setTrainee: (state, action) => {
            state.trainee = state.trainees.find((t) => {
                return t.individual_report_id === action.payload;
            });
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchClasses.pending, (state, action) => {

            })
            .addCase(fetchClasses.rejected, (state, action) => {
                state.classes = [];
                state.class = '';
            })
            .addCase(fetchClasses.fulfilled, (state, action) => {
                state.classes = action.payload;
            })
            .addCase(fetchSessions.pending, (state, action) => { })
            .addCase(fetchSessions.rejected, (state, action) => {
                state.sessions = [];
                state.session = '';
            })
            .addCase(fetchSessions.fulfilled, (state, action) => {
                if (action.payload > 0) {
                    let temp_arr = [];
                    for (let i = 1; i <= action.payload; i++) {
                        temp_arr.push(i);
                    }
                    state.sessions = temp_arr;
                }
            })
            .addCase(fetchTrainees.pending, (state, action) => {
                state.traineeLoading = true;
            })
            .addCase(fetchTrainees.rejected, (state, action) => {
                state.traineeLoading = false;
                state.trainees = [];
                state.maxPage = '1';
            })
            .addCase(fetchTrainees.fulfilled, (state, action) => {
                state.trainees = action.payload.data.map((p, key) => {
                    return (
                        {
                            ...p,
                            "id": key + 1
                        }
                    )
                })
                state.maxPage = action.payload.maxPage;
                state.traineeLoading = false;
            })
            .addCase(fetchEvaluate.pending, (state, action) => {
                state.detailLoading = true;
            })
            .addCase(fetchEvaluate.rejected, (state, action) => {
            })
            .addCase(fetchEvaluate.fulfilled, (state, action) => {
                state.evaluate = action.payload;
                state.detailLoading = false;
            })
    }
})

export const fetchClasses = createAsyncThunk('evaluation/fetchClasses', async (params, { rejectWithValue }) => {
    const res = await EvaluationServices.getClasses();
    if (res.data) {
        return res.data;
    }
    else {
        params.notify(res.response.message || messageWrong, 'danger');
        return rejectWithValue(null);
    }
})

export const fetchSessions = createAsyncThunk('evaluation/fetchSessions', async (params, { rejectWithValue }) => {
    const res = await EvaluationServices.getSessions(params.id);
    if (res.data) {
        return res.data;
    }
    else {
        params.notify(res.response.message || messageWrong, 'danger');
        return rejectWithValue(null);
    }
})

export const fetchTrainees = createAsyncThunk('evaluation/fetchTrainees', async (params, { rejectWithValue }) => {
    const res = await EvaluationServices.getTrainees(params.class, params.session, params.index);
    if (res.data) {
        return res.data;
    }
    else {
        params.notify(res.response.message || messageWrong, 'danger');
        return rejectWithValue(null);
    }
})

export const fetchEvaluate = createAsyncThunk('evaluation/fetchEvaluate', async (params, { rejectWithValue }) => {
    const res = await EvaluationServices.getEvaluate(params.id);
    if (res.data) {
        return res.data;
    }
    else {
        params.notify(res.response.message || messageWrong, 'danger');
        return rejectWithValue(null);
    }
})

export const { changeClass, changeSession, setTrainee, setCurrentPage } = evaluationSlice.actions;
export default evaluationSlice.reducer;