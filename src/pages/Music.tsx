import { Composer } from "../common/types";
import { getCategoryColor } from "../common/colors";
import styled from "styled-components";
import {
  Wrapper,
  ArtistPresentation,
  ModelImageInfosSeparationLine,
} from "../common/shared-components";
import Header from "../components/Header";
import OverlayMusic from "../components/OverlayMusic";
import ArtistInfosWrapper from "../components/ArtistInfosWrapper";
import { useEffect, useState } from "react";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are shared and come from "/shared-components".

const ImageInfosSeparationLine = styled(ModelImageInfosSeparationLine)`
  left: calc(54%);
`;
/////////////////////////////////////////////////////////////////////////////COMPONENT
function Music() {
  //////////////////////////////////////////////////////////////STATE
  const [musicInfos, setMusicInfos] = useState<Composer[]>([]);
  const [currentArtistIndex, setCurrentArtistIndex] = useState<number>(0);
  const [isArtistContentFading, setisArtistContentFading] = useState(false);

  //////////////////////////////////////////////////////////////BEHAVIOR
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/composers.json");
      const infos: Composer[] = await response.json();
      const data = infos.filter((item) => item.category === "music");
      data.sort((a, b) => a.name.localeCompare(b.name));
      setMusicInfos(data);
    };
    fetchData();
  }, []);

  const currentArtistInfos = musicInfos[currentArtistIndex];
  if (!currentArtistInfos) {
    return null;
  }

  const categoryColor = getCategoryColor(currentArtistInfos.category);

  const handlePrevArtist = () => {
    setisArtistContentFading(true);
    setTimeout(() => {
      setCurrentArtistIndex((prevIndex) =>
        prevIndex === 0 ? musicInfos.length - 1 : prevIndex - 1
      );
      setisArtistContentFading(false);
    }, 400);
  };

  const handleNextArtist = () => {
    setisArtistContentFading(true);
    setTimeout(() => {
      setCurrentArtistIndex((prevIndex) =>
        prevIndex === musicInfos.length - 1 ? 0 : prevIndex + 1
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
          <OverlayMusic
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

export default Music;
