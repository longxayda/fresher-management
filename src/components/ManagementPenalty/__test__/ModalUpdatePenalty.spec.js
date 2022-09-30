import React from "react";
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import store from "redux/store";
import { Provider } from "react-redux";
import ModalUpdatePenalty from "components/ManagementPenalty/Modal/ModalUpdatePenalty";

configure({ adapter: new Adapter() });

describe("ModalUpdatePenalty", () => {
  let component;
  beforeEach(() => {
    component = mount(<Provider store={store}> <ModalUpdatePenalty /> </Provider>);
  });

  it("should render correctly", () => {
    expect(component.html()).toMatchSnapshot();
  });
  
  it("should have correct btn number", () => {
    expect(component.find('Button').length).toBe(1);
  });

  it("should have button", () => {
    expect(component.find('button').exists()).toEqual(true);
  });

  it ("should have modal", () => {
    expect(component.find('#update-btn').exists()).toEqual(false);
    component.find('#update-penalty-btn').first().simulate('click');
    expect(component.find('#update-btn').exists()).toEqual(true);
  });
});