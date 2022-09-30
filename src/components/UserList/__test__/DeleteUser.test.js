import React from "react";
import renderer from "react-test-renderer";
import DeleteUser from "../DeleteUser";
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
        <DeleteUser />
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Test render correctly with VALID props", () => {
    
    const tree = mount(
      <Provider store={store}>
        <DeleteUser user={user}/>
      </Provider>
    );
    expect(tree.find("#btnDelete").exists()).toEqual(true);
  });

  test("Test Show Modal", () => {
    const tree = mount(
      <Provider store={store}>
        <DeleteUser showModal={true} user={user}/>
      </Provider>
    );
    expect(tree.find("#titleDelete").exists()).toEqual(true);
  });

  test("Render span for check username", () => {
    const tree = mount(
      <Provider store={store}>
        <DeleteUser showModal={true} user={user}/>
      </Provider>
    );
    expect(tree.find("#usernameDelete").exists()).toEqual(true);
  });
});
