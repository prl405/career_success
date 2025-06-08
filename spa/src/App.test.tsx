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

  it("renders the form titles", () => {
    expect(screen.getByText(/Career Prediction App/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Get a predicted starting salary based on your supplied educational and career information./i
      )
    ).toBeInTheDocument();
  });

  it("submits valid form and shows success message", async () => {
    const mockPrediction = "85000";
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ salary: mockPrediction }),
      })
    ) as any;

    fireEvent.change(screen.getByLabelText("Age (18-30)"), {
      target: { value: "23" },
    });
    fireEvent.input(screen.getByLabelText("High school GPA"), {
      target: { value: "3.8" },
    });
    fireEvent.input(screen.getByLabelText("SAT score"), {
      target: { value: "1300" },
    });
    fireEvent.input(screen.getByLabelText("University GPA"), {
      target: { value: "3.5" },
    });
    fireEvent.input(screen.getByLabelText("Number of internships"), {
      target: { value: "2" },
    });
    fireEvent.input(screen.getByLabelText("Number of projects"), {
      target: { value: "3" },
    });
    fireEvent.input(screen.getByLabelText("Number of certifications"), {
      target: { value: "1" },
    });
    fireEvent.input(screen.getByLabelText("Soft skill score (0-10)"), {
      target: { value: "4" },
    });
    fireEvent.input(screen.getByLabelText("Networking score (0-10)"), {
      target: { value: "3" },
    });

    fireEvent.change(screen.getByLabelText("Gender"), {
      target: { value: "male" },
    });
    fireEvent.change(screen.getByLabelText("University field of study"), {
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
    fireEvent.change(screen.getByLabelText("Age (18-30)"), { target: { value: "15" } });
    fireEvent.change(screen.getByLabelText("High school GPA"), { target: { value: "5" } });
    fireEvent.change(screen.getByLabelText("SAT score"), { target: { value: "200" } });
    fireEvent.change(screen.getByLabelText("University GPA"), { target: { value: "-1" } });
    fireEvent.change(screen.getByLabelText("Soft skill score (0-10)"), { target: { value: "11" } });
    fireEvent.change(screen.getByLabelText("Networking score (0-10)"), { target: { value: "20" } });

    await fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    waitFor(() => {
      expect(screen.getByText(/Please select an age between 18-30/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid GPA grade/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid SAT score/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Please select an score between 0-10/i).length).toBe(2);
    });
  });

  // TODO: This test will pass even though through manual behaviour fails
  // it("shows validation errors for required fields", async () => {
  //   fireEvent.change(screen.getByLabelText("Age (18-30)"), { target: { value: "" } });
  //   fireEvent.change(screen.getByLabelText("High school GPA"), { target: { value: "" } });
  //   fireEvent.change(screen.getByLabelText("SAT score"), { target: { value: "" } });
  //   fireEvent.change(screen.getByLabelText("University GPA"), { target: { value: "" } });
  //   fireEvent.change(screen.getByLabelText("Soft skill score (0-10)"), { target: { value: "" } });
  //   fireEvent.change(screen.getByLabelText("Networking score (0-10)"), { target: { value: "" } });

  //   await fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  //   waitFor(() => {
  //     expect(screen.getAllByText(/Required Field/i).length).toBe(6);
  //   });
  // });
});
