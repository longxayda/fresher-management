import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

function HandleButton(){
  return (
    <div className="attendance-handle-buttons">
      <Button variant="primary" onClick={()=>{}}>
        <FontAwesomeIcon icon={faCheck} />
      </Button>
      <Button className="ms-2" variant="danger" onClick={()=>{}}>
        <FontAwesomeIcon icon={faXmark} />
      </Button>
    </div>
  );
}

export default HandleButton;