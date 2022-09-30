// import {DetailModal} from "components/Modal/Modal";
import {MyCheckbox} from "components/validation/Validation";
import React, {useEffect, useMemo, useState} from "react";
import {Dropdown, Button, Form, Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import {usePagination, useRowSelect, useSortBy, useTable} from "react-table";
import {getDetailDelivery} from "redux/selectors";
import {v4 as uuidv4} from "uuid";
import {DetailDeliveryColumns} from "./Columns";
import "./Table.scss";
function DetailDeliveryTable({setDeleteList, setShowBtnSave}) {
	const columns = useMemo(() => DetailDeliveryColumns, []);
	const [data, setData] = useState([]);
	const [modalShow, setModalShow] = useState(false);
	const detailDelivery = useSelector(getDetailDelivery);
	const tableInstanse = useTable(
		{columns, data, setModalShow, initialState: {pageIndex: 0}},
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
		allColumns,
		getToggleHideAllColumnsProps,
	} = tableInstanse;
	const {pageIndex, pageSize} = state;

	useEffect(() => {
		let res = selectedFlatRows.map((row) => row.original);
		setDeleteList(res);
	}, [selectedFlatRows]);
	useEffect(() => {
		setData(detailDelivery);
	}, [detailDelivery]);
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
			{/* {modalShow && (
				<DetailModal
					List={List}
					modalShow={modalShow}
					setModalShow={setModalShow}
					recordItem={recordItem}
					setShowBtnSave={setShowBtnSave}
				/>
			)} */}
			<div className="paginate">
				<span>
					Page
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>
				</span>
				<span>
					| Go to page:
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const pageNumber = e.target.value
								? Number(e.target.value) - 1
								: 0;
							gotoPage(pageNumber);
						}}
						style={{width: 50}}
					/>
				</span>
				<select
					style={{height: 30}}
					value={pageSize}
					onChange={(e) => setPageSize(Number(e.target.value))}
				>
					{[5, 10, 15, 20].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
				<div className="groupBtn">
					<Button
						size="sm"
						className="btn btn-fill"
						variant="primary"
						onClick={() => gotoPage(0)}
						disabled={!canPreviousPage}
					>
						<i className="fas fa-angle-double-left"></i>
					</Button>
					<Button
						style={{marginRight: "5px"}}
						size="sm"
						className="btn btn-fill"
						variant="primary"
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
					>
						<i className="fas fa-angle-left"></i>
					</Button>

					<Button
						size="sm"
						className="btn btn-fill"
						variant="primary"
						onClick={() => nextPage()}
						disabled={!canNextPage}
					>
						<i className="fas fa-chevron-right"></i>
					</Button>
					<Button
						size="sm"
						className="btn btn-fill"
						variant="primary"
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
					>
						<i className="fas fa-angle-double-right"></i>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default DetailDeliveryTable;
