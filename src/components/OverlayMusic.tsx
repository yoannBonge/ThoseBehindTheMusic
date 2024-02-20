import { Composer } from "../common/types";
import { getCategoryColor } from "../common/colors";
import styled, { keyframes, css } from "styled-components";
import {
  OverlayContainer,
  Overlay,
} from "../common/shared-and-isolated-components";
import { useState } from "react";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are shared and
// come from "/shared-and-isolated-components".

const pictureFadeInOut = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const MusicArtistPicture = styled.img<{ $isArtistSwitching: boolean }>`
  width: 35%;
  position: absolute;
  top: 4%;
  left: 20.8%;
  transform: rotate(-1deg) skewX(-1deg);
  z-index: 0;
  ${({ $isArtistSwitching }) =>
    $isArtistSwitching &&
    css`
      animation: ${pictureFadeInOut} 0.75s linear;
    `}
`;

const buttonsBlink = ($categoryColor: string) => keyframes`
  0% {
    color: white;
  }
  50% {
    color: ${$categoryColor};
  }
  100% {
    color: white;
  }
`;

const ModelOverlayNavigateIndication = styled.span`
  font-family: "Afacad";
  font-weight: 800;
  color: white;
  position: absolute;
  z-index: 2;
`;

const OverlayPrevIndication = styled(ModelOverlayNavigateIndication)`
  font-size: 5vh;
  bottom: 15%;
  right: 5%;
  transform: rotate(-4.5deg) skewX(-1deg);
`;
const OverlayNextIndication = styled(ModelOverlayNavigateIndication)`
  font-size: 5vh;
  bottom: 15%;
  right: 6%;
  transform: rotate(-4.5deg) skewX(-2deg);
`;

const ModelOverlayButton = styled.div`
  width: 12vh;
  height: 9vh;
  position: absolute;
  cursor: pointer;
  z-index: 2;
`;

const OverlayPrevButton = styled(ModelOverlayButton)<{
  $categoryColor: string;
}>`
  top: 39.5%;
  left: 15%;
  &:hover > ${OverlayPrevIndication} {
    animation: ${({ $categoryColor }) => buttonsBlink($categoryColor)} 0.6s
      infinite;
  }
`;
const OverlayNextButton = styled(ModelOverlayButton)<{
  $categoryColor: string;
}>`
  top: 35%;
  left: 50%;
  &:hover > ${OverlayNextIndication} {
    animation: ${({ $categoryColor }) => buttonsBlink($categoryColor)} 0.6s
      infinite;
  }
`;

const OverlaySource = styled.span`
  font-family: "Afacad";
  font-size: 1em;
  color: white;
  position: absolute;
  opacity: 0.4;
  right: 1%;
  bottom: 1%;
  z-index: 2;
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function OverlayMusic({
  currentArtistInfos,
  handlePrevArtist,
  handleNextArtist,
}: {
  currentArtistInfos: Composer;
  handlePrevArtist: () => void;
  handleNextArtist: () => void;
}) {
  const categoryColor = getCategoryColor(currentArtistInfos.category);

  const [isArtistSwitching, setIsArtistSwitching] = useState(false);

  const handleClickPrevArtist = () => {
    setIsArtistSwitching(true);
    handlePrevArtist();
    setTimeout(() => {
      setIsArtistSwitching(false);
    }, 800);
  };

  const handleClickNextArtist = () => {
    setIsArtistSwitching(true);
    handleNextArtist();
    setTimeout(() => {
      setIsArtistSwitching(false);
    }, 800);
  };

  // console.log("RENDER OVERLAY MUSIC");

  //////////////////////////////////////////////////////////////RENDER
  return (
    <OverlayContainer>
      <Overlay src='music-overlay.webp' />
      <MusicArtistPicture
        src={currentArtistInfos.picture}
        $isArtistSwitching={isArtistSwitching}
      />
      <OverlayPrevButton
        $categoryColor={categoryColor}
        onClick={handleClickPrevArtist}
      >
        <OverlayPrevIndication>PREV</OverlayPrevIndication>
      </OverlayPrevButton>
      <OverlayNextButton
        $categoryColor={categoryColor}
        onClick={handleClickNextArtist}
      >
        <OverlayNextIndication>NEXT</OverlayNextIndication>
      </OverlayNextButton>
      <OverlaySource>crédits image overlay : www.wallpapers.com</OverlaySource>
    </OverlayContainer>
  );
}

export default OverlayMusic;
