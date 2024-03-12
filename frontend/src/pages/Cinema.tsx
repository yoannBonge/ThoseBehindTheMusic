import { Composer } from "../utils/constants";
import { getCategoryColor } from "../utils/constants";
import styled from "styled-components";
import {
  PageWrapper,
  ComposerPresentation,
  ModelImageInfosSeparationLine,
} from "../utils/constants";
import OverlayCinema from "../components/OverlayCinema";
import ComposerInfosWrapper from "../components/ComposerInfosWrapper";
import { useState } from "react";
import { useComposers } from "../utils/ComposersContext";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are shared and
// come from "/utils/constants".

const ImageInfosSeparationLine = styled(ModelImageInfosSeparationLine)`
  left: calc(54.6%);
`;
/////////////////////////////////////////////////////////////////////////////COMPONENT
function Cinema() {
  //////////////////////////////////////////////////////STATE
  const [currentComposerIndex, setCurrentComposerIndex] = useState<number>(0);
  const [isComposerContentFading, setisComposerContentFading] = useState(false);

  //////////////////////////////////////////////////////CONTEXT
  const cinemaComposers: Composer[] = useComposers().cinemaComposers;

  //////////////////////////////////////////////////////BEHAVIOR
  const currentComposerInfos = cinemaComposers[currentComposerIndex];
  if (!currentComposerInfos) {
    return null;
  }

  const categoryColor = getCategoryColor(currentComposerInfos.category);

  const handlePrevComposer = () => {
    setisComposerContentFading(true);
    setTimeout(() => {
      setCurrentComposerIndex((prevIndex) =>
        prevIndex === 0 ? cinemaComposers.length - 1 : prevIndex - 1
      );
      setisComposerContentFading(false);
    }, 400);
  };

  const handleNextComposer = () => {
    setisComposerContentFading(true);
    setTimeout(() => {
      setCurrentComposerIndex((prevIndex) =>
        prevIndex === cinemaComposers.length - 1 ? 0 : prevIndex + 1
      );
      setisComposerContentFading(false);
    }, 400);
  };

  // console.log("RENDER PAGE CINEMA");

  //////////////////////////////////////////////////////RENDER
  return (
    <>
      <PageWrapper>
        <ComposerPresentation>
          <OverlayCinema
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

export default Cinema;
