import { useState } from "react";
import YoutubeVideo from "./YoutubeVideo";

interface Composer {
  id: string;
  category: string;
  name: string;
  birth: string;
  birthPlace: string;
  countryFlag: string;
  death?: string;
  picture: string;
  bio: string;
  related: string[];
  famousSoundtracks: string[];
}

/////////////////////////////////////////////////////////////////////////////COMPONENT
function VideosContainer({
  currentArtistInfos,
}: {
  currentArtistInfos: Composer;
}) {
  //////////////////////////////////////////////////////////////STATE
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  //////////////////////////////////////////////////////////////BEHAVIOR
  const handlePlay = (videoUrl: string) => {
    if (currentVideoUrl !== videoUrl) {
      setCurrentVideoUrl("");

      const timeOut = setTimeout(() => {
        setCurrentVideoUrl(videoUrl);
      }, 4);

      return () => clearTimeout(timeOut);
    }
  };

  //////////////////////////////////////////////////////////////RENDER
  return (
    <>
      <YoutubeVideo
        url={currentArtistInfos.famousSoundtracks[0]}
        playing={currentVideoUrl === currentArtistInfos.famousSoundtracks[0]}
        onPause={() => setCurrentVideoUrl("")}
        onPlay={() => handlePlay(currentArtistInfos.famousSoundtracks[0])}
      />
      <YoutubeVideo
        url={currentArtistInfos.famousSoundtracks[1]}
        playing={currentVideoUrl === currentArtistInfos.famousSoundtracks[1]}
        onPause={() => setCurrentVideoUrl("")}
        onPlay={() => handlePlay(currentArtistInfos.famousSoundtracks[1])}
      />
      <YoutubeVideo
        url={currentArtistInfos.famousSoundtracks[2]}
        playing={currentVideoUrl === currentArtistInfos.famousSoundtracks[2]}
        onPause={() => setCurrentVideoUrl("")}
        onPlay={() => handlePlay(currentArtistInfos.famousSoundtracks[2])}
      />
    </>
  );
}

export default VideosContainer;
