import { useEffect, useState } from "react"

function MusicCard({data, era}) {

    const [audio, setAudio] = useState(null)
    const music = data?.music?.[0]
    
    async function play() {
        const term = encodeURIComponent(`${music.title} ${music.description}`)
        const res = await fetch(`https://itunes.apple.com/search?term=${term}&entity=song&limit=1`)
        const data = await res.json()
        const previewUrl = data.results[0]?.previewUrl

        if (!previewUrl) return;
        
        const sound = new Audio(previewUrl)
        sound.volume = 0.5
        sound.play()
        setAudio(sound)
    }

    function stop(){
        audio?.pause()
        setAudio(null)
    }

    useEffect(() => () => audio?.pause(), [audio])

    if (!data) return <p>Loading...</p>
    
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className={`text-5xl mb-3 ${era.text} ${audio ? "animate-bounce" : ""}`}>♪</div>

            <h2 className="text-lg font-bold">{music.title}</h2>
            <p className="text-sm text-gray-400 mb-4">{music.description}</p>

            <button
                onClick={audio ? stop : play}
                className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:scale-105 transition"
            >
                {audio ? "Stop" : "Play"}
            </button>
        </div>
    )
}

export default MusicCard