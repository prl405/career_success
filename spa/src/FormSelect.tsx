import React from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import "./FormSelect.css";

interface FormSelectProps {
  label: string;
  options: string[];
  register: UseFormRegisterReturn;
  error?: FieldError;
}

function formatOption(input: string): string {
  if (!input) return "";

  const cleaned = input.replace(/_/g, " ");

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

const FormSelect: React.FC<FormSelectProps> = ({ label, options, register, error }) => {
  const id = register.name;

  return (
    <div className="form_select">
      <label htmlFor={id} className="_label">
        {label}
      </label>
      <select id={id} {...register} className={`_${id}_select`}>
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {formatOption(opt)}
          </option>
        ))}
      </select>
      {error && <p className="_error">{error.message}</p>}
    </div>
  );
};

export default FormSelect;
