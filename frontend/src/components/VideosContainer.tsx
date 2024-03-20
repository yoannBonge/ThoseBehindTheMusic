/* eslint-disable react-hooks/rules-of-hooks */
//ESLint believes useEffect is rendered conditionally
import { useEffect, useState } from "react";
import { Composer } from "../utils/constants";
import YoutubeVideo from "./YoutubeVideo";

/////////////////////////////////////////////////////////////////////////////COMPONENT
function VideosContainer({
  currentComposerInfos,
}: {
  currentComposerInfos: Composer;
}) {
  //////////////////////////////////////////////////////////////STATE
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  //////////////////////////////////////////////////////////////BEHAVIOR
  const tracks = currentComposerInfos.selectedWorks;

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
  }, [currentComposerInfos]);

  // console.log("RENDER VIDEO CONTAINER");

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
