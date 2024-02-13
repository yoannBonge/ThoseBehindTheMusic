import ReactCountryFlag from "react-country-flag";
import styled from "styled-components";
import AudioFader from "./AudioFader";
import VideosContainer from "./VideosContainer";
import { useState } from "react";

/////////////////////////////////////////////////////////////////////////////STYLE
const ArtistInfosContainer = styled.div`
  display: flex;
  height: 88.2vh;
  background-image: url("black-background.webp");
  background-size: cover;
  z-index: 0;
`;

interface ArtistInfosContentProps {
  isArtistSwitching: boolean;
}

const ArtistInfosContent = styled.div<ArtistInfosContentProps>`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 100%;
  opacity: ${({ isArtistSwitching }) => (isArtistSwitching ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const ArtistName = styled.h2`
  color: white;
  font-family: "Bebas Neue";
  font-size: 6em;
  margin: 0.1em 0 0 1.2rem;
`;

const ArtistInfos = styled.div`
  line-height: 2.8em;
  width: 100%;
  margin-left: 1.2rem;
`;

const ArtistInfosElement = styled.li`
  list-style-type: none;
  color: white;
  font-family: "Afacad";
  font-size: 1.5em;
`;

const BlueText = styled.span`
  color: #3d80bf;
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

const SeparationLine = styled.div`
  width: 52%;
  height: 2px;
  border-radius: 25px;
  margin-top: 0.5em;
  background-color: #3d80bf;
`;

const BioAndVideosWrapper = styled.div`
  width: 100%;
  height: 44%;
`;

interface BioAndVideosContentProps {
  shifted: boolean;
}

const BioAndVideosContent = styled.div<BioAndVideosContentProps>`
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
  margin-top: 0.5em;
  width: 40vw;
  color: white;
  line-height: 1.2em;
  overflow-y: auto;
`;

const VideosWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40vw;
  height: 14vw;
  transform: translateX(106%);
`;

const BioAndVideosSwitch = styled.div`
  display: flex;
  align-items: center;
  font-family: "Afacad";
  font-size: 1.5em;
  font-weight: 400;
  color: #3d80bf;
`;

interface Composer {
  id: string;
  category: string;
  name: string;
  birth: string;
  birthPlace: string;
  countryFlag: string;
  death?: string;
  picture: string;
  bio: string;
  related: string[];
  famousSoundtracks: string[];
}

/////////////////////////////////////////////////////////////////////////////COMPONENT
function ArtistInfosWrapper({
  currentArtistInfos,
  isArtistSwitching,
}: {
  currentArtistInfos: Composer;
  isArtistSwitching: boolean;
}) {
  //////////////////////////////////////////////////////////////STATE
  const [isBioAndVideosContentShifted, setisBioAndVideosContentShifted] =
    useState(false);
  const [isSwitched, setIsSwitched] = useState(false);

  //////////////////////////////////////////////////////BEHAVIOR
  const handleSwitchBioAndVideosContent = () => {
    setisBioAndVideosContentShifted(!isBioAndVideosContentShifted);
    setIsSwitched(!isSwitched);
  };

  //////////////////////////////////////////////////////RENDER
  return (
    <ArtistInfosContainer>
      <ArtistInfosContent isArtistSwitching={isArtistSwitching}>
        <ArtistName>{currentArtistInfos.name}</ArtistName>
        <ArtistInfos>
          <ArtistInfosElement>
            <BlueText>Naissance : </BlueText>
            {currentArtistInfos.birth}
          </ArtistInfosElement>
          <ArtistInfosElement>
            <BlueText>Lieu de naissance : </BlueText>
            {currentArtistInfos.birthPlace}{" "}
            <CountryFlag countryCode={currentArtistInfos.countryFlag} svg />
          </ArtistInfosElement>
          <ArtistInfosElement>
            <NotableWorksContainer>
              <BlueText>Oeuvres notables : </BlueText>
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
          <SeparationLine />
          <BioAndVideosSwitch>
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
        </ArtistInfos>
      </ArtistInfosContent>
    </ArtistInfosContainer>
  );
}

export default ArtistInfosWrapper;
