import React from "react";
import { useState, useEffect } from "react";

import {
    Row,
    Col,
} from "react-bootstrap";
import fresherService from "services/fresherManagement/fresherService";

function FilterPenalty({ setFilterParam }) {
    const [yearList, setYearList] = useState([]);
    const [selectedYear, setSelectedYear] = useState("0");

    const [classList, setClassList] = useState([]);
    const [selectedClass, setSelectedClass] = useState("0");

    useEffect(async () => {
        const fetchYear = async () => {
            const response = await fresherService.getYearList();
            if (response?.success === false) {
                return {
                    error: true,
                    probMessage: response.response.message,
                    data: [],
                };
            }
            if (response.data) {
                return { data: response.data };
            }
            else {
                return { data: [] };
            }
        };

        try {
            const years = await fetchYear();
            setYearList(years.data);
        } catch {
            setYearList([]);
        }
        return () => {
            setYearList([]);
        };
    }, []);

    useEffect(async () => {
        if (selectedYear !== 0) {
            try {
                const response = await fresherService.getCourseList(selectedYear);
                if (response?.success === false) {
                    setClassList([]);
                } else {
                    setClassList(response.data ?? []);
                }
            } catch {
                setClassList([]);
            }
        } else {
            setClassList([]);
        }
        return () => {
            setClassList([]);
        };
    }, [selectedYear]);

    const handleChooseYear = (e) => {
        if (e.target.value == 0) {
            setSelectedClass("");
            setFilterParam({
                year: 0,
                course: "",
            });
        }
        setSelectedYear(e.target.value);
    }

    const handleFilterClass = (e) => {
        setSelectedClass(e.target.value);
        setFilterParam({
            year: selectedYear,
            course: e.target.value,
        });
    }

    return (
        <Row>
            <Col xs="12" sm="12" md="3" lg="5" xl="4" xxl="3">
                <div className="dropdown-penalty-class">
                    <select
                        className="form-select selectPenalty"
                        defaultValue={0}
                        onChange={e => {
                            handleChooseYear(e)
                        }
                        }>
                        <option value="0">All Year</option>
                        {yearList.map((yearList, index) => {
                            return (
                                <option
                                    key={index}
                                    value={yearList}
                                    className="dropdown-content dropdown-item"
                                > {yearList}</option>
                            );
                        })}
                    </select>
                </div>
            </Col>
            <Col xs="" sm="" md="3" lg="5" xl="4" xxl="3" className="d-flex align-items-start">
                <div className="dropdown-penalty-class">
                    <select
                        className="form-select selectPenalty"
                        defaultValue=""
                        onChange={(e) => handleFilterClass(e)}
                    >
                        <option value="0" hidden={selectedYear !== 0}> All Class</option>
                        {classList.map((classList, index) => {
                            return (
                                <option
                                    key={index}
                                    value={classList.classId}
                                    className="dropdown-item"
                                > {classList.classCode} </option>
                            )
                        })}
                    </select>
                </div>
            </Col>
        </Row>
    )
}
export default FilterPenalty;