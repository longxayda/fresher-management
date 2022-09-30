import { createSelector } from "@reduxjs/toolkit";

export const auditListNewAudit = (state) => state.newAudit.auditList;
export const traineeClassListNewAudit = (state) => state.newAudit.traineeClassList;
export const moduleListNewAudit = (state) => state.newAudit.moduleList;
export const sessionListNewAudit = (state) => state.newAudit.sessionList;
export const currentValueNewAudit = (state) => state.newAudit.currentValue;
export const traineeListNewAudit = (state) => state.newAudit.traineeList;