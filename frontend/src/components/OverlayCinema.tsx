import styled, { css, keyframes } from "styled-components";
import {
  Composer,
  Overlay,
  OverlayContainer,
  arrayBufferToBase64,
  device,
} from "../utils/constants";

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
  width: 46%;
  height: 27.2%;
  position: absolute;
  top: 37.4%;
  left: 11%;
  perspective: 700px;
  transform: rotate(2deg);
  @media ${device.xmd} {
    width: 20em;
    height: auto;
    top: 35%;
    left: 10%;
    perspective: inherit;
    transform: inherit;
  }
  @media ${device.md} {
    width: 40vw;
  }
`;

const CinemaComposerPicture = styled.img<{
  $isComposerPictureSwitching: boolean;
}>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: rotateY(36deg) skew(8deg, 0deg);
  z-index: 1;
  ${({ $isComposerPictureSwitching }) =>
    $isComposerPictureSwitching &&
    css`
      animation: ${pictureFadeInOut} 0.75s linear;
    `}
  @media ${device.xmd} {
    position: static;
    transform: inherit;
    z-index: 1;
    border: 1px solid #ca9708;
    border-radius: 5px;
    box-shadow: 0px 0px 0.6px #ca960847, 0px 0px 1.3px #ca960862,
      0px 0px 2.5px #ca96087a, 0px 0px 4.5px #ca96089b, 0px 0px 8.4px #ca9608c0,
      0px 0px 20px #ca9708;
  }
`;

const OverlaySource = styled.span`
  font-family: "Afacad";
  font-size: 1em;
  color: white;
  position: absolute;
  opacity: 0.4;
  left: 1%;
  bottom: 1%;
  z-index: 2;
  @media ${device.xmd} {
    display: none;
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function OverlayCinema({
  currentComposerInfos,
  isComposerPictureSwitching,
}: {
  currentComposerInfos: Composer;
  isComposerPictureSwitching: boolean;
}) {
  //////////////////////////////////////////////////////BEHAVIOR

  const composerPictureData = currentComposerInfos.picture.data;
  const base64String = arrayBufferToBase64(composerPictureData);
  const composerPictureUrl = `data:image/jpeg;base64,${base64String}`;

  // console.log("RENDER OVERLAY CINEMA");

  //////////////////////////////////////////////////////////////RENDER
  return (
    <OverlayContainer $category={currentComposerInfos.category}>
      <Overlay src='cinema-overlay.webp' />
      <ComposerPictureContainer>
        <CinemaComposerPicture
          src={composerPictureUrl}
          $isComposerPictureSwitching={isComposerPictureSwitching}
        />
      </ComposerPictureContainer>
      <OverlaySource>crédits image overlay : www.timeout.com</OverlaySource>
    </OverlayContainer>
  );
}

export default OverlayCinema;
