import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, shallow } from 'enzyme';
import store from 'redux/store';
import { Provider } from "react-redux";
import { WrapTable } from 'components/AttendTableOneTrainee/index';
import AttendTableOneTrainee from "components/AttendTableOneTrainee";
Enzyme.configure({ adapter: new Adapter() });

describe('Test Attendance Details Of One Trainee Wrap Table', () => {
    let component;

    test('render attendance details Of One Trainee wraptable\'s component with EMPTY props', () => {
        const column = [], data = [];
        component = shallow(<WrapTable columns = { column } data = { data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(true);

    });

    test('render attendance details Of One Trainee wraptable\'s component with NULL props', () => {
        const columns = null, data = null;
        component = shallow(<WrapTable columns = { columns } data = { data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(false);
    });

    test('render attendance details Of One Trainee wraptable\'s component with VALID props', () => {
        const columns = [
            {
                Header: "ID",
                columns: [
                    {
                        Header: "",
                        accessor: "trainee_id",
                    },
                ],
            },
            {
                Header: "Full Name",
                columns: [
                    {
                        Header: "First Name",
                        accessor: "firstName",
                    },
                    {
                        Header: "Last Name",
                        accessor: "lastName",
                    },
                ],
            },
            {
                Header: "Summary",
                columns: [
                    {
                        Header: "",
                        accessor: 'Some summary here',
                    },
                ],
            },
        ];
        const data = [
            {
                trainee_id: 76586282,
                firstName: "neck-eyciv",
                lastName: "bead-1v2sq",
                monthlyAttendanceResponses: [
                    {
                        "date": "2022-06-01",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-02",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-03",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-06",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-07",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-08",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-09",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-10",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-11",
                        "status": "P"
                    },

                    {
                        "date": "2022-06-14",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-15",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-16",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-17",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-18",
                        "status": "P"
                    },

                    {
                        "date": "2022-06-21",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-22",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-23",
                        "status": "P"
                    },

                    {
                        "date": "2022-06-25",
                        "status": "P"
                    },

                    {
                        "date": "2022-06-28",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-29",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-30",
                        "status": "P"
                    },

                ]
        }];
        component = shallow(<WrapTable columns = { columns } data = { data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(true);
    });

    test('render attendance details Of One Trainee wraptable\'s component with INVALID ALL props', () => {
        const columns = 1;
        const data = 'temp';
        component = shallow(<WrapTable columns = { columns } data = {data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(false);
    });

    test('render attendance details Of One Trainee wraptable\'s component with INVALID COLUMNS props', () => {
        const columns = 1;
        const data = [
            {
                trainee_id: 76586282,
                firstName: "neck-eyciv",
                lastName: "bead-1v2sq",
                monthlyAttendanceResponses: [
                    {
                        "date": "2022-06-01",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-02",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-03",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-06",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-07",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-08",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-09",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-10",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-11",
                        "status": "P"
                    },

                    {
                        "date": "2022-06-14",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-15",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-16",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-17",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-18",
                        "status": "P"
                    },

                    {
                        "date": "2022-06-21",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-22",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-23",
                        "status": "P"
                    },

                    {
                        "date": "2022-06-25",
                        "status": "P"
                    },

                    {
                        "date": "2022-06-28",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-29",
                        "status": "P"
                    },
                    {
                        "date": "2022-06-30",
                        "status": "P"
                    },

                ]
        }];
        component = shallow(<WrapTable columns = { columns } data = { data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(false);
    });

    test('render attendance details Of One Trainee wraptable\'s component with INVALID DATA props', () => {
        const columns = [
            {
                Header: "ID",
                columns: [
                    {
                        Header: "",
                        accessor: "trainee_id",
                    },
                ],
            },
            {
                Header: "Full Name",
                columns: [
                    {
                        Header: "First Name",
                        accessor: "firstName",
                    },
                    {
                        Header: "Last Name",
                        accessor: "lastName",
                    },
                ],
            },
            {
                Header: "Summary",
                columns: [
                    {
                        Header: "",
                        accessor: 'Some summary here',
                    },
                ],
            },
        ];
        const data = 'temp';
        component = shallow(<WrapTable columns = { columns } data = { data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(false);
    });

    test('render attendance details Of One Trainee wraptable\'s component with INVALID DATA TYPE', () => {
        const columns = 'temp columns';
        const data = 'temp';
        component = shallow(<WrapTable columns = { columns } data = { data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(false);
    });
})

describe('Test Attendance Details Of One Trainee Page', () => {
    let component;
    beforeEach(() => {
        component = mount(<Provider store = { store }> <AttendTableOneTrainee /> </Provider>);
    });

    test('has the correct class', () => {
        expect(component.find('.attendance-details').exists()).toEqual(true);
    });

    test('render Attendance Details Of One Trainee Page\'s component correctly', () => {
        component = mount(<Provider store = { store }> <AttendTableOneTrainee /> </Provider>);
        expect(component.html()).toMatchSnapshot();
    });
})