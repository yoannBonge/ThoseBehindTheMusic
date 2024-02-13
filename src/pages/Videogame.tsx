import styled from "styled-components";
import Header from "../components/Header";
import OverlayVideogame from "../components/OverlayVideogame";
import ArtistInfosWrapper from "../components/ArtistInfosWrapper";
import { useEffect, useState } from "react";

/////////////////////////////////////////////////////////////////////////////STYLE
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #000000;
`;

const ArtistPresentation = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 88.2vh;
  overflow: hidden;
`;

const Shadow = styled.div`
  position: absolute;
  top: 0%;
  left: calc(55%);
  width: 6px;
  height: 100%;
  background-color: #215d95;
  box-shadow: 0px 0px 4.9px #3d80bf, 0px 0px 39px #3d80bf;
  z-index: 3;
`;
/////////////////////////////////////////////////////////////////////////////COMPONENT
function Videogame() {
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

  //////////////////////////////////////////////////////////////STATE
  const [videogameInfos, setVideogameInfos] = useState<Composer[]>([]);
  const [currentArtistIndex, setCurrentArtistIndex] = useState<number>(0);
  const [isArtistSwitching, setIsArtistSwitching] = useState(false);

  //////////////////////////////////////////////////////////////BEHAVIOR
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/composers.json");
      const infos: Composer[] = await response.json();
      const data = infos.filter((item) => item.category === "videogame");
      setVideogameInfos(data);
    };
    fetchData();
  }, []);

  const currentArtistInfos = videogameInfos[currentArtistIndex];
  if (!currentArtistInfos) {
    return null;
  }

  const handlePrevArtist = () => {
    setIsArtistSwitching(true);
    setTimeout(() => {
      setCurrentArtistIndex((prevIndex) =>
        prevIndex === 0 ? videogameInfos.length - 1 : prevIndex - 1
      );
      setIsArtistSwitching(false);
    }, 400);
  };

  const handleNextArtist = () => {
    setIsArtistSwitching(true);
    setTimeout(() => {
      setCurrentArtistIndex((prevIndex) =>
        prevIndex === videogameInfos.length - 1 ? 0 : prevIndex + 1
      );
      setIsArtistSwitching(false);
    }, 400);
  };
  //////////////////////////////////////////////////////////////RENDER
  return (
    <>
      <Header />
      <Wrapper>
        <ArtistPresentation>
          <OverlayVideogame
            currentArtistInfos={currentArtistInfos}
            handlePrevArtist={handlePrevArtist}
            handleNextArtist={handleNextArtist}
            isArtistSwitching={!isArtistSwitching}
          />
          <Shadow />
          <ArtistInfosWrapper
            currentArtistInfos={currentArtistInfos}
            isArtistSwitching={!isArtistSwitching}
          />
        </ArtistPresentation>
      </Wrapper>
    </>
  );
}

export default Videogame;
