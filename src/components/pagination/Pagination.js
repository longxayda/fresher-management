import React from "react";
import {Button} from "react-bootstrap";
import {v4 as uuidv4} from "uuid";
function Pagination({
	handleNextPage,
	handlePreviousPage,
	numPageList,
	handleGotoNextPage,
	handleGotoPreviousPage,
	handleGoToPage,
	pageIndex,
	pageSize,
	canNextPage,
	canPreviousPage,
	handleShowPageSize,
}) {
	return (
		<div className="paginate">
			<span>
				Page
				<strong>
					{pageIndex + 1} of {numPageList}
				</strong>
			</span>
			<span>
				| Go to page:
				<input
					type="number"
					defaultValue={pageIndex + 1}
					min="1"
					max={numPageList}
					onChange={(e) => handleGoToPage(Number(e.target.value))}
					style={{width: 50}}
				/>
			</span>
			<select
				style={{height: 30}}
				value={pageSize}
				onChange={(e) => handleShowPageSize(Number(e.target.value))}
			>
				{[5, 10, 15, 20].map((pageSize) => (
					<option key={uuidv4()} value={pageSize}>
						Show {pageSize}
					</option>
				))}
			</select>
			<div className="groupBtn">
				<Button
					size="sm"
					className="btn btn-fill"
					variant="primary"
					onClick={handleGotoPreviousPage}
					disabled={pageIndex === 0 ? !canPreviousPage : canPreviousPage}
				>
					<i className="fas fa-angle-double-left"></i>
				</Button>
				<Button
					style={{marginRight: "5px"}}
					size="sm"
					className="btn btn-fill"
					variant="primary"
					onClick={handlePreviousPage}
					disabled={pageIndex === 0 ? !canPreviousPage : canPreviousPage}
				>
					<i className="fas fa-angle-left"></i>
				</Button>

				<Button
					size="sm"
					className="btn btn-fill"
					variant="primary"
					onClick={handleNextPage}
					disabled={
						Number(pageIndex + 1) === numPageList ? !canNextPage : canNextPage
					}
				>
					<i className="fas fa-chevron-right"></i>
				</Button>
				<Button
					size="sm"
					className="btn btn-fill"
					variant="primary"
					onClick={handleGotoNextPage}
					disabled={
						Number(pageIndex + 1) === numPageList ? !canNextPage : canNextPage
					}
				>
					<i className="fas fa-angle-double-right"></i>
				</Button>
			</div>
		</div>
	);
}

export default Pagination;
