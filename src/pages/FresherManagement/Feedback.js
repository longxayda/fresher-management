import React from "react";
import Barchart from "pages/FresherManagement/Barchart";
import feedbackService from "services/fresherManagement/feedbackService";
import NotificationAlert from 'react-notification-alert';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Table,
  Spinner
} from "react-bootstrap";
var options = {};
class Feedback extends React.Component {
  state = {
    year:"",
    course:"",
    name: "",
    userList: [],
    flagName:false,
    listOfCourse: [],
    listOfYear:[],
    isloading:true,
    tmp:"",
    tmp_1:"",
    tableCurrShow: 1 
  };
  myFunc=(message)=>{
    options = {
      place: 'tr',
      message: (
          <div>
              <div>
              {message}
              </div>
          </div>
      ),
      type: "danger",
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7
  }
    this.refs.notify.notificationAlert(options);
  }
  async componentDidMount() {
    this.setState({
      isloading:false
    })
    try{
    const x = await feedbackService.getAllYear();
    this.setState({
      listOfYear: x.data,
    });
    this.setState({
      isloading:true
    })
  }catch(error)
   {
    this.setState({
      isloading:true
    })
   }
  }
  handleonClick = async (event) => {
    if(this.state.course!==this.state.tmp_1)
    {
      this.setState({
        isloading:false
      })
      this.setState({
        tmp_1:this.state.course
      })
    }
    if (this.state.course!=="") {
      try{
      const x = await feedbackService.getAllFeedback(this.state.course);
      if(x.data.data)
      this.setState({
        userList:x.data.data
      })
      else
      {
      this.setState({
        userList:[]
      })
      }
      this.setState({
        isloading:true
      })
    }
    catch(error){
      this.setState({
        isloading:true
      })
      if(this.state.course!==this.state.tmp)
      {
        this.myFunc(error.message)
        this.setState({
          tmp:this.state.course
        })
      }
    } 
    } else {
      this.setState({
        userList:[]
      })
    }
    
  };
  handleonChangeSearch = (event) => {
    this.setState({
      course: event.target.value,
    });
  };
  handleUploadBtnClick_1=()=>{
    this.setState({
      tableCurrShow:1
    })
  }
  handleUploadBtnClick_2=()=>{
    this.setState({
      tableCurrShow:2
    })
  }
  handleUploadBtnClick_3=()=>{
    this.setState({
      tableCurrShow:3
    })
  }
  handleUploadBtnClick_4=()=>{
    this.setState({
      tableCurrShow:4
    })
  }
  handleonChangeName = (event)=>{
    this.setState({
      name:event.target.value,
      flagName:false
    })
  }
  handleonFlag = (event) =>{
    let string=this.state.name;
    string = string.replace(/\s+/g,' ').trim()
    this.setState({
      flagName:true,
      name:string
    })
  }
  handleonClick_year=async()=>{
    try{
    const x = await feedbackService.getAllCourseOfYear(this.state.year);
    this.setState({
      listOfCourse:x.data
    })
    this.setState({
      isloading:true
    })
   } catch(error)
   {
    this.setState({
      isloading:true
    })
   }
  }
  handleonChangeYear= (event) =>{
    this.setState({
      year:event.target.value
    })
  }
  handlesetOnloading=()=>{
    this.setState({
      isloading:false
    })
  }
  check = (tableCShow, id) => {
    if(tableCShow == 1 && id <= 5 && id >= 1)
      return true;
    if(tableCShow == 2 && id <= 9 && id >= 6)
      return true;
    if(tableCShow == 3 && id <= 12 && id >= 10)
      return true;
    return false;
  }
  render() {
    let { userList,listOfCourse, tableCurrShow,listOfYear,name,flagName,isloading} = this.state;
    const data=[];
    const tmp=[];
    const label=[];
    {
      userList.map((item, index) => (
        (index===0&&
          item.feedbackItems.map((feedbackItem, j) => (
              label.push(feedbackItem.question)
          ))
        )
      ))
    }
    const count=label.length;
    {
      for(let i=0;i<count;i++)
      {
        userList.map((item,j)=>(
          item.feedbackItems.map((patten,index)=>(
            (index===i&&
              tmp.push(patten.answer)  
            )
          ))
        ))
        data.push(tmp.reduce((total, item) =>(total = total + item),0) / tmp.length)
        tmp.length=0;
      }
    }
    let Userdata = {
      labels: label,
      datasets: [
        {
          label: "Rating of trainee",
          data:data
        },
      ],
    };

    return (
      <>
      <Container fluid>
      <NotificationAlert ref="notify"/>
        <Row className="filter-trainee">
          <Col className="search-year" md="2" xl="2" xxl="2">
            <select
              className="form-select"
              defaultValue={"default"}
              value={this.state.year}
              onChange={(event) => this.handleonChangeYear(event)}
              onClick={(event) => this.handleonClick_year(event)}
              style={{
                padding: "8px 8px",
                margin: "0px 2px",
                display: "inline-block",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            >
              <option value="">Year</option>
              {listOfYear.map((year, i) => {
                return (
                  <option key={i} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </Col>

          <Col className="search-course" md="2" xl="2" xxl="2">
            <select
              className="form-select"
              defaultValue={"default"}
              value={this.state.course}
              onChange={(event) => this.handleonChangeSearch(event)}
              onClick={(event) => this.handleonClick(event)}
              style={{
                padding: "8px 8px",
                margin: "0px 2px",
                display: "inline-block",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            >
              <option value="">Course</option>
              {listOfCourse.map((course, i) => {
                return (
                  <option key={i} value={course.classId} >
                    {course.classCode}
                  </option>
                );
              })
              }
            </select>
          </Col>
          
          <Col className="boxx-search-trainee" md="3" xl="3" xxl="3">
            <input
              type="text"
              placeholder="Trainee's Name"
              style={{
                width: "100%",
                padding: "8px 8px",
                margin: "0px 2px",
                display: "inline-block",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                
              }}
              onChange={(event) => this.handleonChangeName(event)}
            />{" "}
          </Col>
          <Col>
            <Button onClick={(event) => this.handleonFlag(event)}>
              Search
            </Button>
          </Col>
          
        </Row>
         
        <br></br>
        <Container fluid>    
        {isloading===false ? (
              <Spinner
                variant="primary"
                animation="border"
                role="status"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "50px",
                  height: "50px",
                }}
              ></Spinner>
        )
        :     
        <>
          <Row>
            <Col md="24">
              <Card className="strpied-tabled-with-hover">
                <Card.Header className="table-full-width table-responsive px-1">
                <Row>
                  <Col className="col-1"></Col>
                  <Col className="mt-1 mb-1 col-md-3 " >
                        <Button
                          variant="primary"
                          className={tableCurrShow===1?"btn-fill w-100":" w-100"}
                          onClick={() => this.handleUploadBtnClick_1()}
                        >
                        <i className="fa-solid fw-bold"></i>
                          Training program & content
                        </Button>    
                  </Col>
                        
                  <Col className="mt-1 mb-1 ">
                        <Button
                          variant="primary"
                          className={tableCurrShow===2?"btn-fill w-100":" w-100"}
                          onClick={() => this.handleUploadBtnClick_2()}
                        >
                          <i className="fa-solid fw-bold"></i>
                          Trainer/Coach
                        </Button>  
                  </Col>

                  <Col  className="mt-1 mb-1">
                        <Button
                          variant="primary"
                          className={tableCurrShow===3?"btn-fill w-100":" w-100"}
                          onClick={() => this.handleUploadBtnClick_3()}
                        >
                          <i className="fa-solid fw-bold   "></i>
                          Oraganization
                        </Button>  
                  </Col>

                  <Col className="mt-1 mb-1">
                        <Button
                          variant="primary"
                          className={tableCurrShow===4?"btn-fill w-100":" w-100"}
                          onClick={() => this.handleUploadBtnClick_4()}
                        >
                          <i className="fa-solid fw-bold"></i>
                          Other Comment
                        </Button>  
                  </Col>
                  <Col className="col-1"></Col>
                </Row>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-1">
                    <Table striped hover overflow>
                      <tbody style={{fontSize:"14px",textTransform:"uppercase",color:"black",fontWeight:"bold",borderTop:"none!important",borderBottom:"none",textAlign:"center"}}>
                        <tr>
                          <td  style={{ fontWeight: "bold" }} width="8%"> Acc ID </td>
                          <td  style={{ fontWeight: "bold" }} width ="15%"> Full Name</td>
                      
                          <td  style={{ fontWeight: "bold" }}  hidden={this.state.tableCurrShow == 1 ? false : true}>
                            Topic content & structure
                          </td>
                          <td  style={{ fontWeight: "bold" }}  hidden={this.state.tableCurrShow == 1 ? false : true}>
                            Topic objectives
                          </td>
                          <td  style={{ fontWeight: "bold" }}  hidden={this.state.tableCurrShow == 1 ? false : true}>
                            Appropriate topic level
                          </td>
                          <td  style={{ fontWeight: "bold" }}  hidden={this.state.tableCurrShow == 1 ? false : true}>
                            Topic usefullness
                          </td>
                          <td  style={{ fontWeight: "bold" }}  hidden={this.state.tableCurrShow == 1 ? false : true}>
                            Training material quality
                          </td>
                          <td  style={{ fontWeight: "bold" }}  hidden={this.state.tableCurrShow == 2 ? false : true}>
                            Knowledge of Trainer
                          </td>
                          <td  style={{ fontWeight: "bold" }} hidden={this.state.tableCurrShow == 2 ? false : true}>
                            Subject coverage
                          </td>
                          <td  style={{ fontWeight: "bold" }} hidden={this.state.tableCurrShow == 2 ? false : true}>
                            Good instruction & communication
                          </td>
                          <td  style={{ fontWeight: "bold" }} hidden={this.state.tableCurrShow == 2 ? false : true}>
                            Trainer's supporting
                          </td>
                          <td  style={{ fontWeight: "bold" }} hidden={this.state.tableCurrShow == 3 ? false : true}> Logistics</td>
                          <td  style={{ fontWeight: "bold" }} hidden={this.state.tableCurrShow == 3 ? false : true}>
                            Information to trainees
                          </td>
                          <td  style={{ fontWeight: "bold" }} hidden={this.state.tableCurrShow == 3 ? false : true}>
                            Class admin's attitude & support
                          </td>
                          <td  style={{ fontWeight: "bold" }} hidden={this.state.tableCurrShow == 4 ? false : true} >Other comment</td>
                        </tr>
                        {name!==""&&flagName===true?
                        (userList.map((item, i) => (
                          (item.fullName===name?
                          <tr key={i}>
                            <td >{item.username}</td>
                            <td >{item.fullName}</td>
                            {item.feedbackItems.map((feedbackItem) => (
                              <td  hidden={this.check(tableCurrShow, feedbackItem.id) ? false : true}>{feedbackItem.answer}</td>
                            ))}
                            <td hidden={this.state.tableCurrShow == 4 ? false : true}>{item.commentAnswer}</td>
                          </tr>
                          :
                          null
                          )
                        )
                        ))
                        :
                        (userList.map((item, i) => (
                          <tr key={i}>
                            <td >{item.username}</td>
                            <td >{item.fullName}</td>
                            {item.feedbackItems.map((feedbackItem) => (
                              <td  hidden={this.check(tableCurrShow, feedbackItem.id) ? false : true}>{feedbackItem.answer}</td>
                            ))}
                            <td hidden={this.state.tableCurrShow == 4 ? false : true}>{item.commentAnswer}</td>
                          </tr>
                        )))
                        }
                      </tbody>
                    </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        <Barchart chartdata={Userdata} />
        </>
        }
        </Container>
        </Container>
      </>
    );
  }
}

export default Feedback;