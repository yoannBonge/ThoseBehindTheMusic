import styled from "styled-components";
import {
  MainWrapper,
  BioAndVideosSwitch,
  BioAndVideosWrapper,
  arrayBufferToBase64,
  convertBufferToString,
} from "../utils/constants";
import AudioFader from "./AudioFader";
import VideosContainer from "./VideosContainer";
import { useEffect, useState } from "react";
import { Composer } from "../utils/constants";
import { getCategoryColor } from "../utils/constants";
import Bio from "./Bio";

//////////////////////////////////////////////////////////////STYLE

const BioAndVideosContent = styled.div<{ $shifted: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease-in-out;
  transform: ${(props) =>
    props.$shifted ? "translateX(-100%)" : "translateX(0)"};
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
          return "103%";
        case "videogame":
          return "101.3%";
        case "cinema":
          return "103%";
        default:
          return "103%";
      }
    }}
  );
`;

//////////////////////////////////////////////////////////////COMPONENT
function BioAndVideos({
  currentArtistInfos,
}: {
  currentArtistInfos: Composer;
}) {
  //////////////////////////////////////////////////////////////STATE
  const [isBioAndVideosContentShifted, setisBioAndVideosContentShifted] =
    useState(false);
  const [isSwitched, setIsSwitched] = useState(false);
  const [bioContent, setBioContent] = useState<string>("");

  //////////////////////////////////////////////////////BEHAVIOR
  const categoryColor = getCategoryColor(currentArtistInfos.category);
  const handleSwitchBioAndVideosContent = () => {
    setisBioAndVideosContentShifted(!isBioAndVideosContentShifted);
    setIsSwitched(!isSwitched);
  };

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const textData = convertBufferToString(currentArtistInfos.bio.data);
        setBioContent(textData);
      } catch (error) {
        console.error(
          "Erreur lors de la tentative de récupération des données du fichier bio:",
          error
        );
      }
    };

    fetchBio();
  }, [currentArtistInfos.bio]);

  // console.log("RENDER BIO AND VIDEOS");
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
          <VideosWrapper $category={currentArtistInfos.category}>
            <VideosContainer
              currentArtistInfos={currentArtistInfos}
            ></VideosContainer>
          </VideosWrapper>
        </BioAndVideosContent>
      </BioAndVideosWrapper>
    </MainWrapper>
  );
}

export default BioAndVideos;
