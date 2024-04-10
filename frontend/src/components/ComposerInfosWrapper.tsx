import styled from "styled-components";
import { Composer, device } from "../utils/constants";
import ComposerInfos from "./ComposerInfos";

/////////////////////////////////////////////////////////////////////////////STYLE

export const ComposerInfosContainer = styled.section<{
  $category: string;
}>`
  position: absolute;
  top: 10%;
  right: 0;
  display: flex;
  width: 44.5vw;
  height: 100vh;
  background-image: url("/acoustic-panel-background.webp");
  background-size: cover;
  z-index: 1;
  @media ${device.xmd} {
    width: 50vw;
  }
`;

const ComposerInfosContent = styled.div<{ $isComposerContentFading: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 90%;
  opacity: ${({ $isComposerContentFading }) =>
    $isComposerContentFading ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  @media ${device.xmd} {
    height: 95%;
  }
`;

const ComposerNameContainer = styled.div`
  /* background-color: red; */
  width: 24.4%;
  height: 8.6vw;
  margin: 0.1em 0 0 2.2vw;
  @media ${device.xmd} {
    width: 25.1%;
  }
`;

const ComposerName = styled.h2`
  color: white;
  font-family: "Bebas Neue";
  font-size: 6.1vw;
  margin: 0;
  padding: 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  @media ${device.xmd} {
    font-size: 6.4vw;
  }
  @supports (-moz-appearance: none) {
    font-size: 5.5vw;
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT

function ComposerInfosWrapper({
  currentComposerInfos,
  isComposerContentFading,
  handlePrevComposer,
  handleNextComposer,
}: {
  currentComposerInfos: Composer;
  isComposerContentFading: boolean;
  handlePrevComposer: () => void;
  handleNextComposer: () => void;
}) {
  // console.log("RENDER COMPOSER INFOS WRAPPER");

  //////////////////////////////////////////////////////RENDER
  return (
    <ComposerInfosContainer $category={currentComposerInfos.category}>
      <ComposerInfosContent $isComposerContentFading={isComposerContentFading}>
        <ComposerNameContainer>
          <ComposerName>{currentComposerInfos.name}</ComposerName>
        </ComposerNameContainer>
        <ComposerInfos
          currentComposerInfos={currentComposerInfos}
          handlePrevComposer={handlePrevComposer}
          handleNextComposer={handleNextComposer}
        ></ComposerInfos>
      </ComposerInfosContent>
    </ComposerInfosContainer>
  );
}

export default ComposerInfosWrapper;
