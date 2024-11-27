//this is a functional tsx component that allows the user to input a number
// will be used to select the amount of rounds in the game

import { useState } from "react";

interface NumberInputProps {
  label: string;
  defaultValue?: number;
  onChange: (value: number) => void;
}

export default function NumberInput({
  label = "Input",
  defaultValue = 3,
  onChange,
}: NumberInputProps) {
  const [count, setCount] = useState(defaultValue);

  const handleChange = (value: number) => {
    setCount(value);
    // debugger;
    onChange(value);
  };

  return (
    <div className="max-w-xs mx-auto flex flex-col items-center w-full">
      <label
        htmlFor="quantity-input"
        className="block mb-2 text-sm font-medium text-white w-full"
      >
        {label}
      </label>
      <div className="relative flex items-center w-full">
        <button
          type="button"
          id="decrement-button"
          data-input-counter-decrement="quantity-input"
          className="bg-gray-700 hover:bg-gray-600 border-gray-600 rounded-l-lg p-3 h-11 focus:ring-gray-700 focus:ring-2 focus:outline-none"
          onClick={() => handleChange(Math.max(count - 1, 1))}
        >
          <svg
            className="w-3 h-3 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id="quantity-input"
          data-input-counter
          aria-describedby="helper-text-explanation"
          className="h-11 text-center  text-sm block w-full py-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
          placeholder="3"
          required
          value={count}
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="quantity-input"
          className=" bg-gray-700 hover:bg-gray-600 border-gray-600  border rounded-r-lg p-3 h-11  focus:ring-gray-700 focus:ring-2 focus:outline-none"
          onClick={() => handleChange(count + 1)}
        >
          <svg
            className="w-3 h-3text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
