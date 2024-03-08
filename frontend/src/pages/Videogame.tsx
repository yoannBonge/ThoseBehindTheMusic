import { Composer } from "../utils/constants";
import { getCategoryColor } from "../utils/constants";
import styled from "styled-components";
import {
  PageWrapper,
  ArtistPresentation,
  ModelImageInfosSeparationLine,
} from "../utils/constants";
import OverlayVideogame from "../components/OverlayVideogame";
import ArtistInfosWrapper from "../components/ArtistInfosWrapper";
import { useState } from "react";
import { useComposers } from "../utils/ComposersContext";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are shared and
// come from "/shared-and-isolated-components".

const ImageInfosSeparationLine = styled(ModelImageInfosSeparationLine)`
  left: calc(56%);
`;
/////////////////////////////////////////////////////////////////////////////COMPONENT
function Videogame() {
  //////////////////////////////////////////////////////////////STATE
  const composersInfos: Composer[] = useComposers();
  const [currentArtistIndex, setCurrentArtistIndex] = useState<number>(0);
  const [isArtistContentFading, setisArtistContentFading] = useState(false);

  //////////////////////////////////////////////////////////////BEHAVIOR
  const filteredData = composersInfos
    .filter((item) => item.category === "videogame")
    .sort((a, b) => a.name.localeCompare(b.name));

  const currentArtistInfos = filteredData[currentArtistIndex];
  if (!currentArtistInfos) {
    return null;
  }

  const categoryColor = getCategoryColor(currentArtistInfos.category);

  const handlePrevArtist = () => {
    setisArtistContentFading(true);
    setTimeout(() => {
      setCurrentArtistIndex((prevIndex) =>
        prevIndex === 0 ? filteredData.length - 1 : prevIndex - 1
      );
      setisArtistContentFading(false);
    }, 400);
  };

  const handleNextArtist = () => {
    setisArtistContentFading(true);
    setTimeout(() => {
      setCurrentArtistIndex((prevIndex) =>
        prevIndex === filteredData.length - 1 ? 0 : prevIndex + 1
      );
      setisArtistContentFading(false);
    }, 400);
  };

  // console.log("RENDER PAGE VIDEOGAME");

  //////////////////////////////////////////////////////////////RENDER
  return (
    <>
      <PageWrapper>
        <ArtistPresentation>
          <OverlayVideogame
            currentArtistInfos={currentArtistInfos}
            handlePrevArtist={handlePrevArtist}
            handleNextArtist={handleNextArtist}
          />
          <ImageInfosSeparationLine $categoryColor={categoryColor} />
          <ArtistInfosWrapper
            currentArtistInfos={currentArtistInfos}
            isArtistContentFading={!isArtistContentFading}
          />
        </ArtistPresentation>
      </PageWrapper>
    </>
  );
}

export default Videogame;
