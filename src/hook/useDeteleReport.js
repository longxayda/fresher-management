import {useSelector} from "react-redux";
import {useLocation} from "react-router";
import {getDeleteDetailList} from "redux/selectors";
import {getDeleteList} from "redux/selectors";
import Swal from "sweetalert2";

const useDeleteReport = (
	handleDeleteReport = () => {},
	handleDeleteDetailReport = () => {},
	handleDeleteClassesName = () => {}
) => {
	const deleteList = useSelector(getDeleteList);
	const deleteDetailList = useSelector(getDeleteDetailList);

	const location = useLocation();

	const handleDelete = () => {
		if (location?.state?.detail && deleteDetailList?.length <= 0) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "No value is selected!",
				footer: '<a href="">Why do I have this issue?</a>',
			});
		} else if (!location?.state?.detail && deleteList?.length <= 0) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "No value is selected!",
				footer: '<a href="">Why do I have this issue?</a>',
			});
		} else {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire("Deleted!", "Your file has been deleted.", "success");
					handleDeleteDetailReport();
					if (location?.state?.new) {
						handleDeleteClassesName();
					}
					handleDeleteReport();
				}
			});
		}
	};
	return {
		handleDelete,
	};
};

export default useDeleteReport;
