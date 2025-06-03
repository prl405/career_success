import React from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import "./FormSelect.css";

interface FormSelectProps {
  label: string;
  options: string[];
  register: UseFormRegisterReturn;
  error?: FieldError;
}

function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

const FormSelect: React.FC<FormSelectProps> = ({ label, options, register, error }) => {
  return (
    <div className="form_select">
      <label className="_label">{label}</label>
      <select {...register} className="_select">
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {capitalizeFirstLetter(opt)}
          </option>
        ))}
      </select>
      {error && <p className="_error">{error.message}</p>}
    </div>
  );
};

export default FormSelect;
