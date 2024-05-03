import { useParams } from "react-router-dom";
import styled from "styled-components";
import ComposerInfosWrapper from "../components/ComposerInfosWrapper";
import OverlayCinema from "../components/OverlayCinema";
import OverlayMusic from "../components/OverlayMusic";
import OverlayVideogame from "../components/OverlayVideogame";
import { Composer, device, getCategoryColor } from "../utils/constants";
import { useComposers } from "../utils/context/useComposers";

/////////////////////////////////////////////////////////////////////////////STYLE

const PageWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  overflow: hidden;
`;

const ComposerPresentation = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  @media ${device.md} {
    flex-direction: column;
  }
`;

const ImageInfosSeparationLine = styled.div<{
  $categoryColor: string;
}>`
  position: absolute;
  right: 44.5%;
  display: flex;
  width: 0.6vw;
  height: 100vh;
  background-color: ${(props) => props.$categoryColor};
  box-shadow: 0px 0px 4.9px ${(props) => props.$categoryColor},
    0px 0px 39px ${(props) => props.$categoryColor};
  z-index: 1;
  overflow: hidden;
  @media ${device.xmd} {
    right: 50%;
    z-index: 2;
  }
  @media ${device.md} {
    position: static;
    width: 100vw;
    height: 0.4%;
  }
`;

const Indication = styled.div`
  color: white;
  font-family: "Afacad";
  font-size: 3em;
  text-align: center;
  margin-top: 40vh;
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT

function SpecificComposer() {
  //////////////////////////////////////////////////////STATE

  //////////////////////////////////////////////////////////////ID
  const { id } = useParams();
  //////////////////////////////////////////////////////CONTEXT
  const allComposers: Composer[] = useComposers().allComposers;

  //////////////////////////////////////////////////////BEHAVIOR
  const currentComposerInfos = allComposers.find(
    (composer) => composer._id === id
  );
  if (!currentComposerInfos) {
    return <Indication>Compositeur non trouvé...</Indication>;
  }

  let overlayComponent;

  switch (currentComposerInfos.category) {
    case "music":
      overlayComponent = (
        <OverlayMusic
          currentComposerInfos={currentComposerInfos}
          isComposerPictureSwitching={false}
        />
      );
      break;
    case "cinema":
      overlayComponent = (
        <OverlayCinema
          currentComposerInfos={currentComposerInfos}
          isComposerPictureSwitching={false}
        />
      );
      break;
    case "videogame":
      overlayComponent = (
        <OverlayVideogame
          currentComposerInfos={currentComposerInfos}
          isComposerPictureSwitching={false}
        />
      );
      break;
  }

  const categoryColor = getCategoryColor(currentComposerInfos.category);

  // console.log("RENDER PAGE SPECIFIC COMPOSER");

  //////////////////////////////////////////////////////RENDER
  return (
    <PageWrapper>
      <ComposerPresentation>
        {overlayComponent}
        <ImageInfosSeparationLine $categoryColor={categoryColor} />
        <ComposerInfosWrapper
          currentComposerInfos={currentComposerInfos}
          isComposerContentFading={true}
          isSpecificComposer={true}
          handlePrevComposer={() => {}}
          handleNextComposer={() => {}}
        />
      </ComposerPresentation>
    </PageWrapper>
  );
}

export default SpecificComposer;
