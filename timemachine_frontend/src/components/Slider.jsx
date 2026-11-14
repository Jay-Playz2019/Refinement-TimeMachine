// For the year selection slider
import { useState } from "react";

export default function Timeslider() {
  const [year, setYear] = useState(2020);

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-6">Time Machine</h2>

      {/* Selected year */}
      <div className="text-center mb-4">
        <span className="border-2 border-blue-500 text-blue-500 rounded-lg px-4 py-2">
          {year}
        </span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="1900"
        max="2025"
        step="1"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="w-full cursor-pointer accent-blue-500"
      />

      {/* Year labels */}
      <div className="flex justify-between mt-2 text-sm">
        <span>1900</span>
        <span>1950</span>
        <span>2000</span>
        <span>2025</span>
      </div>
    </div>
  );
}
