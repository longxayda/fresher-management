import React from "react";
import {Button} from "react-bootstrap";
import {CSVLink} from "react-csv";

export const ExportReactCSV = ({csvData, fileName}) => {
	return (
		<Button variant="warning">
			<CSVLink data={csvData} filename={fileName}>
				Export
			</CSVLink>
		</Button>
	);
};
