//report
export const getReportList = (state) => state.ReportList.reportList;
export const getNumPageList = (state) => state.ReportList.numPage;
export const getDeleteList = (state) => state.ReportList.deleteList;
export const getStatusReportList = (state) => state.ReportList.status;
export const getStatusContentReportList = (state) =>
	state.ReportList.statusContent;

export const getAdminList = (state) => state.ReportModal.adminList;
export const getTrainerList = (state) => state.ReportModal.trainerList;
export const getModal = (state) => state.ReportModal.modal;

export const getDetailReportList = (state) =>
	state.DetailReport.detailReportList;
export const getDetailReportItem = (state) =>
	state.DetailReport.detailReportItem;
export const getDeleteDetailList = (state) =>
	state.DetailReport.deleteDetailList;
export const getStatusDetailReport = (state) => state.DetailReport.status;
export const getStatusContentDetailReport = (state) =>
	state.DetailReport.statusContent;
export const getDetailNumPageList = (state) => state.DetailReport.numPage;

export const getClassNameList = (state) => state.AddNewReport.classNameList;
export const getClassNameInfoItem = (state) =>
	state.AddNewReport.classNameInfoItem;
export const getClassNameInfoList = (state) =>
	state.AddNewReport.classNameInfoList;

export const searchFilterSelector = (state) => state.Filters.searchResult;
export const searchTextSelector = (state) => state.Filters.searchValue;

export const getHistoryReportList = (state) =>
	state.HistoryReportList.historyReportList;
export const getNumPageHistory = (state) => state.HistoryReportList.numPage;
export const getCoursesReport = (state) => state.CoursesReport.coursesReport;
export const getFinanceReport = (state) =>
	state.FinanceReport.financeReportList;

export const getDetailCoursesReport = (state) =>
	state.DetailCoursesReport.detailCoursesReport;
export const getNumPageCourses = (state) => state.DetailCoursesReport.numPage;
export const getStatusCourses = (state) => state.DetailCoursesReport.status;
export const getStatusContentCourses = (state) =>
	state.DetailCoursesReport.statusContent;

export const getDetailFinanceReport = (state) =>
	state.DetailFinanceReport.detailFinanceReport;

export const getDeliveryReportList = (state) =>
	state.DeliveryReportList.deliveryReportList;
export const getDeliveryClasses = (state) =>
	state.NewDeliveryReport.deliveryClasses;
export const getDeliveryClassesInfo = (state) =>
	state.NewDeliveryReport.deliveryClassesInfo;
export const getDetailDelivery = (state) =>
	state.DetailDeliveryReport.detailDelivery;

export const getOutputsReport = (state) => state.OutputsReport.outputsReport;
export const getStatusOutputs = (state) => state.OutputsReport.status;
export const getStatusContentOutputs = (state) =>
	state.OutputsReport.statusContent;
export const getNumPageOutputs = (state) => state.OutputsReport.numPage;
export const getFresherReport = (state) =>
	state.FresherReport.fresherReportList;
export const getSVTTReport = (state) => state.SVTTReport.svttReportList;
export const getDetailOutputsReport = (state) =>
	state.DetailOutputsReport.detailOutputsReport;
export const getStatusDetailOutputs = (state) =>
	state.DetailOutputsReport.status;
export const getStatusContentDetailOutputs = (state) =>
	state.DetailOutputsReport.statusContent;
export const getDetailFresherReport = (state) =>
	state.DetailFresherReport.detailFresherReport;
export const getNumPageFresher = (state) => state.DetailFresherReport.numPage;
export const getDetailSVTTReport = (state) =>
	state.DetailSVTTReport.detailSVTTReport;
export const getStatusFresher = (state) => state.DetailFresherReport.status;
export const getStatusContentFresher = (state) =>
	state.DetailFresherReport.statusContent;
export const getStatusSVTT = (state) => state.DetailSVTTReport.status;
export const getStatusContentSVTT = (state) =>
	state.DetailFresherReport.statusContent;
export const getNumPageSVTT = (state) => state.DetailSVTTReport.numPage;
