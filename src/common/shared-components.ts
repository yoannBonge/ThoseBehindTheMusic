import styled from "styled-components";

//////// pages: Music/Cinema/Videogame shared style components

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: black;
`;

export const ArtistPresentation = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 88.2vh;
  overflow: hidden;
`;

export const ModelImageInfosSeparationLine = styled.div<{ categoryColor: string }>`
  position: absolute;
  top: 0%;
  width: 6px;
  height: 100%;
  background-color: ${(props) => props.categoryColor};
  box-shadow: 0px 0px 4.9px ${(props) => props.categoryColor},
    0px 0px 39px ${(props) => props.categoryColor};
  z-index: 3;
`;

/////// components: OverlayMusic/OverlayCinema/OverlayVideogame shared style components

export const OverlayContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  z-index: 2;
`;

export const Overlay = styled.img`
  height: 100%;
  z-index: 2;
`;