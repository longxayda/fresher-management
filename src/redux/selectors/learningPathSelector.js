export const listAllModuleSelector = (state) => state.learningPath.listAllModule;
export const allModuleTotalPage = (state) =>  state.learningPath.allModuleTotalPage;
export const isAllModuleLoadingSelector = (state) => state.learningPath.isAllModuleLoading;
export const listClassModuleSelector = (state) => state.learningPath.listClassModules;
export const isClassModuleSelector = (state) => state.learningPath.isClassModulesLoading;
export const listRoleSelector = (state) => state.learningPath.listRoles;
export const successMessage = (state) => state.learningPath.successMessage;
export const learningPathErr = (state) => state.learningPath.err;