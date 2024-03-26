import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BioAndVideosSwitch,
  BioAndVideosWrapper,
  Composer,
  MainWrapper,
  convertBufferToString,
  device,
  getCategoryColor,
} from "../utils/constants";
import AudioFader from "./AudioFader";
import Bio from "./Bio";
import VideosContainer from "./VideosContainer";

//////////////////////////////////////////////////////////////STYLE

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

const VideosWrapper = styled.div<{ $category: string }>`
  display: flex;
  justify-content: space-between;
  align-self: center;
  width: 40vw;
  height: 100%;
  margin: auto;
  transform: translateX(
    ${(props) => {
      switch (props.$category) {
        case "music":
          return "102%";
        case "cinema":
          return "102%";
        case "videogame":
          return "100.7%";
        default:
          return "103%";
      }
    }}
  );
  @media ${device.xmd} {
    transform: translateX(105%);
  }

  @supports (-moz-appearance: none) {
    width: 38.3vw;
    transform: translateX(
      ${(props) => {
        switch (props.$category) {
          case "music":
            return "101%";
          case "videogame":
            return "100%";
          case "cinema":
            return "101.6%";
          default:
            return "103%";
        }
      }}
    );
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
    <MainWrapper>
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
          <VideosWrapper $category={currentComposerInfos.category}>
            <VideosContainer
              currentComposerInfos={currentComposerInfos}
            ></VideosContainer>
          </VideosWrapper>
        </BioAndVideosContent>
      </BioAndVideosWrapper>
    </MainWrapper>
  );
}

export default BioAndVideos;
