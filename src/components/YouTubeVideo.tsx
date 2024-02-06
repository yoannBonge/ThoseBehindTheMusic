import styled from "styled-components";

interface YouTubeVideoProps {
  videoId: string;
}

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* padding-top: 56.25%; */
`;

const ResponsiveIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const YouTubeVideo = ({ videoId }: YouTubeVideoProps) => {
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&fs=0&controls=1&disablekb=0&modestbranding=1&loop=0&rel=0&showinfo=0&iv_load_policy=3&version=3&enablejsapi=1&widgetid=1`;

  return (
    <VideoContainer>
      <ResponsiveIframe
        src={embedUrl}
        title='YouTube player'
        allow='clipboard-write; encrypted-media; picture-in-picture'
        allowFullScreen
      ></ResponsiveIframe>
    </VideoContainer>
  );
};

export default YouTubeVideo;
