const roleListSelector = (state) => state.role.roleList;
const rightListSelector = (state) => state.role.permissionList;
const notificationSelector = (state) => state.role.notification;
const authSelector = (state) => state.auth.user;
const isLoadingSelector = (state) => state.role.isLoading;
export {
  roleListSelector,
  rightListSelector,
  notificationSelector,
  authSelector,
  isLoadingSelector,
};
