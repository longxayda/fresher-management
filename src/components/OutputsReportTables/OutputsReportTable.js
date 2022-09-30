import React, {useEffect, useMemo, useRef, useState} from "react";
import {Dropdown, Button, Form, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
	useFilters,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from "react-table";
import {OutputsColumns} from "./Columns";
import {v4 as uuidv4} from "uuid";
import "./Table.scss";
import {
	fetchOutputsReport,
	newReportItem,
	updateOutputsReport,
} from "./outputsReportTableSlice";
import {FilterDate} from "components/Search";
import {MyCheckbox} from "components/validation/Validation";
import {getOutputsReport} from "redux/selectors";
import Pagination from "components/pagination/Pagination";
import {getNumPageOutputs} from "redux/selectors";

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
function OutputsReportTable({setDeleteList}) {
	const outputsReport = useSelector(getOutputsReport);
	const columns = useMemo(() => OutputsColumns, []);
	const [data, setData] = useState([]);
	const [popperShow, setPopperShow] = useState(false);
	const [editableRowIndex, setEditableRowIndex] = React.useState(null);

	const updateMyData = (rowIndex, columnId, value) => {
		// We also turn on the flag to not reset the page
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

	const handleUpdateItem = (value) => {
		dispatch(updateOutputsReport(value));
	};
	const handleAddNewReportItem = (value) => {
		let newValue = {new: true, ...value};
		dispatch(newReportItem(newValue));
	};
	const tableInstanse = useTable(
		{
			columns,
			data,
			defaultColumn,
			updateMyData,
			editableRowIndex,
			setEditableRowIndex,
			handleAddNewReportItem,
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
						Header: ({getToggleAllRowsSelectedProps}) => (
							<MyCheckbox {...getToggleAllRowsSelectedProps()} />
						),
						Cell: ({row}) => (
							<MyCheckbox {...row.getToggleRowSelectedProps()} />
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
		nextPage,
		pageOptions,
		canNextPage,
		canPreviousPage,
		gotoPage,
		pageCount,
		setPageSize,
		previousPage,
		prepareRow,
		selectedFlatRows,
	} = tableInstanse;
	const {pageSize} = state;
	const [pageIndex, setPageIndex] = useState(0);
	const numPageList = useSelector(getNumPageOutputs);
	const handleNextPage = () => {
		dispatch(fetchOutputsReport({page: Number(pageIndex + 1), num: pageSize}));
		setPageIndex((prev) => prev + 1);
	};
	const handlePreviousPage = () => {
		dispatch(fetchOutputsReport({page: Number(pageIndex - 1), num: pageSize}));
		setPageIndex((prev) => prev - 1);
	};
	const handleGotoNextPage = () => {
		dispatch(
			fetchOutputsReport({page: Number(numPageList - 1), num: pageSize})
		);
		setPageIndex(Number(numPageList - 1));
	};
	const handleGotoPreviousPage = () => {
		dispatch(fetchOutputsReport({page: 0, num: pageSize}));
		setPageIndex(0);
	};
	const handleShowPageSize = (num) => {
		setPageSize(num);
		dispatch(fetchOutputsReport({page: pageIndex, num: num}));
	};
	const handleGoToPage = (pageIdex) => {
		if (pageIdex <= numPageList && pageIdex !== 0) {
			dispatch(fetchOutputsReport({page: Number(pageIdex - 1), num: pageSize}));
			setPageIndex(Number(pageIdex - 1));
		} else {
			return;
		}
	};

	useEffect(() => {
		let res = selectedFlatRows.map((row) => row.original);
		setDeleteList(res);
	}, [selectedFlatRows]);
	useEffect(() => {
		setData(outputsReport);
	}, [outputsReport]);
	return (
		<div className="outputsTable">
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

										<div
											// className="column-header"
											{...column.getSortByToggleProps()}
										>
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

export default OutputsReportTable;
