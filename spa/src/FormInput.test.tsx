import { render, screen } from "@testing-library/react";
import FormInput from "./FormInput";
import { describe, it, expect, vi } from "vitest";

describe("FormInput", () => {
  const baseProps = {
    label: "Test label",
    type: "number" as const,
    register: {
      name: "test name",
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    },
    error: undefined,
  };

  it("renders the label and input", () => {
    render(<FormInput {...baseProps} />);
    expect(screen.getByLabelText("Test label")).toBeInTheDocument();
  });

  it("shows an error message when error is present", () => {
    render(
      <FormInput {...baseProps} error={{ message: "This field is required", type: "required" }} />
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
