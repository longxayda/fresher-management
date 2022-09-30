import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test-utils/test-utils";
import AddTraineeMD from "../AddTraineeModal";

afterEach(cleanup);

describe("Test 1 Add Trainee Modal", () => {
  it("should render Add Button", () => {
    const {} = renderWithProviders(<AddTraineeMD />);
    expect(screen.getByText("Add")).toBeVisible();
  });
  it("shoud render show Modal Add Fresher", () => {
    const {} = renderWithProviders(<AddTraineeMD />);
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByText("Add New Fresher")).toBeVisible();
  });
});
describe("Test 2 Add Trainee Modal", () => {
  it("should input data firstname", () => {
    const {} = renderWithProviders(<AddTraineeMD />);
    fireEvent.click(screen.getByText("Add"));
    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "Nguyen" },
    });
    expect(screen.getByLabelText("First Name").value).toBe("Nguyen");
  });
  it("should input data lastname", () => {
    const {} = renderWithProviders(<AddTraineeMD />);
    fireEvent.click(screen.getByText("Add"));
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Nam" },
    });
    expect(screen.getByLabelText("Last Name").value).toBe("Nam");
  });
  it("should input data phone", () => {
    const {} = renderWithProviders(<AddTraineeMD />);
    fireEvent.click(screen.getByText("Add"));
    fireEvent.change(screen.getByLabelText("Phone"), {
      target: { value: "0987643244" },
    });
    expect(screen.getByLabelText("Phone").value).toBe("0987643244");
  });
  it("should input data email", () => {
    const {} = renderWithProviders(<AddTraineeMD />);
    fireEvent.click(screen.getByText("Add"));
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "hoangnamqt.2001@gmail.com" },
    });
    expect(screen.getByLabelText("Email").value).toBe(
      "hoangnamqt.2001@gmail.com"
    );
  });
  it("should input data University", () => {
    const {} = renderWithProviders(<AddTraineeMD />);
    fireEvent.click(screen.getByText("Add"));
    fireEvent.change(screen.getByLabelText("University"), {
      target: { value: "HUST" },
    });
    expect(screen.getByLabelText("University").value).toBe("HUST");
  });
  it("should input data Faculty", () => {
    const {} = renderWithProviders(<AddTraineeMD />);
    fireEvent.click(screen.getByText("Add"));
    fireEvent.change(screen.getByLabelText("Faculty"), {
      target: { value: "CNTT" },
    });
    expect(screen.getByLabelText("Faculty").value).toBe("CNTT");
  });
  it("should input data English Level", () => {
    const {} = renderWithProviders(<AddTraineeMD />);
    fireEvent.click(screen.getByText("Add"));
    fireEvent.change(screen.getByLabelText("English Level"), {
      target: { value: "A1" },
    });
    expect(screen.getByLabelText("English Level").value).toBe("A1");
  });
  it("should input data Major", () => {
    const {} = renderWithProviders(<AddTraineeMD />);
    fireEvent.click(screen.getByText("Add"));
    fireEvent.change(screen.getByLabelText("Major"), {
      target: { value: "CNTT" },
    });
    expect(screen.getByLabelText("Major").value).toBe("CNTT");
  });
  it("should input data Graduate Year", () => {
    const {} = renderWithProviders(<AddTraineeMD />);
    fireEvent.click(screen.getByText("Add"));
    fireEvent.change(screen.getByLabelText("Graduate Year"), {
      target: { value: "2020" },
    });
    expect(screen.getByLabelText("Graduate Year").value).toBe("2020");
  });
  it("should input data Headquaters", () => {
    const {} = renderWithProviders(<AddTraineeMD />);
    fireEvent.click(screen.getByText("Add"));
    fireEvent.change(screen.getByLabelText("Headquaters"), {
      target: { value: "Hanoi" },
    });
    expect(screen.getByLabelText("Headquaters").value).toBe("Hanoi");
  });
  it("should have field Select Class", () => {
    const {} = renderWithProviders(<AddTraineeMD />);
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByLabelText("Class")).toBeVisible();
  });
});
describe("Test 3 Add Trainee Modal", () => {
  it("should have snapshot", () => {
    const { getByText, asFragment, debug } = renderWithProviders(
      <AddTraineeMD />
    );
    const button = getByText("Add");
    fireEvent.click(button);
    const addTraineeModal = asFragment();
    expect(addTraineeModal).toMatchSnapshot();
  });
});
