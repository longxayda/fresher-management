import React from "react";
import TopicModal from "../TopicModal";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";

it("shows the topic modal", () => {
  const { getByTestId } = render(<TopicModal />);
});
