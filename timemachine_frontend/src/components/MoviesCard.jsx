import { useEffect, useState } from "react";
import { ImageCache } from "../api/imageCache";

export default function MoviesCard({ data, year, era }) {
  const [posters, setPosters] = useState({});

  const movies = data?.movies;

  useEffect(() => {
    if (!movies) return;

    const controller = new AbortController();

    async function fetchPoster() {
      const result = {};

      await Promise.all(
            movies.map(async (movie) => {
                const term = `${movie.title} ${year} film`
                try {
                  result[movie.title] = await ImageCache(term, async () => {
                    const res = await fetch(
                      `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrlimit=1&prop=pageimages&piprop=original&pilicense=any&format=json&origin=*`,
                    );
                    const data = await res.json();
                    if (data.error) throw new Error(data.error.info);

                    const page = Object.values(data.query?.pages || {})[0];
                    return page?.original?.source ?? null;
                  })

                }
                catch (error){
                    console.error("Error fecthing logos", error)
                    result[movie.title] = null
                }
            })
        )

      setPosters(result);
    }

    fetchPoster();

    return () => {
      controller.abort(); // cancel any current fetch request
      setPosters({}); // clear
    };
  }, [movies]);

  if (!movies) return <p>Loading...</p>;

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mt-8 flex flex-col gap-2">
      <h2 className={`text-xl font-bold uppercase tracking-widest ${era.text}`}>
        Top movies of {year}
      </h2>
      <p className="text-xs text-gray-400">
        L to R: Action, Drama, Comedy, Animation
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        {movies.map((movie) => (
          <div key={movie.title} className="relative group text-center">
            {posters[movie.title] === undefined ? (
              <div className="w-full aspect-[2/3] rounded-lg bg-white/5 flex items-center justify-center">
                <span className="loading loading-spinner loading-md" />
              </div>
            ) : posters[movie.title] ? (
              <img
                src={posters[movie.title]}
                alt={movie.title}
                className="w-full aspect-[2/3] object-cover rounded-lg"
              />
            ) : (
              <div className="w-full aspect-[2/3] rounded-lg bg-white/5 flex items-center justify-center text-xs text-white/50">
                No cover
              </div>
            )}

            <h3 className="mt-2 text-sm font-bold">{movie.title}</h3>

            <div className="absolute inset-0 rounded-lg bg-black/90 p-3 flex items-center justify-center text-xs text-white opacity-0 group-hover:opacity-100 cursor-pointer transition">
              {movie.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



