import { Composer } from "../utils/constants";
import { getCategoryColor } from "../utils/constants";
import styled from "styled-components";
import {
  PageWrapper,
  ArtistPresentation,
  ModelImageInfosSeparationLine,
} from "../utils/constants";
import OverlayMusic from "../components/OverlayMusic";
import ArtistInfosWrapper from "../components/ArtistInfosWrapper";
import { useEffect, useState } from "react";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are shared and
// come from "/shared-and-isolated-components".

const ImageInfosSeparationLine = styled(ModelImageInfosSeparationLine)`
  left: calc(55%);
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

  // console.log("RENDER PAGE MUSIC");

  //////////////////////////////////////////////////////////////RENDER
  return (
    <>
      <PageWrapper>
        <ArtistPresentation>
          <OverlayMusic
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

export default Music;
