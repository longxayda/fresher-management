import React from "react";
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import store from "redux/store";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import ModalAddPenalty from "components/ManagementPenalty/Modal/ModalAddPenalty";
configure({ adapter: new Adapter() });

describe("ModalAddPenalty", () => {
    let component;
    beforeEach(() => {
        component = mount(<Provider store={store}> <ModalAddPenalty /> </Provider>);
    });

    it("should render correctly", () => {
        expect(component.html()).toMatchSnapshot();
    });

    it("render modal", () => {
        expect(component.find('Modal').at(0).prop('show')).toBe(false);
        component.find('#button-add-testing').at(0).simulate('click');
        expect(component.find('Modal').at(0).prop('show')).toBe(true);
    });
});