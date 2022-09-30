import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAttendance } from "redux/attendanceManagementSlice/attendanceSlice";
import { attendMessageSeletor } from "redux/selectors/attendanceSelectors/adminTicketSelectors"

function Attendance() {
  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes();
  var dateTime = date+' '+time;

  const [typePassword, setTypePassword] = useState("password");
  const changeTypePassword = () => {
      if(typePassword == "password"){
          setTypePassword("text");
      }
      else {
          setTypePassword("password")
      }
  };

  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let errorMsg = useSelector(attendMessageSeletor);
  let className = ""
  if (errorMsg != null){
    className = "text-danger"
  }
  else {
    className = "text-primary"
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await dispatch(postAttendance({
      "username" : username,
      "password" : password
    }));
  }


  return (
    <>
      <Container className="attendance-form-sreen">
        <Row className="justify-content-center">
          <Col className="attend-form" md="6">
            <h2>Attendance FSOFT</h2>

            <Row className="justify-content-between">              
              <Col md="3"><h4>Time</h4></Col>
              <Col><h4>{dateTime}</h4></Col>
            </Row>

            <Form style={{fontSize: "20px"}}>
              <Form.Group className="md-3">
                <Row style={{margin: "20px -10px 0"}}>
                  <Form.Label htmlFor="username" column md="3">
                    Username
                  </Form.Label>
                  <Col md="9">
                    <Form.Control
                      id="username"
                      type="text"
                      value = {username}
                      onChange = {e => setUsername(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row style={{margin: "20px -10px 0"}}>
                  <Form.Label htmlFor="username" column md="3" >
                    Password
                  </Form.Label>
                  <Col md="9">
                    <Form.Control
                      id="password"
                      type = {typePassword}
                      value = {password}
                      onChange = {e => setPassword(e.target.value)}
                      placeholder = "Password"
                    />
                    <Form.Text className={className}>
                      {errorMsg}
                    </Form.Text>
                  </Col>
                </Row>
                <Row style={{margin: "20px -10px 0"}}>
                  <Col md="3"/>
                  <Col md="9">
                    <Form.Check.Label>
                      <Row>
                        <Col md="1">
                          <Form.Check.Input type="checkbox" onChange={changeTypePassword}/>
                        </Col>
                        <Col md="10">
                          <h5 style={{margin: "5px"}}>Show password</h5>
                        </Col>
                      </Row>
                    </Form.Check.Label>
                  </Col>
                </Row>
              </Form.Group>
            </Form>

            <Button
              id="attend"
              className="btn-fill login-form-button"
              style={{float: "right", margin: "30px 0 0"}}
              onClick={ handleSubmit }
            >
              Attend
            </Button>      
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Attendance;