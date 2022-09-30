import axios from "axios";

import useDebounce from "hook/useDebounce";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useAsyncDebounce} from "react-table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Search.scss";
import {
	searchFilterChange,
	searchFilterChangeDetail,
	searchText,
} from "./searchSlice";
import {useLocation} from "react-router";
import {filterDateReportList} from "components/WeeklyReportTables/reportListTableSlice";

function Search() {
	const [searchValue, setSearchValue] = useState("");
	const [loading, setLoading] = useState(false);
	const debouncedValue = useDebounce(searchValue, 1000);
	const dispatch = useDispatch();
	const location = useLocation();
	console.log(debouncedValue);
	const inputRef = useRef();
	const handleClear = () => {
		setSearchValue("");
		inputRef.current.focus();
	};

	const handleChange = (e) => {
		const searchValue = e.target.value;
		if (!searchValue.startsWith(" ")) {
			setSearchValue(searchValue);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				let num = 10;
				setLoading(true);
				dispatch(searchText(debouncedValue));
				if (location?.state?.id) {
					dispatch(
						searchFilterChangeDetail({
							searchText: debouncedValue,
							weeklyId: location?.state?.id,
						})
					);
				} else {
					dispatch(searchFilterChange(debouncedValue, num));
				}
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};
		if (!!debouncedValue) {
			fetchData();
		} else {
			dispatch(searchText(debouncedValue));
		}
	}, [debouncedValue]);

	return (
		<div>
			<div className="search">
				<input
					ref={inputRef}
					type="text"
					placeholder="Search here...."
					onChange={(e) => handleChange(e)}
					value={searchValue}
					className="search-input"
				/>

				{!!searchValue && !loading && (
					<button className="clear" onClick={handleClear}>
						<i className="fas fa-times-circle"></i>
					</button>
				)}
				{loading && (
					<button className="loading">
						<Loading />
					</button>
				)}
				<button className="search-btn" onMouseDown={(e) => e.preventDefault()}>
					<i className="fas fa-search" style={{fontSize: 18}}></i>
				</button>
			</div>
		</div>
	);
}

function GlobalFilter({filter, setFilter}) {
	const [value, setValue] = useState(filter);

	const onChange = useAsyncDebounce((value) => {
		setFilter(value || undefined);
	}, 1000);

	const handleInputChange = (e) => {
		setValue(e.target.value);
		onChange(e.target.value);
	};

	return (
		<div className="searchTable search-component-delivery">
			<div className="search">
				<input
					type="text"
					placeholder="Search here...."
					value={value || ""}
					onChange={handleInputChange}
					className="searchInput"
				/>
				<button className="searchBtn" onMouseDown={(e) => e.preventDefault()}>
					<i style={{fontSize: 20}} className="fas fa-search"></i>
				</button>
			</div>
		</div>
	);
}

const FilterDate = () => {
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;
	const dispatch = useDispatch();
	useEffect(() => {
		if (!!startDate && !!endDate) {
			dispatch(filterDateReportList({startDate, endDate}));
		}
	}, [filterDateReportList, startDate, endDate]);

	return (
		<DatePicker
			selectsRange={true}
			startDate={startDate}
			endDate={endDate}
			onChange={(update) => {
				setDateRange(update);
			}}
			isClearable={true}
			className="datePicker"
			placeholderText="Filter..."
		/>
	);
};

export {Search, GlobalFilter, FilterDate};
