import React from "react";
import "./FormInput.css";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  type: "text" | "number";
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, register, error, placeholder }) => {
  const id = register.name;

  return (
    <div className="form_input">
      <label htmlFor={id} className="_label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        className={`_${id}_input`}
      />
      {error && <p className="_error">{error.message}</p>}
    </div>
  );
};

export default FormInput;
