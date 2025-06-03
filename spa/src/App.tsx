import React, { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormButton from "./FormButton";
import { FIELDS, GENDERS, userSchema } from "./schemas";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [prediction, setPrediction] = useState("");

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/career_success/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userSchema.safeParse(formData).data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // console.log(JSON.stringify(userSchema.safeParse(formData)))
      response.json().then((data) => setPrediction(data.salary));

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div>
      <h1>Test Input Form</h1>
      {submitted ? (
        <p className="submitted">Form submitted successfully! Predicted salary: {prediction}</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <FormInput label="age" register={register("age")} error={errors.age} />
          <FormSelect
            label="gender"
            register={register("gender")}
            error={errors.gender}
            options={Array.from(GENDERS)}
          />
          <FormInput
            label="high_school_gpa"
            register={register("high_school_gpa")}
            error={errors.high_school_gpa}
          />
          <FormInput label="sat" register={register("sat")} error={errors.sat} />
          <FormInput
            label="university_gpa"
            register={register("university_gpa")}
            error={errors.university_gpa}
          />
          <FormSelect
            label="field"
            register={register("field")}
            error={errors.field}
            options={Array.from(FIELDS)}
          />
          <FormInput
            label="internships"
            register={register("internships")}
            error={errors.internships}
          />
          <FormInput label="projects" register={register("projects")} error={errors.projects} />
          <FormInput
            label="certifications"
            register={register("certifications")}
            error={errors.certifications}
          />
          <FormInput
            label="soft_skills"
            register={register("soft_skills")}
            error={errors.soft_skills}
          />
          <FormInput
            label="networking"
            register={register("networking")}
            error={errors.networking}
          />
          <FormButton label={"Submit"} type="submit" />
        </form>
      )}
    </div>
  );
};

export default App;
