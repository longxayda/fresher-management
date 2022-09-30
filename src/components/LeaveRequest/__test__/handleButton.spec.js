import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
import store from 'redux/store';
import { Provider } from "react-redux";
import HandleButton from 'components/LeaveRequest/HandleButton';

Enzyme.configure({ adapter: new Adapter() });

describe('Test Leave Request Handle Button', () => {
    let component;
    beforeEach(() => {
        component = mount(<Provider store={store}> <HandleButton /> </Provider>);
    });

    test('has the correct class', () => {
        expect(component.find('.leave-request-handle-button').exists()).toEqual(true);
    });

    test('render Handle Button\'s component correctly', () => {
        component = mount(<Provider store={store}> <HandleButton /> </Provider>);
        expect(component.html()).toMatchSnapshot();
    });

    test('has button', () => {
        expect(component.find('div').exists()).toEqual(true);
    })
})
