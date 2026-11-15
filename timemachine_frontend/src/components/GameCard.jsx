import { useEffect, useState } from "react";
import { ImageCache } from "../api/imageCache";

export default function GameCard({ data, year, era }) {
  const [posters, setPosters] = useState({});

  const games = data?.games;

  useEffect(() => {
    if (!games) return;

    const controller = new AbortController();

    let cancelled = false;

    async function fetchPoster() {
      const result = {};

      await Promise.all(
        games.map(async (game) => {
          const title = game.title

          try {
            result[game.title] = await ImageCache(title, async () => {
              const res = await fetch(
                `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=500&pilicense=any&format=json&origin=*`,
              );

              const json = await res.json();
              const page = Object.values(json.query?.pages || {})[0];
              return page?.thumbnail?.source ?? null;
            })
    
          } catch (error) {
            console.error("Error fetching game poster:", error);
            result[game.title] = null;
          }
        }),
      );

      if (!cancelled) {
        setPosters(result);
      }
    }

    fetchPoster();

    return () => {
      cancelled = true;
      controller.abort();
      setPosters({});
    };
  }, [games, year]);

  if (!games) return <p>Loading...</p>;

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mt-8 flex flex-col gap-2">
      <h2 className={`text-xl font-bold uppercase tracking-widest ${era.text}`}>
        Top games of {year}
      </h2>
      <p className="text-xs text-gray-400">
        L to R: RPG, Action Adventure, Shooters, Survival
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        {games.map((game) => (
          <div key={game.title} className="relative group text-center">
            {posters[game.title] === undefined ? (
              <div className="w-full aspect-[2/3] rounded-lg bg-white/5 flex items-center justify-center">
                <span className="loading loading-spinner loading-md" />
              </div>
            ) : posters[game.title] ? (
              <img
                src={posters[game.title]}
                alt={game.title}
                className="w-full aspect-[2/3] object-cover rounded-lg"
              />
            ) : (
              <div className="w-full aspect-[2/3] rounded-lg bg-white/5 flex items-center justify-center text-xs text-white/50">
                No cover
              </div>
            )}

            <h3 className="mt-2 text-sm font-bold">{game.title}</h3>

            <div className="absolute inset-0 rounded-lg bg-black/90 p-3 flex items-center justify-center text-xs text-white opacity-0 group-hover:opacity-100 cursor-pointer transition">
              {game.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
