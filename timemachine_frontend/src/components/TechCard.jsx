import { useState, useEffect } from "react";

export default function TechCard({data, era, year}) {
    const [logos, setLogos] = useState({})

    const techs = data?.technologies

    useEffect(() => {
        if (!techs) return

        async function fetchLogos(){
            const result = {}

            await Promise.all(
                techs.map(async (tech) => {
                    const term = encodeURIComponent(`${tech.title} ${tech.description}`)
                    try {
                        const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${term}&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=300&pilicense=any&format=json&origin=*`)
                        const data = await res.json()
                        const page = Object.values(data.query?.pages || {})[0];

                        result[tech.title] = page?.thumbnail?.source ?? null;
                    }
                    catch (error){
                        console.error("Error fecthing logos", error)
                        result[tech.title] = null
                    }
                })
            )
            setLogos(result)
        }
        const timer = setTimeout(fetchLogos, 1000);
        return () => clearTimeout(timer)
    }, [techs])

    if (!techs) return <span className="loading loading-spinner loading-md" />

    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mt-8">
            <h2 className={`text-xl font-bold uppercase tracking-widest ${era.text}`}>
                Technologies of {year}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                {techs.map((tech) => (
                    <div key={tech.title} className="text-center">
                        {logos[tech.title] ? (
                            <div className="relative group">
                                <div className="h-32 rounded-lg bg-white p-4 flex items-center justify-center">
                                    <img src={logos[tech.title]} alt={tech.title} className="max-h-full max-w-full object-contain" />
                                </div>
                            </div>
                        ) : (
                            <div className="h-32 flex items-center justify-center">
                                <span className="loading loading-spinner loading-md" />
                            </div>
                        )}
                        <h3 className="mt-2 text-sm font-bold">{tech.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}