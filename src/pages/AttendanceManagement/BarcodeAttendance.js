import React from "react";
import {QRCodeSVG} from 'qrcode.react';
import setTime from "components/Attendance/changedUrl";
import { Container } from "reactstrap";

function BarcodeAttendance() {
  let unchangeUrl = "https://fresher-management.herokuapp.com/"
  let changedUrl = "attend"
  let url = unchangeUrl + changedUrl

  return (
    <>
      <Container>
          <div style={{textAlign: "center"}}>
          <h4 style={{margin: "0 0 30px 0"}}>Please scan this QR code to fill in your attend form</h4>
          <QRCodeSVG
            style = {{height: "300px", width: "300px", display: "flex", margin: "auto"}}
            value = {url}
          />
        </div>
      </Container>
    </>
  );
}

export default BarcodeAttendance;