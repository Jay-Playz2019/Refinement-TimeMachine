import { useEffect, useState } from "react";

export default function MoviesCard({data, year}){
    const [posters, setPosters] = useState({})

    const movies = data?.movies

    useEffect(() => {
        if (!movies) return

        async function fetchPoster() {
            const result = {}

            for (const movie of movies) {
                const term = encodeURIComponent(`${movie.title} ${year} film`)
                const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${term}&gsrlimit=1&prop=pageimages&piprop=original&pilicense=any&format=json&origin=*`)

                const data = await res.json()
                const page = Object.values(data.query?.pages || {})[0]
                result[movie.title] = page?.original?.source
            }

            setPosters(result)
        }

        fetchPoster()
    }, [movies])

    if (!movies) return <p>Loading...</p>

    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <div key={movie.title} className="text-center">
                        {posters[movie.title] ? (
                            <div className="relative group">
                                <img src={posters[movie.title]} alt={movie.title} className="w-full aspect-[2/3] object-cover rounded-lg" />
                                <h3 className="mt-2 text-sm font-bold">{movie.title}</h3>
                                <div className="absolute inset-0 rounded-lg bg-black/90 p-3 flex items-center justify-center text-xs text-white opacity-0 group-hover:opacity-100 cursor-pointer transition">
                                    {movie.description}
                                </div>
                            </div>
                        ) : (
                            <span className="loading loading-spinner loading-md"/>
                        )}
                    </div>
                ))}
            </div>
        </div>
  )
}