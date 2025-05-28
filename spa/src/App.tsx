import React, { useState } from "react";
import './App.css'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormButton from "./FormButton";

const GENDERS = ['female', 'male', 'other'] as const
const FIELDS = ['arts', 'business', 'computer_science', 'engineering', 'law', 'mathematics', 'medicine'] as const

const userSchema = z.object({
    age: z.coerce.number({required_error: "required field",
      invalid_type_error: 'Please select an age between 18-30.'
    }).min(18, {message: 'Please select an age between 18-30.'}).max(30, {message: 'Please select an age between 18-30.'}),
    gender: z.enum(GENDERS),
    high_school_gpa: z.coerce.number({message: 'Invalid GPA grade.'}).min(0).max(4),
    sat: z.coerce.number({message: 'Invalid SAT score'}).min(400).max(1600),
    university_gpa: z.coerce.number({message: 'Invalid GPA grade.'}).min(0).max(4),
    field: z.enum(FIELDS),
    internships: z.coerce.number().nonnegative(),
    projects: z.coerce.number().nonnegative(),
    certifications: z.coerce.number({message: 'Invalid number of internships.'}).positive(),
    soft_skills: z.coerce.number({message: 'Please select an score between 0-10.'}).min(0).max(10),
    networking: z.coerce.number({message: 'Please select an score between 0-10.'}).min(0).max(10)
  })

type FormData = z.infer<typeof userSchema>;

const App: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (formData: FormData) => {

    try {
      // const response = await fetch('http://127.0.0.1:8000/career_success/predict', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(formData)
      // });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      console.log(JSON.stringify(userSchema.safeParse(formData)))

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('An error occurred while submitting the form. Please try again.');
    }
  }

  return (
    <div>
      <h1>Test Input Form</h1>
      {submitted ? (
        <p className="text-green-600">Form submitted successfully!</p>
      ) : (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      <FormInput label="age" register={register("age")} error={errors.age}/>
      <FormSelect label="gender" register={register("gender")} error={errors.gender} options={Array.from(GENDERS)}/>
      <FormInput label="high_school_gpa" register={register("high_school_gpa")} error={errors.high_school_gpa}/>
      <FormInput label="sat" register={register("sat")} error={errors.sat}/>
      <FormInput label="university_gpa" register={register("university_gpa")} error={errors.university_gpa}/>
      <FormSelect label="field" register={register("field")} error={errors.field} options={Array.from(FIELDS)}/>
      <FormInput label="internships" register={register("internships")} error={errors.internships}/>
      <FormInput label="projects" register={register("projects")} error={errors.projects}/>
      <FormInput label="certifications" register={register("certifications")} error={errors.certifications}/>
      <FormInput label="soft_skills" register={register("soft_skills")} error={errors.soft_skills}/>
      <FormInput label="networking" register={register("networking")} error={errors.networking}/>
      <FormButton label={'Submit'} type='submit'/>
    </form>
    )}
    </div>
  );
};

export default App;
