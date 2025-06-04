import { render, screen } from "@testing-library/react";
import FormSelect from "./FormSelect";
import { describe, it, expect, vi } from "vitest";

const OPTIONS = ["engineering", "computer_science", "law"];

describe("FormSelect", () => {
  const baseProps = {
    label: "Test lable",
    options: OPTIONS,
    register: {
      name: "test name",
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    },
    error: undefined,
  };

  it("renders label and options", () => {
    render(<FormSelect {...baseProps} label="Field of Study" />);

    expect(screen.getByLabelText(/field of study/i)).toBeInTheDocument();

    expect(screen.getByRole("option", { name: /select an option/i })).toBeInTheDocument();

    expect(screen.getByRole("option", { name: /Engineering/ })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Computer science/ })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Law/ })).toBeInTheDocument();
  });

  it("shows an error message when error is present", () => {
    render(
      <FormSelect
        {...baseProps}
        label="Field"
        error={{ message: "This field is required", type: "required" }}
      />
    );

    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
  });
});
