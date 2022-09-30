import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import fresherService from "services/fresherManagement/fresherService";

function FresherListFilter({ setFilterParam }) {
  const [yearList, setYearList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [filterError, setFilterError] = useState({});

  const [filterYear, setFilterYear] = useState(0);
  const [filterCourse, setFilterCourse] = useState("");

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
      } else {
        return { data: [] };
      }
    };

    try {
      const years = await fetchYear();
      let x = years.data.sort();
      x.reverse();
      setYearList(x);
    } catch {
      setYearList([]);
    }
    return () => {
      setYearList([]);
    };
  }, []);

  useEffect(async () => {
    if (filterYear !== 0) {
      try {
        const response = await fresherService.getCourseList(filterYear);
        if (response?.success === false) {
          setCourseList([]);
        } else {
          let x = response.data;
          setCourseList(x ?? []);
        }
      } catch {
        setCourseList([]);
      }
    } else {
      setCourseList([]);
    }
    return () => {
      setCourseList([]);
    };
  }, [filterYear]);

  function handleFilterEvent(e) {
    setFilterCourse(e.target.value);
    setFilterParam({
      year: filterYear,
      course: e.target.value,
    });
  }

  function handleChooseYear(e) {
    if (e.target.value == 0) {
      setFilterCourse("");
      setFilterParam({
        year: 0,
        course: "",
      });
    } else {
      setFilterYear(e.target.value);
    }
  }

  return (
    <>
      <Container fluid className="ps-3 pe-3 fresher-list-filter">
        <Row>
          <Col
            md="6"
            lg="5"
            xl="4"
            xxl="2"
            className="p-1 "
            style={{ width: 120 }}
          >
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => handleChooseYear(e)}
              defaultValue={0}
            >
              <option value="0">All Year</option>
              {yearList.map((year, i) => {
                return (
                  <option key={i} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </Col>
          <Col
            md="6"
            lg="5"
            xl="4"
            xxl="2"
            className="p-1"
            style={{ width: 120 }}
          >
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => handleFilterEvent(e)}
              defaultValue={filterCourse}
            >
              <option value="" hidden={filterYear != 0}>
                All Class
              </option>
              {courseList.map((course, i) => {
                return (
                  <option key={i} value={course.classId}>
                    {course.classCode}
                  </option>
                );
              })}
            </select>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FresherListFilter;
