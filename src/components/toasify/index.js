import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
function ToasifyReport({status = "", statusContent = ""}) {
	const [show, setShow] = useState(false);
	useEffect(() => {
		if (statusContent.length > 0) {
			setShow(true);
		}
	}, [statusContent]);
	return (
		<Row>
			<Col xs={6}>
				<ToastContainer className="p-3" position="top-end">
					<Toast
						bg={status.toLowerCase()}
						onClose={() => setShow(false)}
						show={show}
						delay={4000}
						autohide
					>
						<Toast.Header>
							<img
								src="holder.js/20x20?text=%20"
								className="rounded me-2"
								alt=""
							/>
							<strong className="me-auto">Congratulations</strong>
							<small>2 seconds ago</small>
						</Toast.Header>
						<Toast.Body>{statusContent}!</Toast.Body>
					</Toast>
				</ToastContainer>
			</Col>
		</Row>
	);
}
export default ToasifyReport;
