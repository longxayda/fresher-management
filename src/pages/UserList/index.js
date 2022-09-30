// React, redux
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_LIST_SELECTOR } from "redux/selectors/UserListSelectors";
import {
  getUserData,
  getRolesData,
  handleSelect,
  handleSelectAll,
  toggleEditUserModal,
  clearErrorUserData,
} from "redux/UserListSlices/UserListSlice";
// react-bootstrap components, fontAwesome
import {
  Button,
  Table,
  Container,
  Row,
  Col,
  Form,
  Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
// UserList component
import AddUser from "components/UserList/AddUser";
import EditUser from "components/UserList/EditUser";
import SearchFilter from "components/UserList/SearchFilter";
import DeleteUser from "components/UserList/DeleteUser";
import DeleteSelected from "components/UserList/DeleteSelected";
import Notification from "components/UserList/Notification";

function UserList() {
  const dispatch = useDispatch();
  const userData = useSelector(USER_LIST_SELECTOR).userData;
  const search = useSelector(USER_LIST_SELECTOR).searchFilter.search;
  const filter = useSelector(USER_LIST_SELECTOR).searchFilter.filter;
  const selectedUser = useSelector(USER_LIST_SELECTOR).selectedUser;
  const success = useSelector(USER_LIST_SELECTOR).errorUserData.success;
  const error = useSelector(USER_LIST_SELECTOR).errorUserData.error;
  const initialPage = useSelector(USER_LIST_SELECTOR).pagination;
  const [currentPage, setCurrentPage] = useState(initialPage.pageNumber + 1);
  const [userPerPage, setUserPerPage] = useState(10);
  const [gotoPage, setGotoPage] = useState(1);
  const TOTAL_PAGE = useSelector(USER_LIST_SELECTOR).pagination.totalPage;

  useEffect(() => {
    dispatch(
      getUserData({
        pageIndex: currentPage,
        sizePage: userPerPage,
        searchFilter: {
          search: "",
          filter: [],
        },
      })
    );
    dispatch(getRolesData());
  }, []);
  // Handle edit user
  const [userEdit, setUserEdit] = useState({
    id: "",
    username: "",
    email: "",
    role: [],
    status: true,
  });
  const handleEditUserClick = (user) => {
    setUserEdit(user);
    dispatch(toggleEditUserModal());
  };
  // Handle select user
  const handleSelectUser = (e, user) => {
    if (e.target.checked) {
      dispatch(handleSelect({ type: true, user: user }));
      // handleCurrentPage();
    } else {
      dispatch(handleSelect({ type: false, user: user }));
      // handleCurrentPage();
    }
  };
  const checkToSelectAll = () => {
    return userData.every((user) => {
      let res = false;
      for (let i = 0; i < selectedUser.length; i++) {
        if (user.id === selectedUser[i].id) {
          res = true;
          break;
        }
      }
      return res;
    });
  };
  const handleSelectAllUser = (e) => {
    dispatch(handleSelectAll(e.target.checked));
  };
  // Handle pagination

  const handleUserPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setUserPerPage(value);
    setCurrentPage(1);
    dispatch(clearErrorUserData());
    dispatch(
      getUserData({
        pageIndex: 1,
        sizePage: value,
        searchFilter: {
          search: search,
          filter: filter,
        },
      })
    );
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
    dispatch(clearErrorUserData());
    dispatch(
      getUserData({
        pageIndex: 1,
        sizePage: userPerPage,
        searchFilter: {
          search: search,
          filter: filter,
        },
      })
    );
  };
  const handlePrePage = () => {
    setCurrentPage(currentPage - 1);
    dispatch(clearErrorUserData());
    dispatch(
      getUserData({
        pageIndex: currentPage - 1,
        sizePage: userPerPage,
        searchFilter: {
          search: search,
          filter: filter,
        },
      })
    );
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    dispatch(clearErrorUserData());
    dispatch(
      getUserData({
        pageIndex: currentPage + 1,
        sizePage: userPerPage,
        searchFilter: {
          search: search,
          filter: filter,
        },
      })
    );
  };
  const handleLastPage = () => {
    setCurrentPage(TOTAL_PAGE);
    dispatch(clearErrorUserData());
    dispatch(
      getUserData({
        pageIndex: TOTAL_PAGE,
        sizePage: userPerPage,
        searchFilter: {
          search: search,
          filter: filter,
        },
      })
    );
  };
  const handleGotoPage = (e) => {
    let value = parseInt(e.target.value);
    if (value >= 1 && value <= TOTAL_PAGE) {
      setGotoPage(value);
      setCurrentPage(value);
      dispatch(clearErrorUserData());
      dispatch(
        getUserData({
          pageIndex: value,
          sizePage: userPerPage,
          searchFilter: {
            search: search,
            filter: filter,
          },
        })
      );
    }
  };
  const handleCurrentPage = () => {
    dispatch(clearErrorUserData());
    dispatch(
      getUserData({
        pageIndex: currentPage,
        sizePage: userPerPage,
        searchFilter: {
          search: search,
          filter: filter,
        },
      })
    );
  };
  return (
    <>
      {!success ? (
        <Notification
          show={true}
          type="danger"
          message={error}
        />
      ) : (
        <></>
      )}

      <Container fluid>
        <Row>
          <Col md="12">
            <div
              className="d-flex justify-content-between"
              style={{ marginLeft: 15, marginRight: 15, marginBottom: 10 }}
            >
              <SearchFilter setCurrentPage={setCurrentPage} />
              <div>
                <AddUser handleLastPage={handleLastPage} />
                <DeleteSelected handleCurrentPage={handleCurrentPage} />
              </div>
            </div>

            <div
              className="Table data"
              style={{ height: 390, overflowY: "scroll" }}
            >
              <Table className="table-hover table-striped text-center">
                <thead>
                  <tr>
                    <th>
                      <Form.Check
                        inline
                        checked={checkToSelectAll()}
                        onChange={handleSelectAllUser}
                      />
                    </th>
                    <th className="border-0">
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        No
                      </span>
                    </th>
                    <th className="border-0">
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        User Name
                      </span>
                    </th>
                    <th className="border-0">
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Email
                      </span>
                    </th>
                    <th className="border-0">
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Role
                      </span>
                    </th>
                    <th className="border-0">
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Status
                      </span>
                    </th>
                    <th className="border-0">
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Actions
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Form.Check
                            inline
                            checked={selectedUser
                              .map((user) => user.id)
                              .includes(user.id)}
                            onChange={(e) => handleSelectUser(e, user)}
                          />
                        </td>
                        <td>{index + 1 + (currentPage - 1) * userPerPage}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role.join(", ")}</td>
                        <td>
                          {
                            <Badge bg={user.status ? "success" : "danger"}>
                              {user.status ? "Active" : "Inactive"}
                            </Badge>
                          }
                        </td>
                        <td>
                          <Button
                            onClick={(e) => handleEditUserClick(user)}
                            style={{ marginRight: 5 }}
                            size="sm"
                          >
                            <FontAwesomeIcon icon={faPenSquare} />
                          </Button>
                          <DeleteUser
                            user={user}
                            handleCurrentPage={handleCurrentPage}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: 20 }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ alignItems: "center", width: 670 }}
              >
                <Button
                  className="btn-fill mx-1 btn-sm"
                  disabled={currentPage == 1}
                  onClick={handleFirstPage}
                >
                  &lt;&lt;
                </Button>
                <Button
                  className="btn-fill mx-1 btn-sm"
                  disabled={currentPage == 1}
                  onClick={handlePrePage}
                >
                  &lt;
                </Button>
                <Button
                  className="btn-fill mx-1 btn-sm"
                  disabled={currentPage >= TOTAL_PAGE}
                  onClick={handleNextPage}
                >
                  &gt;
                </Button>
                <Button
                  className="btn-fill mx-1 btn-sm"
                  disabled={currentPage >= TOTAL_PAGE}
                  onClick={handleLastPage}
                >
                  &gt;&gt;
                </Button>

                <span className="mx-3">
                  Page{" "}
                  <strong>
                    {currentPage} of {TOTAL_PAGE}
                  </strong>
                </span>
                <div className="d-flex " style={{ alignItems: "center" }}>
                  <span className="mx-3">Go to page: </span>
                  <input
                    className="mr-3"
                    type="number"
                    style={{ width: 100, height: 40, outline: "none" }}
                    value={gotoPage}
                    onChange={(e) => handleGotoPage(e)}
                  />
                </div>

                <select
                  style={{ width: 100, height: 40, outline: "none" }}
                  value={userPerPage}
                  onChange={handleUserPerPageChange}
                >
                  <option value="10">Show 10</option>
                  <option value="20">Show 20</option>
                  <option value="30">Show 30</option>
                  <option value="40">Show 40</option>
                  <option value="50">Show 50</option>
                </select>
              </div>
            </div>
          </Col>
        </Row>
        <EditUser user={userEdit} />
      </Container>
    </>
  );
}

export default UserList;
