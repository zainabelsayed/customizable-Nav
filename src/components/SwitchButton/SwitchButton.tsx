import { useState } from "react";

const SwitchButton = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className="flex items-center text-white rounded-full focus:outline-none"
    >
      <span className="text-xs me-1">Set alert</span>
      <div
        className={`relative w-10 h-5 bg-gray-300 rounded-full p-1 transition ${
          isOn ? "bg-gray-200/20" : "bg-gray-200/40"
        }`}
      >
        <div
          className={`absolute left-1 top-1 w-3.5 h-3.5 bg-white rounded-full shadow-md transition-transform ${
            isOn ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </div>
    </button>
  );
};

export default SwitchButton;
