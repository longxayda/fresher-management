import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, shallow } from 'enzyme';
import store from 'redux/store';
import { Provider } from "react-redux";
import {TraineeAttendance} from "pages/AttendanceManagement/traineeAttendanceDetail"
Enzyme.configure({ adapter: new Adapter() });

describe('Test Trainee Attendance Details page', () => {
    let component;

    test('test trainee attendance details page on TraineeAttendance component with EMPTY data', () => {
        const data = [];
        component = shallow(<TraineeAttendance data = { data } />);
        expect(component.find('.trainee-attendance-detail').exists()).toEqual(true);
    });

    test('test trainee attendance details page on TraineeAttendance component with NULL data', () => {
        const data = null;
        component = shallow(<TraineeAttendance data = { data } />);
        expect(component.find('.trainee-attendance-detail').exists()).toEqual(false);
    });

    test('test trainee attendance details page on TraineeAttendance component with correct case', () => {
        const data = [
            {
              date: "2022-06-30",
              status: "A",
            },
            {
              date: "2022-06-29",
              status: "P",
            },
            {
              date: "2022-06-28",
              status: "L",
            },
            {
              date: "2022-06-27",
              status: "P",
            },
            {
              date: "2022-06-28",
              status: "P",
            },
            {
              date: "2022-06-27",
              status: "Ln",
            },
            {
              date: "2022-06-30",
              status: "A",
            },
            {
              date: "2022-06-29",
              status: "P",
            },
            {
              date: "2022-06-28",
              status: "L",
            },
            {
              date: "2022-06-27",
              status: "P",
            },
            {
              date: "2022-06-28",
              status: "P",
            },
            {
              date: "2022-06-27",
              status: "Ln",
            }
          ];
        component = shallow(<TraineeAttendance data = { data } />);
        expect(component.find('.trainee-attendance-detail').exists()).toEqual(true);
    });

    test('test trainee attendance details page on TraineeAttendance component with incorrect data case', () => {
        const data = 'temp';
        component = shallow(<TraineeAttendance data = {data } />);
        expect(component.find('.trainee-attendance-detail').exists()).toEqual(false);
    });

    test('test trainee attendance details page TraineeAttendance component with incorrect data case', () => {
        const data = 1;
        component = shallow(<TraineeAttendance data = { data } />);
        expect(component.find('.trainee-attendance-detail').exists()).toEqual(false);
    });
})

describe('Test Trainee Attendance Details Page', () => {
  let component;
  let data = [
    {
      date: "2022-06-30",
      status: "A",
    },
    {
      date: "2022-06-29",
      status: "P",
    },
    {
      date: "2022-06-28",
      status: "L",
    },
    {
      date: "2022-06-27",
      status: "P",
    },
    {
      date: "2022-06-28",
      status: "P",
    },
    {
      date: "2022-06-27",
      status: "Ln",
    },
    {
      date: "2022-06-30",
      status: "A",
    },
    {
      date: "2022-06-29",
      status: "P",
    },
    {
      date: "2022-06-28",
      status: "L",
    },
    {
      date: "2022-06-27",
      status: "P",
    },
    {
      date: "2022-06-28",
      status: "P",
    },
    {
      date: "2022-06-27",
      status: "Ln",
    },
    {
      date: "2022-06-30",
      status: "A",
    },
    {
      date: "2022-06-29",
      status: "P",
    },
    {
      date: "2022-06-28",
      status: "L",
    },
    {
      date: "2022-06-27",
      status: "P",
    },
    {
      date: "2022-06-28",
      status: "P",
    },
    {
      date: "2022-06-27",
      status: "Ln",
    }
  ];
    beforeEach(() => {
        component = mount(<Provider store = { store }> <TraineeAttendance data={data}/> </Provider>);
    });

    test('has the correct detail', () => {
        expect(component.find('.trainee-attendance-detail').exists()).toEqual(true);
    });

    test('test trainee attendance details page', () => {
      component = mount(<Provider store = { store }> <TraineeAttendance /> </Provider>);
        expect(component.html()).toMatchSnapshot();
    });
})