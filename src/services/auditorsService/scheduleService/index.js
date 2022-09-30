import { useApi } from "services/api";

import { storage } from "services/storage";
const usePublicApi = useApi("https://admin-tool-api-gateway-bu.herokuapp.com/", true);
//storage.setCache("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbk1hbmFnZXIiLCJyb2xlcyI6WyJBZG1pbiBNYW5hZ2VyIl0sImlzcyI6Imh0dHBzOi8vYWRtaW4tdG9vbC1hcGktZ2F0ZXdheS5oZXJva3VhcHAuY29tL2FwaS9sb2dpbiIsImV4cCI6MTY2MDAyMDU3OH0.0km1v333WKcXwG3aLw8JAMp-Hy3K8He3Srt7KbiiyJA")

export const scheduleService = {
    getSchedules: () => {
        return usePublicApi.get("audit-service/api/schedules?page=1&size=20&user-id=6&role=Auditor, Admin")
    },
    getTrainees: (id) => {
        return usePublicApi.get(`audit-service/api/schedules/${id}?page=1&size=50&user-id=6&role=Auditor, Admin`)
    },
    getQuestiones: (id, idTrainee) => {
        return usePublicApi.get(`audit-service/api/schedules/detail/${id}/${idTrainee}/?page=1&size=10`)
    },
    addQuestion: (idSchedule, IDtrainee, listIdQuestion) => {
        return usePublicApi.post(`audit-service/api/schedules/detail/${idSchedule}/${IDtrainee}`, listIdQuestion)
    },
    updateSelectedSchedule: () => {
        return usePublicApi.put('audit-service/api/schedules', currentSchedule)
    },
    deleteOneSchedule: (id) => {
        return usePublicApi.delete(`audit-service/api/schedules`, {data: id})
    },
    deleteManySchedule: (idList) => {
        return usePublicApi.delete(`audit-service/api/schedules`, {data: idList})
    },
    getTrainerList: () => {
        return usePublicApi.get('audit-service/api/schedules')

    },
    addCommentEvaluateSchedule: () => {
        return usePublicApi.put(`audit-service/api/schedules/detail/${idSchedule}/${IDtrainee}`, )
    },
    deleteQuetionEvaluate : (idSchedule, IDtrainee,id)=>{
        return usePublicApi.delete(`audit-service/api/schedules/detail/${idSchedule}/${IDtrainee}/`,{data: id})

    }

}

