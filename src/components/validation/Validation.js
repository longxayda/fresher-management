import {useController} from "react-hook-form";
import Form from "react-bootstrap/Form";
import {FloatingLabel} from "react-bootstrap";
import {forwardRef, useEffect, useRef} from "react";

const IndeterminateCheckbox = forwardRef(({indeterminate, ...rest}, ref) => {
	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;
	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<>
			<input type="checkbox" ref={resolvedRef} {...rest} />
		</>
	);
});
const MyCheckbox = forwardRef(({indeterminate, ...rest}, ref) => {
	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;
	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<>
			<input type="checkbox" ref={resolvedRef} {...rest} />
		</>
	);
});

const MyInput = ({errors, df, label, control, name, ...props}) => {
	const {field} = useController({control, name, defaultValue: df ? df : ""});
	return (
		<Form.Group className="field">
			<Form.Label htmlFor={props.id || name} className="label">
				{label}
			</Form.Label>
			<Form.Control className="inputModal" type="text" {...field} {...props} />
			{errors && (
				<p className="error" style={{color: "red"}}>
					{errors}
				</p>
			)}
		</Form.Group>
	);
};
const MyTextArea = ({errors, df, label, control, name, ...props}) => {
	const {field} = useController({control, name, defaultValue: df ? df : ""});
	return (
		<Form.Group className="field">
			<FloatingLabel label="Notes">
				<Form.Control
					as="textarea"
					placeholder="Leave a note here"
					style={{height: "100px", width: "200px"}}
					className="inputModal"
					{...field}
					{...props}
				/>
			</FloatingLabel>
			{errors && (
				<p className="error" style={{color: "red"}}>
					{errors}
				</p>
			)}
		</Form.Group>
	);
};

const MySelect = ({errors, df, label, control, children, name, ...props}) => {
	const {field} = useController({control, name, defaultValue: df ? df : ""});
	return (
		<Form.Group className="field">
			<Form.Label htmlFor={props.id || name} className="label">
				{label}
			</Form.Label>
			<Form.Select className="inputModal" {...field} {...props}>
				{children}
			</Form.Select>

			{errors && (
				<p className="error" style={{color: "red"}}>
					{errors}
				</p>
			)}
		</Form.Group>
	);
};

export {MyInput, MyTextArea, MySelect, IndeterminateCheckbox,MyCheckbox};
