// For the year selection slider
import { useState } from "react";

export default function Timeslider({year, setYear}) {

  return (
    <div className="w-full max-w-2xl mx-auto p-6 text-white">
      <h2 className="text-center text-xs uppercase font-bold mb-2 text-black">Time Machine</h2>

      {/* Selected year */}
      <div className="text-center mb-8">
        <span className="text-black text-7xl font-black">
          {year}
        </span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="1996"
        max="2025"
        step="1"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="h2 w-full cursor-pointer rounded-full"
      />

      {/* Year labels */}
      <div className="mt-2 flex justify-between text-sm text-black"> 
        <span>1996</span>
        <span>2005</span>
        <span>2015</span>
        <span>2025</span>
      </div>
    </div>
  );
}
