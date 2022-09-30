import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mount, configure } from "enzyme";
import ClassDetails from "./ClassDetails";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({});

let component;

beforeEach(() => {
    component = mount(<Provider store={store}><ClassDetails /></Provider>);
});

it("renders a button", () => {
    act(() => {
        ReactDOM.createRoot(component).render(<ClassDetails />);
    });
    const updateBtn = component.querySelector("#updateBtn");
    expect(updateBtn.props('variant')).toBe('primary');
});


