import { Composer } from "../utils/constants";
import styled from "styled-components";
import { ComposerInfosContainer, ComposerName } from "../utils/constants";
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
}: {
  currentComposerInfos: Composer;
  isComposerContentFading: boolean;
}) {
  // console.log("RENDER COMPOSER INFOS WRAPPER");

  //////////////////////////////////////////////////////RENDER
  return (
    <ComposerInfosContainer>
      <ComposerInfosContent $isComposerContentFading={isComposerContentFading}>
        <ComposerName>{currentComposerInfos.name}</ComposerName>
        <ComposerInfos currentComposerInfos={currentComposerInfos} />
      </ComposerInfosContent>
    </ComposerInfosContainer>
  );
}

export default ComposerInfosWrapper;
