// import React, { memo } from "react";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { device } from "../utils/constants";

interface YoutubeVideoChildProps {
  url: string;
  playing: boolean;
  onPause: () => void;
  onPlay: () => void;
}

/////////////////////////////////////////////////////////////////////////////STYLE
const VideoContainer = styled.div`
  position: relative;

  @media ${device.xxl} {
    width: 12vw;
    height: 11vw;
  }
  @media ${device.xl} {
    width: 12vw;
    height: 11vw;
  }
  @media ${device.switchDisplay} {
    width: 85%;
    height: 22vw;
  }
`;

const Video = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #b6afaf;
  border-bottom: none;
  border-radius: 15px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Timeline = styled.div`
  position: absolute;
  bottom: 0%;
  width: 100%;
  height: 7%;
  border-radius: 0 0 15px 15px;
  background-color: #b6afaf;
  cursor: pointer;
  @media ${device.lg} {
    height: 8%;
  }
  @media ${device.xmd} {
    height: 10%;
  }
  @media ${device.switchDisplay} {
  }
  @media ${device.md} {
    height: 12%;
  }
  @media ${device.sm} {
    height: 14%;
  }
`;

const ProgressContainer = styled.div`
  height: 100%;
  border-radius: 0 0 15px 15px;
  overflow: hidden;
`;

// Here, I used "memo" without which the "Rangile" font reloads with each change in the progress state.
// const Progress = React.memo(({ progress }: { progress: number }) => (
//   <div
//     style={{
//       height: "100%",
//       width: `${progress}%`,
//       backgroundColor: "#ff0000",
//     }}
//   />
// ));

const Progress = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${(props) => props.$progress}%;
  background-color: #ff0000;
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function YoutubeVideo({
  url,
  playing,
  onPause,
  onPlay,
}: YoutubeVideoChildProps) {
  //////////////////////////////////////////////////////////////STATE
  const [progress, setProgress] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [indexComponent, setindexComponent] = useState(0);

  //////////////////////////////////////////////////////////////BEHAVIOR

  const playerRef = useRef<ReactPlayer>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isScrubbing) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = timelineRef.current?.getBoundingClientRect();
        if (!rect) return;

        const offsetX = e.clientX - rect.left;
        const percentage = Math.min(
          Math.max((offsetX / rect.width) * 100, 0),
          100
        );
        setProgress(percentage);
      };

      const handleMouseUp = () => {
        setIsScrubbing(false);

        const player = playerRef.current;
        if (!player) return;

        const duration = player.getDuration();
        const seekTo = (duration * progress) / 100;
        player.seekTo(seekTo);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isScrubbing, progress]);

  const handleProgress = ({ played }: { played: number }) => {
    if (!isScrubbing) {
      setProgress(played * 100);
    }
  };

  const handleTimelineMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = timelineRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = e.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    setProgress(percentage);

    setIsScrubbing(true);
  };

  const handleVideoStarted = () => {
    setindexComponent(0);
  };

  const handleVideoEnded = () => {
    setindexComponent(1);
  };

  // console.log("RENDER YOUTUBE VIDEO");

  //////////////////////////////////////////////////////////////RENDER
  return (
    <VideoContainer key={indexComponent}>
      <Video
        url={url}
        playing={indexComponent === 0 && playing}
        onPause={onPause}
        onStart={handleVideoStarted}
        onPlay={onPlay}
        onEnded={handleVideoEnded}
        ref={playerRef}
        onProgress={handleProgress}
        width='100%'
        height='100%'
        loading='lazy'
      />
      <Timeline ref={timelineRef} onMouseDown={handleTimelineMouseDown}>
        <ProgressContainer>
          <Progress $progress={progress} />
        </ProgressContainer>
      </Timeline>
    </VideoContainer>
  );
}

export default YoutubeVideo;
