import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatDate } from "utils";

export const HistoryColumns = [
    {
        Header: "Month Date",
        accessor: "monthDate",
        Cell: ({ value }) => {
            return formatDate(new Date(value), "dd/MM/yyyy");
        },
    },
    {
        Header: "Report Name",
        accessor: "reportName",

        disableFilters: true,
    },
    {
        Header: "Action",
        accessor: "action",

        disableFilters: true,
        disableSortBy: true,
        Cell: ({
            row,
            setEditableRowIndex,
            editableRowIndex,
            handleUpdateItem,
            handleAddNewReportItem,
        }) => (
            <div className="actions">
                <Button
                    size="sm"
                    variant="primary"
                    style={{  cusor: "pointer" }}
                    onClick={() => {
                        const currentIndex = row.index;
                        if (editableRowIndex !== currentIndex) {
                            // row requested for edit access
                            setEditableRowIndex(currentIndex);
                        } else {
                            // request for saving the updated row
                            setEditableRowIndex(null);

                            const updatedRow = row.original;
                            handleUpdateItem(updatedRow);
                            // call your updateRow API
                        }
                    }}
                >
                    {editableRowIndex !== row.index ? (
                        <i
                            style={{ fontSize: 14 }}
                            className="fas fa-edit"
                        ></i>
                    ) : (
                        <i
                            style={{ fontSize: 14, color: "green" }}
                            className="fas fa-save"
                        ></i>
                    )}
                </Button>
                <Button
                    size="sm"
                    variant="secondary"
                    style={{  cusor: "pointer" }}
                >
                    <Link
                        to={{
                            pathname: "/admin/report/detail-history-report",
                            state: row.original,
                        }}
                    >
                        <i
                            style={{ fontSize: 14 }}
                            className="far fa-eye "
                            variant = "secondary"
                        ></i>
                    </Link>
                </Button>
               
            </div>
        ),
    },
];

export const DetailDeliveryColumns = [
    {
        Header: "Course Info",
        columns: [
            {
                Header: "Site",
                accessor: "site",
            },
            {
                Header: "Course Code",
                accessor: "code",
            },
            {
                Header: "Course Name",
                accessor: "name",
            },
            {
                Header: "Attendee Type",
                accessor: "attendeeType",
            },
            {
                Header: "Subject Type",
                accessor: "subjectType",
            },
            {
                Header: "Sub-subject Type",
                accessor: "subSubjectType",
            },
            {
                Header: "Format Type",
                accessor: "formatType",
            },
            {
                Header: "Scope",
                accessor: "scope",
            },
            {
                Header: "Delivery Type",
                accessor: "deliveryType",
            },
            {
                Header: "Supplier/Partner",
                accessor: "supplierPartner",
            },
        ],
    },
    {
        Header: "Planned implementation info",
        columns: [
            {
                Header: "Planned Start Date",
                accessor: "planStartDate",
            },
            {
                Header: "Planned End Date",
                accessor: "planEndDate",
            },
            {
                Header: "Planned Learning Time(hrs)",
                accessor: "planLearningTime",
            },
            {
                Header: "Planned Number Of Trainees",
                accessor: "planNumberOfTrainees",
            },
            {
                Header: "Planned Expense",
                accessor: "planExpense",
            },
            {
                Header: "Project-code",
                accessor: "projectCode",
            },
        ],
    },
    {
        Header: "Actual implemetation info",
        columns: [
            {
                Header: "Actual Start Date",
                accessor: "actualStartDate",
            },
            {
                Header: "Actual End Date",
                accessor: "actualEndDate",
            },
            {
                Header: "Actual Learning Time(hrs)",
                accessor: "actualLearningTime",
            },
            {
                Header: "Actual Number of trainees",
                accessor: "actualNumberOfTrainees",
            },
            {
                Header: "Actual Expense",
                accessor: "actualExpense",
            },
            {
                Header: "Number Of Enrolled trainees",
                accessor: "numberOfEnrollTrainees",
            },
            {
                Header: "Number Of graduates",
                accessor: "numberOfGraduates",
            },
            {
                Header: "Training feedback",
                accessor: "trainingFeedback",
            },
            {
                Header: "Training feedback - Content ",
                accessor: "trainingFeedbackContent",
            },
            {
                Header: "Training feedback - Teacher",
                accessor: "trainingFeedbackTeacher",
            },
            {
                Header: "Training feedback - Organization",
                accessor: "trainingFeedbackOrg",
            },
            {
                Header: "Updated By",
                accessor: "updatedBy",
            },
            {
                Header: "Updated Date",
                accessor: "updatedDate",
            },
        ],
    },
    {
        Header: "Note",
        columns: [
            {
                Header: "#",
                accessor: "note",
                //Cell: ({row}) => (noteDisplay()),
            },
        ],
    },
    {
        Header: "Up-to-date implementation info",
        columns: [
            {
                Header: "Start Date",
                accessor: "updateStartDate",
            },
            {
                Header: "End Date",
                accessor: "updateEndDate",
            },
            {
                Header: "Learning Time(hrs)",
                accessor: "updateLearningTime",
            },
            {
                Header: "Number of trainees",
                accessor: "updateNumberOfTrainnes",
            },
            {
                Header: "Expense",
                accessor: "updateExpense",
            },
            {
                Header: "Course Status",
                accessor: "courseStatus",
            },
            {
                Header: "Start Year",
                accessor: "startYear",
            },
            {
                Header: "Start Month",
                accessor: "startMonth",
            },
            {
                Header: "End Year",
                accessor: "endYear",
            },
            {
                Header: "End Month",
                accessor: "endMonth",
            },
            {
                Header: "Trainee List Check",
                accessor: "traineeListCheck",
            },
        ],
    },
];

export const DeliveryColumns = [
    {
        Header: "Month Date",
        accessor: "date",
        Cell: ({ value }) => {
            return formatDate(new Date(value), "dd/MM/yyyy");
        },
    },
    {
        Header: "Report Name",
        accessor: "name",

        disableFilters: true,
    },
    {
        Header: "Action",
        accessor: "action",

        disableFilters: true,
        disableSortBy: true,
        Cell: ({
            row,
            setEditableRowIndex,
            editableRowIndex,
            handleUpdateItem,
            handleAddNewReportItem,
        }) => (
            <div className="actions">
                <Button
                    size="sm"
                    className="btn-fill"
                    variant="outline-primary"
                    style={{
                        borderColor: "#999999",
                        cusor: "pointer",
                        background: "white",
                    }}
                >
                    <Link
                        to={{
                            pathname: "/admin/report/detail-delivery-report",
                            state: row.original,
                        }}
                    >
                        <i
                            style={{ fontSize: 14, color: "gray" }}
                            className="far fa-eye"
                        ></i>
                    </Link>
                </Button>
                <Button
                    size="sm"
                    variant="outline-primary"
                    style={{ borderColor: "blue", cusor: "pointer" }}
                    onClick={() => {
                        const currentIndex = row.index;
                        if (editableRowIndex !== currentIndex) {
                            // row requested for edit access
                            setEditableRowIndex(currentIndex);
                        } else {
                            // request for saving the updated row
                            setEditableRowIndex(null);

                            const updatedRow = row.original;
                            handleUpdateItem(updatedRow);
                            // call your updateRow API
                        }
                    }}
                >
                    {editableRowIndex !== row.index ? (
                        <i
                            style={{ fontSize: 14, color: "blue" }}
                            className="fas fa-edit"
                        ></i>
                    ) : (
                        <i
                            style={{ fontSize: 14, color: "blue" }}
                            className="fas fa-save"
                        ></i>
                    )}
                </Button>
            </div>
        ),
    },
];

export const NewDeliveryColumns = [
    {
        Header: "Course Info",
        columns: [
            {
                Header: "Budget Code",
                accessor: "budgetCode",
            },
            {
                Header: "Supplier Partner",
                accessor: "supplierPartner",
            },
            {
                Header: "Course Name",
                accessor: "courseName",
            },
            {
                Header: "Actual Trainee Number",
                accessor: "actualTraineeNumber",
            },

            {
                Header: "Actual EndDate",
                accessor: "actualEndDate",
            },
            {
                Header: "Actual StartDate",
                accessor: "actualStartDate",
            },
            {
                Header: "Accepted Trainee Number",
                accessor: "acceptedTraineeNumber",
            },
            {
                Header: "Planed StartDate",
                accessor: "planedStartDate",
            },
            {
                Header: "Planed EndDate",
                accessor: "planedEndDate",
            },
            {
                Header: "Update Learning Time",
                accessor: "updateLearningTime",
            },
            {
                Header: "Number of trainees",
                accessor: "updateNumberOfTrainnes",
            },

            {
                Header: "Delivery Type",
                accessor: "deliveryType",
            },

            {
                Header: "Plan Trainee Number",
                accessor: "planTraineeNumber",
            },
            {
                Header: "Estimated Budget",
                accessor: "estimatedBudget",
            },
            {
                Header: "Format Type",
                accessor: "formatType",
            },
        ],
    },
];
