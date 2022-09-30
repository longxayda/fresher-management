import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
import store from 'redux/store';
import { Provider } from "react-redux";
import StatusDescription from 'components/AttendTable/StatusDescription';

describe('Test Attendance Management Status Description', () => {
    let component;
    beforeEach(() => {
        component = mount(<Provider store = { store } > <StatusDescription /> </Provider>);
    });

    test('has the correct class', () => {
        expect(component.find('.attendance-status-description').exists()).toEqual(true);
    });

    test('render Status Description\'s component correctly', () => {
        component = mount(<Provider store = { store }> <StatusDescription /> </Provider>);
        expect(component.html()).toMatchSnapshot();
    });

})
