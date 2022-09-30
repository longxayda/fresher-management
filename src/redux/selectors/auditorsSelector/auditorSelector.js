import { createSelector } from "@reduxjs/toolkit";

export const selectedIds = (state) => state.auditor.selectedIds;
export const skillOptions = (state) => state.auditor.skillOptions;
export const auditorList = (state) => state.auditor.auditorList;
export const isAddModalOpen = (state) => state.auditor.isAddModalOpen;
export const isDelModalOpen = (state) => state.auditor.isDelModalOpen;
export const isMultiDel = (state) => state.auditor.isMultiDel;