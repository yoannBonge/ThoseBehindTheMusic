import { Composer } from "../common/types";
import { getCategoryColor } from "../common/colors";
import styled from "styled-components";
import {
  Wrapper,
  ArtistPresentation,
  ModelImageInfosSeparationLine,
} from "../common/shared-components";
import Header from "../components/Header";
import OverlayVideogame from "../components/OverlayVideogame";
import ArtistInfosWrapper from "../components/ArtistInfosWrapper";
import { useEffect, useState } from "react";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are shared and come from "/shared-components".

const ImageInfosSeparationLine = styled(ModelImageInfosSeparationLine)`
  left: calc(55%);
`;
/////////////////////////////////////////////////////////////////////////////COMPONENT
function Videogame() {
  //////////////////////////////////////////////////////////////STATE
  const [videogameInfos, setVideogameInfos] = useState<Composer[]>([]);
  const [currentArtistIndex, setCurrentArtistIndex] = useState<number>(0);
  const [isArtistContentFading, setisArtistContentFading] = useState(false);

  //////////////////////////////////////////////////////////////BEHAVIOR
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/composers.json");
      const infos: Composer[] = await response.json();
      const data = infos.filter((item) => item.category === "videogame");
      data.sort((a, b) => a.name.localeCompare(b.name));
      setVideogameInfos(data);
    };
    fetchData();
  }, []);

  const currentArtistInfos = videogameInfos[currentArtistIndex];
  if (!currentArtistInfos) {
    return null;
  }

  const categoryColor = getCategoryColor(currentArtistInfos.category);

  const handlePrevArtist = () => {
    setisArtistContentFading(true);
    setTimeout(() => {
      setCurrentArtistIndex((prevIndex) =>
        prevIndex === 0 ? videogameInfos.length - 1 : prevIndex - 1
      );
      setisArtistContentFading(false);
    }, 400);
  };

  const handleNextArtist = () => {
    setisArtistContentFading(true);
    setTimeout(() => {
      setCurrentArtistIndex((prevIndex) =>
        prevIndex === videogameInfos.length - 1 ? 0 : prevIndex + 1
      );
      setisArtistContentFading(false);
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
          />
          <ImageInfosSeparationLine categoryColor={categoryColor} />
          <ArtistInfosWrapper
            currentArtistInfos={currentArtistInfos}
            isArtistContentFading={!isArtistContentFading}
          />
        </ArtistPresentation>
      </Wrapper>
    </>
  );
}

export default Videogame;
