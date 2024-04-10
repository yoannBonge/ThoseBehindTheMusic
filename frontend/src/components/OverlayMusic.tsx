import styled, { css, keyframes } from "styled-components";
import {
  Composer,
  Overlay,
  OverlayContainer,
  arrayBufferToBase64,
  device,
} from "../utils/constants";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some styled-components appearing in the render are shared and
// come from "/utils/constants".

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
  width: 35.7%;
  height: 26.6%;
  position: absolute;
  top: 33%;
  left: 31.5%;
  perspective: 700px;
  transform: rotate(-11deg);
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

const MusicComposerPicture = styled.img<{
  $isComposerPictureSwitching: boolean;
}>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: rotateY(-24deg) skew(-8deg, 5deg);
  z-index: 0;
  ${({ $isComposerPictureSwitching }) =>
    $isComposerPictureSwitching &&
    css`
      animation: ${pictureFadeInOut} 0.75s linear;
    `}
  @media ${device.xmd} {
    position: static;
    transform: inherit;
    z-index: 1;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 0px 0px 0.6px #00000046, 0px 0px 1.3px #0000005f,
      0px 0px 2.5px #0000007b, 0px 0px 4.5px #0000008a, 0px 0px 8.4px #000000bd,
      0px 0px 20px #000000;
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
function OverlayMusic({
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

  // console.log("RENDER OVERLAY MUSIC");

  //////////////////////////////////////////////////////////////RENDER
  return (
    <OverlayContainer $category={currentComposerInfos.category}>
      <Overlay
        src='/music-overlay.webp'
        alt='Studio de production de musique'
      />
      <ComposerPictureContainer>
        <MusicComposerPicture
          src={composerPictureUrl}
          alt='Photo du compositeur'
          $isComposerPictureSwitching={isComposerPictureSwitching}
        />
      </ComposerPictureContainer>
      <OverlaySource>
        crédits image overlay : www.tdbproduction.cz
      </OverlaySource>
    </OverlayContainer>
  );
}

export default OverlayMusic;
