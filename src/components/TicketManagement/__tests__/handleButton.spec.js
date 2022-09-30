import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
import store from 'redux/store';
import { Provider } from "react-redux";
import HandleButton from 'components/TicketManagement/HandleButton';

describe('Test Attendance Management HandleButton', () => {
    let component;
    beforeEach(() => {
        component = mount(<Provider store={store}> <HandleButton /> </Provider>);
    });

    test('has the correct class', () => {
        expect(component.find('.attendance-handle-buttons').exists()).toEqual(true);
    });

    test('render HandleButton\'s component correctly', () => {
        component = mount(<Provider store={store}> <HandleButton /> </Provider>);
        expect(component.html()).toMatchSnapshot();
    });

    test('has buttons', () => {
        expect(component.find('Button').exists()).toEqual(true);
    })
})
