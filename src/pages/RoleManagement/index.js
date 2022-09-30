import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AddRole from "components/RoleModal/AddRole.js";
import DetailRole from "components/RoleModal/DetailRole.js";
import EditRole from "components/RoleModal/EditRole.js";
import Notification from "components/RoleModal/Notification.js";
import ShowAllPermissions from "components/RoleModal/ShowAllPermissions.js";
import {
  ActiveSelectedRoles,
  InactiveSelectedRoles,
} from "components/RoleModal/ChangeStatusRole.js";
import RoleTable from "components/RoleTable";
import { validateRoleName } from "utils/roleValidation.js";
import { rightListSelector } from "redux/selectors/roleSelector.js";
import {
  addRole as addRoleAction,
  editRole as editRoleAction,
  getPermissionList as getPermissionListAction,
  getRoleList as getRoleListAction,
} from "redux/actions/roleAction";

function RoleManagement() {
  const dispatch = useDispatch();
  const [changeTableFlag, setChangeTableFlag] = useState(false);

  useEffect(() => {
    dispatch(getPermissionListAction());
    dispatch(getRoleListAction());
  }, []);

  const rightList = useSelector(rightListSelector);

  const [rightArr, setRightArr] = useState([]);
  const [validateStatus, setValidateStatus] = useState({
    roleName: true,
  });

  //Add New Role
  const [showAddRole, setShowAddRole] = useState(false);
  const [newRole, setNewRole] = useState({
    roleName: "",
    status: 1,
  });
  const handleShowAddRole = () => {
    setRightArr([]);
    setValidateStatus((pre) => ({ ...pre, roleName: true }));
    setShowAddRole(true);
  };
  const handleCloseAddRole = () => {
    setNewRole({ roleName: "", status: 1 });
    setShowAddRole(false);
  };
  const completeAddRole = (newRole) => {
    dispatch(
      addRoleAction({
        roleName: newRole.roleName,
        isEnabled: newRole.status ? true : false,
        permissionList: newRole.rights,
      })
    );
    setChangeTableFlag(!changeTableFlag);
  };
  const handleAddRole = () => {
    if (!validateRoleName(newRole.roleName).status) {
      setValidateStatus((pre) => ({ ...pre, roleName: false }));
    } else {
      const newRight = rightArr.map((right) => {
        return right.value;
      });
      completeAddRole({
        id: Math.floor(Math.random() * 100) + 1,
        roleName: newRole.roleName,
        status: newRole.status,
        rights: newRight,
      });
      handleCloseAddRole();
    }
  };
  //Show Permission
  const [showAllPermissions, setShowAllPermissions] = useState(false);
  const handleCloseAllPermissions = () => setShowAllPermissions(false);
  const handleShowPermissionRole = () => {
    setShowAllPermissions(true);
  };

  //Detail Role
  const [showDetailRole, setShowDetailRole] = useState(false);
  const [detailRole, setDetailRole] = useState({
    roleName: "",
    status: "",
    rights: [],
  });
  const handleCloseDetailRole = () => setShowDetailRole(false);
  const handleShowDetailRole = (role) => {
    setDetailRole({
      roleName: role.roleName,
      status: role.status,
      rights: role.rights,
    });
    setShowDetailRole(true);
  };

  //Edit Role
  const [showEditRole, setShowEditRole] = useState(false);
  const [editRole, setEditRole] = useState({
    id: "",
    roleName: "",
    status: "",
    rights: [],
  });
  const handleShowEditRole = (role) => {
    setShowEditRole(true);
    const editRightArr = role.rights.map((rightId) => {
      let objIndex = rightList.findIndex((obj) => obj.id == rightId);
      return {
        value: rightId,
        label: `${rightList[objIndex].code}: ${rightList[objIndex].rightName}`,
      };
    });

    setEditRole({ ...role });
    setRightArr(editRightArr);
  };
  const handleCloseEditRole = () => setShowEditRole(false);
  const completeEditRole = (editRole) => {
    dispatch(
      editRoleAction({
        roleId: editRole.id,
        roleName: editRole.roleName,
        isEnabled: editRole.status ? true : false,
        permissionList: editRole.rights,
      })
    );
    setChangeTableFlag(!changeTableFlag);
  };
  const handleEditRole = () => {
    const editRight = rightArr.map((right) => {
      return right.value;
    });
    completeEditRole({ ...editRole, rights: editRight });
    handleCloseEditRole();
  };

  //Change Status Selected Roles
  // const [selectedRoles, setselectedRoles] = useState([]);
  // const [showActiveSelectedRoles, setShowActiveSelectedRoles] = useState(false);
  // const [showInactiveSelectedRoles, setShowInactiveSelectedRoles] =
  //   useState(false);
  // const handleShowActiveSelectedRoles = () => setShowActiveSelectedRoles(true);
  // const handleShowInactiveSelectedRoles = () =>
  //   setShowInactiveSelectedRoles(true);
  // const handleCloseActiveSelectedRoles = () =>
  //   setShowActiveSelectedRoles(false);
  // const handleCloseInactiveSelectedRoles = () =>
  //   setShowInactiveSelectedRoles(false);
  // const completeActiveSelectedRoles = (activeRoles) => {
  //   dispatch(
  //     changeStatusSelectedRolesAction({ status: 1, roles: activeRoles })
  //   );
  //   setChangeTableFlag(!changeTableFlag);
  // };
  // const completeInactiveSelectedRoles = (inactiveRoles) => {
  //   dispatch();
  //   setChangeTableFlag(!changeTableFlag);
  // };
  // const handleActiveSelectedRoles = () => {
  //   completeActiveSelectedRoles(selectedRoles);
  //   handleCloseActiveSelectedRoles();
  // };
  // const handleInactiveSelectedRoles = () => {
  //   completeInactiveSelectedRoles(selectedRoles);
  //   handleCloseInactiveSelectedRoles();
  // };

  return (
    <>
      <Container fluid>
        <Notification />
        <Row className="d-flex flex-column justify-content-center align-items-center">
          <AddRole
            newRole={newRole}
            rightArr={rightArr}
            showAddRole={showAddRole}
            validateStatus={validateStatus}
            validateRoleName={validateRoleName}
            setNewRole={setNewRole}
            handleCloseAddRole={handleCloseAddRole}
            setRightArr={setRightArr}
            handleAddRole={handleAddRole}
          ></AddRole>
          <ShowAllPermissions
            showAllPermissions={showAllPermissions}
            handleCloseAllPermissions={handleCloseAllPermissions}
          />
          <DetailRole
            detailRole={detailRole}
            showDetailRole={showDetailRole}
            handleCloseDetailRole={handleCloseDetailRole}
          ></DetailRole>
          <EditRole
            showEditRole={showEditRole}
            editRole={editRole}
            rightArr={rightArr}
            setEditRole={setEditRole}
            setRightArr={setRightArr}
            handleCloseEditRole={handleCloseEditRole}
            handleEditRole={handleEditRole}
          />
          <RoleTable
            changeTableFlag={changeTableFlag}
            handleShowAddRole={handleShowAddRole}
            handleShowDetailRole={handleShowDetailRole}
            handleShowEditRole={handleShowEditRole}
            handleShowPermission={handleShowPermissionRole}
            // selectedRoles={selectedRoles}
            // setselectedRoles={setselectedRoles}
            // handleShowActiveSelectedRoles={handleShowActiveSelectedRoles}
            // handleShowInactiveSelectedRoles={handleShowInactiveSelectedRoles}
          />
          {/* <ActiveSelectedRoles
            selectedRoles={selectedRoles}
            showActiveSelectedRoles={showActiveSelectedRoles}
            handleActiveSelectedRoles={handleActiveSelectedRoles}
            handleCloseActiveSelectedRoles={handleCloseActiveSelectedRoles}
          />
          <InactiveSelectedRoles
            selectedRoles={selectedRoles}
            showInactiveSelectedRoles={showInactiveSelectedRoles}
            handleInactiveSelectedRoles={handleInactiveSelectedRoles}
            handleCloseInactiveSelectedRoles={handleCloseInactiveSelectedRoles}
          /> */}
        </Row>
      </Container>
    </>
  );
}

export default RoleManagement;
