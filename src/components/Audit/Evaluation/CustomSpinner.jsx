import React from "react";
import { Spinner } from "react-bootstrap";

const CustomSpinner = () => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: '100px', marginBottom: '20px' }}
        >
            <Spinner
                variant="primary"
                animation="border"
                role="status"
                className="position-absolute"
                style={{ height: "60px", width: "60px" }}
            >
            </Spinner>
        </div>
    )

}

export default CustomSpinner;