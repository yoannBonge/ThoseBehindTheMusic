import { useEffect, useState } from "react";
import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";
import YouTubeVideo from "./YouTubeVideo";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 88.2vh;
`;

const OverlayContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  z-index: 2;
`;

const Overlay = styled.img`
  position: relative;
  display: flex;
  height: 100%;
  z-index: 2;
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

const PrevIndication = styled.span`
  font-family: "Press Start 2P", system-ui;
  color: white;
  font-size: 1em;
  position: absolute;
  bottom: 20.5%;
  right: 40.7%;
  transform: rotate(14deg) skewX(10deg);
  z-index: 2;
`;
const NextIndication = styled.span`
  font-family: "Press Start 2P", system-ui;
  color: white;
  font-size: 1.1em;
  position: absolute;
  bottom: 17%;
  right: 18.1%;
  transform: rotate(4deg) skewX(-1deg);
  z-index: 2;
`;

const PrevButton = styled.div`
  width: 2em;
  height: 4.6em;
  opacity: 0.5;
  position: absolute;
  bottom: 28.2%;
  right: 39.3%;
  cursor: pointer;
  z-index: 2;
`;
const NextButton = styled.div`
  width: 2em;
  height: 4.7em;
  opacity: 0.5;
  position: absolute;
  bottom: 25.7%;
  right: 19.7%;
  cursor: pointer;
  z-index: 2;
`;

const Shadow = styled.div`
  position: absolute;
  top: 0%;
  right: 44.5%;
  width: 6px;
  height: 100%;
  background-color: #215d95;
  box-shadow: 0px 0px 4.9px #3d80bf, 0px 0px 39px #3d80bf;
  z-index: 3;
`;

const ArtistInfosContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 50%;
  height: 88.2vh;
  background-image: url("black-background.webp");
  background-size: cover;
  z-index: 0;
`;

const ArtistName = styled.h2`
  color: white;
  font-family: "Bebas Neue";
  font-size: 6em;
  margin: 0.1em 0.4em 0 0.4em;
`;

const ArtistInfosList = styled.ul`
  line-height: 2.8em;
  width: 100%;
`;

const ArtistInfosElement = styled.li`
  list-style-type: none;
  color: white;
  font-family: "Afacad";
  font-size: 1.5em;
`;

const BlueText = styled.span`
  color: #3d80bf;
  font-family: "Afacad";
  font-size: 1.5rem;
`;

const CountryFlag = styled(ReactCountryFlag)`
  font-size: 1.3em;
  margin: 0 0.5em;
`;

const NotableWorksContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const NotableWorksList = styled.ul`
  padding-left: 0.3em;
  line-height: 1.2em;
`;

const NotableWorksElement = styled.li`
  list-style-type: none;
  color: white;
  font-family: "Afacad";
  font-size: 1em;
`;

const ClipsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 88.8%;
  height: 80%;
`;

const Clip = styled.div`
  width: 30%;
  height: 98.3%;
  box-sizing: border-box;
`;

function OverlayVideogame() {
  interface Composer {
    id: string;
    category: string;
    name: string;
    birth: string;
    birthPlace: string;
    countryFlag: string;
    death?: string;
    picture: string;
    related: string[];
    famousSoundtracks: string[];
  }

  const [videogameInfos, setVideogameInfos] = useState<Composer[]>([]);
  const [currentArtistIndex, setCurrentArtistIndex] = useState<number>(0);
  const handlePrevArtist = () => {
    setCurrentArtistIndex((prevIndex) =>
      prevIndex === 0 ? videogameInfos.length - 1 : prevIndex - 1
    );
  };

  const handleNextArtist = () => {
    setCurrentArtistIndex((prevIndex) =>
      prevIndex === videogameInfos.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/composers.json");
      const infos: Composer[] = await response.json();
      const data = infos.filter((item) => item.category === "videogame");
      setVideogameInfos(data);
      // const currentArtist = data[currentArtistIndex];
    };

    fetchData();
  }, []);

  const currentArtistInfos = videogameInfos[currentArtistIndex];
  if (!currentArtistInfos) {
    return null;
  }

  return (
    <Wrapper>
      <OverlayContainer>
        <Overlay src='videogames-overlay-2.webp' />
        <CRTFilter src='filtre.webp' />
        <VideogameArtistPicture src={currentArtistInfos.picture} />
        <PrevButton onClick={handlePrevArtist} />
        <NextButton onClick={handleNextArtist} />
        <PrevIndication>PREV</PrevIndication>
        <NextIndication>NEXT</NextIndication>
      </OverlayContainer>
      <Shadow />
      <ArtistInfosContainer>
        <ArtistName>{currentArtistInfos.name}</ArtistName>
        <ArtistInfosList>
          <ArtistInfosElement>
            <BlueText>Naissance : </BlueText>
            {currentArtistInfos.birth}
          </ArtistInfosElement>
          <ArtistInfosElement>
            <BlueText>Lieu de naissance : </BlueText>
            {currentArtistInfos.birthPlace}{" "}
            <CountryFlag countryCode={currentArtistInfos.countryFlag} svg />
          </ArtistInfosElement>
          <ArtistInfosElement>
            <NotableWorksContainer>
              <BlueText>Oeuvres notables : </BlueText>
              <NotableWorksList>
                <NotableWorksElement>
                  {currentArtistInfos.related[0]}
                </NotableWorksElement>
                <NotableWorksElement>
                  {currentArtistInfos.related[1]}
                </NotableWorksElement>
                <NotableWorksElement>
                  {currentArtistInfos.related[2]}
                </NotableWorksElement>
              </NotableWorksList>
            </NotableWorksContainer>
          </ArtistInfosElement>
          <BlueText>Extraits</BlueText>
          <ClipsContainer>
            <Clip>
              <YouTubeVideo
                videoId={currentArtistInfos.famousSoundtracks[0]}
              ></YouTubeVideo>
            </Clip>
            <Clip>
              <YouTubeVideo
                videoId={currentArtistInfos.famousSoundtracks[1]}
              ></YouTubeVideo>
            </Clip>
            <Clip>
              <YouTubeVideo
                videoId={currentArtistInfos.famousSoundtracks[2]}
              ></YouTubeVideo>
            </Clip>
          </ClipsContainer>
        </ArtistInfosList>
      </ArtistInfosContainer>
    </Wrapper>
  );
}

export default OverlayVideogame;
