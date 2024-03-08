import { Composer, arrayBufferToBase64 } from "../utils/constants";
import { getCategoryColor } from "../utils/constants";
import styled, { keyframes, css } from "styled-components";
import { OverlayContainer, Overlay } from "../utils/constants";
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

const ArtistPictureContainer = styled.div`
  width: 33.3%;
  position: absolute;
  top: 34.3%;
  left: 31.2%;
  perspective: 700px;
  transform: rotate(-14deg);
`;

const MusicArtistPicture = styled.img<{ $isArtistSwitching: boolean }>`
  width: 100%;
  height: 9.4em;
  position: absolute;
  top: 0;
  left: 0;
  transform: rotateY(-24deg) skew(-10deg, 5deg);
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
  font-size: 4.7vh;
  bottom: 1%;
  left: 11.7%;
  transform: rotate(-0.5deg) skewX(-2deg);
`;
const OverlayNextIndication = styled(ModelOverlayNavigateIndication)`
  font-size: 5.4vh;
  bottom: 6%;
  left: 16%;
  transform: rotate(0.5deg) skewX(-1deg);
`;

const ModelOverlayButton = styled.div`
  background-color: #0d0b14;
  position: absolute;
  cursor: pointer;
  z-index: 2;
`;

const OverlayPrevButton = styled(ModelOverlayButton)<{
  $categoryColor: string;
}>`
  width: 13.4vh;
  height: 6.3vh;
  top: 60.8%;
  left: 34.4%;
  transform: rotate(-1deg) skewX(-1deg);
  &:hover > ${OverlayPrevIndication} {
    animation: ${({ $categoryColor }) => buttonsBlink($categoryColor)} 0.6s
      infinite;
  }
`;
const OverlayNextButton = styled(ModelOverlayButton)<{
  $categoryColor: string;
}>`
  width: 17.3vh;
  height: 7.6vh;
  top: 59.1%;
  left: 57.1%;
  transform: rotate(-2deg) skewX(-3deg);
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

  const artistPictureData = currentArtistInfos.picture.data;
  const base64String = arrayBufferToBase64(artistPictureData);
  const artistPictureUrl = `data:image/jpeg;base64,${base64String}`;

  // console.log("RENDER OVERLAY MUSIC");

  //////////////////////////////////////////////////////////////RENDER
  return (
    <OverlayContainer>
      <Overlay src='music-overlay.webp' />
      <ArtistPictureContainer>
        <MusicArtistPicture
          src={artistPictureUrl}
          $isArtistSwitching={isArtistSwitching}
        />
      </ArtistPictureContainer>
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
        crédits image overlay : www.tdbproduction.cz
      </OverlaySource>
    </OverlayContainer>
  );
}

export default OverlayMusic;
