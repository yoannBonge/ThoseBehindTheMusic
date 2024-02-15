import { Composer } from "../common/types";
import styled from "styled-components";
import ArtistInfos from "./ArtistInfos";

/////////////////////////////////////////////////////////////////////////////STYLE
const ArtistInfosContainer = styled.div`
  display: flex;
  height: 88.2vh;
  background-image: url("black-background.webp");
  background-size: cover;
  z-index: 0;
`;

const ArtistInfosContent = styled.div<{ isArtistContentFading: boolean }>`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  opacity: ${({ isArtistContentFading }) => (isArtistContentFading ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const ArtistName = styled.h2`
  color: white;
  font-family: "Bebas Neue";
  font-size: 6em;
  margin: 0.1em 0 0 1.2rem;
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT

function ArtistInfosWrapper({
  currentArtistInfos,
  isArtistContentFading,
}: {
  currentArtistInfos: Composer;
  isArtistContentFading: boolean;
}) {
  //////////////////////////////////////////////////////RENDER
  return (
    <ArtistInfosContainer>
      <ArtistInfosContent isArtistContentFading={isArtistContentFading}>
        <ArtistName>{currentArtistInfos.name}</ArtistName>
        <ArtistInfos currentArtistInfos={currentArtistInfos} />
      </ArtistInfosContent>
    </ArtistInfosContainer>
  );
}

export default ArtistInfosWrapper;
