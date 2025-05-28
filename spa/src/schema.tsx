// import z, { ZodType } from "zod/v4";

// const GENDERS { 'female', 'male', 'other'}
// const FIELDS = ['arts', 'business', 'computer_science', 'engineering', 'law', 'mathematics', 'medicine'] as const

// export const UserSchema: ZodType<FormData> = z.object({
//     age: z.number({required_error: "required field",
//       message: 'Please select an age between 18-30.'
//     }).min(18).max(30),
//     gender: z.enum(GENDERS),
//     high_school_gpa: z.string({message: 'Invalid GPA grade.'}).min(0).max(4),
//     sat: z.number({message: 'Invalid SAT score'}).min(400).max(1600),
//     university_gpa: z.number({message: 'Invalid GPA grade.'}).min(0).max(4),
//     field: z.enum(FIELDS),
//     internships: z.number().nonnegative(),
//     projects: z.number().nonnegative(),
//     certifications: z.number({message: 'Invalid number of internships.'}).positive(),
//     soft_skills: z.number({message: 'Please select an score between 0-10.'}).min(0).max(10),
//     networking: z.number({message: 'Please select an score between 0-10.'}).min(0).max(10)
//   })

// export type FormData = {
//     age: number;
//     gender: ['female', 'male', 'other'];
//     high_school_gpa: number
//     sat: number
//     university_gpa: number
//     field: ['arts', 'business', 'computer_science', 'engineering', 'law', 'mathematics', 'medicine']
//     internships: number
//     projects: number
//     certifications: number
//     soft_skills:number
//     networking: number
//   };