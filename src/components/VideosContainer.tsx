import { Composer } from "../common/types";
import { useEffect, useState } from "react";
import YoutubeVideo from "./YoutubeVideo";

/////////////////////////////////////////////////////////////////////////////COMPONENT
function VideosContainer({
  currentArtistInfos,
}: {
  currentArtistInfos: Composer;
}) {
  //////////////////////////////////////////////////////////////STATE
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  //////////////////////////////////////////////////////////////BEHAVIOR
  const tracks = currentArtistInfos.famousSoundtracks
    ? currentArtistInfos.famousSoundtracks
    : currentArtistInfos.hitSongs;

  if (!tracks) {
    return null;
  }

  const handlePlay = (videoUrl: string) => {
    if (currentVideoUrl !== videoUrl) {
      setCurrentVideoUrl("");

      const timeOut = setTimeout(() => {
        setCurrentVideoUrl(videoUrl);
      }, 4);

      return () => clearTimeout(timeOut);
    }
  };

  useEffect(() => {
    setCurrentVideoUrl("");
  }, [currentArtistInfos]);

  //////////////////////////////////////////////////////////////RENDER
  return (
    <>
      <YoutubeVideo
        url={tracks[0]}
        playing={currentVideoUrl === tracks[0]}
        onPause={() => setCurrentVideoUrl("")}
        onPlay={() => handlePlay(tracks[0])}
      />
      <YoutubeVideo
        url={tracks[1]}
        playing={currentVideoUrl === tracks[1]}
        onPause={() => setCurrentVideoUrl("")}
        onPlay={() => handlePlay(tracks[1])}
      />
      <YoutubeVideo
        url={tracks[2]}
        playing={currentVideoUrl === tracks[2]}
        onPause={() => setCurrentVideoUrl("")}
        onPlay={() => handlePlay(tracks[2])}
      />
    </>
  );
}

export default VideosContainer;
