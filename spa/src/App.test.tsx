import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import App from "./App";

// Mock child components
vi.mock("./FormInput", () => ({
  default: ({ label }: { label: string }) => (
    <div>
      <label htmlFor={label}>{label}</label>
      <input id={label} name={label} />
    </div>
  ),
}));
vi.mock("./FormSelect", () => ({
  default: ({ label }: { label: string }) => (
    <div>
      <label htmlFor={label}>{label}</label>
      <select id={label} name={label}>
        <option value="">Select...</option>
        <option value="Option 1">Option 1</option>
      </select>
    </div>
  ),
}));
vi.mock("./FormButton", () => ({
  default: ({ label }: { label: string }) => (
    <button name="label" type="submit">
      {label}
    </button>
  ),
}));

describe("App Component", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders the form title", () => {
    render(<App />);
    expect(screen.getByText(/Test Input Form/i)).toBeInTheDocument();
  });

  // it('shows validation errors when submitting empty form', async () => {
  //   render(<App />);
  //   await fireEvent.click(screen.getByText(/Submit/i));
  //   waitFor(() => {
  //     // expect some known error text or element to appear
  //     const inputs = screen.getAllByRole('textbox');
  //     expect(inputs.length).toBeGreaterThan(0); // A rough check that fields exist
  //   });
  // });

  it("submits valid form and shows success message", async () => {
    const mockPrediction = "85000";
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ salary: mockPrediction }),
      })
    ) as any;

    render(<App />);

    fireEvent.change(screen.getByLabelText("age"), {
      target: { value: "23" },
    });
    fireEvent.input(screen.getByLabelText("high_school_gpa"), {
      target: { value: "3.8" },
    });
    fireEvent.input(screen.getByLabelText("sat"), {
      target: { value: "1300" },
    });
    fireEvent.input(screen.getByLabelText("university_gpa"), {
      target: { value: "3.5" },
    });
    fireEvent.input(screen.getByLabelText("internships"), {
      target: { value: "2" },
    });
    fireEvent.input(screen.getByLabelText("projects"), {
      target: { value: "3" },
    });
    fireEvent.input(screen.getByLabelText("certifications"), {
      target: { value: "1" },
    });
    fireEvent.input(screen.getByLabelText("soft_skills"), {
      target: { value: "4" },
    });
    fireEvent.input(screen.getByLabelText("networking"), {
      target: { value: "3" },
    });

    fireEvent.change(screen.getByLabelText("gender"), {
      target: { value: "male" },
    });
    fireEvent.change(screen.getByLabelText("field"), {
      target: { value: "engineering" },
    });

    await fireEvent.click(screen.getByText(/Submit/i));

    waitFor(() => {
      expect(screen.getByText(/Form submitted successfully!/i)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(mockPrediction))).toBeInTheDocument();
    });
  });

  it("handles server error gracefully", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }) as any;

    render(<App />);
    await fireEvent.click(screen.getByText(/Submit/i));

    waitFor(() => {
      expect(screen.getByText(/An error occurred while submitting the form/i)).toBeInTheDocument();
    });
  });
});
