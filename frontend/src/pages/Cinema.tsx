import { useState } from "react";
import ComposerInfosWrapper from "../components/ComposerInfosWrapper";
import OverlayCinema from "../components/OverlayCinema";
import {
  Composer,
  ComposerPresentation,
  ImageInfosSeparationLine,
  PageWrapper,
  getCategoryColor,
} from "../utils/constants";
import { useComposers } from "../utils/context/composers/useComposers";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are shared and
// come from "/utils/constants".

/////////////////////////////////////////////////////////////////////////////COMPONENT
function Cinema() {
  //////////////////////////////////////////////////////STATE
  const [currentComposerIndex, setCurrentComposerIndex] = useState<number>(0);
  const [isComposerContentFading, setisComposerContentFading] = useState(false);
  const [isComposerPictureSwitching, setIsComposerPictureSwitching] =
    useState(false);

  //////////////////////////////////////////////////////CONTEXT
  const cinemaComposers: Composer[] = useComposers().cinemaComposers;

  //////////////////////////////////////////////////////BEHAVIOR
  const currentComposerInfos = cinemaComposers[currentComposerIndex];
  if (!currentComposerInfos) {
    return null;
  }

  const categoryColor = getCategoryColor(currentComposerInfos.category);

  const handlePrevComposer = async () => {
    setisComposerContentFading(true);
    setIsComposerPictureSwitching(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    setCurrentComposerIndex((prevIndex) =>
      prevIndex === 0 ? cinemaComposers.length - 1 : prevIndex - 1
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
      prevIndex === cinemaComposers.length - 1 ? 0 : prevIndex + 1
    );
    setisComposerContentFading(false);

    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsComposerPictureSwitching(false);
  };

  // console.log("RENDER PAGE CINEMA");

  //////////////////////////////////////////////////////RENDER
  return (
    <>
      <PageWrapper>
        <ComposerPresentation>
          <OverlayCinema
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

export default Cinema;
