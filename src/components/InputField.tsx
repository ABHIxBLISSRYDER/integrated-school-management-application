import { FieldError } from "react-hook-form";

// Props type definition for the InputField component
type InputFieldProps = {
  label: string; // Label for the input field
  type?: string; // Input type (e.g., text, password, email), defaults to "text"
  register: any; // react-hook-form register function
  name: string; // Field name for registration and value tracking
  defaultValue?: string; // Optional default value
  error?: FieldError; // Optional field error from validation
  hidden?: boolean; // Whether to hide this field
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>; // Additional native input props
};

// Reusable input field component
const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  hidden,
  inputProps,
}: InputFieldProps) => {
  return (
    // Conditionally hide the field if hidden prop is true
    <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"}>
      {/* Field label */}
      <label className="text-xs text-gray-500">{label}</label>

      {/* Input element with react-hook-form registration and additional props */}
      <input
        type={type}
        {...register(name)} // react-hook-form binding
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...inputProps}
        defaultValue={defaultValue}
      />

      {/* Error message (if validation error exists) */}
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
