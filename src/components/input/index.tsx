import { InputHTMLAttributes } from "react";
import { FiSearch } from "react-icons/fi";

export function Input({
  type = "text",
  className,
  value,
  onChange,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label
      className={`${className} flex w-full py-2 px-4 items-center self-center text-gray-200 relative bg-gray-800 rounded-full`}
    >
      <input
        data-testid="input-component"
        value={value}
        onChange={onChange}
        type={type}
        className="border-none w-full px-4 mr-4 bg-gray-800 text-gray-200 outline-none"
        {...props}
      />
      <FiSearch fontSize={20} className="cursor-pointer" />
    </label>
  );
}
