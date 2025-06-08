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

      console.log(JSON.stringify(userSchema.safeParse(formData)));
      response.json().then((data) => setPrediction(data.salary));

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("An error occurred while submitting the form.");
    }
  };

  return (
    <div>
      <h1>Career Prediction App</h1>
      <h3>
        Get a predicted starting salary based on your supplied educational and career information.
      </h3>
      {submitted ? (
        <p className="submitted">Form submitted successfully! Predicted salary: {prediction}</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <FormInput
            label="Age (18-30)"
            type="number"
            register={register("age")}
            error={errors.age}
          />
          <FormSelect
            label="Gender"
            register={register("gender")}
            error={errors.gender}
            options={Array.from(GENDERS)}
          />
          <FormInput
            label="High school GPA"
            type="number"
            register={register("high_school_gpa")}
            error={errors.high_school_gpa}
          />
          <FormInput
            label="SAT score"
            type="number"
            register={register("sat")}
            error={errors.sat}
          />
          <FormInput
            label="University GPA"
            type="number"
            register={register("university_gpa")}
            error={errors.university_gpa}
          />
          <FormSelect
            label="University field of study"
            register={register("field")}
            error={errors.field}
            options={Array.from(FIELDS)}
          />
          <FormInput
            label="Number of internships"
            type="number"
            register={register("internships")}
            error={errors.internships}
          />
          <FormInput
            label="Number of projects"
            type="number"
            register={register("projects")}
            error={errors.projects}
          />
          <FormInput
            label="Number of certifications"
            type="number"
            register={register("certifications")}
            error={errors.certifications}
          />
          <FormInput
            label="Soft skill score (0-10)"
            type="number"
            register={register("soft_skills")}
            error={errors.soft_skills}
          />
          <FormInput
            label="Networking score (0-10)"
            type="number"
            register={register("networking")}
            error={errors.networking}
          />
          {errorMessage && <p className="_error_message">{errorMessage}</p>}
          <FormButton label={"Submit"} type="submit" />
        </form>
      )}
    </div>
  );
};

export default App;
