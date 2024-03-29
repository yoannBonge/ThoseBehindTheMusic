import { useState } from "react";
import styled from "styled-components";
import ComposerInfosWrapper from "../components/ComposerInfosWrapper";
import OverlayCinema from "../components/OverlayCinema";
import OverlayMusic from "../components/OverlayMusic";
import OverlayVideogame from "../components/OverlayVideogame";
import { Composer, device, getCategoryColor } from "../utils/constants";
import { useComposers } from "../utils/context/composers/useComposers";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some styled-components appearing in the render are shared and
// come from "/utils/constants".

const PageWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 90vh;
  background-color: black;
  overflow: hidden;
`;

const ComposerPresentation = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  @media ${device.xs} {
    flex-direction: column-reverse;
  }
`;

const ImageInfosSeparationLine = styled.div<{
  $categoryColor: string;
}>`
  position: absolute;
  right: 44.5%;
  display: flex;
  width: 0.6vw;
  height: 90%;
  background-color: ${(props) => props.$categoryColor};
  box-shadow: 0px 0px 4.9px ${(props) => props.$categoryColor},
    0px 0px 39px ${(props) => props.$categoryColor};
  z-index: 1;
  @media ${device.xmd} {
    right: 50%;
    z-index: 2;
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT

interface CategoriesProps {
  category: "music" | "cinema" | "videogame";
}
function Composers({ category }: CategoriesProps) {
  //////////////////////////////////////////////////////STATE
  const [currentComposerIndex, setCurrentComposerIndex] = useState<number>(0);
  const [isComposerContentFading, setisComposerContentFading] = useState(false);
  const [isComposerPictureSwitching, setIsComposerPictureSwitching] =
    useState(false);

  //////////////////////////////////////////////////////CONTEXT
  let composers = null;
  const musicComposers: Composer[] = useComposers().musicComposers;
  const cinemaComposers: Composer[] = useComposers().cinemaComposers;
  const videogameComposers: Composer[] = useComposers().videogameComposers;

  //////////////////////////////////////////////////////BEHAVIOR
  let currentComposerInfos: Composer | undefined;
  let overlayComponent;

  switch (category) {
    case "music":
      composers = musicComposers;
      currentComposerInfos = musicComposers[currentComposerIndex];
      overlayComponent = (
        <OverlayMusic
          currentComposerInfos={currentComposerInfos}
          isComposerPictureSwitching={isComposerPictureSwitching}
        />
      );
      break;
    case "cinema":
      composers = cinemaComposers;
      currentComposerInfos = cinemaComposers[currentComposerIndex];
      overlayComponent = (
        <OverlayCinema
          currentComposerInfos={currentComposerInfos}
          isComposerPictureSwitching={isComposerPictureSwitching}
        />
      );
      break;
    case "videogame":
      composers = videogameComposers;
      currentComposerInfos = videogameComposers[currentComposerIndex];
      overlayComponent = (
        <OverlayVideogame
          currentComposerInfos={currentComposerInfos}
          isComposerPictureSwitching={isComposerPictureSwitching}
        />
      );
      break;
  }
  if (!currentComposerInfos) {
    return null;
  }

  const categoryColor = getCategoryColor(currentComposerInfos.category);

  const handlePrevComposer = async () => {
    setisComposerContentFading(true);
    setIsComposerPictureSwitching(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    setCurrentComposerIndex((prevIndex) =>
      prevIndex === 0 ? composers.length - 1 : prevIndex - 1
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
      prevIndex === composers.length - 1 ? 0 : prevIndex + 1
    );
    setisComposerContentFading(false);

    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsComposerPictureSwitching(false);
  };

  // console.log("RENDER PAGE COMPOSERS");

  //////////////////////////////////////////////////////RENDER
  return (
    <PageWrapper>
      <ComposerPresentation>
        {overlayComponent}
        <ImageInfosSeparationLine $categoryColor={categoryColor} />
        <ComposerInfosWrapper
          currentComposerInfos={currentComposerInfos}
          isComposerContentFading={!isComposerContentFading}
          handlePrevComposer={handlePrevComposer}
          handleNextComposer={handleNextComposer}
        />
      </ComposerPresentation>
    </PageWrapper>
  );
}

export default Composers;
