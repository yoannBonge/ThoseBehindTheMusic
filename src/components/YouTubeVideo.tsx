import { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

interface YoutubeVideoChildProps {
  url: string;
  playing: boolean;
  onPause: () => void;
  onPlay: () => void;
}

/////////////////////////////////////////////////////////////////////////////COMPONENT
const VideoContainer = styled.div`
  position: relative;
  width: 30%;
  height: 90%;
`;

const Video = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #b6afaf;
  border-radius: 15px;
  overflow: hidden;
`;

const Timeline = styled.div`
  position: absolute;
  bottom: -1.4%;
  left: 0.4%;
  width: 100%;
  height: 0.6em;
  border-radius: 0 0 15px 15px;
  background-color: #b6afaf;
  cursor: pointer;
`;

const ProgressContainer = styled.div`
  height: 100%;
  border-radius: 0 0 15px 15px;
  overflow: hidden;
`;

interface ProgressProps {
  progress: number;
}

const Progress = styled.div<ProgressProps>`
  height: 101.4%;
  width: ${({ progress }) => progress}%;
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
      />
      <Timeline ref={timelineRef} onMouseDown={handleTimelineMouseDown}>
        <ProgressContainer>
          <Progress progress={progress} />
        </ProgressContainer>
      </Timeline>
    </VideoContainer>
  );
}

export default YoutubeVideo;
