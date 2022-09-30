import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
import store from 'redux/store';
import { Provider } from "react-redux";
import Attendance from 'pages/AttendanceManagement/Attendance.js'

describe('Test Attendance Form Sreen', () => {
    let component;
    beforeEach(() => {
        component = mount(<Provider store = { store }> <Attendance /> </Provider>);
    });

    test('has the correct class', () => {
        expect(component.find('.attendance-form-sreen').exists()).toEqual(true);
    });

    test('render Attendance Form Sreen\'s component correctly', () => {
        component = mount(<Provider store = { store }> <Attendance /> </Provider>);
        expect(component.html()).toMatchSnapshot();
    });
})
