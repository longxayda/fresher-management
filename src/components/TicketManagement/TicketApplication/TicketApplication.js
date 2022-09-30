import React from "react";
import { useState } from "react";
import { Button, Modal, Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ContentHandle({value}) {
  const [show, setShow] = useState(false);
  
  return (
    <div className="ticket-application-modal">
      <div onClick={()=>setShow(true)} style={{color:"#0080FF", cursor:"pointer"}}>
        {value}
      </div>
  
      <Modal show={show} onHide={()=>setShow(false)} size="lg" >
        <Modal.Header closeButton variant="primary">
          <Modal.Title>
            <i className="nc-icon nc-paper-2"
              style={{fontSize:"28px", marginRight:"15px", width:"30px", textAlign:"center", verticalAlign:"middle", color:"#3472F7"}}>
            </i>
            <span style={{color:"#3472F7"}}>An absence request</span>
          </Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Row className="mb-3">
                <Col xs md lg={2}>
                  <Form.Label>
                    Type absence:
                  </Form.Label>
                </Col>
  
                <Col lg={4}>
                  <Form.Select disabled>
                    <option selected>Absence with no salary</option>
                    <option>Absence with salary</option>
                  </Form.Select>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col xs md lg={2}>
                  <Form.Label>
                    Start date:
                  </Form.Label>
                </Col>

                <Col lg={3}>
                  <Form >
                    <Form.Group>
                      <Form.Control type="text" value="20/07/2022" disabled></Form.Control>
                    </Form.Group>
                  </Form>
                </Col>
                <Col lg={1}></Col>
  
                <Col md lg={2}>
                  <Form.Label >
                    End date:
                  </Form.Label>
                </Col>

                <Col lg={3}>
                  <Form >
                    <Form.Group>
                      <Form.Control type="text" value="20/07/2022" disabled></Form.Control>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>

              <Row >
                <Col xs md lg={2}>
                  <Form.Label>
                    Partial:
                  </Form.Label>
                </Col>

                <Col lg={3}>
                  <Form.Select disabled>
                    <option selected>Full day</option>
                    <option>Half of a day</option>
                  </Form.Select>
                </Col>

                <Col lg={1}></Col>
  
                <Col cs md lg={2}>
                  <Form.Label>Duration:</Form.Label>
                </Col>

                <Col xs md lg={2}>
                  1 day
                </Col>
              </Row>

              <Row className='pt-3'>
                <Col xs md lg={2}>
                  <Form.Label>
                    Main reason:
                  </Form.Label>
                </Col>

                <Col lg={9}>
                  <Form.Control as="textarea" rows={3} style={{height:"100%"}} value="Disabled readonly input" disabled/>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
  
        <Modal.Footer className="justify-content-end">
          <Button
            variant="primary"
            className="btn-fill"
            onClick={()=>{}}
          >
            Approve
          </Button>

          <Button
            variant="danger"
            className="btn-fill ms-1"
            onClick={()=>{}}
          >
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ContentHandle;