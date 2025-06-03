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
      message: "Invalid GPA grade.",
    })
    .min(0)
    .max(4),

  sat: z.coerce
    .number({ required_error: "Required field", message: "Invalid SAT score" })
    .min(400)
    .max(1600),

  university_gpa: z.coerce
    .number({ required_error: "Required field", message: "Invalid GPA grade." })
    .min(0)
    .max(4),

  field: z.enum(FIELDS),

  internships: z.coerce.number({ required_error: "Required field" }).nonnegative(),

  projects: z.coerce.number({ required_error: "Required field" }).nonnegative(),

  certifications: z.coerce
    .number({
      required_error: "Required field",
      message: "Invalid number of internships.",
    })
    .positive(),

  soft_skills: z.coerce
    .number({
      required_error: "Required field",
      message: "Please select an score between 0-10.",
    })
    .min(0)
    .max(10),

  networking: z.coerce
    .number({
      required_error: "Required field",
      message: "Please select an score between 0-10.",
    })
    .min(0)
    .max(10),
});
