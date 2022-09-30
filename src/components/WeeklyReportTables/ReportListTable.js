import React, {useEffect, useMemo, useRef, useState} from "react";
import {Dropdown, Button, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
	useFilters,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from "react-table";
import {getReportList} from "redux/selectors";

import {ReportListColumns} from "./Columns";
import {v4 as uuidv4} from "uuid";
import "./Table.scss";
import {
	deleteReportList,
	fetchReportList,
	updateReportList,
} from "./reportListTableSlice";
import {FilterDate} from "components/Search";
import {IndeterminateCheckbox} from "components/validation/Validation";
import {searchTextSelector} from "redux/selectors";
import {searchFilterSelector} from "redux/selectors";
import {getNumPageList} from "redux/selectors";
import Pagination from "components/pagination/Pagination";

const EditableCell = ({
	value: initialValue,
	row: {index},
	column: {id},
	updateMyData,
	editableRowIndex,
}) => {
	const [value, setValue] = useState(initialValue);

	const onChange = (e) => {
		setValue(e.target.value);
	};
	const onBlur = () => {
		updateMyData(index, id, value);
	};

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);
	return index === editableRowIndex ? (
		<input value={value} onChange={onChange} onBlur={onBlur} />
	) : (
		<p>{value}</p>
	);
};

const defaultColumn = {
	Cell: EditableCell,
};
function ReportListTable() {
	const columns = useMemo(() => ReportListColumns, []);
	const [data, setData] = useState([]);
	const [popperShow, setPopperShow] = useState(false);
	const [editableRowIndex, setEditableRowIndex] = useState(null);
	const searchText = useSelector(searchTextSelector);
	const searchFilterChange = useSelector(searchFilterSelector);
	const reportList = useSelector(getReportList);
	const numPageList = useSelector(getNumPageList);

	const updateMyData = (rowIndex, columnId, value) => {
		setData((old) =>
			old.map((row, index) => {
				if (index === rowIndex) {
					return {
						...old[rowIndex],
						[columnId]: value,
					};
				}
				return row;
			})
		);
	};
	const dispatch = useDispatch();

	const handleUpdateItem = (item) => {
		const {id, reportName} = item;
		const newValue = {id, reportName};
		dispatch(updateReportList(newValue));
	};

	const tableInstanse = useTable(
		{
			columns,
			data,
			defaultColumn,
			updateMyData,
			editableRowIndex,
			setEditableRowIndex,
			handleUpdateItem,
			initialState: {pageIndex: 0},
		},
		useFilters,
		useSortBy,
		usePagination,
		useRowSelect,

		(hooks) => {
			hooks.visibleColumns.push((columns) => {
				return [
					{
						id: "selection",
						Header: ({getToggleAllPageRowsSelectedProps}) => (
							<IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
						),
						Cell: ({row}) => (
							<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
						),
					},
					...columns,
				];
			});
		}
	);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		rows,
		state,
		canNextPage,
		canPreviousPage,
		gotoPage,
		setPageSize,
		previousPage,
		prepareRow,
		selectedFlatRows,
		allColumns,
		getToggleHideAllColumnsProps,
	} = tableInstanse;
	const {pageSize} = state;
	const [pageIndex, setPageIndex] = useState(0);
	const handleNextPage = () => {
		dispatch(fetchReportList({page: Number(pageIndex + 1), num: pageSize}));
		setPageIndex((prev) => prev + 1);
	};
	const handlePreviousPage = () => {
		dispatch(fetchReportList({page: Number(pageIndex - 1), num: pageSize}));
		setPageIndex((prev) => prev - 1);
	};
	const handleGotoNextPage = () => {
		dispatch(fetchReportList({page: Number(numPageList - 1), num: pageSize}));
		setPageIndex(Number(numPageList - 1));
	};
	const handleGotoPreviousPage = () => {
		dispatch(fetchReportList({page: 0, num: pageSize}));
		setPageIndex(0);
	};
	const handleShowPageSize = (num) => {
		setPageSize(num);
		dispatch(fetchReportList({page: pageIndex, num: num}));
	};
	const handleGoToPage = (pageIdex) => {
		if (pageIdex <= numPageList && pageIdex !== 0) {
			dispatch(fetchReportList({page: Number(pageIdex - 1), num: pageSize}));
			setPageIndex(Number(pageIdex - 1));
		} else {
			return;
		}
	};
	useEffect(() => {
		if (selectedFlatRows) {
			let res = selectedFlatRows.map((row) => row.original);
			dispatch(deleteReportList(res));
		}
	}, [selectedFlatRows]);
	useEffect(() => {
		searchText.length > 0 ? setData(searchFilterChange) : setData(reportList);
	}, [reportList, searchText, searchFilterChange]);
	return (
		<div className="weeklyTable">
			<Dropdown>
				<Dropdown.Toggle className="btn-fill" id="dropdown-basic">
					Hide Columns
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<div style={{paddingLeft: 16}}>
						<IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
						Toggle All
					</div>
					{allColumns.map((column) => {
						if (column.id !== "selection") {
							return (
								<Dropdown.Item key={uuidv4()}>
									<input type="checkbox" {...column.getToggleHiddenProps()} />
									{column.Header}
								</Dropdown.Item>
							);
						}
					})}
				</Dropdown.Menu>
			</Dropdown>
			<Table className="table-hover table-striped" {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr key={uuidv4()} {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>
									<div className="columnHeader">
										{column.render("Header") === "Created At" ? (
											<>
												<span
													onClick={() => setPopperShow(!popperShow)}
													className="iconFilter"
												>
													<i className="fas fa-filter"></i>
												</span>
												{popperShow ? (
													<div className="popperDate">
														<span
															className="iconFilter"
															onClick={() => setPopperShow(false)}
														>
															<i
																style={{fontSize: 12, color: "#2196f3"}}
																className="fas fa-filter"
															></i>
														</span>
														<div className="box">
															<FilterDate />
														</div>
													</div>
												) : null}
											</>
										) : null}

										<div {...column.getSortByToggleProps()}>
											{column.render("Header")}
											<span>
												{column.isSorted ? (
													column.isSortedDesc ? (
														<span>
															<i className="fas fa-sort-amount-up"></i>
														</span>
													) : (
														<span>
															<i className="fas fa-sort-amount-up-alt"></i>
														</span>
													)
												) : (
													""
												)}
											</span>
										</div>
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr key={uuidv4()} {...row.getRowProps}>
								{row.cells.map((cell, i) => {
									return (
										<td key={uuidv4()} {...cell.getCellProps()}>
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</Table>
			<Pagination
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				numPageList={numPageList}
				handleGotoNextPage={handleGotoNextPage}
				handleGotoPreviousPage={handleGotoPreviousPage}
				handleGoToPage={handleGoToPage}
				pageIndex={pageIndex}
				pageSize={pageSize}
				setPageSize={setPageSize}
				canNextPage={canNextPage}
				canPreviousPage={canPreviousPage}
				handleShowPageSize={handleShowPageSize}
			/>
		</div>
	);
}

export default ReportListTable;
