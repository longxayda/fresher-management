import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
import store from 'redux/store';
import { Provider } from "react-redux";
import RequestModal from 'components/LeaveRequest/modalRequest';

Enzyme.configure({ adapter: new Adapter() });

describe('Test Leave Request Request Modal', () => {
    let component;
    beforeEach(() => {
        component = mount(<Provider store={store}> <RequestModal /> </Provider>);
    });

    test('has the correct modal', () => {
        expect(component.find('.leave-request-modal').exists()).toEqual(true);
    });

    test('render Request Modal\'s component correctly', () => {
        component = mount(<Provider store={store}> <RequestModal /> </Provider>);
        expect(component.html()).toMatchSnapshot();
    });

    test('has button', () => {
        expect(component.find('Button').exists()).toEqual(true);
    })
})