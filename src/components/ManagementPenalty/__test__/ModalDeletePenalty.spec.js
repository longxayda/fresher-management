import React from "react";
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import store from "redux/store";
import { Provider } from "react-redux";
import ModalDeletePenalty from "components/ManagementPenalty/Modal/ModalDeletePenalty";

configure({ adapter: new Adapter() });

describe("ModalDeletePenalty", () => {
  let component;
  beforeEach(() => {
    component = mount(<Provider store={store}> <ModalDeletePenalty /> </Provider>);
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
    expect(component.find('#delete-btn').exists()).toEqual(false);
    component.find('#delete-pelnaty-btn').first().simulate('click');
    expect(component.find('#delete-btn').exists()).toEqual(true);
  });
});