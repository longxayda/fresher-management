import { createSelector } from "@reduxjs/toolkit";

export const idSchedule =  (state) => state.schedule.id;
export const selectIdsSchedule = (state) => state.schedule.selectedIds;

export const traineeSchedule = (state) => state.schedule.trainee;
export const traineeListSchedule = (state) => state.schedule.traineeList;

export const scheduleID = (state) => state.schedule.scheduleID;
export const IDtrainee = (state) => state.schedule.trainee;

export const emailListSchedule = (state) => state.schedule.emailList;
export const gradeListSchedule = (state) => state.schedule.gradeList;
export const QuestionList = (state) => state.schedule.questionList;
export const dataModalSchedule = (state) => state.schedule.dataModal;

export const isLoadingSchedule= (state) => state.schedule.isLoading;
export const schedules = (state) => state.schedule.schedules;
export const formSchedule = (state) => state.schedule.form;
export const errorsSchedule = (state) => state.schedule.errors;
export const isOpenModalEditSchedule = (state) => state.schedule.isOpenModalEditSchedule;
export const isOpenModalDeleteSchedule = (state) => state.schedule.isOpenModalDelete;
export const isMultipleDeleteSchedule = (state) => state.schedule.isMultipleDelete;
export const deleteManyScheduleSelector = (state) => state.schedule.deleteManyIds;
export const totalScheduleSchedule = (state) => state.schedule.totalschedule;
export const questionSelectedListSchedule = (state) => state.schedule.questionSelectedList;
export const totalItemEvaluationSchedule = (state) => state.schedule.totalItemEvaluation;
export const ListtrainerSchedule = (state) => state.schedule.Listtrainer;
export const isOpenEditSchedule = (state) => state.schedule.isOpenEdit;

export const fieldEvaluationSchedule = (state) => state.schedule.fieldEvaluation

