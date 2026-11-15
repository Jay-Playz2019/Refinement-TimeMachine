import { useState, useEffect } from 'react'
import './App.css'
import Timeslider from './components/Slider'
import MusicCard from './components/MusicCard'
import MoviesCard from './components/MoviesCard'
import { getYear } from './api/timeMachine'
import GameCard from './components/GameCard'

function getEra(year){
  if (year < 2000) return {text: "text-green-400", bg: 'from-green-950', accent: "accent-green-400"}
  if (year < 2010) return {text: "text-indigo-400", bg: 'from-indigo-950', accent: "accent-indigo-400"}
  if (year < 2020) return {text: "text-sky-400", bg: 'from-sky-950', accent: "accent-sky-400"}
  return {text: "text-violet-400", bg: 'from-violet-950', accent: "accent-violet-400"}
}

function App() {
  const [year, setYear] = useState(1996)
  const [yearData, setYearData] = useState(null)

  const era = getEra(year)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getYear(year)
        setYearData(data)
      } catch (error) {
        console.error(error)
        setYearData(null)
      }
    }

    fetchData()
  }, [year])

  return (
    <div className={`min-h-screen bg-gradient-to-b ${era.bg} to-black text-white`}>
      <main className='max-w-3xl mx-auto px-6 py-12 flex flex-col gap-8'>
        <div className='flex items-center gap-2'>
          <span className='w-2.5 h-2.5 rounded-full bg-green-400' />
          <p className='text-xs uppercase text-gray-400'>What once was</p>
        </div>

        <Timeslider year={year} setYear={setYear} era={era}/>

        <div>
          <MusicCard key={year} data={yearData} era={era} />
          <MoviesCard data={yearData} year={year}/>
          <GameCard key={year} data={yearData} year={year} />
        </div>
      </main>
    </div>
    
  )
}

export default App
