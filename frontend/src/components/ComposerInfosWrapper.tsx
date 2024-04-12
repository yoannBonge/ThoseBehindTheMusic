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
  @media ${device.switchDisplay} {
    position: static;
    width: 100vw;
    height: 65vh;
  }
`;

const ComposerInfosContent = styled.div<{ $isComposerContentFading: boolean }>`
  /* background-color: #2c279a; */
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
  @media ${device.switchDisplay} {
    height: 83%;
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
