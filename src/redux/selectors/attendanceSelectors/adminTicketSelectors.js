import { createSelector } from '@reduxjs/toolkit'
export const classSelector = (state) => state.adminTicket.class;
export const myClassListSelector = (state) => state.adminTicket.classList
export const adminTicketDataSelector = (state) => state.adminTicket.value;
export const ticketErrorMessageSelector = (state) => state.adminTicket.errMsg; 
export const ticketLoading = (state) => state.adminTicket.ticketLoading;


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

export const attendMessageSeletor = (state) => state.attendance.message;