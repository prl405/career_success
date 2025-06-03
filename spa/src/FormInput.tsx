import React from "react";
import "./FormInput.css";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  register,
  error,
  placeholder,
}) => {
  const inputId = register.name;

  return (
    <div className="form_input">
      <label htmlFor={inputId} className="_label">
        {label}
      </label>
      <input
        id={inputId}
        {...register}
        type={type}
        placeholder={placeholder}
        className={`_${label}_input`}
      />
      {error && <p className="_error">{error.message}</p>}
    </div>
  );
};

export default FormInput;
