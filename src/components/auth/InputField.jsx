import React from "react";

/**
 * InputField Component (Matches Screenshot exactly)
 * - Clean label with red asterisk
 * - Left icon (outline User/Lock)
 * - Right icon/button (Eye toggle)
 * - Light border, orange focus ring
 * - Red inline error message
 */
export const InputField = ({
  id,
  name,
  type = "text",
  label,
  required = false,
  value,
  onChange,
  placeholder,
  leftIcon: LeftIcon,
  rightElement,
  error,
  disabled = false,
  autoComplete,
  className = "",
  inputRef,
}) => {
  const errorId = `${id}-error`;

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs sm:text-[13px] font-semibold text-slate-800 mb-1 select-none"
        >
          {label}
          {required && (
            <span className="text-red-500 font-bold ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative flex items-center">
        {LeftIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
            <LeftIcon className="w-4 h-4 stroke-[1.8]" />
          </div>
        )}

        <input
          ref={inputRef}
          id={id}
          name={name || id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full text-xs sm:text-sm bg-white text-slate-900 border rounded-xl py-2.5 transition-all duration-200 placeholder:text-slate-400 focus:outline-none ${
            LeftIcon ? "pl-10" : "pl-3.5"
          } ${rightElement ? "pr-11" : "pr-3.5"} ${
            error
              ? "border-red-400 ring-1 ring-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-slate-200 hover:border-slate-300 focus:border-[#F26A1B] focus:ring-2 focus:ring-[#F26A1B]/20"
          } ${disabled ? "opacity-60 cursor-not-allowed bg-slate-50" : ""}`}
        />

        {rightElement && (
          <div className="absolute right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1"
        >
          <span className="inline-block w-1 h-1 rounded-full bg-red-600" />
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
