import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "../components/ErrorMessage";

describe("ErrorMessage component", () => {
  it("should render the correct message", () => {
    const testMessage = "This is a test error message";
    render(<ErrorMessage>{testMessage}</ErrorMessage>);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(testMessage);
  });

  it("should have the correct variant", () => {
    const variant = "danger";
    render(<ErrorMessage variant={variant}>Test message</ErrorMessage>);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass(`alert-${variant}`);
  });
});
