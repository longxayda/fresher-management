import React from "react";
import renderer from "react-test-renderer";
import AddUser from "../AddUser";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, mount } from "enzyme";

// Mock redux
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

Enzyme.configure({ adapter: new Adapter() });

describe("Test components AddUser", () => {
  const initialState = {
    UserList: {
      role: ["Admin"],
    },
  };
  const mockStore = configureStore();
  let store = mockStore(initialState);

  test("Test render correctly without props", () => {
    const component = renderer.create(
      <Provider store={store}>
        <AddUser />
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Test render correctly with VALID props", () => {
    const tree = shallow(
      <Provider store={store}>
        <AddUser showModal={false} />
      </Provider>
    );
    expect(tree.find(".AddUser-detail").exists()).toEqual(false);
  });

  test("Test Show Modal", () => {
    const tree = mount(
      <Provider store={store}>
        <AddUser showModal={true} />
      </Provider>
    );
    expect(tree.find("#titleAddUser").text()).toEqual("Add new user");
  });

  test("Render input for username", () => {
    const tree = mount(
      <Provider store={store}>
        <AddUser showModal={true} />
      </Provider>
    );
    expect( tree.find("#usernameAddUser").at(1).exists()).toEqual(true);
  });

  test("Render input for email", () => {
    const tree = mount(
      <Provider store={store}>
        <AddUser showModal={true} />
      </Provider>
    );
    expect( tree.find("#emailAddUser").at(1).exists()).toEqual(true);
  });

  test("Render select for roles", () => {
    const tree = mount(
      <Provider store={store}>
        <AddUser showModal={true} />
      </Provider>
    );
    expect( tree.find("#rolesAddUser").at(1).exists()).toEqual(true);
  });

  test("Render input for password", () => {
    const tree = mount(
      <Provider store={store}>
        <AddUser showModal={true} />
      </Provider>
    );
    expect( tree.find("#passAddUser").at(1).exists()).toEqual(true);
  });


});