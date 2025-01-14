import React, { ChangeEvent } from "react";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (
    e: ChangeEvent<HTMLInputElement>,
    value: string | boolean,
    name: string
  ) => void;
  error?: string;
}
export const TextInput = ({ onChange, error, ...props }: InputProps) => (
  <div>
    <input
      {...props}
      onChange={(e) => onChange(e, e.target.value, e.target.name)}
      aria-describedby={props.name + "-error"}
      aria-invalid={error ? "true" : "false"}
    />
    {error && (
      <p id={props.name + "-error"} style={{ color: "red" }}>
        {error}
      </p>
    )}
  </div>
);

export const CheckboxInput = ({ onChange, error, ...props }: InputProps) => (
  <div>
    <input
      type="checkbox"
      {...props}
      onChange={(e) => onChange(e, e.target.checked, e.target.name)}
      aria-describedby={props.name + "-error"}
      aria-invalid={error ? "true" : "false"}
    />
    {error && (
      <p id={props.name + "-error"} style={{ color: "red" }}>
        {error}
      </p>
    )}
  </div>
);
