import React from "react";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { mount } from "enzyme";
Enzyme.configure({ adapter: new Adapter() });
import store from "redux/store";
import { Provider } from "react-redux";
import FresherListFilter from "components/FresherListTable/fresherListFilter";

describe("Test FresherList FresherListFilter", () => {
  let component;
  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        {" "}
        <FresherListFilter />{" "}
      </Provider>
    );
  });

  test("has the correct class", () => {
    expect(component.find(".fresher-list-filter").exists()).toEqual(true);
  });

  test("render FresherListFilter's component correctly", () => {
    component = mount(
      <Provider store={store}>
        {" "}
        <FresherListFilter />{" "}
      </Provider>
    );
    expect(component.html()).toMatchSnapshot();
  });

  test("has select dropdown", () => {
    expect(component.find("select").exists()).toEqual(true);
  });

  // describe("choosing an option", () => {
  //   beforeEach(() => {
  //     component
  //       .find("select")
  //       .first()
  //       .simulate("change", { target: { value: "2022" } });
  //   });

  //   test("shows that text in the select area", () => {
  //     expect(component.find("select").first().prop("value")).toEqual("2022");
  //   });
  // });
});
