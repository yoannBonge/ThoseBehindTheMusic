import { Composer } from "../utils/constants";
import styled from "styled-components";
import { ArtistInfosContainer, ArtistName } from "../utils/constants";
import ArtistInfos from "./ArtistInfos";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are isolated and
// come from "/shared-and-isolated-components".

const ArtistInfosContent = styled.div<{ $isArtistContentFading: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  opacity: ${({ $isArtistContentFading }) => ($isArtistContentFading ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT

function ArtistInfosWrapper({
  currentArtistInfos,
  isArtistContentFading,
}: {
  currentArtistInfos: Composer;
  isArtistContentFading: boolean;
}) {
  // console.log("RENDER ARTIST INFOS WRAPPER");

  //////////////////////////////////////////////////////RENDER
  return (
    <ArtistInfosContainer>
      <ArtistInfosContent $isArtistContentFading={isArtistContentFading}>
        <ArtistName>{currentArtistInfos.name}</ArtistName>
        <ArtistInfos currentArtistInfos={currentArtistInfos} />
      </ArtistInfosContent>
    </ArtistInfosContainer>
  );
}

export default ArtistInfosWrapper;
