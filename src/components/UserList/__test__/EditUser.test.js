import React from "react";
import renderer from "react-test-renderer";
import EditUser from "../EditUser";
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
  const user = { id: "", username: "", email: "", role: [], status: true };

  test("Test render correctly without props", () => {
    const component = renderer.create(
      <Provider store={store}>
        <EditUser />
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Test render correctly with VALID props", () => {
    
    const tree = mount(
      <Provider store={store}>
        <EditUser user={user}/>
      </Provider>
    );
    expect(tree.find("#btnEdit").exists()).toEqual(true);
  });

  test("Test Show Modal", () => {
    const tree = mount(
      <Provider store={store}>
        <EditUser showModal={true} user={user}/>
      </Provider>
    );
    expect(tree.find("#titleEdit").exists()).toEqual(true);
  });

  test("Render input for username", () => {
    const tree = mount(
      <Provider store={store}>
        <EditUser showModal={true} user={user}/>
      </Provider>
    );
    expect(tree.find("#usernameEdit").exists()).toEqual(true);
  });

  test("Render input for email", () => {
    const tree = mount(
      <Provider store={store}>
        <EditUser showModal={true} user={user}/>
      </Provider>
    );
    expect(tree.find("#emailEdit").exists()).toEqual(true);
  });

  test("Render select for role", () => {
    const tree = mount(
      <Provider store={store}>
        <EditUser showModal={true} user={user}/>
      </Provider>
    );
    expect(tree.find("#rolesEdit").exists()).toEqual(true);
  });

  test("Render select for status", () => {
    const tree = mount(
      <Provider store={store}>
        <EditUser showModal={true} user={user}/>
      </Provider>
    );
    expect(tree.find("#statusEdit").exists()).toEqual(true);
  });
});
