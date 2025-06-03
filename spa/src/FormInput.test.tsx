import { render, screen } from "@testing-library/react";
import FormInput from "./FormInput";
import { describe, it, expect, vi } from "vitest";

describe("FormInput Component", () => {
  const baseProps = {
    label: "Test Field",
    register: {
      name: "test",
      onChange: vi.fn(),
      onBlur: vi.fn(),
      ref: vi.fn(),
    },
    error: undefined,
  };

  it("renders the label and input", () => {
    render(<FormInput {...baseProps} />);
    expect(screen.getByLabelText("Test Field")).toBeInTheDocument();
  });

  it('uses the default input type "text"', () => {
    render(<FormInput {...baseProps} />);
    const input = screen.getByLabelText("Test Field") as HTMLInputElement;
    expect(input.type).toBe("text");
  });

  it("applies the custom input type if provided", () => {
    render(<FormInput {...baseProps} type="number" />);
    const input = screen.getByLabelText("Test Field") as HTMLInputElement;
    expect(input.type).toBe("number");
  });

  it("applies the placeholder if provided", () => {
    render(<FormInput {...baseProps} placeholder="Enter value" />);
    const input = screen.getByPlaceholderText("Enter value");
    expect(input).toBeInTheDocument();
  });

  it("displays an error message when error is present", () => {
    render(
      <FormInput {...baseProps} error={{ message: "This field is required", type: "required" }} />
    );
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
