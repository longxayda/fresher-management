import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
import store from 'redux/store';
import { Provider } from "react-redux";
import BarcodeAttendance from 'pages/AttendanceManagement/BarcodeAttendance.js'

describe('Test Attendance Form Sreen', () => {
    let component;
    beforeEach(() => {
        component = mount(<Provider store = { store }> <BarcodeAttendance /> </Provider>);
    });

    test('has the correct class', () => {
        expect(component.find('.barcode-form').exists()).toEqual(true);
    });

    test('render Barcode Form Sreen\'s component correctly', () => {
        component = mount(<Provider store = { store }> <BarcodeAttendance /> </Provider>);
        expect(component.html()).toMatchSnapshot();
    });
})
