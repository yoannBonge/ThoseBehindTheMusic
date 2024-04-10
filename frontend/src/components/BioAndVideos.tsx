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
  flex-grow: 1;
  margin-bottom: 0.7em;
  flex-direction: column;
  justify-content: flex-end;
  /* height: 13.4em; */
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
`;

const BioAndVideosWrapper = styled.div`
  /* background-color: red; */
  display: flex;
  width: 51.3%;
  /* height: 78%; */
  /* margin-top: 1vw; */
  overflow: hidden;
`;

const BioAndVideosContent = styled.div<{ $shifted: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease-in-out;
  transform: ${(props) =>
    props.$shifted ? "translateX(-100%)" : "translateX(0)"};
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
    width: 45.8vw;
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
  const handleSwitchBioAndVideosContent = () => {
    setisBioAndVideosContentShifted(!isBioAndVideosContentShifted);
    setIsSwitched(!isSwitched);
  };

  useEffect(() => {
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
