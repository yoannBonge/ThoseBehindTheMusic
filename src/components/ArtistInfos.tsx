import { Composer } from "../common/types";
import { getCategoryColor } from "../common/colors";
import ReactCountryFlag from "react-country-flag";
import styled from "styled-components";
import AudioFader from "./AudioFader";
import VideosContainer from "./VideosContainer";
import { useState } from "react";

/////////////////////////////////////////////////////////////////////////////STYLE

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 2.1em;
  width: 100%;
  height: 77%;
  margin-left: 1.2rem;
`;

const ArtistInfosElement = styled.li`
  list-style-type: none;
  color: white;
  font-family: "Afacad";
  font-size: 1.5em;
`;

const Property = styled.span<{ categoryColor: string }>`
  color: ${(props) => props.categoryColor};
  font-family: "Afacad";
  font-size: 1.5rem;
`;

const CountryFlag = styled(ReactCountryFlag)`
  font-size: 1.3em;
  margin: 0 0.5em;
`;

const NotableWorksContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const NotableWorksList = styled.ul`
  padding-left: 0.3em;
  margin: 0;
  line-height: 1.3em;
`;

const NotableWorksElement = styled.li`
  list-style-type: none;
  color: white;
  font-family: "Afacad";
  font-size: 1em;
`;

const SeparationLine = styled.div<{ categoryColor: string }>`
  width: 52%;
  height: 2px;
  border-radius: 25px;
  margin: 0.5em 0 0.5em 0;
  background-color: ${(props) => props.categoryColor};
`;

const BioAndVideosSwitch = styled.div<{ categoryColor: string }>`
  display: flex;
  align-items: center;
  font-family: "Afacad";
  font-size: 1.5em;
  font-weight: 400;
  color: ${(props) => props.categoryColor};
`;

const BioAndVideosWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 45%;
`;

const BioAndVideosContent = styled.div<{ shifted: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease-in-out;
  transform: ${(props) =>
    props.shifted ? "translateX(-100%)" : "translateX(0)"};
`;

const Bio = styled.p`
  font-family: "Afacad";
  font-size: 1.5em;
  margin: 0;
  width: 40vw;
  color: white;
  line-height: 1.2em;
  overflow-y: auto;
  margin-top: 0.5em;
`;

const VideosWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40vw;
  height: 100%;
  margin: auto;
  transform: translateX(106%);
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function ArtistInfos({ currentArtistInfos }: { currentArtistInfos: Composer }) {
  //////////////////////////////////////////////////////////////STATE
  const [isBioAndVideosContentShifted, setisBioAndVideosContentShifted] =
    useState(false);
  const [isSwitched, setIsSwitched] = useState(false);

  //////////////////////////////////////////////////////BEHAVIOR
  const categoryColor = getCategoryColor(currentArtistInfos.category);
  const handleSwitchBioAndVideosContent = () => {
    setisBioAndVideosContentShifted(!isBioAndVideosContentShifted);
    setIsSwitched(!isSwitched);
  };

  //////////////////////////////////////////////////////RENDER
  return (
    <Wrapper>
      <ArtistInfosElement>
        <Property categoryColor={categoryColor}>Naissance : </Property>
        {currentArtistInfos.birth} - {currentArtistInfos.birthPlace}{" "}
        <CountryFlag countryCode={currentArtistInfos.countryFlag} svg />
      </ArtistInfosElement>
      {currentArtistInfos.birthname && (
        <ArtistInfosElement>
          <Property categoryColor={categoryColor}>Nom de naissance : </Property>
          {currentArtistInfos.birthname}
        </ArtistInfosElement>
      )}
      {currentArtistInfos.death !== "" && (
        <ArtistInfosElement>
          <Property categoryColor={categoryColor}>Décès : </Property>
          {currentArtistInfos.death}{" "}
        </ArtistInfosElement>
      )}
      {currentArtistInfos.musicalGenre && (
        <ArtistInfosElement>
          <Property categoryColor={categoryColor}>Genre musical : </Property>
          {currentArtistInfos.musicalGenre}
        </ArtistInfosElement>
      )}
      <ArtistInfosElement>
        <NotableWorksContainer>
          <Property categoryColor={categoryColor}>Oeuvres notables : </Property>
          <NotableWorksList>
            <NotableWorksElement>
              {currentArtistInfos.related[0]}
            </NotableWorksElement>
            <NotableWorksElement>
              {currentArtistInfos.related[1]}
            </NotableWorksElement>
            <NotableWorksElement>
              {currentArtistInfos.related[2]}
            </NotableWorksElement>
          </NotableWorksList>
        </NotableWorksContainer>
      </ArtistInfosElement>
      <SeparationLine categoryColor={categoryColor} />
      <BioAndVideosSwitch categoryColor={categoryColor}>
        Présentation
        <AudioFader
          switched={isSwitched}
          onToggle={handleSwitchBioAndVideosContent}
        />
        Écouter
      </BioAndVideosSwitch>
      <BioAndVideosWrapper>
        <BioAndVideosContent shifted={isBioAndVideosContentShifted}>
          <Bio>{currentArtistInfos.bio}</Bio>
          <VideosWrapper>
            <VideosContainer
              currentArtistInfos={currentArtistInfos}
            ></VideosContainer>
          </VideosWrapper>
        </BioAndVideosContent>
      </BioAndVideosWrapper>
    </Wrapper>
  );
}

export default ArtistInfos;
