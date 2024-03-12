import { Composer, arrayBufferToBase64 } from "../utils/constants";
import { getCategoryColor } from "../utils/constants";
import styled, { keyframes, css } from "styled-components";
import { OverlayContainer, Overlay } from "../utils/constants";
import { useState } from "react";

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

const ComposerPictureContainer = styled.div`
  width: 54%;
  position: absolute;
  top: 38.4%;
  left: 12%;
  perspective: 800px;
  transform: rotate(5.2deg);
`;

const CinemaComposerPicture = styled.img<{ $isComposerSwitching: boolean }>`
  width: 82%;
  height: 11.2vw;
  position: absolute;
  top: 0;
  left: 0;
  transform: rotateY(36deg) skew(8deg, 0deg);
  z-index: 1;
  ${({ $isComposerSwitching }) =>
    $isComposerSwitching &&
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
  font-size: 4.5vh;
  bottom: 11%;
  left: 21%;
  transform: rotate(-0.5deg) skew(0deg, 1deg);
`;
const OverlayNextIndication = styled(ModelOverlayNavigateIndication)`
  font-size: 3.3vh;
  bottom: 10%;
  right: 11%;
  transform: rotate(-2deg) skew(0deg, 2deg);
`;

const ModelOverlayButton = styled.div`
  background-color: #2b0501;
  position: absolute;
  border: 4px solid #0f0b08;
  border-radius: 2px;
  cursor: pointer;
  z-index: 2;
`;

const OverlayPrevButton = styled(ModelOverlayButton)<{
  $categoryColor: string;
}>`
  width: 7vh;
  height: 23vh;
  top: 36.5%;
  left: 5%;
  transform: rotate(-1deg) skew(0deg, -1deg);
  &:hover > ${OverlayPrevIndication} {
    animation: ${({ $categoryColor }) => buttonsBlinkAnimation($categoryColor)}
      0.6s infinite;
  }
`;
const OverlayNextButton = styled(ModelOverlayButton)<{
  $categoryColor: string;
}>`
  width: 5vh;
  height: 16.7vh;
  top: 41.7%;
  left: 50%;
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
  currentComposerInfos,
  handlePrevComposer,
  handleNextComposer,
}: {
  currentComposerInfos: Composer;
  handlePrevComposer: () => void;
  handleNextComposer: () => void;
}) {
  //////////////////////////////////////////////////////STATE
  const [isComposerSwitching, setIsComposerSwitching] = useState(false);

  //////////////////////////////////////////////////////BEHAVIOR
  const categoryColor = getCategoryColor(currentComposerInfos.category);

  const handleClickPrevComposer = () => {
    setIsComposerSwitching(true);
    handlePrevComposer();
    setTimeout(() => {
      setIsComposerSwitching(false);
    }, 800);
  };

  const handleClickNextComposer = () => {
    setIsComposerSwitching(true);
    handleNextComposer();
    setTimeout(() => {
      setIsComposerSwitching(false);
    }, 800);
  };

  const composerPictureData = currentComposerInfos.picture.data;
  const base64String = arrayBufferToBase64(composerPictureData);
  const composerPictureUrl = `data:image/jpeg;base64,${base64String}`;

  // console.log("RENDER OVERLAY CINEMA");

  //////////////////////////////////////////////////////////////RENDER
  return (
    <OverlayContainer>
      <Overlay src='cinema-overlay.webp' />
      <ComposerPictureContainer>
        <CinemaComposerPicture
          src={composerPictureUrl}
          $isComposerSwitching={isComposerSwitching}
        />
      </ComposerPictureContainer>

      <OverlayPrevButton
        $categoryColor={categoryColor}
        onClick={handleClickPrevComposer}
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
        onClick={handleClickNextComposer}
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
