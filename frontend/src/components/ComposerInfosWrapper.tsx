import styled from "styled-components";
import {
  Composer,
  ComposerInfosContainer,
  ComposerName,
  ComposerNameContainer,
} from "../utils/constants";
import ComposerInfos from "./ComposerInfos";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are isolated and
// come from "/utils/constants".

const ComposerInfosContent = styled.div<{ $isComposerContentFading: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  opacity: ${({ $isComposerContentFading }) =>
    $isComposerContentFading ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
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
        <ComposerNameContainer $category={currentComposerInfos.category}>
          <ComposerName>{currentComposerInfos.name}</ComposerName>
        </ComposerNameContainer>
        <ComposerInfos
          currentComposerInfos={currentComposerInfos}
          handlePrevComposer={handlePrevComposer}
          handleNextComposer={handleNextComposer}
        />
      </ComposerInfosContent>
    </ComposerInfosContainer>
  );
}

export default ComposerInfosWrapper;
