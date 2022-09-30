import React from "react";
import { useSelector } from "react-redux";
import { Detail, DetailLoading } from "redux/selectors/auditorsSelector/evaluationSelectors";
import { EvaluationTable } from "components/Audit/Evaluation/EvaluationTable";

const obj = [
    {
        Header: "Time",
        accessor: "time",
        Filter: () => null,
    },
    {
        Header: "Question",
        accessor: "content",
        Filter: () => null,
    },
    {
        Header: "Question Level",
        accessor: "level",
        Filter: () => null,
    },
    {
        Header: "Comment",
        accessor: "assessment",
        Filter: () => null,
    },
    {
        Header: "Score",
        accessor: "score",
        Filter: () => null,
    },
    {
        Header: "Auditor",
        accessor: "auditorName",
        Filter: () => null,
    },
];

const DetailEvaluation = () => {
    const columns = React.useMemo(() => obj, []);
    const data = useSelector(Detail);
    return (
        <>
            <EvaluationTable
                id="detail-component"
                columns={columns}
                data={data.listEva || []}
                currentIndex={1}
                maxIndex={1}
                setCurrentIndex={() => { }}
                load={DetailLoading}
            />
        </>

    );
}

export default DetailEvaluation;
