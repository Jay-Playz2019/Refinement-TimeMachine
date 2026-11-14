import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Timeslider from './components/Slider'
import MusicCard from './components/MusicCard'
import { getYear } from './api/timeMachine'

function App() {
  
  const [year, setYear] = useState(2020)
  const [yearData, setYearData] = useState(null)

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
    <>  
      <Timeslider year={year} setYear={setYear} />

      <MusicCard data={yearData} />

    </>
  )
}

export default App
