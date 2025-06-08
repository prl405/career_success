import { z } from "zod";

export const GENDERS = ["female", "male", "other"] as const;
export const FIELDS = [
  "arts",
  "business",
  "computer_science",
  "engineering",
  "law",
  "mathematics",
  "medicine",
] as const;

// TODO: Bug: Zod coerce method interprets empty input values as '' and transforms them to 0 number type
// bypassing required field validation
export const userSchema = z.object({
  age: z.coerce
    .number({
      required_error: "Required field",
    })
    .min(18, { message: "Please select an age between 18-30." })
    .max(30, { message: "Please select an age between 18-30." }),

  gender: z.enum(GENDERS),

  high_school_gpa: z.coerce
    .number({
      required_error: "Required field",
    })
    .min(0, {
      message: "Invalid GPA grade.",
    })
    .max(4, {
      message: "Invalid GPA grade.",
    }),

  sat: z.coerce
    .number({ required_error: "Required field" })
    .min(400, { message: "Invalid SAT score" })
    .max(1600, { message: "Invalid SAT score" }),

  university_gpa: z.coerce
    .number({ required_error: "Required field" })
    .min(0, { message: "Invalid GPA grade." })
    .max(4, { message: "Invalid GPA grade." }),

  field: z.enum(FIELDS),

  internships: z.coerce.number({ required_error: "Required field" }).nonnegative(),

  projects: z.coerce.number({ required_error: "Required field" }).nonnegative(),

  certifications: z.coerce
    .number({
      required_error: "Required field",
    })
    .nonnegative(),

  soft_skills: z.coerce
    .number({
      required_error: "Required field",
    })
    .min(0, {
      message: "Please select an score between 0-10.",
    })
    .max(10, {
      message: "Please select an score between 0-10.",
    }),

  networking: z.coerce
    .number({
      required_error: "Required field",
    })
    .min(0, {
      message: "Please select an score between 0-10.",
    })
    .max(10, {
      message: "Please select an score between 0-10.",
    }),
});
