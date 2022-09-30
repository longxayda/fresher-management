import React from "react";
import renderer from "react-test-renderer";
import DeleteSelected from "../DeleteSelected";
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
      selectedUser: [
        {
          username:'admin'
        }
      ],
    },
  };
  const mockStore = configureStore();
  let store = mockStore(initialState);

  test("Test render correctly without props", () => {
    const component = renderer.create(
      <Provider store={store}>
        <DeleteSelected />
      </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Test render correctly with VALID props", () => {
    const handleCurrentPage = jest.fn();
    const tree = mount(
      <Provider store={store}>
        <DeleteSelected
          showModal={true}
          handleCurrentPage={handleCurrentPage}
        />
      </Provider>
    );
    expect(tree.find("#deleteSelectedBtn").exists()).toEqual(true);
  });

  test("Test Show Modal", () => {
    const handleCurrentPage = jest.fn();
    const tree = mount(
      <Provider store={store}>
        <DeleteSelected
          showModal={true}
          handleCurrentPage={handleCurrentPage}
        />
      </Provider>
    );
    expect(tree.find("#titleDeletedSelected").exists()).toEqual(true);
  });

  test("Render span for check username", () => {
    const handleCurrentPage = jest.fn();
    const tree = mount(
      <Provider store={store}>
        <DeleteSelected
          showModal={true}
          handleCurrentPage={handleCurrentPage}
        />
      </Provider>
    );
    expect(tree.find("#userNamesSelected").exists()).toEqual(true);
  });
});
