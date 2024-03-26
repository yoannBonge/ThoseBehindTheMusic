import { useState } from "react";
import styled from "styled-components";
import ComposerInfosWrapper from "../components/ComposerInfosWrapper";
import OverlayMusic from "../components/OverlayMusic";
import {
  Composer,
  ComposerPresentation,
  ModelImageInfosSeparationLine,
  PageWrapper,
  device,
  getCategoryColor,
} from "../utils/constants";
import { useComposers } from "../utils/context/composers/useComposers";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are shared and
// come from "/utils/constants".

const ImageInfosSeparationLine = styled(ModelImageInfosSeparationLine)`
  right: 44.5%;
  @media ${device.xmd} {
    right: 50%;
    z-index: 10;
  }
`;
/////////////////////////////////////////////////////////////////////////////COMPONENT
function Music() {
  //////////////////////////////////////////////////////STATE
  const [currentComposerIndex, setCurrentComposerIndex] = useState<number>(0);
  const [isComposerContentFading, setisComposerContentFading] = useState(false);
  const [isComposerPictureSwitching, setIsComposerPictureSwitching] =
    useState(false);
  //////////////////////////////////////////////////////CONTEXT
  const musicComposers: Composer[] = useComposers().musicComposers;

  //////////////////////////////////////////////////////BEHAVIOR
  const currentComposerInfos = musicComposers[currentComposerIndex];
  if (!currentComposerInfos) {
    return null;
  }

  const categoryColor = getCategoryColor(currentComposerInfos.category);

  const handlePrevComposer = async () => {
    setisComposerContentFading(true);
    setIsComposerPictureSwitching(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    setCurrentComposerIndex((prevIndex) =>
      prevIndex === 0 ? musicComposers.length - 1 : prevIndex - 1
    );
    setisComposerContentFading(false);

    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsComposerPictureSwitching(false);
  };

  const handleNextComposer = async () => {
    setisComposerContentFading(true);
    setIsComposerPictureSwitching(true);

    await new Promise((resolve) => setTimeout(resolve, 400));
    setCurrentComposerIndex((prevIndex) =>
      prevIndex === musicComposers.length - 1 ? 0 : prevIndex + 1
    );
    setisComposerContentFading(false);

    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsComposerPictureSwitching(false);
  };

  // console.log("RENDER PAGE MUSIC");

  //////////////////////////////////////////////////////RENDER
  return (
    <>
      <PageWrapper>
        <ComposerPresentation>
          <OverlayMusic
            currentComposerInfos={currentComposerInfos}
            isComposerPictureSwitching={isComposerPictureSwitching}
          />
          <ImageInfosSeparationLine $categoryColor={categoryColor} />
          <ComposerInfosWrapper
            currentComposerInfos={currentComposerInfos}
            isComposerContentFading={!isComposerContentFading}
            handlePrevComposer={handlePrevComposer}
            handleNextComposer={handleNextComposer}
          />
        </ComposerPresentation>
      </PageWrapper>
    </>
  );
}

export default Music;
