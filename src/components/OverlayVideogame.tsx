import styled, { keyframes } from "styled-components";

/////////////////////////////////////////////////////////////////////////////STYLE
const OverlayContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  z-index: 2;
`;

const Overlay = styled.img`
  display: flex;
  height: 100%;
  z-index: 2;
`;

interface SnowTVProps {
  isArtistSwitching: boolean;
}

const SnowTV = styled.video<SnowTVProps>`
  height: 36%;
  position: absolute;
  top: 18%;
  left: 12%;
  transform: rotate(-1deg) skewX(1deg);
  z-index: 1;
  display: ${({ isArtistSwitching }) => (isArtistSwitching ? "none" : "block")};
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

const VideogameArtistPicture = styled.img`
  width: 48%;
  position: absolute;
  top: 17%;
  left: 10%;
  transform: rotate(-1deg) skewX(1deg);
  z-index: 0;
`;

const blinkAnimation = keyframes`
  0% {
    color: white;
  }
  50% {
    color: #ad352a;
  }
  100% {
    color: white;
  }
`;

const OverlayNavigateIndication = styled.span`
  font-family: "Press Start 2P";
  color: white;
  position: absolute;
  z-index: 2;
`;

const OverlayPrevIndication = styled(OverlayNavigateIndication)`
  font-size: 2.4vh;
  bottom: -27%;
  right: 43%;
  transform: rotate(15deg) skewX(10deg);
`;
const OverlayNextIndication = styled(OverlayNavigateIndication)`
  font-size: 2.7vh;
  bottom: -30.5%;
  right: -0.5%;
  transform: rotate(4deg) skewX(-1deg);
`;

const OverlayButton = styled.div`
  width: 9vh;
  height: 15vh;
  position: absolute;
  cursor: pointer;
  z-index: 2;
`;

const OverlayPrevButton = styled(OverlayButton)`
  bottom: 25%;
  right: 37.5%;
  &:hover > ${OverlayPrevIndication} {
    animation: ${blinkAnimation} 0.6s infinite;
  }
`;
const OverlayNextButton = styled(OverlayButton)`
  bottom: 22%;
  right: 18%;
  &:hover > ${OverlayNextIndication} {
    animation: ${blinkAnimation} 0.6s infinite;
  }
`;

interface Composer {
  id: string;
  category: string;
  name: string;
  birth: string;
  birthPlace: string;
  countryFlag: string;
  death?: string;
  picture: string;
  bio: string;
  related: string[];
  famousSoundtracks: string[];
}
/////////////////////////////////////////////////////////////////////////////COMPONENT
function OverlayVideogame({
  currentArtistInfos,
  handlePrevArtist,
  handleNextArtist,
  isArtistSwitching,
}: {
  currentArtistInfos: Composer;
  handlePrevArtist: () => void;
  handleNextArtist: () => void;
  isArtistSwitching: boolean;
}) {
  //////////////////////////////////////////////////////////////RENDER
  return (
    <OverlayContainer>
      <Overlay src='videogames-overlay-2.webp' />
      <SnowTV isArtistSwitching={isArtistSwitching} autoPlay muted loop>
        <source src='tv-snow.mp4' type='video/mp4' />
        Votre navigateur ne peut afficher la vidéo de changement d'artiste.
      </SnowTV>
      <CRTFilter src='filtre.webp' />
      <VideogameArtistPicture src={currentArtistInfos.picture} />
      <OverlayPrevButton onClick={handlePrevArtist}>
        <OverlayPrevIndication>PREV</OverlayPrevIndication>
      </OverlayPrevButton>
      <OverlayNextButton onClick={handleNextArtist}>
        <OverlayNextIndication>NEXT</OverlayNextIndication>
      </OverlayNextButton>
    </OverlayContainer>
  );
}

export default OverlayVideogame;
