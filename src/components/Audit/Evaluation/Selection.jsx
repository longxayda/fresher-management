import React from "react";
import { Stack } from "react-bootstrap";

const Selection = (props) => {
    return (
        <div
            className="d-flex align-items-center justify-content-start pb-3"
        >
            <Stack direction="horizontal" gap={3}>
                <select
                    className="form-select"
                    id="class-select"
                    onChange={(e) => props.handleClass(e.target.value)}
                    style={{ width: "auto" }}
                >
                    <option value='Choose a class' hidden>Choose a class</option>
                    {
                        props.classList !== [] ?
                            props.classList.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.classCode}
                                </option>
                            )) : null
                    }
                </select>
                <select
                    className="form-select"
                    id="session-select"
                    onChange={(e) => props.handleSession(e.target.value)}
                    disabled={props.isDisabled}
                    style={{ width: "auto" }}
                >
                    <option value='Choose a session' hidden>Choose a session</option>
                    {
                        props.sessionList !== [] ?
                            props.sessionList.map((s, key) => (
                                <option key={key} value={s}>
                                    {s}
                                </option>
                            )) : null
                    }
                </select>
            </Stack>
        </div>
    )
}

export default Selection;