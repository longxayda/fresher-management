import renderer from "react-test-renderer";
import ModalCreateClass from "./index.jsx";
import store from "redux/store";
import { Provider } from "react-redux";
describe("Snapshot ModalCreateClass", () => {
  it("renders a snapshot", () => {
    const modalCreateClass = renderer.create(
      <Provider store={store}>
        <ModalCreateClass open={true} setOpen={() => {}} />
      </Provider>
    );
    expect(modalCreateClass).toMatchSnapshot();
  });
});
