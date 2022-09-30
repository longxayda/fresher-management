import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, shallow } from 'enzyme';
import store from 'redux/store';
import { Provider } from "react-redux";
import { AttendTable } from 'components/AttendTable/index';
Enzyme.configure({ adapter: new Adapter() });

// describe('Test Attendance Details Attend Table', () => {
//     let component;

//     test('render attendance details attend table\'s component with EMPTY props', () => {
//         const data = [];
//         component = shallow(<AttendTable data = { data } />);
//         expect(component.find('.attend-table-content').exists()).toEqual(true);

//     });

//     test('render attendance details attendtable\'s component with NULL props', () => {
//         const data = null;
//         component = shallow(<AttendTable data = { data } />);
//         expect(component.find('.attend-table-content').exists()).toEqual(false);
//     });

//     test('render attendance details attend table\'s component with VALID props', () => {
//         const data = [
//             {
//                 trainee_id: 76586282,
//                 firstName: "neck-eyciv",
//                 lastName: "bead-1v2sq",
//                 monthlyAttendanceResponses: [
//                     {
//                         "date": "2022-06-01",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-02",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-03",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-06",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-07",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-08",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-09",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-10",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-11",
//                         "status": "P"
//                     },

//                     {
//                         "date": "2022-06-14",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-15",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-16",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-17",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-18",
//                         "status": "P"
//                     },

//                     {
//                         "date": "2022-06-21",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-22",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-23",
//                         "status": "P"
//                     },

//                     {
//                         "date": "2022-06-25",
//                         "status": "P"
//                     },

//                     {
//                         "date": "2022-06-28",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-29",
//                         "status": "P"
//                     },
//                     {
//                         "date": "2022-06-30",
//                         "status": "P"
//                     },

//                 ]
//         }];
//         component = shallow(<AttendTable data = { data } />);
//         expect(component.find('.attend-table-content').exists()).toEqual(true);
//     });

//     test('render attendance details attend table\'s component with INVALID ALL props', () => {
//         const data = 'temp';
//         component = shallow(<AttendTable data = {data } />);
//         expect(component.find('.attend-table-content').exists()).toEqual(false);
//     });
// })

describe('Test Attendance Details Page', () => {
    let component;

    beforeEach(() => {
        component = mount(<Provider store = { store }> < AttendTable /> </Provider>);
    });

    test('has the correct attend table class', () => {
        expect(component.find('.attend-table-content').exists()).toEqual(true);
    });

    test('has the correct select boxes class', () => {
        expect(component.find('.attendance-select-boxes').exists()).toEqual(true);
    });

    test('has the correct attend table container class', () => {
        expect(component.find('.attend-table-container').exists()).toEqual(true);
    });

    test('render Attendance Details Page\'s component correctly', () => {
        component = mount(<Provider store = { store }> <AttendTable /> </Provider>);
        expect(component.html()).toMatchSnapshot();
    });
})