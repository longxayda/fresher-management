import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, shallow } from 'enzyme';
import store from 'redux/store';
import { Provider } from "react-redux";
import TicketManagemetTable from 'components/TicketManagement/index'
Enzyme.configure({ adapter: new Adapter() });

describe('Test Ticket Managemet Table', () => {
    let component;

    test('render ticket management table\'s component with EMPTY props', () => {
        const data = [];
        component = shallow(<TicketManagemetTable data = { data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(true);

    });

    test('render ticket management table\'s component with NULL props', () => {
        const data = null;
        component = shallow(<TicketManagemetTable data = { data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(false);
    });

    test('render ticket management table\'s component with VALID props', () => {
        const data = [
            {
            id: "1",
            idtrainee: "123456",
            username: "HieuVo",    
            content: "Request for absence from 01/07/2022 to 01/07/2022",
            status: "Pending",
            handled: "Handle",
            }];
        component = shallow(<TicketManagemetTable data = { data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(true);
    });

    test('render ticket management table\'s component with INVALID ALL props', () => {
        const data = 'temp';
        component = shallow(<TicketManagemetTable data = {data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(false);
    });
})

describe('Test Ticket Management Details Page', () => {
    let component;
    let data = [
        {
            id: "1",
            idtrainee: "123456",
            username: "HieuVo",    
            content: "Request for absence from 01/07/2022 to 01/07/2022",
            status: "Pending",
            handled: "Handle",
        },
        {
            id: "2",
            idtrainee: "123457",
            username: "NgocNguyen",
            content: "Request for absence from 05/07/2022 to 06/07/2022",
            status: "Approved",
            handled: "Done",
        },
        {
            id: "3",
            idtrainee: "123458",
            username: "ThaoDoan",
            content: "Request for absence from 05/07/2022 to 05/07/2022",
            status: "Pending",
            handled: "Handle",
        },
        {
            id: "4",
            idtrainee: "123457",
            username: "ThaoDoan",
            content: "Request for absence from 05/07/2022 to 05/07/2022",
            status: "Rejected",
            handled: "Done",
        },
        {
            id: "5",
            idtrainee: "123459",
            username: "NhuY",
            content: "Request for absence from 05/07/2022 to 05/07/2022",
            status: "Approved",
            handled: "Done",
        },
        {
            id: "6",
            idtrainee: "123456",
            username: "Hieuuu",
            content: "Request for absence from 22/07/2022 to 22/07/2022",
            status: "Pending",
            handled: "Handle",
        },
    ];
    beforeEach(() => {
        component = mount(<Provider store = { store }> <TicketManagemetTable data = {data}/> </Provider>);
    });

    test('has the correct class', () => {
        expect(component.find('.wrap-table-content').exists()).toEqual(true);
    });

    test('render Ticket Management Details Page\'s component correctly', () => {
        component = mount(<Provider store = { store }> <TicketManagemetTable data = {data} /> </Provider>);
        expect(component.html()).toMatchSnapshot();
    });
})