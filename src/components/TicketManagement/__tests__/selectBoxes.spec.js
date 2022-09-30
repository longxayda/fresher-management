import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
import store from 'redux/store';
import { Provider } from "react-redux";
import SelectBoxes from 'components/TicketManagement/SelectBoxes';

describe('Test Attendance Management SelectBoxes', () => {
    let component;
    beforeEach(() => {
        component = mount(<Provider store={store}> <SelectBoxes /> </Provider>);
    });

    test('has the correct class', () => {
        expect(component.find('.attendance-select-boxes').exists()).toEqual(true);
    });

    test('render SelectBoxes\'s component correctly', () => {
        component = mount(<Provider store={store}> <SelectBoxes /> </Provider>);
        expect(component.html()).toMatchSnapshot();
    });

    test('has select boxes', () => {
        expect(component.find('select').exists()).toEqual(true);
    })

    describe('choosing an option', () => {
        beforeEach(() => {
            component.find('select').first().simulate('change', {target: {value: 'HCM22_CPL_REACT_01'}});
        });

        test('shows that text in the select area', () => {
            expect(component.find('select').first().prop('value')).toEqual('HCM22_CPL_REACT_01');
        });
    });
})