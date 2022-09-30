import moment from "moment";

const formatDate = (date) => {
	const format = "DD/MM/YYYY";
	let formatedDate = moment(date).format(format);
	return formatedDate;
};
const formatDateEdit = (date) => {
	const format = "YYYY-MM-DD";
	let formatedDate = moment(date).format(format);
	return formatedDate;
};

const BASE_URL = process.env.REACT_APP_BASE_URL;

export {formatDate, formatDateEdit, BASE_URL};
