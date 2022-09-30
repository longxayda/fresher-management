import React from 'react';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, shallow } from 'enzyme';
import store from 'redux/store';
import { Provider } from "react-redux";
import {DiligentSummaryTable} from "components/DiligentSummary/index.jsx"
Enzyme.configure({ adapter: new Adapter() });

describe('Test Diligent Summary Details page', () => {
    let component;

    test('test Diligent Summary details page on Diligent Summary component with EMPTY data', () => {
        const data = [];
        component = shallow(<DiligentSummaryTable data = { data } />);
        expect(component.find('.diligent-summary-detail').exists()).toEqual(true);
    });

    test('test Diligent Summary details page on Diligent Summary component with NULL data', () => {
        const data = null;
        component = shallow(<DiligentSummaryTable data = { data } />);
        expect(component.find('.diligent-summary-detail').exists()).toEqual(false);
    });

    test('test Diligent Summary details page on Diligent Summary component with correct case', () => {
        const data = [
            {
                month: "May",
                absenceDay: "2",
                lateOrEarlyDay: "7",
                rateAbsence: "78%",
                diligentGrade: "60%",
            }
          ];
        component = shallow(<DiligentSummaryTable data = { data } />);
        expect(component.find('.diligent-summary-detail').exists()).toEqual(true);
    });

    test('test Diligent Summary details page on Diligent Summary component with incorrect data case', () => {
        const data = 'temp';
        component = shallow(<DiligentSummaryTable data = {data } />);
        expect(component.find('.diligent-summary-detail').exists()).toEqual(false);
    });

    test('test Diligent Summary details page Diligent Summary component with incorrect data case', () => {
        const data = 1;
        component = shallow(<DiligentSummaryTable data = { data } />);
        expect(component.find('.diligent-summary-detail').exists()).toEqual(false);
    });
})

describe('Test Diligent Summary Details Page', () => {
  let component;
  let data = [
    {
        month: "May",
        absenceDay: "2",
        lateOrEarlyDay: "7",
        rateAbsence: "78%",
        diligentGrade: "60%",
    }
  ];
    beforeEach(() => {
        component = mount(<Provider store = { store }> <DiligentSummaryTable data={data}/> </Provider>);
    });

    test('has the correct detail', () => {
        expect(component.find('.diligent-summary-detail').exists()).toEqual(true);
    });

    test('test trainee attendance details page', () => {
      component = mount(<Provider store = { store }> <DiligentSummaryTable /> </Provider>);
        expect(component.html()).toMatchSnapshot();
    });
})