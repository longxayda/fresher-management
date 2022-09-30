import React, { useState } from "react";
import { useSelector } from "react-redux";

import { classMonthListSelector } from "redux/selectors/attendanceSelectors/traineeAttendanceSelectors";
import { classListSelector } from "redux/selectors/attendanceSelectors/traineeAttendanceSelectors";

function SelectBoxStore() {
  const monthList = useSelector(classMonthListSelector)
  const classList = useSelector(classListSelector)
  const months = monthList;
  const myClasses = classList;

  const [month, setMonth] = useState(months[0] || '')
  const [myClass, setMyclass] = useState(myClasses[0] || '')

  return (
    <>

      <div className="attendance-select-boxes">
        <select
          className="me-1"
          value={myClass}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            setMyclass(e.target.value || undefined);
          }}
          style={{
            width: "15rem",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E3E3E3",
            borderRadius: "4px",
            color: "#565656",
            padding: "8px 12px",
            height: "40px",
            boxShadow: "none",
          }}
        >
          {myClasses.map((myClass, i) => (
            <option key={i} value={myClass}>
              {myClass}
            </option>
          ))}
        </select>

        <select

          value={month}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            setMonth(e.target.value || undefined);
          }}
          style={{
            width: "10rem",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E3E3E3",
            borderRadius: "4px",
            color: "#565656",
            padding: "8px 12px",
            height: "40px",
            boxShadow: "none",
          }}
        >
          {months.map((month, i) => (
            <option key={i} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

    </>

  );
}


export default SelectBoxStore;
