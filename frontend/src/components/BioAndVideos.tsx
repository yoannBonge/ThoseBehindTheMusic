import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Composer,
  convertBufferToString,
  device,
  getCategoryColor,
} from "../utils/constants";
import AudioFader from "./AudioFader";
import Bio from "./Bio";
import CarouselVideosContainer from "./CarouselVideosContainer";

//////////////////////////////////////////////////////////////STYLE

const MainBioAndVideosWrapper = styled.section`
  /* background-color: red; */
  display: flex;
  height: auto;
  flex-grow: 1;
  margin-bottom: 0.7em;
  flex-direction: column;
  margin-left: 1.3vw;
  overflow: hidden;
`;

const BioAndVideosSwitch = styled.div<{ $categoryColor: string }>`
  display: flex;
  align-items: center;
  width: 45%;
  font-family: "Afacad";
  font-size: 1.5vw;
  font-weight: 400;
  color: ${(props) => props.$categoryColor};
  @media ${device.lg} {
    font-size: 1.8vw;
  }
  @media ${device.switchDisplay} {
    width: 14.5em;
    font-size: 0.9em;
  }
`;

const BioAndVideosWrapper = styled.div`
  /* background-color: #aa2a95; */
  display: flex;
  width: 51.3%;
  margin-top: 1vw;
  overflow: hidden;
  @media ${device.switchDisplay} {
    width: 23.8%;
    margin-top: 1.5vw;
    height: 82%;
  }
`;

const BioAndVideosContent = styled.div<{ $shifted: boolean }>`
  /* background-color: #28248d; */
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease-in-out;
  transform: ${(props) =>
    props.$shifted ? "translateX(-100%)" : "translateX(0)"};
  @media ${device.switchDisplay} {
    transform: ${(props) =>
      props.$shifted ? "translateX(-98.3%)" : "translateX(0)"};
  }
  @supports (-moz-appearance: none) {
    height: 107%;
  }
`;

const VideosWrapper = styled.div`
  /* background-color: #1a4a73; */
  display: flex;
  justify-content: space-between;
  width: 41.6vw;
  height: 100%;
  transform: translateX(100.3%);
  @media ${device.xmd} {
    transform: translateX(100.5%);
    width: 100vw;
  }
  @media ${device.switchDisplay} {
    /* transform: translateX(101%); */
  }
`;

//////////////////////////////////////////////////////////////COMPONENT
function BioAndVideos({
  currentComposerInfos,
}: {
  currentComposerInfos: Composer;
}) {
  //////////////////////////////////////////////////////////////STATE
  const [isBioAndVideosContentShifted, setisBioAndVideosContentShifted] =
    useState(false);
  const [isSwitched, setIsSwitched] = useState(false);
  const [bioContent, setBioContent] = useState<string>("");

  //////////////////////////////////////////////////////BEHAVIOR
  const categoryColor = getCategoryColor(currentComposerInfos.category);
  const defaultMessage =
    "La présentation du compositeur arrive prochainement... Vous pouvez toujours écouter quelques-unes de ses œuvres en cliquant sur le bouton ci-dessus !";
  const handleSwitchBioAndVideosContent = () => {
    setisBioAndVideosContentShifted(!isBioAndVideosContentShifted);
    setIsSwitched(!isSwitched);
  };

  useEffect(() => {
    if (!currentComposerInfos.bio) {
      setBioContent(defaultMessage);
    } else {
      const fetchBio = async () => {
        try {
          const textData = convertBufferToString(currentComposerInfos.bio.data);
          setBioContent(textData);
        } catch (error) {
          console.error(
            "Erreur lors de la tentative de récupération des données du fichier bio:",
            error
          );
        }
      };

      fetchBio();
    }
  }, [currentComposerInfos.bio]);

  // console.log("RENDER BIO AND VIDEOS");

  //////////////////////////////////////////////////////RENDER
  return (
    <MainBioAndVideosWrapper>
      <BioAndVideosSwitch $categoryColor={categoryColor}>
        Présentation
        <AudioFader
          switched={isSwitched}
          onToggle={handleSwitchBioAndVideosContent}
        />
        Écouter
      </BioAndVideosSwitch>
      <BioAndVideosWrapper>
        <BioAndVideosContent $shifted={isBioAndVideosContentShifted}>
          <Bio bioContent={bioContent} />
          <VideosWrapper>
            <CarouselVideosContainer
              currentComposerInfos={currentComposerInfos}
            ></CarouselVideosContainer>
          </VideosWrapper>
        </BioAndVideosContent>
      </BioAndVideosWrapper>
    </MainBioAndVideosWrapper>
  );
}

export default BioAndVideos;
