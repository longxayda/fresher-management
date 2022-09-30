import React from "react";
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import store from "redux/store";
import { Provider } from "react-redux";
import ModalDetail from "components/ManagementPenalty/Modal/ModalDetail";

configure({ adapter: new Adapter() });

describe("ModalDetail", () => {
  let component;
  beforeEach(() => {
    component = mount(<Provider store={store}> <ModalDetail /> </Provider>);
  });

  it("should render correctly", () => {
    expect(component.html()).toMatchSnapshot();
  });
  
  it("should have correct id", () => {
    expect(component.find('#detail-btn').exists()).toBe(true);
  });

  it("should have button", () => {
    expect(component.find('button').exists()).toEqual(true);
  });

  it ("should have modal", () => {
    expect(component.find('#close-btn').exists()).toEqual(false);
    component.find('#detail-btn').first().simulate('click');
    expect(component.find('#close-btn').exists()).toEqual(true);
  });
});