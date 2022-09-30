import { useApi } from "services/api";

const usePublicApi = () => useApi('https://admin-tool-api-gateway-bu.herokuapp.com/', true);

export const resourceService = {
    getQuestionList: async (currentPage) => {
        return usePublicApi().get(`audit-service/api/question?page=${currentPage}&size=20`)
    },
    getSearchQuestionList: async (currentPage, keyword) => {
        return usePublicApi().get(`audit-service/api/question?page=${currentPage}&size=20&keyword=${keyword}`)
    },
    getSkillList: () => {
        return usePublicApi().get('audit-service/api/question/skill')
    },
    getModuleList: () => {
        return usePublicApi().get('audit-service/api/question/module')
    },
    createNewQuestion: (newQuestion) => {
        return usePublicApi().post("audit-service/api/question", newQuestion)
    },
    updateCurrentQuestion: (currentQuestion) => {
        return usePublicApi().put(`audit-service/api/question`,currentQuestion)
    },
    deleteOneQuestionResource: (id) => {
        return usePublicApi().delete(`audit-service/api/question/${id}`)
    },
    deleteManyQuestionResource: (idList) => {
        return usePublicApi().delete(`audit-service/api/question/`, {data: idList})
    }
}
