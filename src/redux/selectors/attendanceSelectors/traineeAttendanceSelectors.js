export const traineeAttendanceTableSelector = (state) => state.traineeAttendanceTable.data;
export const traineeAttendanceMonthListSelector = (state) => state.traineeAttendanceTable.monthList;
export const traineeIsLoading = (state) => state.traineeAttendanceTable.isLoading;
export const traineeLoading = (state) => state.traineeAttendanceTable.traineeLoading;

export const diligentSummarySelector = (state) => state.diligentSummary.data;
export const attendTableOneTraineeSelector = (state) => state.attendTableOneTrainee.attendResponses;
export const classMonthListSelector = (state) => state.attendTable.months;
export const classListSelector = (state) => state.attendTable.classes;

export const leaveRequestSelector = (state) => state.leaveRequest.value;
export const addRequestSelector = (state) => state.leaveRequest.value;