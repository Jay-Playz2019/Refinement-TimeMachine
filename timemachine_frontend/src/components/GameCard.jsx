
import { useEffect, useState } from "react";

export default function GameCard({ data, year }) {
  const [posters, setPosters] = useState({});

  const games = data?.games || [];

  useEffect(() => {
    if (!games.length) return;

    let cancelled = false;

    async function fetchPoster() {
      const result = {};

      await Promise.all(
        games.map(async (game) => {
          const term = encodeURIComponent(
            `${game.title} ${year} video game`
          );

          try {
            const res = await fetch(
              `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${term}&gsrlimit=1&prop=pageimages&piprop=original&pilicense=any&format=json&origin=*`
            );

            if (!res.ok) throw new Error("Failed to fetch poster");

            const data = await res.json();
            const page = Object.values(data.query?.pages || {})[0];

            result[game.title] = page?.original?.source || null;
          } catch (error) {
            console.error("Error fetching poster:", error);
            result[game.title] = null;
          }
        })
      );

      if (!cancelled) {
        setPosters(result);
      }
    }

    fetchPoster();

    return () => {
      cancelled = true;
    };
  }, [data, year]);

  if (!games.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {games.map((game) => (
        <div
          key={game.title}
          className="card bg-base-200 shadow-xl"
        >
          <figure className="h-56 bg-base-300">
            {posters[game.title] ? (
              <img
                src={posters[game.title]}
                alt={game.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <p className="text-gray-400">
                Image unavailable
              </p>
            )}
          </figure>

          <div className="card-body">
            <h2 className="card-title">{game.title}</h2>
            <p>{game.description}</p>

            <span className="badge badge-primary">
              {year}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
