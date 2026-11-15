// For the year selection slider

export default function Timeslider({year, setYear, era}) {

  return (
    <div className='p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur'>
        <div className='text-center'>
          <h1 className={`text-8xl font-bold ${era.text} drop-shadow-lg`}>{year}</h1>
        </div>

        <div className="w-full max-w-2xl mx-auto p-6 text-white">
        {/* Slider */}
            <input
                type="range"
                min="1996"
                max="2025"
                step="1"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className={`w-full cursor-pointer rounded-full ${era.accent}`}
            />

            {/* Year labels */}
            <div className={`mt-2 flex justify-between text-sm ${era.text}`}> 
                <span>1996</span>
                <span>2005</span>
                <span>2015</span>
                <span>2025</span>
            </div>
        </div>
    </div>
  );
}
