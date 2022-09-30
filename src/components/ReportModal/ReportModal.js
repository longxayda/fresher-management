import {useEffect, useState} from "react";
import {Form, Modal} from "react-bootstrap";
import Button from "components/button/Button";

import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {MyInput, MySelect, MyTextArea} from "components/validation/Validation";

import {v4 as uuidv4} from "uuid";
import slugify from "slugify";
import {formatDateEdit} from "utils";

import {useDispatch, useSelector} from "react-redux";
import {getClassNameList, getDetailReportList} from "redux/selectors";

import {
	addClassName,
	classesName,
	updateClassName,
} from "components/WeeklyReportTables/addNewReportTableSlice";
import {updateItem} from "components/WeeklyReportTables/detailReportTableSlice";
import "./ReportModal.scss";
import {useHistory, useLocation} from "react-router";
import {getClassNameInfoList} from "redux/selectors";
import {
	fetchAdminList,
	fetchTrainerList,
	ToggleModal,
} from "./reportModalSlice";
import {getAdminList} from "redux/selectors";
import {getTrainerList} from "redux/selectors";
import {getModal} from "redux/selectors";

import {getClassNameInfoItem} from "redux/selectors";
import {getDetailReportItem} from "redux/selectors";

function AddNewReportModal({no, setNo}) {
	const showModal = useSelector(getModal);
	const adminList = useSelector(getAdminList);
	const trainerList = useSelector(getTrainerList);
	const dispatch = useDispatch();
	const classNameList = useSelector(getClassNameList);
	const classNameInfoItem = useSelector(getClassNameInfoItem);
	const location = useLocation();
	const schema = yup
		.object({
			trainer: yup
				.string()
				.oneOf(trainerList, "Invalid Trainer Type")
				.required("The field is required"),
			admin: yup
				.string()
				.oneOf(adminList, "Invalid admin Type")
				.required("The field is required"),
			updateBy: yup
				.string()
				.oneOf(adminList, "Invalid Pic Type")
				.required("The field is required"),
			note: yup.string().required("The field is required"),
		})
		.required();

	const {
		note,
		updateBy,
		updateAt,
		classId,
		classInfo: {
			taskName,
			skill,
			status,
			startDate,
			endDate,
			fail,
			dropOut,
			changeContact,
			studying,
			ob,
			fsu,
		},
	} = classNameInfoItem;
	const recordItem = {
		classId,
		no,
		taskName,
		skill,
		ob,
		fail,
		dropOut,
		changeContact,
		studying,
		fsu,
		startDate,
		endDate,
	};
	const {
		handleSubmit,
		reset,
		control,
		formState: {errors, isSubmitting, isValid},
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
	});
	const handleCreateReportItems = (value) => {
		dispatch(ToggleModal(false));
		setNo(Number(no + 1));
		{
			location.state.new
				? dispatch(addClassName({...recordItem, ...value}))
				: dispatch(
						addClassName({
							...recordItem,
							...value,
							updateAt: new Date().toISOString(),
							weeklyReportId: location?.state?.id,
						})
				  );
		}

		dispatch(
			classesName(
				classNameList.filter((item) => item.classId !== Number(classId))
			)
		);
		reset({
			trainer: "choose a option",
			admin: "choose a option",
			updateBy: "choose a option",
			note: "",
		});
	};
	const onSubmit = async (value) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				if (isValid) {
					handleCreateReportItems(value);
				}
				resolve();
			}, 200);
		});
	};

	const handleClose = () => {
		dispatch(ToggleModal(false));
		reset({
			trainer: "choose a option",
			admin: "choose a option",
			updateBy: "choose a option",
			note: "",
		});
	};

	useEffect(() => {
		if (classId) {
			dispatch(fetchAdminList(classId));
			dispatch(fetchTrainerList(classId));
		}
	}, [classId]);

	return (
		<Modal
			className="reportModal"
			show={showModal}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Form onSubmit={handleSubmit(onSubmit)} className="formReport">
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Add New Field
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<MySelect
						label="Trainer"
						id="trainer"
						name="trainer"
						control={control}
						errors={errors.trainer?.message}
					>
						<option>choose a option</option>
						{trainerList?.map((item) => (
							<option key={uuidv4()} value={item}>
								{item}
							</option>
						))}
					</MySelect>
					<MySelect
						label="Admin"
						id="admin"
						name="admin"
						control={control}
						errors={errors.admin?.message}
					>
						<option>choose a option</option>
						{adminList?.map((item) => (
							<option key={uuidv4()} value={item}>
								{item}
							</option>
						))}
					</MySelect>
					<MySelect
						label="Pic"
						id="pic"
						name="updateBy"
						control={control}
						errors={errors.updateBy?.message}
					>
						<option>choose a option</option>
						{adminList?.map((item) => (
							<option key={uuidv4()} value={item}>
								{item}
							</option>
						))}
					</MySelect>
					<MyTextArea
						label="Note"
						id="note"
						name="note"
						control={control}
						errors={errors.note?.message}
						style={{minHeight: 100, width: "100%"}}
					></MyTextArea>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleClose} kind="secondary">
						Cancel
					</Button>
					<Button kind="success" type="submit">
						Add
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}

function DetailReportModal({setShowBtnSave}) {
	const showModal = useSelector(getModal);
	const adminList = useSelector(getAdminList);
	const trainerList = useSelector(getTrainerList);
	const reporItems = useSelector(getDetailReportList);
	const reportItem = useSelector(getDetailReportItem);
	const {classId, admin, trainer, note, updateAt, updateBy} = reportItem;

	const schema = yup
		.object({
			trainer: yup
				.string()
				.oneOf(trainerList, "Invalid Trainer Type")
				.required("The field is required"),
			admin: yup
				.string()
				.oneOf(adminList, "Invalid Trainer Type")
				.required("The field is required"),
			updateBy: yup
				.string()
				.oneOf(adminList, "Invalid Pic Type")
				.required("The field is required"),
			updateAt: yup
				.date()
				.required("The field is required")
				.transform((curr, orig) => (orig === "" ? null : curr))
				.nullable()
				.min(new Date(), "Please choose future date"),
			note: yup.string().required("The field is required"),
		})
		.required();

	const preLoadedvalues = {
		trainer,
		admin,
		note,
		updateBy,
		updateAt: formatDateEdit(updateAt),
	};
	const {
		handleSubmit,
		reset,
		control,
		formState: {errors, isSubmitting, isValid},
	} = useForm({
		defaultValues: preLoadedvalues,
		resolver: yupResolver(schema),
		mode: "onChange",
	});

	const dispatch = useDispatch();
	const handleClose = () => {
		dispatch(ToggleModal(false));
		setShowBtnSave(true);
	};

	const handleChangeItem = (value) => {
		const newValue = reporItems.map((obj) => {
			// const {admin, trainer, updateBy, updateAt, note, id} = obj;
			if (obj.classId === reportItem.classId) {
				return {...obj, ...value};
			}
			return obj;
		});
		dispatch(updateItem(newValue));
		dispatch(ToggleModal(false));
		setShowBtnSave(true);
	};
	const onSubmit = async (value) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				if (isValid) {
					handleChangeItem(value);
				}
				resolve();
			}, 200);
		});
	};
	useEffect(() => {
		if (classId) {
			dispatch(fetchAdminList(classId));
			dispatch(fetchTrainerList(classId));
		}
	}, [classId]);

	return (
		<>
			<Modal className="reportModal" show={showModal} centered>
				<form onSubmit={handleSubmit(onSubmit)} className="form-report">
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">
							Update Field
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="groupInput">
							<MySelect
								label="Trainer"
								id="trainer"
								name="trainer"
								control={control}
								errors={errors.trainer?.message}
							>
								<option>choose a option</option>
								{trainerList?.map((item) => (
									<option value={item} key={uuidv4()}>
										{item}
									</option>
								))}
							</MySelect>
							<MySelect
								label="Admin"
								id="admin"
								name="admin"
								control={control}
								errors={errors.admin?.message}
							>
								<option>choose a option</option>
								{adminList?.map((item) => (
									<option value={item} key={uuidv4()}>
										{item}
									</option>
								))}
							</MySelect>
						</div>
						<div className="groupInput">
							<MySelect
								label="Pic"
								id="pic"
								name="updateBy"
								control={control}
								errors={errors.updateBy?.message}
							>
								<option>choose a option</option>
								{adminList?.map((item) => (
									<option key={uuidv4()} value={item}>
										{item}
									</option>
								))}
							</MySelect>
							<MyInput
								label="UpdateAt"
								id="updateAt"
								type="date"
								name="updateAt"
								control={control}
								errors={errors.updateAt?.message}
							/>
						</div>
						<MyTextArea
							label="Note"
							id="note"
							name="note"
							control={control}
							errors={errors.note?.message}
							style={{minHeight: 100, width: "100%"}}
						></MyTextArea>
					</Modal.Body>
					<Modal.Footer>
						<Button kind="secondary" onClick={handleClose}>
							Cancel
						</Button>

						<Button type="submit" kind="success">
							Update
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
}

function ReportListModal() {
	let history = useHistory();
	const showModal = useSelector(getModal);
	const dispatch = useDispatch();
	const schema = yup
		.object({
			reportName: yup.string().required("The field is required"),
			createdAt: yup
				.date()
				.required("The field is required")
				.transform((curr, orig) => (orig === "" ? null : curr))
				.nullable(),
		})
		.required();
	const {
		handleSubmit,
		reset,
		clearErrors,
		control,
		formState: {errors, isValid},
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
	});

	const onSubmit = async (value) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				if (isValid) {
					history.push({
						pathname:
							"/admin/report/new-weekly-report/" + slugify(value.reportName),
						state: {new: true, ...value},
					});
					reset({reportName: "", createdAt: ""});
				}
				resolve();
			}, 200);
		});
	};
	const handleClose = () => {
		dispatch(ToggleModal(false));
		reset({reportName: "", createdAt: ""});
	};

	useEffect(() => {
		clearErrors();
	}, [showModal]);
	return (
		<Modal
			className="reportModal"
			show={showModal}
			onHide={handleClose}
			centered
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Create New Report
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<MyInput
						id="createAt"
						type="date"
						name="createdAt"
						label="CreatedAt"
						control={control}
						errors={errors.createdAt?.message}
						className="inputModal"
					/>
					<MyInput
						placeholder="Report name"
						id="reportName"
						label="Report name"
						name="reportName"
						control={control}
						errors={errors.reportName?.message}
						className="inputModal"
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button kind="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button kind="success" type="submit">
						<span>Next</span>
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

function EditReportModal({recordItemEdit, modalEdit, setModalEdit}) {
	const [show, setShow] = useState(false);
	const adminList = useSelector(getAdminList);
	const trainerList = useSelector(getTrainerList);
	const classNameInfoList = useSelector(getClassNameInfoList);
	const location = useLocation();

	const {
		index,
		original: {classId, admin, trainer, note, updateBy},
	} = recordItemEdit;

	const schema = yup
		.object({
			trainer: yup
				.string()
				.oneOf(trainerList, "Invalid Trainer Type")
				.required("The field is required"),
			admin: yup
				.string()
				.oneOf(adminList, "Invalid Trainer Type")
				.required("The field is required"),
			updateBy: yup
				.string()
				.oneOf(adminList, "Invalid Pic Type")
				.required("The field is required"),

			note: yup.string().required("The field is required"),
		})
		.required();

	const preLoadedvalues = {
		trainer,
		admin,
		note,
		updateBy,
	};
	const {
		handleSubmit,
		reset,
		control,
		formState: {errors, isSubmitting, isValid},
	} = useForm({
		defaultValues: preLoadedvalues,
		resolver: yupResolver(schema),
		mode: "onChange",
	});

	const dispatch = useDispatch();
	const handleClose = () => {
		setShow(false);
		setModalEdit(false);
	};

	const newValue = {
		...classNameInfoList,
	};
	const handleChangeItem = (value) => {
		const newValue = classNameInfoList.map((obj, i) => {
			if (index === i) {
				return {
					...obj,
					...value,
				};
			}
			return obj;
		});
		console.log(newValue);
		setShow(false);
		setModalEdit(false);
		dispatch(updateClassName(newValue));
	};
	const onSubmit = async (value) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				if (isValid) {
					handleChangeItem(value);
				}
				resolve();
			}, 200);
		});
	};

	useEffect(() => {
		if (classId) {
			dispatch(fetchAdminList(classId));
			dispatch(fetchTrainerList(classId));
		}
	}, [classId]);

	useEffect(() => {
		setShow(modalEdit);
	}, [modalEdit]);

	return (
		<>
			<Modal className="reportModal" show={show} centered>
				<form onSubmit={handleSubmit(onSubmit)} className="form-report">
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">
							Update Field
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<MySelect
							label="Trainer"
							id="trainer"
							name="trainer"
							control={control}
							errors={errors.trainer?.message}
						>
							<option>choose a option</option>
							{trainerList?.map((item) => (
								<option value={item} key={uuidv4()}>
									{item}
								</option>
							))}
						</MySelect>
						<MySelect
							label="Admin"
							id="admin"
							name="admin"
							control={control}
							errors={errors.admin?.message}
						>
							<option>choose a option</option>
							{adminList?.map((item) => (
								<option value={item} key={uuidv4()}>
									{item}
								</option>
							))}
						</MySelect>

						<MySelect
							label="Pic"
							id="pic"
							name="updateBy"
							control={control}
							errors={errors.updateBy?.message}
						>
							<option>choose a option</option>
							{adminList?.map((item) => (
								<option key={uuidv4()} value={item}>
									{item}
								</option>
							))}
						</MySelect>
						<MyTextArea
							label="Note"
							id="note"
							name="note"
							control={control}
							errors={errors.note?.message}
							style={{minHeight: 100, width: "100%"}}
						></MyTextArea>
					</Modal.Body>
					<Modal.Footer>
						<Button kind="secondary" onClick={handleClose}>
							Cancel
						</Button>

						<Button type="submit" kind="success">
							Update
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	);
}

export {ReportListModal, AddNewReportModal, DetailReportModal, EditReportModal};
