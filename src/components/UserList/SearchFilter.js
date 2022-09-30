import React, { useState } from "react";
import Select from "react-select";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { USER_LIST_SELECTOR } from "redux/selectors/UserListSelectors";
import {
  setSearch,
  setFilter,
  getUserData,
} from "redux/UserListSlices/UserListSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchFilter({ setCurrentPage }) {
  const dispatch = useDispatch();
  const role = useSelector(USER_LIST_SELECTOR).role;
  // Handle fillter and search user
  const [fillterShow, setFillterShow] = useState([]);
  const [searchResult, setsearchResult] = useState("");
  const handleFilterChange = (e) => {
    setFillterShow((pre) => e);
    if (e.length == 0) {
      dispatch(setFilter([]));
      dispatch(
        getUserData({
          pageIndex: 1,
          sizePage: 10,
          searchFilter: {
            search: searchResult,
            filter: [],
          },
        })
      );
      setCurrentPage(1);
    }
  };
  const handleSearchChange = (e) => {
    setsearchResult((pre) => e.target.value);
    if (e.target.value === "") {
      dispatch(setSearch(''));
      dispatch(
        getUserData({
          pageIndex: 1,
          sizePage: 10,
          searchFilter: {
            search: "",
            filter: fillterShow.map((role) => role.value),
          },
        })
      );
      setCurrentPage(1);
    }
  };
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      top: "80%",
    }),
    control: (provided, state) => ({
      ...provided,
      width: 350,
    }),
  };

  const handleFilterBtnCLick = () => {
    dispatch(setFilter(fillterShow.map((role) => role.value)));
    dispatch(
      getUserData({
        pageIndex: 1,
        sizePage: 10,
        searchFilter: {
          search: searchResult,
          filter: fillterShow.map((role) => role.value),
        },
      })
    );
    setCurrentPage(1);
  };
  const handleSearchBtnCLick = () => {
    dispatch(setSearch(searchResult));
    dispatch(
      getUserData({
        pageIndex: 1,
        sizePage: 10,
        searchFilter: {
          search: searchResult,
          filter: fillterShow.map((role) => role.value),
        },
      })
    );
    setCurrentPage(1);
  };

  return (
    <div className="search-fillter justify-content-between">
      <div className="d-flex">
        <Form.Group className="mb-3" style={{ width: 350, height: 30 }}>
          <Form.Control
            style={{ height: 39 }}
            type="text"
            placeholder="Search..."
            value={searchResult}
            onChange={handleSearchChange}
          />
        </Form.Group>
        <Button
          style={{ height: 39, padding: "4px 11px", marginLeft: 4 }}
          variant="secondary"
          onClick={handleSearchBtnCLick}
        >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </div>
      <div className="d-flex">
        <Select
          styles={customStyles}
          options={role.map((role) => {
            return {
              value: role.role,
              label: role.role,
            };
          })}
          isMulti
          value={fillterShow}
          onChange={handleFilterChange}
          placeholder="Filter by Role..."
        />
        <Button
          style={{ height: 39, padding: "4px 11px", marginLeft: 4 }}
          variant="secondary"
          onClick={handleFilterBtnCLick}
        >
          <FontAwesomeIcon icon={faFilter} />
        </Button>
      </div>
    </div>
  );
}

export default SearchFilter;
