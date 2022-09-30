import  { useEffect, useRef, useState, useMemo, useCallback } from "react";
import {useLocation} from "react-router-dom";
import CustomTable from "components/PlanTable";
import ModuleTable from "components/ModuleTable";
import {
    ListGroup,
    Button,
    Row,
    Col,
    Form,
    Modal,
} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {
    isClassModuleSelector,
} from "redux/selectors/learningPathSelector";

import { useDispatch, useSelector } from "react-redux";
import Loading from "components/ModuleTable/Loading";
import { listAllModuleSelector, isAllModuleLoadingSelector, listClassModuleSelector,listRoleSelector} from "redux/selectors/learningPathSelector";
import { getListAllModule, getListClassModules, updateListClassModules,updatePicClassTopics,getListRole, setSuccessMessage , setErrMessage} from "redux/actions/learningPathAction";
import { allModuleTotalPage, learningPathErr, successMessage  } from "redux/selectors/learningPathSelector";
import { api } from "services/api";

function dateFormat(inputDate, format) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();   

    format = format.replace("MM", month.toString().padStart(2,"0")); 

    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2,2));
    }

    format = format.replace("dd", day.toString().padStart(2,"0"));

    return format;
}

function dateComparison(a, b) {
    const date1 = new Date(a.endDate);
    const date2 = new Date(b.endDate);
    return date1 - date2;
}

function LearningPathModal(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const search = useLocation().search;
    const searchRef = useRef();
    const classid = new URLSearchParams(search).get('id');
    const listAllModule = useSelector(listAllModuleSelector);
    const listModuleTotalPage = useSelector(allModuleTotalPage);
    const allModuleIsLoading = useSelector(isAllModuleLoadingSelector);
    const listClassModules = useSelector(listClassModuleSelector);
    const listroles = useSelector(listRoleSelector);
    const sucMes = useSelector(successMessage);
    const isErr = useSelector(learningPathErr);
    const [showSide,setShowSide] = useState(true)
    const [itemcards,setCard] = useState([])
    const [allModuleCurrentPage, setAllModuleCurrentPage] = useState(1);
    const [allModuleSearchValue, setAllModuleSearchValue] = useState("");
    const isClassModules = useSelector(isClassModuleSelector);
    const [data, setData] = useState([]);
    const [dataGroup, setDataGroup] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [isUpdatePermission, setIsUpdatePermission] = useState(false);

    const cards = useMemo(() => listAllModule.map(module => ({ id: module.id, moduleName: module.moduleName, duration: module.duration})), [listAllModule]);
    const picData = useMemo(() => listroles.map(role => role.role),[listroles])

    useEffect(() => {
        setIsUpdatePermission(api.getCache("user").permissions.includes("LP002"));
    }, []);

    const notify = props.notifyhandler;
    
    useEffect(() => { 
        dispatch(getListClassModules(classid));
        dispatch(getListRole());   
    }, []);

    useEffect(() => {
        setDataGroup(listClassModules.reduce((result, ele) => {
            if (!result[result.length - 1]) { 
                result.push(ele); 
            }
            if (result[result.length - 1].moduleName !== ele.moduleName) {
                result.push(ele);
            }
            return result;
        }, []).map((ele, idx) => {
            return { 
                id: ele.id,
                moduleName: ele.moduleName,
                duration: ele.duration,
                no: idx
            };
        }));

        let classtopics = listClassModules.map(moduleItem => ({
            mdId: moduleItem.id,
            tpId: moduleItem.topic.id,
            moduleName:  moduleItem.moduleName,
            topic: moduleItem.topic.name,
            pic: moduleItem.topic.pic,
            duration: moduleItem.topic.duration,
            startDate: dateFormat(moduleItem.topic.startDate, 'yyyy-MM-dd'),
            endDate: dateFormat(moduleItem.topic.endDate, 'yyyy-MM-dd'),
        })).sort(dateComparison);
        const openDay = {
            topic: "Openning",
            pic: "",
            duration: 0,
            startDate: "",
            endDate: "",
            unchange: true,
        }
        const endDay = {
            topic: "Summary Class",
            pic: "Admin",
            duration: 0,
            startDate: "",
            endDate: "",
            unchange: true,
        }
        if(classtopics.length >0){
            openDay.startDate = classtopics[0].startDate;
            openDay.endDate = classtopics[0].startDate;
            endDay.startDate = classtopics[classtopics.length - 1].endDate;
            endDay.endDate = classtopics[classtopics.length - 1].endDate;
        }
        setData([openDay,...classtopics,endDay]);
    }, [listClassModules]);

    useEffect(() => {
        setFilteredCards(cards);
    }, [cards])
    
    useEffect(()=> {
        if(sucMes!=null){ 
            notify(sucMes,2)
            dispatch(setSuccessMessage());
        }
    },[sucMes]) 

    useEffect(() => {
        if(isErr!=null){ 
            notify(isErr,3);
            dispatch(setErrMessage());
        }  
    },[isErr])

    const changed = [];
    const tableCol = [
            {
                Header: "Topic",
                accessor: "topic",

            },
            {
                Header: "Pic",
                accessor: "pic",
                Cell: ({row})=>{
                    return (row.original.unchange || !isUpdatePermission) ? row.original.pic :(
                    <Form.Select aria-label="Default" onChange={(e) => {
                        changed.push({
                           moduleId: row.original.mdId,
                           topicId: row.original.tpId,
                           pic: e.target.value,
                        })
                    }}>
                        <option value={row.values.pic}>{row.values.pic}</option>
                        {picData.map((item,index) =>{ 
                            if(item != row.values.pic) return <option key={index} value={item}>{item}</option>;
                        })}
                    </Form.Select>)
                }
            },
            {
                Header: "Start",
                accessor: "startDate",
            },
            {
                Header: "End",
                accessor: "endDate",
            },
            {
                Header: "Duration",
                accessor: "duration",
                filter: "between",
            },
            {
                Header: "Sylabus",
                Cell: ({row})=> row.original.unchange ? "": <Button variant="secondary" onClick={()=>history.push('/admin/class/course-management/sylabus?id='+row.original.tpId)}><i className="fa-solid fa-eye"></i></Button>
            }
            
    ]
    
    const tableColGroup = [
        {
            Header: "Module",
            accessor: "moduleName",
        },
        {
            Header: "Duration",
            accessor: "duration",
            filter: "between",
        },
        {
            Header: 'Action',
            Cell: ({row})=>{
                return row.original.unchange ? " " :<Button variant="danger" className="bg-white" onClick={() => {
                setDataGroup(dataGroup.filter(item => item.moduleName != row.values.moduleName).map((item, idx) => ({ 
                    id: item.id,
                    moduleName: item.moduleName,
                    duration: item.duration,
                    no: idx
                })));
                
            }}><i className="fa-solid fa-trash"></i></Button>
            }
        }
    ]
    
    const dragStart = e => {
        const target = e.target;
        const id = target.id.split(',');
        e.dataTransfer.setData('card_id', id[0])
        e.dataTransfer.setData('card_name', target.innerText)
        e.dataTransfer.setData('card_duration', id[1])
    }
    const dragcardover = e => {
        e.stopPropagation();
    }

    const removeItem = e => {
        const index = e.target.value;
        const newItems = itemcards.filter(item => item != index);
        setCard(newItems);
    }  

    const saveModulePathHandler = () => {
        let prevModuleList = listClassModules.reduce((result, ele) => {
            if (!result[result.length - 1]) { 
                result.push(ele); 
            }
            if (result[result.length - 1].moduleName !== ele.moduleName) {
                result.push(ele);
            }
            return result;
        }, []).map((ele, idx) => {
            return { 
                id: ele.id,
                moduleName: ele.moduleName,
                duration: ele.duration,
                no: idx
            };
        });

        if (JSON.stringify(dataGroup) !== JSON.stringify(prevModuleList)) {
            let postData = dataGroup.map(item => ({
                id: +item.id,
                no: item.no
            }));
            dispatch(updateListClassModules([classid, postData]));
        }
        
        setShowSide(pre => !pre);
    } 

    const pageLimit = 6;
    const searchChangeHandler = (e) => {
        const searchValue = e.target.value;
        dispatch(getListAllModule([1, pageLimit, searchValue]))
        setAllModuleSearchValue(searchValue);
    }

    const allModuleNextPageHandler = () => {
        if (filteredCards.length < pageLimit) {
            return;
        }
        dispatch(getListAllModule([allModuleCurrentPage + 1, pageLimit, allModuleSearchValue]))
        setAllModuleCurrentPage(pre => pre + 1);
    }
    const allModulePreviousPageHandler = () => {
        if (allModuleCurrentPage === 1) { 
            return;
        }
        dispatch(getListAllModule([allModuleCurrentPage - 1, pageLimit, allModuleSearchValue]));
        setAllModuleCurrentPage(pre => pre - 1);
    }
    
    
    return (
        <>
            <Modal 
                className="leaning-path-modal"
                show={props.show}
                onHide={props.onHide}
                fullscreen={true}
                scrollable={true}
            >
                <Modal.Header closeButton >
                    <Modal.Title className="fw-semibold fs-3 text-primary">Learning Path</Modal.Title>
                </Modal.Header>
                {<Modal.Body >
                    {isUpdatePermission && !showSide && <Button className="justify-content-end btn-fill" onClick={saveModulePathHandler}>Save</Button>}
                    {isUpdatePermission && showSide && <Button className="justify-content-end btn-fill" onClick={()=>{
                            setAllModuleCurrentPage(1);
                            dispatch(getListAllModule([1, pageLimit, ""])); 
                            setShowSide(!showSide);
                        }}>Update Plan</Button>}
                    <Row>
                        <Col>
                            {showSide &&<CustomTable columns={tableCol} data={data} deleteHandle={removeItem} isLoading={isClassModules}/>}
                            {!showSide && <ModuleTable columns={tableColGroup} data={dataGroup} setdatagroup={setDataGroup} settopic={setData} isLoading={isClassModules}/>} 
                        </Col>
                        <Col md="4" hidden={showSide}>
                         <div>
                            <h4>Module</h4>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    ref={searchRef}
                                    onChange={searchChangeHandler}
                                    />
                            </Form>
                            {allModuleIsLoading && <Loading />}
                            {!allModuleIsLoading &&<ListGroup>
                                { filteredCards.map((card,index) =><ListGroup.Item onDragStart={dragStart} onDragOver={dragcardover} key={card.id} as="li" id={[card.id, card.duration]} variant="primary" draggable>{card.moduleName}</ListGroup.Item>)
                                }
                            </ListGroup>}
                            
                            <div className=" d-flex align-items-center justify-content-center mt-2">
                                <Button
                                    className="btn-fill btn-sm mx-1"
                                    onClick={allModulePreviousPageHandler}
                                    disabled={allModuleCurrentPage === 1}
                                    >
                                    {"<"}
                                </Button><Button
                                    className="btn-fill btn-sm mx-1"
                                    onClick={allModuleNextPageHandler}
                                    disabled={allModuleCurrentPage === listModuleTotalPage}
                                    >
                                    {">"}
                                </Button>
                                <span className=" mx-3">
                                    Page &nbsp;
                                    <strong>
                                       {allModuleCurrentPage} of {listModuleTotalPage}
                                    </strong>
                                </span>
                            </div>
                        </div>
                        </Col>
                    </Row>
                    
                </Modal.Body>}
                {!isClassModules && <Modal.Footer className="justify-content-end">
                <Row >
                    <Col  md="auto">
                        {isUpdatePermission && showSide && <Button  variant="primary" className="btn-fill" onClick={()=>{                          
                            if(changed.length > 0) {
                                dispatch(updatePicClassTopics([classid,changed]));
                            }else{
                                notify('Nothing to change',3);
                            }
                        }} 
                        >
                            Save Changes
                        </Button>}
                    </Col>
                    <Col md="auto">
                        <Button variant="secondary" className="btn-fill" onClick={props.onHide}>
                            Close
                        </Button>
                    </Col>
                </Row>
                </Modal.Footer>}
            </Modal>
        </>
    )
}

export default LearningPathModal;
