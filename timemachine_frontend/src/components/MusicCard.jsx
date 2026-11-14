import { useEffect, useState } from "react"

function MusicCard({data}) {

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
        <section className="mx-auto max-w-sm rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 text-center text-white shadow-xl">
            <div className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-4xl ${audio ? "animate-spin [animation-duration:3s]" : ""}`}>
                ♪
            </div>

            <h2 className="text-lg font-bold">{music.title}</h2>
            <p className="mb-5 text-sm text-zinc-400">{music.description}</p>

            <button
                onClick={audio ? stop : play}
                className="rounded-full bg-white px-6 py-2 font-semibold text-zinc-900 transition hover:scale-105 active:scale-95"
            >
                {audio ? "Stop" : "Play"}
            </button>
        </section>
    )
}

export default MusicCard