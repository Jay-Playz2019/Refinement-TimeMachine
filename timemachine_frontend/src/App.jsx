import { useState, useEffect } from "react";
import "./App.css";
import Timeslider from "./components/Slider";
import MusicCard from "./components/MusicCard";
import MoviesCard from "./components/MoviesCard";
import { getYear } from "./api/timeMachine";
import GameCard from "./components/GameCard";
import TechCard from "./components/TechCard";
import Footer from "./components/Footer";

function getEra(year) {
  if (year < 2000)
    return {
      text: "text-green-400",
      bg: "from-green-950",
      accent: "accent-green-400",
    };
  if (year < 2010)
    return {
      text: "text-indigo-400",
      bg: "from-indigo-950",
      accent: "accent-indigo-400",
    };
  if (year < 2020)
    return {
      text: "text-sky-400",
      bg: "from-sky-950",
      accent: "accent-sky-400",
    };
  return {
    text: "text-violet-400",
    bg: "from-violet-950",
    accent: "accent-violet-400",
  };
}

function App() {
  const [year, setYear] = useState(1995);
  const [debouncedYear, setDebouncedYear] = useState(1995);

  const [yearData, setYearData] = useState(null);

  const era = getEra(year);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedYear(year), 500);
    return () => clearTimeout(timer);
  }, [year]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getYear(debouncedYear);
        setYearData(data);
      } catch (error) {
        console.error(error);
        setYearData(null);
      }
    }

    fetchData();
  }, [debouncedYear]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${era.bg} to-black text-white`}
    >
      <title>What Once Was - View by Year</title>
      <main className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <h1 className="text-xs uppercase text-gray-400">
            What once was - A media and tech cultural timeline
          </h1>
        </div>

        <Timeslider year={year} setYear={setYear} era={era} />

        <div>
          <MusicCard
            key={debouncedYear}
            data={yearData}
            era={era}
            year={debouncedYear}
          />
          <MoviesCard data={yearData} era={era} year={debouncedYear} />
          <GameCard data={yearData} era={era} year={debouncedYear} />
          <TechCard data={yearData} era={era} year={year} />
        </div>
      </main>
      <Footer era={era} />
    </div>
  );
}

export default App;
