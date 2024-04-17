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

const SnowTV = styled.video<{ $isComposerPictureSwitching: boolean }>`
  height: 36%;
  position: absolute;
  top: 18%;
  left: 12%;
  transform: rotate(-1deg) skewX(1deg);
  z-index: 1;
  display: ${({ $isComposerPictureSwitching }) =>
    $isComposerPictureSwitching ? "block" : "none"};
  @media ${device.xmd} {
    display: none;
  }
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

const ComposerPictureContainer = styled.div`
  width: 43%;
  height: 37.9%;
  position: absolute;
  top: 16.4%;
  left: 13.6%;
  @media ${device.xmd} {
    width: 20em;
    height: auto;
    top: 35%;
    left: 10%;
    perspective: inherit;
    transform: inherit;
  }
  @media ${device.switchDisplay} {
    position: static;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90%;
    width: auto;
    margin: auto;
  }
  /* @media ${device.switchDisplay} {
    width: 40vw;
  } */
`;

const CRTFilter = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.2;
  transform: rotate(-1deg) skewX(1deg);
  z-index: 1;
  @media ${device.xmd} {
    display: none;
  }
`;

const VideogameComposerPicture = styled.img<{
  $isComposerPictureSwitching: boolean;
}>`
  width: 100%;
  height: 100%;
  transform: rotate(-1deg) skewX(1deg);
  z-index: 0;
  @media ${device.xmd} {
    position: static;
    transform: inherit;
    z-index: 1;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 0px 0px 0.6px #464e9847, 0px 0px 1.3px #464e985f,
      0px 0px 2.5px #464e9880, 0px 0px 4.5px #464e9892, 0px 0px 8.4px #464e98b9,
      0px 0px 20px #464e98;
    ${({ $isComposerPictureSwitching }) =>
      $isComposerPictureSwitching &&
      css`
        animation: ${pictureFadeInOut} 0.75s linear;
      `}
  }
  @media ${device.switchDisplay} {
    height: 12.2em;
    width: auto;
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
function OverlayVideogame({
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

  // console.log("RENDER OVERLAY VIDEOGAME");

  //////////////////////////////////////////////////////RENDER
  return (
    <OverlayContainer $category={currentComposerInfos.category}>
      <Overlay
        src='/videogame-overlay.webp'
        alt="Bureau d'une chambre sur lequel sont posées une console de jeu et une télévision"
      />
      <SnowTV
        $isComposerPictureSwitching={isComposerPictureSwitching}
        autoPlay
        muted
        loop
      >
        <source
          src='/tv-snow-video.mp4'
          type='video/mp4'
          aria-label='Cette vidéo sert de transition lors du changement de compositeur et affiche de la "neige" sur une télévision ancienne à tube cathodique.'
        />
        Votre navigateur ne peut afficher la vidéo de changement de compositeur.
      </SnowTV>
      <ComposerPictureContainer>
        <CRTFilter
          src='/crt-filter.webp'
          alt="Filtre verdâtre pour simuler l'image d'une télévision ancienne"
        />
        <VideogameComposerPicture
          $isComposerPictureSwitching={isComposerPictureSwitching}
          src={composerPictureUrl}
          alt='Photo du compositeur'
        />
      </ComposerPictureContainer>
      <OverlaySource>
        crédits image overlay : dalay-lamma on www.deviantart.com
      </OverlaySource>
    </OverlayContainer>
  );
}

export default OverlayVideogame;
