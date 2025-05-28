import React from "react";
import './FormInput.css'
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, type = "text", register, error, placeholder }) => {
  return (
    <div className="form_input">
      <label className="_label">{label}</label>
      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className="_input"    
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default FormInput;
