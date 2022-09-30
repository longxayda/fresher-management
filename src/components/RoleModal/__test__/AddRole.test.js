<<<<<<< HEAD
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RoleManagement from "../../../pages/RoleManagement"
import '@testing-library/jest-dom'
import AddRole from '../AddRole'
<<<<<<< HEAD
describe('Add Role Testing', () => {
    test('Show Add Role modal when click button', () => {
        // Arrange
        render(<RoleManagement />);
=======
import { Provider } from "react-redux";
import store from "../../../redux/store";

describe('Add Role Testing', () => {
    test('Show Add Role modal when click button', () => {
        // Arrange
        render(<Provider store={store} ><RoleManagement /></Provider>);
>>>>>>> 64505ee1fbe5507dbdb1e15e233410ab2f88fba4
        // Action
        const ShowAddRoleButton = screen.getByText(/Add new role/i)
        fireEvent.click(ShowAddRoleButton)
        // Assert
        const addLabel = screen.getByTestId('add-role-label')
        expect(addLabel).toBeInTheDocument()
    })
    test('Add new role  when user enter value and click add', () => {
        const TestValue = 'lexuanlong'
        // Arrange
<<<<<<< HEAD
        render(<RoleManagement />);
=======
        render(<Provider store={store} ><RoleManagement /></Provider>);
>>>>>>> 64505ee1fbe5507dbdb1e15e233410ab2f88fba4
        // Action
        const ShowAddRoleButton = screen.getByText(/Add new role/i)
        fireEvent.click(ShowAddRoleButton)
=======
import React from "react";
import renderer from "react-test-renderer";
import AddRole from "../AddRole";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, mount } from "enzyme";

// Mock redux
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
>>>>>>> 800c5f8a1e809b48be93943b7cef449570f6b09b

Enzyme.configure({ adapter: new Adapter() });

<<<<<<< HEAD
        fireEvent.change(RoleNameInput, { target: { value: TestValue } })
        fireEvent.click(AddRoleButton)
        // Assert
        const addLabel = screen.getByText(TestValue)
        expect(addLabel).toBeInTheDocument()
    })
    test('Click button cancel in add role modal', () => {
<<<<<<< HEAD
        render(<RoleManagement />);
=======
        render(<Provider store={store} ><RoleManagement /></Provider>);
>>>>>>> 64505ee1fbe5507dbdb1e15e233410ab2f88fba4
=======
describe("Test components AddUser", () => {
    const initialState = {
        role: {
            role: ["Admin"],
        },
    };
    const mockStore = configureStore();
    let store = mockStore(initialState);
    test("Test Show Modal", () => {
        const tree = mount(
            <Provider store={store}>
                <AddRole showModal={true} />
            </Provider>
        );
        expect(tree.find("#titleRole").text()).toEqual("Add new role");
    });
>>>>>>> 800c5f8a1e809b48be93943b7cef449570f6b09b



<<<<<<< HEAD
    });
<<<<<<< HEAD
})

=======
})
>>>>>>> 64505ee1fbe5507dbdb1e15e233410ab2f88fba4
=======
});
>>>>>>> 800c5f8a1e809b48be93943b7cef449570f6b09b
