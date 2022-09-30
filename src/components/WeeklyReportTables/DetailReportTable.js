import Pagination from "components/pagination/Pagination";
import {DetailReportModal} from "components/ReportModal/ReportModal";
import {ToggleModal} from "components/ReportModal/reportModalSlice";
import {IndeterminateCheckbox} from "components/validation/Validation";
import React, {useEffect, useMemo, useState} from "react";
import {Dropdown, Button, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";
import {usePagination, useRowSelect, useSortBy, useTable} from "react-table";
import {getModal} from "redux/selectors";
import {getDetailReportList} from "redux/selectors";
import {getDetailNumPageList} from "redux/selectors";
import {searchFilterSelector, searchTextSelector} from "redux/selectors";
import {v4 as uuidv4} from "uuid";
import {DetailReportColumns} from "./Columns";
import {addItem, destroyDetailList} from "./detailReportTableSlice";
import "./Table.scss";
function DetailReportTable({setShowBtnSave}) {
	const searchText = useSelector(searchTextSelector);
	const searchFilterChange = useSelector(searchFilterSelector);
	const detailReportList = useSelector(getDetailReportList);
	const columns = useMemo(() => DetailReportColumns, []);
	const [data, setData] = useState([]);
	const dispatch = useDispatch();
	const showModal = useSelector(getModal);
	const location = useLocation();
	const handleClickBtnEdit = (row) => {
		dispatch(ToggleModal(true));
		dispatch(addItem(row.original));
	};
	const tableInstanse = useTable(
		{columns, data, initialState: {pageIndex: 0}},
		useSortBy,
		usePagination,
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => {
				return [
					{
						id: "selection",
						Header: ({getToggleAllRowsSelectedProps}) => (
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						),

						Cell: ({row}) => (
							<div className="actions">
								<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
								<Button
									size="sm"
									variant="outline-success"
									onClick={() => handleClickBtnEdit(row)}
									style={{borderColor: "green", cusor: "pointer"}}
								>
									<i
										style={{fontSize: 14, color: "green"}}
										className="fas fa-edit"
									></i>
								</Button>
							</div>
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
		allColumns,
		getToggleHideAllColumnsProps,
	} = tableInstanse;
	const {pageSize} = state;
	const [pageIndex, setPageIndex] = useState(0);
	const numPageList = useSelector(getDetailNumPageList);
	const handleNextPage = () => {
		dispatch(
			fetchReportList({
				weeklyReportId: location?.state?.id,
				page: Number(pageIndex + 1),
				num: pageSize,
			})
		);
		setPageIndex((prev) => prev + 1);
	};
	const handlePreviousPage = () => {
		dispatch(
			fetchReportList({
				weeklyReportId: location?.state?.id,
				page: Number(pageIndex - 1),
				num: pageSize,
			})
		);
		setPageIndex((prev) => prev - 1);
	};
	const handleGotoNextPage = () => {
		dispatch(
			fetchReportList({
				weeklyReportId: location?.state?.id,
				page: Number(numPageList - 1),
				num: pageSize,
			})
		);
		setPageIndex(Number(numPageList - 1));
	};
	const handleGotoPreviousPage = () => {
		dispatch(
			fetchReportList({
				weeklyReportId: location?.state?.id,
				page: 0,
				num: pageSize,
			})
		);
		setPageIndex(0);
	};
	const handleShowPageSize = (num) => {
		setPageSize(num);
		dispatch(
			fetchReportList({
				weeklyReportId: location?.state?.id,
				page: pageIndex,
				num: num,
			})
		);
	};
	const handleGoToPage = (pageIdex) => {
		if (pageIdex <= numPageList && pageIdex !== 0) {
			dispatch(
				fetchReportList({
					weeklyReportId: location?.state?.id,
					page: Number(pageIdex - 1),
					num: pageSize,
				})
			);
			setPageIndex(Number(pageIdex - 1));
		} else {
			return;
		}
	};
	useEffect(() => {
		if (selectedFlatRows) {
			let res = selectedFlatRows.map((row) => row.original);
			dispatch(destroyDetailList(res));
		}
	}, [selectedFlatRows]);

	useEffect(() => {
		searchText?.length > 0
			? setData(searchFilterChange)
			: setData(detailReportList);
	}, [detailReportList, searchText, searchFilterChange]);

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
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr key={i} {...row.getRowProps}>
								{row.cells.map((cell, i) => {
									return (
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</Table>
			{showModal && <DetailReportModal setShowBtnSave={setShowBtnSave} />}
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

export default DetailReportTable;
