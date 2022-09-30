import React from "react";
import {
	useTable,
	usePagination,
	useGlobalFilter,
	useSortBy,
	useAsyncDebounce,
	useFilters,
} from "react-table";

// A great library for fuzzy filtering/sorting items
import {Table, Input, Label} from "reactstrap";
import {Button} from "react-bootstrap";
import {Form} from "react-bootstrap";
import makeData from "./makeData";

// Define a default UI for filtering
function DefaultColumnFilter({
	column: {filterValue, preFilteredRows, setFilter},
}) {
	const count = preFilteredRows.length;

	return (
		<Form.Group className="mb-0">
			<Form.Control
				onClick={(e) => e.stopPropagation()}
				type="search"
				value={filterValue || ""}
				onChange={(e) => {
					setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
				}}
				placeholder={`Search ${count} records...`}
			></Form.Control>
		</Form.Group>
	);
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
	column: {filterValue, setFilter, preFilteredRows, id},
}) {
	// Calculate the options for filtering
	// using the preFilteredRows
	const options = React.useMemo(() => {
		const options = new Set();
		preFilteredRows.forEach((row) => {
			options.add(row.values[id]);
		});
		return [...options.values()];
	}, [id, preFilteredRows]);

	// Render a multi-select box
	return (
		<Input
			type="select"
			value={filterValue}
			onClick={(e) => e.stopPropagation()}
			onChange={(e) => {
				setFilter(e.target.value || undefined);
			}}
		>
			<option value="">All</option>
			{options.map((option, i) => (
				<option key={i} value={option}>
					{option}
				</option>
			))}
		</Input>
	);
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
	column: {filterValue, setFilter, preFilteredRows, id},
}) {
	// Calculate the min and max
	// using the preFilteredRows

	const [min, max] = React.useMemo(() => {
		let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
		let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
		preFilteredRows.forEach((row) => {
			min = Math.min(row.values[id], min);
			max = Math.max(row.values[id], max);
		});
		return [min, max];
	}, [id, preFilteredRows]);

	return (
		<div className="d-flex justify-content-center align-items-center mt-2">
			<Form.Control
				onClick={(e) => e.stopPropagation()}
				type="range"
				min={min}
				max={max}
				value={filterValue || min}
				onChange={(e) => {
					setFilter(parseInt(e.target.value, 10));
				}}
			></Form.Control>
			<Button
				variant="primary"
				size="sm"
				onClick={(e) => {
					setFilter(undefined);
					e.stopPropagation();
				}}
			>
				Off
			</Button>
		</div>
	);
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
	column: {filterValue = [], preFilteredRows, setFilter, id},
}) {
	const [min, max] = React.useMemo(() => {
		let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
		let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
		preFilteredRows.forEach((row) => {
			min = Math.min(row.values[id], min);
			max = Math.max(row.values[id], max);
		});
		return [min, max];
	}, [id, preFilteredRows]);

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-around",
			}}
		>
			<Form.Control
				value={filterValue[0] || ""}
				type="number"
				onClick={(e) => e.stopPropagation()}
				onChange={(e) => {
					const val = e.target.value;
					setFilter((old = []) => [
						val ? parseInt(val, 10) : undefined,
						old[1],
					]);
				}}
				placeholder={`Min (${min})`}
				style={{
					width: "70px",
					marginRight: "0.5rem",
				}}
			/>
			<span onClick={(e) => e.stopPropagation()}>to</span>
			<Form.Control
				value={filterValue[1] || ""}
				type="number"
				onClick={(e) => e.stopPropagation()}
				onChange={(e) => {
					const val = e.target.value;
					setFilter((old = []) => [
						old[0],
						val ? parseInt(val, 10) : undefined,
					]);
				}}
				placeholder={`Max (${max})`}
				style={{
					width: "70px",
					marginLeft: "0.5rem",
				}}
			/>
		</div>
	);
}

function fuzzyTextFilterFn(rows, id, filterValue) {
	return matchSorter(rows, filterValue, {keys: [(row) => row.values[id]]});
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function WrapTable({columns, data, handleReset}) {
	const defaultColumn = React.useMemo(
		() => ({
			// Let's set up our default Filter UI
			Filter: DefaultColumnFilter,
		}),
		[]
	);
	const props = useTable(
		{
			columns,
			data,
			defaultColumn,
		},
		useFilters,
		useGlobalFilter, // useGlobalFilter!
		useSortBy,
		usePagination
	);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		setGlobalFilter,
		state,
		page, // Instead of using 'rows', we'll use page,
		// which has only the rows for the active page

		// The rest of these things are super handy, too ;)
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: {pageIndex, pageSize, globalFilter},
	} = props;
	console.log(props);
	React.useEffect(() => {
		// props.dispatch({ type: actions.resetPage })
		console.log(globalFilter);
	}, [globalFilter]);

	return (
		<>
			<div className="d-flex align-items-center justify-content-end pb-3">
				<div className="mr-3">
					<Label className="mb-0">Search: </Label>
				</div>
				<div className="mr-3">
					<Input
						type="search"
						value={globalFilter || ""}
						onChange={(e) => setGlobalFilter(e.target.value)}
					/>
				</div>
				<Button
					className="btn-fill"
					style={{minWidth: "140px"}}
					onClick={handleReset}
				>
					Reset Data
				</Button>
			</div>
			<style>{`
      td,tr,th{
        text-align: center;
      }
      `}</style>
			<Table bordered striped hover {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									<div
										className="heading"
										style={{
											fontSize: "16px",
											fontWeight: "600",
											display: "flex",
											justifyContent: "center",
										}}
									>
										{column.render("Header")}
										<span>
											{column.isSorted
												? column.isSortedDesc
													? " 🔽"
													: " 🔼"
												: ""}
										</span>
									</div>
									{/* Render the columns filter UI */}

									<div>{column.canFilter ? column.render("Filter") : null}</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</Table>
			<div className="pagination d-flex align-items-center justify-content-center">
				<Button
					className="btn-fill btn-sm mr-3"
					onClick={() => gotoPage(0)}
					disabled={!canPreviousPage}
				>
					{"<<"}
				</Button>
				<Button
					className="btn-fill btn-sm mr-3"
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
				>
					{"<"}
				</Button>
				<Button
					className="btn-fill btn-sm mr-3"
					onClick={() => nextPage()}
					disabled={!canNextPage}
				>
					{">"}
				</Button>
				<Button
					className="btn-fill btn-sm mr-5"
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					{">>"}
				</Button>
				<span className="mr-3 ml-5">
					Page
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>
				</span>
				<span className="mr-3"> Go to page: </span>
				<Input
					type="number"
					className="mr-3"
					defaultValue={pageIndex + 1}
					onChange={(e) => {
						const page = e.target.value ? Number(e.target.value) - 1 : 0;
						gotoPage(page);
					}}
					style={{width: "100px"}}
				/>
				<div className="">
					<Input
						type="select"
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</Input>
				</div>
			</div>
			<br />
		</>
	);
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
	return rows.filter((row) => {
		const rowValue = row.values[id];
		return rowValue >= filterValue;
	});
}

filterGreaterThan.autoRemove = (val) => typeof val !== "number";

function CustomTable() {
	const columns = React.useMemo(
		() => [
			{
				Header: "Name",
				columns: [
					{
						Header: "First Name",
						accessor: "firstName",
					},
					{
						Header: "Last Name",
						accessor: "lastName",
						// Use our custom `fuzzyText` filter on this column
					},
				],
			},
			{
				Header: "Info",
				columns: [
					{
						Header: "Age",
						accessor: "age",
						Filter: SliderColumnFilter,
						filter: "equals",
					},
					{
						Header: "Visits",
						accessor: "visits",
						Filter: NumberRangeColumnFilter,
						filter: "between",
					},
					{
						Header: "Status",
						accessor: "status",
						Filter: SelectColumnFilter,
						filter: "includes",
					},
					{
						Header: "Profile Progress",
						accessor: "progress",
						Filter: SliderColumnFilter,
						filter: filterGreaterThan,
					},
				],
			},
		],
		[]
	);

	// const data = React.useMemo(() => makeData(100), []);
	const [data, setData] = React.useState(makeData(1000));

	// React.useEffect(() => {
	//   setData(makeData(100));
	// }, []);
	const handleReset = () => {
		setData(makeData(1000));
	};

	return (
		<>
			<WrapTable columns={columns} data={data} handleReset={handleReset} />
		</>
	);
}

export default CustomTable;
