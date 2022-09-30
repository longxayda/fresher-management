/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import AttendanceList from "pages/AttendanceManagement/AttendanceList.js";
import TicketManagement from "pages/TicketManagement/index";
import UserProfile from "pages/User/UserProfile";
import LeaveRequest from "pages/AttendanceManagement/LeaveRequest";
import TraineeAttendance from "pages/AttendanceManagement/TraineeAttendance";
import DiligentSummary from "pages/AttendanceManagement/DiligentSummary";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CourseManagement from "pages/CourseManagement/CourseManagement.js";
import ClassManagement from "pages/ClassManagement/index";
import SubjectDetail from "pages/ClassManagement/SubjectDetail.js";
import ClassDetail from "pages/ClassManagement/ClassDetails/ClassDetails";
// import ClassPlan from "pages/TrainingPath.js";
import UserList from "pages/UserList/index";
import RoleManagement from "pages/RoleManagement";
import React from "react";
import Evaluations from "pages/Auditors/Evaluations";
import Resource from "pages/Auditors/Resource";
import Auditor from "pages/Auditors/Auditor";
import NewAuditModal from "components/Audit/CreateNewAudit/NewAuditModal.js";
import Schedule from "pages/Auditors/Schedule";
import FresherList from "pages/FresherManagement/FresherList";
import Feedback from "pages/FresherManagement/Feedback";
import Salary from "pages/FresherManagement/Salary";
import Penalty from "pages/FresherManagement/Penalty";
import ManageScore from "pages/FresherManagement/ScoreManagement";
import TableList from "pages/FresherManagement/TableList";
import Topic from "pages/FresherManagement/Topic";

import AddNewReport from "pages/WeeklyReportPage/AddNewReport";
import DetailReport from "pages/WeeklyReportPage/DetailReport";
import ReportList from "pages/WeeklyReportPage/ReportList";

import HistoryReportList from "pages/MonthlyReportPage/MonthlyHistoryReport/HistoryReportList";
import NewHistoryReport from "pages/MonthlyReportPage/MonthlyHistoryReport/NewHistoryReport";
import DetailHistoryReport from "pages/MonthlyReportPage/MonthlyHistoryReport/DetailHistoryReport";
import DetailDeliveryReport from "pages/MonthlyReportPage/MonthlyDeliveryReport/DetailDeliveryReport";
import DeliveryReportList from "pages/MonthlyReportPage/MonthlyDeliveryReport/DeliveryReportList";
import NewDeliveryReport from "pages/MonthlyReportPage/MonthlyDeliveryReport/NewDeliveryReport";
import OutputsReport from "pages/OutputsReportPage/OutputsReport";
import NewOutputsReport from "pages/OutputsReportPage/NewOutputsReport";
import DetailOutputsReport from "pages/OutputsReportPage/DetailOutputsReport";
import Attendance from "pages/AttendanceManagement/Attendance";
import BarcodeAttendance from "pages/AttendanceManagement/BarcodeAttendance";

import { api } from "services/api";
const IsChild = (userArr, featureArr) => {
  return featureArr.every((featureRight) => {
    return userArr.findIndex((userRight) => featureRight === userRight) !== -1;
  });
};

const rightsAccessDashboard = {
  UserManagment: {
    rights: [["UR001", "RO001", "PE001", "US002"]],
    routes: [
      {
        path: "/user",
        name: "User Management",
        icon: "fas fa-list fa-2xl",
        layout: "/admin",
        children: [
          {
            path: "/role",
            name: "Role",
            icon: "nc-icon nc-tag-content",
            component: RoleManagement,
            layout: "/admin",
          },
          {
            path: "/list-user",
            name: "User List",
            icon: "nc-icon nc-notes",
            component: UserList,
            layout: "/admin",
          },
        ],
      },
    ],
  },
  FresherManagement: {
    rights: [
      [
        "TR007",
        "FE001",
        "US001",
        "TN002",
        "TN001",
        "SA001",
        "GR002",
        "FM001",
        "BP001",
        "GR001",
      ],
    ],

    routes: [
      {
        path: "/fresher-management",
        name: "Fresher Management",
        icon: "fas fa-users fa-2xl",
        layout: "/admin",
        children: [
          {
            icon: "nc-icon nc-bullet-list-67",
            path: "/list",
            name: "List",
            component: FresherList,
            layout: "/admin",
          },
          {
            icon: "nc-icon nc-money-coins",
            path: "/saraly",
            name: "Salary",
            component: Salary,
            layout: "/admin",
          },
          {
            path: "/penalty",
            name: "Penalty",
            icon: "nc-icon nc-cctv",
            component: Penalty,
            layout: "/admin",
          },
          {
            path: "/feedback",
            name: "Feedback",
            icon: "nc-icon nc-notification-70",
            component: Feedback,
            layout: "/admin",
          },
          {
            path: "/score",
            name: "Score",
            icon: "nc-icon nc-settings-90",
            component: ManageScore,
            layout: "/admin",
          },
          {
            path: "/topic",
            name: "Topic",
            icon: "nc-icon nc-puzzle-10",
            component: Topic,
            layout: "/admin",
          },
        ],
      },
    ],
  },
  Audit: {
    rights: [
      ["SC001", "AU002", "AU003", "AU001"],
      ["QU001", "QU002", "SC001", "SC003", "AU001", "AU003", "SC003"],
    ],
    routes: [
      {
        layout: "/admin",
        children: [
          {
            path: "/resource",
            name: "Resource",
            icon: "nc-icon nc-app",
            component: Resource,
            layout: "/admin",
          },
          {
            path: "/schedule",
            name: "Schedule",
            icon: "nc-icon nc-time-alarm",
            component: Schedule,
            layout: "/admin",
          },
          {
            path: "/auditor",
            name: "Auditors",
            icon: "nc-icon nc-single-02",
            component: Auditor,
            layout: "/admin",
          },
          {
            path: "/evaluated",
            name: "Evaluation",
            icon: "nc-icon nc-check-2",
            component: Evaluations,
            layout: "/admin",
          },
        ],
        group: "Audit",
        path: "/audit",
        name: "Audit",
        icon: "fas fa-pen fa-2xl",
      },
    ],
  },
  ClassCourse: {
    rights: [
      ["CL001", "CL002"],
      ["CL003", "LP001", "LP002", "TR004", "TR005", "TR006", "TR007"],
      ["CL003", "LP001", "TR005", "TR006"],
    ],
    routes: [
      {
        path: "/class/class-management/class-detail",
        name: "Class Detail",
        icon: "fa-solid fa-book",
        component: ClassDetail,
        layout: "/admin",
        hide: true,
      },
      {
        path: "/class/course-management/sylabus",
        name: "Subject Detail",
        icon: "fa-solid fa-book",
        component: SubjectDetail,
        layout: "/admin",
        hide: true,
      },
      {
        layout: "/admin",
        children: [
          {
            path: "/class-management",
            name: "Class Management",
            icon: "fas fa-school",
            component: ClassManagement,
            layout: "/admin",
          },
          {
            path: "/course-management",
            name: "Course Management",
            icon: "fas fa-book",
            component: CourseManagement,
            layout: "/admin",
          },
        ],
        group: "Class & Course",
        path: "/class",
        name: "Class & Course",
        icon: "fa-solid fa-school-flag fa-2xl",
      },
    ],
  },
  AttendanceManagement: {
    rights: [["AT001", "TI003", "TI002", "UP001"]],
    routes: [
      {
        group: "Attendance",
        path: "/attendance",
        name: "Attendance",
        icon: "fa-solid fa-id-card fa-2xl",
        layout: "/admin",
        children: [
          {
            path: "/attendance-details",
            name: "Details",
            icon: "nc-icon nc-badge",
            component: AttendanceList,
            layout: "/admin",
          },
          {
            path: "/ticket-management",
            name: "Ticket Management",
            icon: "nc-icon nc-notes",
            component: TicketManagement,
            layout: "/admin",
          },
          {
            path: "/barcode",
            name: "QR Code Attend",
            icon: "nc-icon nc-notification-70",
            component: BarcodeAttendance,
            layout: "/admin",
          },
        ],
      },
    ],
  },
  UserProfileManagement: {
    rights: [
      ["AT001", "TI003", "TI002", "UP001"],
      [
        "AT003",
        "AT002",
        "TI001",
        "TI003",
        "FE001",
        "SA001",
        "FM001",
        "GR002",
        "UP001",
      ],
    ],

    routes: [
      {
        path: "/user",
        name: "User Profile",
        icon: "fas fa-solid fa-user fa-sm",
        component: UserProfile,
        layout: "/admin",
      },
    ],
  },
  MainReport: {
    rights: [["US002"]],
    routes: [
      {
        path: "/report",
        name: "Main Report",
        icon: "fas fa-newspaper fa-2xl",
        layout: "/admin",
        children: [
          {
            path: "/weekly-report-list",
            name: "Weekly Report List",
            icon: "nc-icon nc-notes",
            component: ReportList,
            layout: "/admin",
          },
          {
            path: "/new-weekly-report",
            name: " New Weekly Report",
            icon: "nc-icon nc-notes",
            component: AddNewReport,
            layout: "/admin",
          },
          {
            path: "/detail-weekly-report",
            name: "Weekly Detail Report",
            icon: "nc-icon nc-notes",
            component: DetailReport,
            layout: "/admin",
          },
          {
            path: "/history-report-list",
            name: "History Report",
            icon: "nc-icon nc-notes",
            component: HistoryReportList,
            layout: "/admin",
          },
          {
            path: "/new-history-report",
            name: "New History Report",
            icon: "nc-icon nc-notes",
            component: NewHistoryReport,
            layout: "/admin",
          },
          {
            path: "/detail-history-report",
            name: "Detail History Report",
            icon: "nc-icon nc-notes",
            component: DetailHistoryReport,
            layout: "/admin",
          },
          {
            path: "/delivery-report-list",
            name: "Delivery Report",
            icon: "nc-icon nc-notes",
            component: DeliveryReportList,
            layout: "/admin",
          },
          {
            path: "/new-delivery-report",
            name: "New Delivery Report",
            icon: "nc-icon nc-notes",
            component: NewDeliveryReport,
            layout: "/admin",
          },
          {
            path: "/detail-delivery-report",
            name: "Detail Delivery Report",
            icon: "nc-icon nc-notes",
            component: DetailDeliveryReport,
            layout: "/admin",
          },
          {
            path: "/output",
            name: "Output Report",
            icon: "nc-icon nc-notes",
            component: OutputsReport,
            layout: "/admin",
          },
          {
            path: "/new-output-report",
            name: "New Output Report",
            icon: "nc-icon nc-notes",
            component: NewOutputsReport,
            layout: "/admin",
          },
          {
            path: "/detail-output-report",
            name: "Detail Output Report",
            icon: "nc-icon nc-notes",
            component: DetailOutputsReport,
            layout: "/admin",
          },
        ],
      },
    ],
  },
  Trainee: {
    rights: [
      [
        "AT003",
        "AT002",
        "TI001",
        "TI003",
        "FE001",
        "SA001",
        "FM001",
        "GR002",
        "UP001",
      ],
    ],
    routes: [
      {
        name: "Trainee",
        path: "/trainee",
        icon: "fa-solid fa-id-card fa-2xl",
        layout: "/admin",
        children: [
          {
            path: "/trainee/attendance",
            name: "Trainee attendance",
            icon: "nc-icon nc-badge",
            component: TraineeAttendance,
            layout: "/admin",
          },
          {
            path: "/leave-request",
            name: "Trainee Leave Request",
            icon: "nc-icon nc-notification-70",
            component: LeaveRequest,
            layout: "/admin",
          },
        ],
      },
    ],
  },
};

export const createDashboardRoutes = (user) => {
  let res = [];
  const currentUser = user ? user : api.getCache("user");
  const key = Object.keys(rightsAccessDashboard);
  if (currentUser) {
    for (let i = 0; i < key.length; i++) {
      const check = rightsAccessDashboard[key[i]].rights.some((rightArr) => {
        return IsChild(currentUser.permissions, rightArr);
      });
      if (check) {
        res = [...res, ...rightsAccessDashboard[key[i]].routes];
      }
    }
  }
  return res;
};

const dashboardRoutes = [
  {
    path: "/user",
    name: "User Management",
    icon: "fas fa-list fa-xl",
    layout: "/admin",
    children: [
      {
        path: "/role",
        name: "Role",
        icon: "nc-icon nc-tag-content",
        component: RoleManagement,
        layout: "/admin",
      },
      {
        path: "/list-user",
        name: "User List",
        icon: "nc-icon nc-notes",
        component: UserList,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/fresher-management",
    name: "Fresher Management",
    icon: "fas fa-users fa-xl",
    layout: "/admin",
    children: [
      {
        icon: "nc-icon nc-bullet-list-67",
        path: "/list",
        name: "List",
        component: FresherList,
        layout: "/admin",
      },
      {
        icon: "nc-icon nc-money-coins",
        path: "/saraly",
        name: "Salary",
        component: Salary,
        layout: "/admin",
      },
      {
        path: "/penalty",
        name: "Penalty",
        icon: "nc-icon nc-cctv",
        component: Penalty,
        layout: "/admin",
      },
      {
        path: "/feedback",
        name: "Feedback",
        icon: "nc-icon nc-notification-70",
        component: Feedback,
        layout: "/admin",
      },
      {
        path: "/score",
        name: "Score",
        icon: "nc-icon nc-settings-90",
        component: ManageScore,
        layout: "/admin",
      },
      {
        path: "/topic",
        name: "Topic",
        icon: "nc-icon nc-puzzle-10",
        component: Topic,
        layout: "/admin",
      },
    ],
  },
  {
    layout: "/admin",
    children: [
      {
        path: "/resource",
        name: "Resource",
        icon: "nc-icon nc-app",
        component: Resource,
        layout: "/admin",
      },
      {
        path: "/schedule",
        name: "Schedule",
        icon: "nc-icon nc-time-alarm",
        component: Schedule,
        layout: "/admin",
      },
      {
        path: "/auditor",
        name: "Auditors",
        icon: "nc-icon nc-single-02",
        component: Auditor,
        layout: "/admin",
      },
      {
        path: "/evaluated",
        name: "Evaluation",
        icon: "nc-icon nc-check-2",
        component: Evaluations,
        layout: "/admin",
      },
    ],
    group: "Audit",
    path: "/audit",
    name: "Audit",
    icon: "fas fa-pen fa-xl",
  },
  {
    path: "/class/class-management/class-detail",
    name: "Class Detail",
    icon: "fa-solid fa-book",
    component: ClassDetail,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/class/course-management/sylabus",
    name: "Syllabus",
    icon: "fa-solid fa-book",
    component: SubjectDetail,
    layout: "/admin",
    hide: true,
  },
  {
    layout: "/admin",
    children: [
      {
        path: "/class-management",
        name: "Class Management",
        icon: "fas fa-school",
        component: ClassManagement,
        layout: "/admin",
      },
      {
        path: "/course-management",
        name: "Course Management",
        icon: "fas fa-book",
        component: CourseManagement,
        layout: "/admin",
      },
    ],
    group: "Class & Course",
    path: "/class",
    name: "Class & Course",
    icon: "fa-solid fa-school-flag",
  },
  {
    group: "Attendance",
    path: "/attendance",
    name: "Attendance",
    icon: "fa-solid fa-id-card fa-2xl",
    layout: "/admin",
    children: [
      {
        path: "/attendance-details",
        name: "Details",
        icon: "nc-icon nc-badge",
        component: AttendanceList,
        layout: "/admin",
      },
      {
        path: "/ticket-management",
        name: "Ticket Management",
        icon: "nc-icon nc-notes",
        component: TicketManagement,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/report",
    name: "Main Report",
    icon: "nc-icon nc-notes",
    layout: "/admin",
    children: [
      {
        path: "/weekly-report-list",
        name: "Weekly Report List",
        icon: "nc-icon nc-notes",
        component: ReportList,
        layout: "/admin",
      },
      {
        path: "/new-weekly-report",
        name: " New Weekly Report",
        icon: "nc-icon nc-notes",
        component: AddNewReport,
        layout: "/admin",
      },
      {
        path: "/detail-weekly-report",
        name: "Weekly Detail Report",
        icon: "nc-icon nc-notes",
        component: DetailReport,
        layout: "/admin",
      },
      {
        path: "/history-report-list",
        name: "History Report",
        icon: "nc-icon nc-notes",
        component: HistoryReportList,
        layout: "/admin",
      },
      {
        path: "/new-history-report",
        name: "New History Report",
        icon: "nc-icon nc-notes",
        component: NewHistoryReport,
        layout: "/admin",
      },
      {
        path: "/detail-history-report",
        name: "Detail History Report",
        icon: "nc-icon nc-notes",
        component: DetailHistoryReport,
        layout: "/admin",
      },
      {
        path: "/delivery-report-list",
        name: "Delivery Report",
        icon: "nc-icon nc-notes",
        component: DeliveryReportList,
        layout: "/admin",
      },
      {
        path: "/new-delivery-report",
        name: "New Delivery Report",
        icon: "nc-icon nc-notes",
        component: NewDeliveryReport,
        layout: "/admin",
      },
      {
        path: "/detail-delivery-report",
        name: "Detail Delivery Report",
        icon: "nc-icon nc-notes",
        component: DetailDeliveryReport,
        layout: "/admin",
      },
      {
        path: "/output",
        name: "Output Report",
        icon: "nc-icon nc-notes",
        component: OutputsReport,
        layout: "/admin",
      },
      {
        path: "/new-output-report",
        name: "New Output Report",
        icon: "nc-icon nc-notes",
        component: NewOutputsReport,
        layout: "/admin",
      },
      {
        path: "/detail-output-report",
        name: "Detail Output Report",
        icon: "nc-icon nc-notes",
        component: DetailOutputsReport,
        layout: "/admin",
      },
    ],
  },

  {
    Trainee: {
      roles: ["Admin Manager", "Trainee"],
      routes: [
        {
          path: "/trainee",
          name: "Trainee",
          icon: "fa-solid fa-id-card fa-2xl",
          layout: "/admin",
          children: [
            {
              path: "/trainee-attendance",
              name: "Trainee attendance",
              icon: "nc-icon nc-badge",
              component: TraineeAttendance,
              layout: "/admin",
            },
            {
              path: "/user",
              name: "Trainee User Profile",
              icon: "fas fa-solid fa-user",
              component: UserProfile,
              layout: "/admin",
            },
            {
              path: "/leave-request",
              name: "Trainee Leave Request",
              icon: "nc-icon nc-notification-70",
              component: LeaveRequest,
              layout: "/admin",
            },
            // {
            //   path: "/attend",
            //   name: "Attend",
            //   icon: "nc-icon nc-notification-70",
            //   component: Attendance,
            //   layout: "/attend",
            // }
          ],
        },
      ],
    },
  },
];

export default dashboardRoutes;
