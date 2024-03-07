import { Composer, arrayBufferToBase64 } from "../utils/constants";
import { getCategoryColor } from "../utils/constants";
import styled, { keyframes, css } from "styled-components";
import { OverlayContainer, Overlay } from "../utils/constants";
import { useEffect, useState } from "react";

/////////////////////////////////////////////////////////////////////////////STYLE

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
  width: 54%;
  position: absolute;
  top: 31.8%;
  left: 9.4%;
  perspective: 800px;
  transform: rotate(5.2deg);
`;

const CinemaArtistPicture = styled.img<{ $isArtistSwitching: boolean }>`
  width: 70.6%;
  height: 9.4vw;
  position: absolute;
  top: 0;
  left: 0;
  transform: rotateY(45deg) skew(8deg, 0deg);
  z-index: 1;
  ${({ $isArtistSwitching }) =>
    $isArtistSwitching &&
    css`
      animation: ${pictureFadeInOut} 0.75s linear;
    `}
`;

const buttonsBlinkAnimation = ($categoryColor: string) => keyframes`
  0% {
    color: #e4cba5;
  }
  50% {
    color: ${$categoryColor};
  }
  100% {
    color: #e4cba5;
  }
`;

const ModelOverlayNavigateIndication = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1em;
  font-family: "Ultra";
  font-weight: 100;
  color: #e4cba5;
  position: absolute;
  z-index: 2;
`;

const OverlayPrevIndication = styled(ModelOverlayNavigateIndication)`
  font-size: 3.5vh;
  bottom: 14%;
  left: 20%;
  transform: rotate(-0.5deg) skew(0deg, -1deg);
`;
const OverlayNextIndication = styled(ModelOverlayNavigateIndication)`
  font-size: 2.7vh;
  bottom: 15%;
  right: 6%;
  transform: rotate(-1deg) skew(0deg, 2deg);
`;

const ModelOverlayButton = styled.div`
  background-color: #2b0501;
  width: 5vh;
  height: 20vh;
  position: absolute;
  border: 4px solid #0f0b08;
  border-radius: 2px;
  cursor: pointer;
  z-index: 2;
`;

const OverlayPrevButton = styled(ModelOverlayButton)<{
  $categoryColor: string;
}>`
  width: 5vh;
  height: 20vh;
  top: 29.6%;
  left: 5%;
  transform: rotate(-1deg) skew(0deg, 2deg);
  &:hover > ${OverlayPrevIndication} {
    animation: ${({ $categoryColor }) => buttonsBlinkAnimation($categoryColor)}
      0.6s infinite;
  }
`;
const OverlayNextButton = styled(ModelOverlayButton)<{
  $categoryColor: string;
}>`
  width: 3vh;
  height: 15.5vh;
  top: 33.5%;
  left: 41.4%;
  transform: rotate(-1.4deg) skew(0deg, 5deg);
  &:hover > ${OverlayNextIndication} {
    animation: ${({ $categoryColor }) => buttonsBlinkAnimation($categoryColor)}
      0.6s infinite;
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
function OverlayCinema({
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

  // console.log("RENDER OVERLAY CINEMA");

  //////////////////////////////////////////////////////////////RENDER
  return (
    <OverlayContainer>
      <Overlay src='cinema-overlay.webp' />
      <ArtistPictureContainer>
        <CinemaArtistPicture
          src={artistPictureUrl}
          $isArtistSwitching={isArtistSwitching}
        />
      </ArtistPictureContainer>

      <OverlayPrevButton
        $categoryColor={categoryColor}
        onClick={handleClickPrevArtist}
      >
        <OverlayPrevIndication>
          <span>P</span>
          <span>R</span>
          <span>E</span>
          <span>V</span>
        </OverlayPrevIndication>
      </OverlayPrevButton>
      <OverlayNextButton
        $categoryColor={categoryColor}
        onClick={handleClickNextArtist}
      >
        <OverlayNextIndication>
          <span>N</span>
          <span>E</span>
          <span>X</span>
          <span>T</span>
        </OverlayNextIndication>
      </OverlayNextButton>
      <OverlaySource>crédits image overlay : www.timeout.com</OverlaySource>
    </OverlayContainer>
  );
}

export default OverlayCinema;
