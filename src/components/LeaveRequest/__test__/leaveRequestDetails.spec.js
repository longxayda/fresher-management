import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount } from 'enzyme';
import { WrapTable } from 'components/LeaveRequest/index';
import store from 'redux/store';
import { Provider } from "react-redux";
import LeaveRequest from 'components/LeaveRequest';

Enzyme.configure({ adapter: new Adapter() });

describe('Test Leave Request Details Wrap Table', () => {
    let component;

    test('render Leave Request Details Wrap Table\'s component with EMPTY props', () => {
        const column = [], data = [];
        component = shallow(<WrapTable columns = { column } data = { data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(true);

    });

    test('render Leave Request Details Wrap Table\'s component with NULL props', () => {
        const columns = null, data = null;
        component = shallow(<WrapTable columns = { columns } data = { data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(false);
    });

    test('render Leave Request Details Wrap Table\'s component with VALID props', () => {
        const columns = [
            {
                Header: "#",
                accessor: "id",
              },
              {
                Header: "Content",
                accessor: "content",
              },
              {
                Header: "Status",
                accessor: "status",
              },
              {
                Header: "Start Date",
                accessor: "startDate",
              },
              {
                Header: "End Date",
                accessor: "endDate",
              },
              {
                Header: "Action",
                accessor: "ticketStatus",
              }
        ];
        const data = [
            {
                id: "1",
                content: "01/07/2022",
                status: "Pending",
                startDate: "01/07/2022",
                endDate: '03/07/2022',
                ticketStatus: "Undone",
              }
        ];
        component = shallow(<WrapTable columns = { columns } data = { data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(true);

    });

    test('render Leave Request Details Wrap Table\'s component with INVALID props', () => {
        const columns = 1;
        const data = 'temp';
        component = shallow(<WrapTable columns = { columns } data = {data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(false);
    });

    test('render Leave Request Details Wrap Table\'s component with INVALID COLUMNS props', () => {
        const columns = 1;
        const data = [
            {
                id: "1",
                content: "01/07/2022",
                status: "Pending",
                startDate: "01/07/2022",
                endDate: '03/07/2022',
                ticketStatus: "Undone",
              }
          ];
        component = shallow(<WrapTable columns = { columns } data = { data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(false);
    });

    test('render Leave Request Details Wrap Table\'s component with INVALID DATA props', () => {
        const columns = [
            {
                Header: "#",
                accessor: "id",
              },
              {
                Header: "Content",
                accessor: "content",
              },
              {
                Header: "Status",
                accessor: "status",
              },
              {
                Header: "Start Date",
                accessor: "startDate",
              },
              {
                Header: "End Date",
                accessor: "endDate",
              },
              {
                Header: "Action",
                accessor: "ticketStatus",
              }
        ];
        const data = 'temp';
        component = shallow(<WrapTable columns = { columns } data = { data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(false);
    });

    test('render Leave Request Details Wrap Table\'s component with INVALID DATA TYPE', () => {
        const columns = 'temp columns';
        const data = 'temp';
        component = shallow(<WrapTable columns = { columns } data = { data } />);
        expect(component.find('.wrap-table-content').exists()).toEqual(false);
    });
})

describe('Test Leave Request Details Page', () => {
  let component;
  beforeEach(() => {
      component = mount(<Provider store = { store }> <LeaveRequest /> </Provider>);
  });

  test('has the correct detail', () => {
      expect(component.find('.leave-request-detail').exists()).toEqual(true);
  });

  test('render Leave Request Details Page\'s component correctly', () => {
      component = mount(<Provider store = { store }> <LeaveRequest /> </Provider>);
      expect(component.html()).toMatchSnapshot();
  });
})