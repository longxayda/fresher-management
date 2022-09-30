import {userAxios} from '../serviceConfig'
export const attendanceService = {
    postAttendance: async (p) => {
        return userAxios.post(`api/attendance/attend`,p);
    },    
};
