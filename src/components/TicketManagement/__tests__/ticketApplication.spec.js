import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
import store from 'redux/store';
import { Provider } from "react-redux";
import ContentHandle from 'components/TicketManagement/TicketApplication';

describe('Test Ticket Application Modal', () => {
    let component;
    beforeEach(() => {
        component = mount(<Provider store={store}> <ContentHandle /> </Provider>);
    });

    test('has the correct class', () => {
        expect(component.find('.ticket-application-modal').exists()).toEqual(true);
    });

    test('render ContentHandle\'s component correctly', () => {
        component = mount(<Provider store={store}> <ContentHandle /> </Provider>);
        expect(component.html()).toMatchSnapshot();
    });
})
