import { DetailReportModal } from "components/ReportModal/ReportModal";
import { MyCheckbox } from "components/validation/Validation";
import React, { useEffect, useMemo, useState } from "react";
import { Dropdown, Button, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { usePagination, useRowSelect, useSortBy, useTable } from "react-table";

import { v4 as uuidv4 } from "uuid";
import { DetailReportColumns } from "./Columns";
import "./Table.scss";
function DetailOutputsTable({ setDeleteList, setShowBtnSave }) {
	const columns = useMemo(() => DetailReportColumns, []);
	const [data, setData] = useState([]);
	const [modalShow, setModalShow] = useState(false);

	const tableInstanse = useTable(
		{ columns, data, setModalShow, setRecordItem, initialState: { pageIndex: 0 } },
		useSortBy,
		usePagination,
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => {
				return [
					{
						id: "selection",
						Header: ({ getToggleAllRowsSelectedProps }) => (
							<MyCheckbox {...getToggleAllRowsSelectedProps()} />
						),
						Cell: ({ row }) => (
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
		allColumns,
		getToggleHideAllColumnsProps,
	} = tableInstanse;
	const { pageIndex, pageSize } = state;

	useEffect(() => {
		let res = selectedFlatRows.map((row) => row.original);
		setDeleteList(res);
	}, [selectedFlatRows]);

	return (
		<div className="wrapperTable">
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
		</div>
	);
}

export default DetailOutputsTable;
