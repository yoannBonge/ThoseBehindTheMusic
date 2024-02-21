import { Composer } from "../common/types";
import { getCategoryColor } from "../common/colors";
import styled, { css, keyframes } from "styled-components";
import {
  OverlayContainer,
  Overlay,
} from "../common/shared-and-isolated-components";
import { useState } from "react";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are shared and
// come from "/shared-and-isolated-components".

const SnowTV = styled.video<{ $isSnowingTV: boolean }>`
  height: 36%;
  position: absolute;
  top: 18%;
  left: 12%;
  transform: rotate(-1deg) skewX(1deg);
  z-index: 1;
  display: ${({ $isSnowingTV }) => ($isSnowingTV ? "block" : "none")};
`;

const CRTFilter = styled.img`
  width: 40%;
  position: absolute;
  top: 15%;
  left: 15%;
  opacity: 0.2;
  transform: rotate(-1deg) skewX(1deg);
  z-index: 1;
`;

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

const VideogameArtistPicture = styled.img<{ $isFadingPicture: boolean }>`
  width: 48%;
  position: absolute;
  top: 17%;
  left: 10%;
  transform: rotate(-1deg) skewX(1deg);
  z-index: 0;
  ${({ $isFadingPicture }) =>
    $isFadingPicture &&
    css`
      animation: ${pictureFadeInOut} 0.6s linear;
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
  font-family: "Press Start 2P";
  color: white;
  position: absolute;
  z-index: 2;
`;

const OverlayPrevIndication = styled(ModelOverlayNavigateIndication)`
  font-size: 2.4vh;
  bottom: -27%;
  right: 43%;
  transform: rotate(15deg) skewX(10deg);
`;
const OverlayNextIndication = styled(ModelOverlayNavigateIndication)`
  font-size: 2.7vh;
  bottom: -30.5%;
  right: -0.5%;
  transform: rotate(4deg) skewX(-1deg);
`;

const ModelOverlayButton = styled.div`
  width: 9vh;
  height: 15vh;
  position: absolute;
  cursor: pointer;
  z-index: 2;
`;

const OverlayPrevButton = styled(ModelOverlayButton)<{
  $categoryColor: string;
}>`
  bottom: 25%;
  right: 37.5%;
  &:hover > ${OverlayPrevIndication} {
    animation: ${({ $categoryColor }) => buttonsBlink($categoryColor)} 0.6s
      infinite;
  }
`;
const OverlayNextButton = styled(ModelOverlayButton)<{
  $categoryColor: string;
}>`
  bottom: 22%;
  right: 18%;
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
function OverlayVideogame({
  currentArtistInfos,
  handlePrevArtist,
  handleNextArtist,
}: {
  currentArtistInfos: Composer;
  handlePrevArtist: () => void;
  handleNextArtist: () => void;
}) {
  const categoryColor = getCategoryColor(currentArtistInfos.category);

  const [isFadingPicture, setIsFadingPicture] = useState(false);
  const [isSnowingTV, setIsSnowingTV] = useState(false);

  const handleClickPrevArtist = () => {
    setIsFadingPicture(true);
    setIsSnowingTV(true);
    handlePrevArtist();
    setTimeout(() => {
      setIsSnowingTV(false);
    }, 500);
    setTimeout(() => {
      setIsFadingPicture(false);
    }, 800);
  };

  const handleClickNextArtist = () => {
    setIsFadingPicture(true);
    setIsSnowingTV(true);
    handleNextArtist();
    setTimeout(() => {
      setIsSnowingTV(false);
    }, 500);
    setTimeout(() => {
      setIsFadingPicture(false);
    }, 800);
  };

  // console.log("RENDER OVERLAY VIDEOGAME");
  //////////////////////////////////////////////////////////////RENDER
  return (
    <OverlayContainer>
      <Overlay src='videogame-overlay.webp' />
      <SnowTV $isSnowingTV={isSnowingTV} autoPlay muted loop>
        <source src='tv-snow-video.mp4' type='video/mp4' />
        Votre navigateur ne peut afficher la vidéo de changement d'artiste.
      </SnowTV>
      <CRTFilter src='crt-filter.webp' />
      <VideogameArtistPicture
        $isFadingPicture={isFadingPicture}
        src={currentArtistInfos.picture}
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
      <OverlaySource>
        crédits image overlay : dalay-lamma on www.deviantart.com
      </OverlaySource>
    </OverlayContainer>
  );
}

export default OverlayVideogame;
