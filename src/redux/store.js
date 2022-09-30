import {configureStore} from "@reduxjs/toolkit";
import attendTableOneTraineeSlice from "./attendanceManagementSlice/attendTableOneTraineeSlice";

// import ticketClassSlice from "./attendanceManagementSlice/ticketClassSlice";
import diligentSummarySlice from "./attendanceManagementSlice/diligentSummarySlice";
import leaveRequestSlice from "./attendanceManagementSlice/leaveRequestSlice";
import checkboxFRReducer from "./fresherManageSlice/checkboxFresherSlice";
import evaluationSlice from "./auditorsSlice/evaluationSlice";
import resourceSlice from "./auditorsSlice/resourceSlice";
import auditorSlice from "./auditorsSlice/auditorSlice";
import manageFRReducer from "./fresherManageSlice/fresherManagementSlice";
import bonusPenaltyReducer from "./fresherManageSlice/penaltySlice";

import classSlice from "./classManagementSlice/classSlice";
import classDetailsSlice from "./classManagementSlice/classDetailsSlice";
import learningPathSlice from "./classManagementSlice/learningPathSlice";
import syllabusSlice from "./classManagementSlice/syllabusSlice";
import moduleSlice from "./classManagementSlice/moduleSlice";
import topicSlice from "./classManagementSlice/topicSlice";

import scoreSlice from "./fresherManageSlice/scoreSlice";
import topicMarkSlice from "./fresherManageSlice/topicMarkSlice";
import scheduleSlice from "./auditorsSlice/scheduleSlice";
import createNewAuditSlice from "./auditorsSlice/createNewAuditSlice";
import adminManageAttendanceReducer from "./attendanceManagementSlice/adminManageAttendanceSlice";
import adminTicketReducer from "./attendanceManagementSlice/adminTicketSlice";

import traineeAttendanceTableSlice from "./attendanceManagementSlice/traineeAttendanceTableSlice";
import authSlice from "./authSlice/authSlice";
import roleSlice from "./roleSlice";
import UserListSlice from "./UserListSlices/UserListSlice";
import attendanceSlice from "./attendanceManagementSlice/attendanceSlice";
import traineeUserProfileSlice from "./userProfileSlice/traineeUserProfileSlice";
import adminUserProfileSlice from "./userProfileSlice/adminUserProfileSlice";

import AddNewReportTableSlice from "components/WeeklyReportTables/addNewReportTableSlice";
import DetailReportTableSlice from "components/WeeklyReportTables/detailReportTableSlice";
import ReportListTableSlice from "components/WeeklyReportTables/reportListTableSlice";
import searchSlice from "components/Search/searchSlice";
import ReportModalSlice from "components/ReportModal/reportModalSlice";

import HistoryReportListTableSlice from "components/MonthlyReportTables/historyReportListTableSlice";
import coursesReportSlice from "../pages/MonthlyReportPage/MonthlyHistoryReport/courses/coursesReportSlice";
import financeReportSlice from "../pages/MonthlyReportPage/MonthlyHistoryReport/finance/financeReportSlice";
import detailCoursesReportSlice from "../pages/MonthlyReportPage/MonthlyHistoryReport/courses/detailCourseReportSlice";
import detailFinanceReportSlice from "../pages/MonthlyReportPage/MonthlyHistoryReport/finance/detailFinanceReportSlice";

import DetailDeliveryTableSlice from "components/MonthlyReportTables/detailDeliveryTableSlice";
import DeliveryReportListTableSlice from "components/MonthlyReportTables/deliveryReportListTableSlice";
import NewDeliveryTableSlice from "components/MonthlyReportTables/newDeliveryTableSlice";

import OutputsReportTableSlice from "components/OutputsReportTables/outputsReportTableSlice";
import fresherReportSlice from "../pages/OutputsReportPage/fresher/fresherReportSlice";
import svttReportSlice from "../pages/OutputsReportPage/svtt/svttReportSlice";

import detailOutputsReportSlice from "../pages/OutputsReportPage/detailOutputsReportSlice";
import detailFresherReportSlice from "../pages/OutputsReportPage/fresher/detailFresherReportSlice";
import detailSVTTReportSlice from "../pages/OutputsReportPage/svtt/detailSVTTReportSlice";

import thunk from "redux-thunk";
const store = configureStore({
	reducer: {
		Filters: searchSlice,
		evaluation: evaluationSlice,
		resource: resourceSlice,
		manageFR: manageFRReducer,
		checkboxFR: checkboxFRReducer,
		attendTableOneTrainee: attendTableOneTraineeSlice,
		// traineeTabTable: TraineeTabTableSlice,
		class: classSlice,
		learningPath: learningPathSlice,
		syllabus: syllabusSlice,
		classDetails: classDetailsSlice,
		module: moduleSlice,
		topicModule: topicSlice,
		auth: authSlice,
		role: roleSlice,
		// UserList
		UserList: UserListSlice,
		schedule: scheduleSlice,
		newAudit: createNewAuditSlice,
		auditor: auditorSlice,

		// attendTable: attendTableSlice,
		// ticketClass: ticketClassSlice,
		diligentSummary: diligentSummarySlice,
		leaveRequest: leaveRequestSlice,
		adminManageAttendance: adminManageAttendanceReducer,
		adminTicket: adminTicketReducer,
		attendance: attendanceSlice,
		traineeAttendanceTable: traineeAttendanceTableSlice,
		bonusPenalty: bonusPenaltyReducer,
		score: scoreSlice,
		topic: topicMarkSlice,
		traineeUserProfile: traineeUserProfileSlice,
		adminUserProfile: adminUserProfileSlice,

		ReportList: ReportListTableSlice,
		AddNewReport: AddNewReportTableSlice,
		DetailReport: DetailReportTableSlice,
		Filters: searchSlice,
		ReportModal: ReportModalSlice,

		HistoryReportList: HistoryReportListTableSlice,
		CoursesReport: coursesReportSlice,
		FinanceReport: financeReportSlice,
		DetailCoursesReport: detailCoursesReportSlice,
		DetailFinanceReport: detailFinanceReportSlice,
		DetailDeliveryReport: DetailDeliveryTableSlice,
		DeliveryReportList: DeliveryReportListTableSlice,
		NewDeliveryReport: NewDeliveryTableSlice,

		OutputsReport: OutputsReportTableSlice,
		FresherReport: fresherReportSlice,
		SVTTReport: svttReportSlice,
		DetailFresherReport: detailFresherReportSlice,
		DetailSVTTReport: detailSVTTReportSlice,
		DetailOutputsReport: detailOutputsReportSlice,
	},
	middleware: [thunk],
});

export default store;
