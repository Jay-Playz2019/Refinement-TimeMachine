import { useEffect, useState } from "react";

function MusicCard({ data, era, year }) {
  const [audio, setAudio] = useState(null);
  const [trackInfo, setTrackInfo] = useState({
    previewUrl: null,
    artwork: null,
  });
  const music = data?.music?.[0];

  useEffect(() => {
    if (!music) return;

    const controller = new AbortController();

    async function fetchTrackData() {
      const term = encodeURIComponent(`${music.title} ${music.description}`);
      const response = await fetch(
        `https://itunes.apple.com/search?term=${term}&entity=song&limit=1`,
      );
      const resultData = await response.json();
      const track = resultData.results?.[0];

      if (track) {
        setTrackInfo({
          previewUrl: track.previewUrl,
          // 100px is default -> 600px to prevent blur
          artwork: track.artworkUrl100?.replace("100x100bb", "600x600bb"),
        });
      }
    }

    const timerId = setTimeout(() => {
      fetchTrackData();
    }, 1000);

    return () => {
      clearTimeout(timerId); // cancel pending timeout
      controller.abort(); // cancel any current fetch request
      setTrackInfo({ previewUrl: null, artwork: null }); // clear
    };
  }, [music]);

  function play() {
    if (!trackInfo.previewUrl) return;

    const sound = new Audio(trackInfo.previewUrl);
    sound.volume = 0.5;
    sound.play();
    setAudio(sound);
  }

  function stop() {
    audio?.pause();
    setAudio(null);
  }

  useEffect(() => () => audio?.pause(), [audio]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-row items-center ">
      <div className="flex flex-col text-left gap-5 flex-1">
        <h2
          className={`text-xl font-bold uppercase tracking-widest ${era.text}`}
        >
          Top song of {year}
        </h2>

        <div>
          <h2 className="text-lg font-bold">{music.title}</h2>
          <p className="text-sm text-gray-400">{music.description}</p>
        </div>

        <div>
          <button
            onClick={audio ? stop : play}
            disabled={!trackInfo.previewUrl}
            className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:scale-105 cursor-pointer transition disabled:opacity-50"
          >
            {audio ? "Stop" : "Play"}
          </button>
        </div>
      </div>

      <div>
        {trackInfo.artwork ? (
          <div className="hover-3d relative">
            <img
              src={trackInfo.artwork}
              alt={music.title}
              className={`w-40 h-40 rounded-xl object-cover shadow-lg ${
                audio ? "animate-pulse" : ""
              }`}
            />
            <div></div> {/* these 8 divs are needed for the hover effect */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div
            className={`text-5xl ${era.text} ${audio ? "animate-bounce" : ""}`}
          >
            ♪
          </div>
        )}
      </div>
    </div>
  );
}

export default MusicCard;
