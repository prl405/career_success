import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import App from "./App";

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

describe("App fetch", () => {
  beforeEach(() => {
    render(<App />);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders the form title", () => {
    expect(screen.getByText(/Test Input Form/i)).toBeInTheDocument();
  });

  it("submits valid form and shows success message", async () => {
    const mockPrediction = "85000";
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ salary: mockPrediction }),
      })
    ) as any;

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

    await fireEvent.click(screen.getByText(/Submit/i));

    waitFor(() => {
      expect(screen.getByText(/An error occurred while submitting the form/i)).toBeInTheDocument();
    });
  });
});

describe("App form validation", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("shows all required field errors on empty submit", async () => {
    await fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    waitFor(() => {
      expect(screen.getByText("Required field")).toBeInTheDocument();
      expect(screen.getAllByText("Required field").length).toBeGreaterThan(5);
    });
  });

  it("shows validation errors for invalid number ranges", async () => {
    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: "15" } });
    fireEvent.change(screen.getByLabelText(/high_school_gpa/i), { target: { value: "5" } });
    fireEvent.change(screen.getByLabelText(/sat/i), { target: { value: "200" } });
    fireEvent.change(screen.getByLabelText(/university_gpa/i), { target: { value: "-1" } });
    fireEvent.change(screen.getByLabelText(/soft_skills/i), { target: { value: "11" } });
    fireEvent.change(screen.getByLabelText(/networking/i), { target: { value: "20" } });

    await fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    waitFor(() => {
      expect(screen.getByText(/Please select an age between 18-30/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid GPA grade/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid SAT score/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Please select an score between 0-10/i).length).toBe(2);
    });
  });
});
