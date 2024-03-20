import { useState } from "react";
import styled from "styled-components";
import ComposerInfosWrapper from "../components/ComposerInfosWrapper";
import OverlayMusic from "../components/OverlayMusic";
import {
  Composer,
  ComposerPresentation,
  ModelImageInfosSeparationLine,
  PageWrapper,
  getCategoryColor,
} from "../utils/constants";
import { useComposers } from "../utils/context/composers/useComposers";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are shared and
// come from "/utils/constants".

const ImageInfosSeparationLine = styled(ModelImageInfosSeparationLine)`
  left: calc(55%);
  @supports (-moz-appearance: none) {
    left: calc(58%);
  }
`;
/////////////////////////////////////////////////////////////////////////////COMPONENT
function Music() {
  //////////////////////////////////////////////////////STATE
  const [currentComposerIndex, setCurrentComposerIndex] = useState<number>(0);
  const [isComposerContentFading, setisComposerContentFading] = useState(false);
  //////////////////////////////////////////////////////CONTEXT
  const musicComposers: Composer[] = useComposers().musicComposers;

  //////////////////////////////////////////////////////BEHAVIOR
  const currentComposerInfos = musicComposers[currentComposerIndex];
  if (!currentComposerInfos) {
    return null;
  }

  const categoryColor = getCategoryColor(currentComposerInfos.category);

  const handlePrevComposer = () => {
    setisComposerContentFading(true);
    setTimeout(() => {
      setCurrentComposerIndex((prevIndex) =>
        prevIndex === 0 ? musicComposers.length - 1 : prevIndex - 1
      );
      setisComposerContentFading(false);
    }, 400);
  };

  const handleNextComposer = () => {
    setisComposerContentFading(true);
    setTimeout(() => {
      setCurrentComposerIndex((prevIndex) =>
        prevIndex === musicComposers.length - 1 ? 0 : prevIndex + 1
      );
      setisComposerContentFading(false);
    }, 400);
  };

  // console.log("RENDER PAGE MUSIC");

  //////////////////////////////////////////////////////RENDER
  return (
    <>
      <PageWrapper>
        <ComposerPresentation>
          <OverlayMusic
            currentComposerInfos={currentComposerInfos}
            handlePrevComposer={handlePrevComposer}
            handleNextComposer={handleNextComposer}
          />
          <ImageInfosSeparationLine $categoryColor={categoryColor} />
          <ComposerInfosWrapper
            currentComposerInfos={currentComposerInfos}
            isComposerContentFading={!isComposerContentFading}
          />
        </ComposerPresentation>
      </PageWrapper>
    </>
  );
}

export default Music;
