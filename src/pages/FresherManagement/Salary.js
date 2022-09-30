import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import SalaryTable from "components/SalaryTable/SalaryTable";
import salaryServices from "services/fresherManagement/salaryServices";

function Salary() {
  const columns = React.useMemo(
    () => [
      {
        Header: "EmpID",
        accessor: "emId",
      },
      {
        Header: "Account",
        accessor: "account",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Group",
        accessor: "group",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "GPA",
        accessor: "gpa",
      },
      {
        Header: "level",
        accessor: "level",
      },
      {
        Header: "Bonus",
        accessor: "bonus",
      },
      {
        Header: "Penalty",
        accessor: "penalty",
      },
      {
        Header: "Standard Allowance",
        accessor: "standardAllowance",
      },
      {
        Header: "Absent",
        accessor: "absent",
      },
      {
        Header: "Late come - early leave",
        accessor: "lateEarlyLeave",
      },
      {
        Header: "Actual Allowance",
        accessor: "actualAllowance",
      },
    ],
    []
  );
  const [data, setData] = React.useState([]);
  const [classList, setClassList] = React.useState([]);
  React.useEffect(() => {}, [data]);

  const handlegetClassList = (newYear) => {
    const result = salaryServices
      .getClassListOfYear(newYear)
      .then(function (result) {
        if (result.status != "200") {
          return;
        } else {
          return result.data.sort(function (a, b) {
            return a.classId - b.classId;
          });
        }
      });
    result.then(function (result) {
      setClassList(result);
    });
  };

  const handleGetdata = (newClass, newMonth) => {
    const data = salaryServices
      .getAllSalary(newClass, newMonth)
      .then(function (result) {
        if (result.status != "200") {
          return;
        }
        if (result.success == "false") {
          return;
        } else {
          return result.data;
        }
      });
    data.then(function (result) {
      if (result) setData(result);
      else setData([]);
    });
  };

  return (
    <>
      <SalaryTable
        columns={columns}
        data={data}
        handleGetdata={handleGetdata}
        classList={classList}
        handlegetClassList={handlegetClassList}
      />
      <div
        style={{
          margin: "0 auto",
          boxSizing: "border-box",
          width: "1200px",
        }}
      >
        <h4
          className="ms-3 mb-2"
          style={{
            textDecoration: "underline",
          }}
        >
          Salary Chart
        </h4>
        <LineChart
          width={1200}
          height={300}
          data={data}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <Line type="monotone" dataKey="actualAllowance" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
          <XAxis dataKey="account" hide />
          <YAxis hide />
          <Tooltip />
        </LineChart>
      </div>
    </>
  );
}

export default Salary;
