import { createSelector } from '@reduxjs/toolkit'
export const classSelector = (state) => state.adminManageAttendance.class;
export const myClassListSelector = (state) => state.adminManageAttendance.classList;
export const adminAttendanceDataSelector = (state) => state.adminManageAttendance.value;
export const attendErrorMessageSelector = (state) => state.adminManageAttendance.errMsg; 
export const isLoadingSelector = (state) => state.adminManageAttendance.isLoading
export const findMonthList = createSelector(
    myClassListSelector,
    classSelector,
    (classList, classChoosen) => {
        if (classChoosen !== '') {
            const classMonthFound = classList.find(d => d.classCode === classChoosen)
            return classMonthFound;
        }
        else return null;
    }

)


