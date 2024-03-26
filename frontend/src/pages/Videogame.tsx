import { useState } from "react";
import styled from "styled-components";
import ComposerInfosWrapper from "../components/ComposerInfosWrapper";
import OverlayVideogame from "../components/OverlayVideogame";
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
  right: 43.4%;
  @media ${device.xmd} {
    right: 50%;
    z-index: 10;
  }
`;
/////////////////////////////////////////////////////////////////////////////COMPONENT
function Videogame() {
  //////////////////////////////////////////////////////////////STATE
  const [currentComposerIndex, setCurrentComposerIndex] = useState<number>(0);
  const [isComposerContentFading, setisComposerContentFading] = useState(false);
  const [isComposerPictureSwitching, setIsComposerPictureSwitching] =
    useState(false);
  //////////////////////////////////////////////////////////////CONTEXT
  const videogameComposers: Composer[] = useComposers().videogameComposers;

  //////////////////////////////////////////////////////////////BEHAVIOR
  const currentComposerInfos = videogameComposers[currentComposerIndex];
  if (!currentComposerInfos) {
    return null;
  }

  const categoryColor = getCategoryColor(currentComposerInfos.category);

  const handlePrevComposer = async () => {
    setisComposerContentFading(true);
    setIsComposerPictureSwitching(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    setCurrentComposerIndex((prevIndex) =>
      prevIndex === 0 ? videogameComposers.length - 1 : prevIndex - 1
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
      prevIndex === videogameComposers.length - 1 ? 0 : prevIndex + 1
    );
    setisComposerContentFading(false);

    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsComposerPictureSwitching(false);
  };

  // console.log("RENDER PAGE VIDEOGAME");

  //////////////////////////////////////////////////////RENDER
  return (
    <>
      <PageWrapper>
        <ComposerPresentation>
          <OverlayVideogame
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

export default Videogame;
