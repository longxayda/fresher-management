import React, { useEffect } from "react";
import { Route, Switch,  useRouteMatch } from "react-router";
import ScheduleList from "components/Audit/Schedule/ScheduleList/ScheduleList.js";
import Detail from "components/Audit/Schedule/Detail/Detail.js";
import { fetchSchedule } from 'redux/auditorsSlice/scheduleSlice'
import { useDispatch } from "react-redux";

const Schedule = () => {

    const dispatch = useDispatch();
    useEffect(() => { dispatch(fetchSchedule()) }, [])

    let { path, url } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={path}>
                    <ScheduleList></ScheduleList>
                </Route>
                <Route path={`${path}/detail`}>
                    <Detail></Detail>
                </Route>
            </Switch>
        </>
    );
}

export default Schedule;