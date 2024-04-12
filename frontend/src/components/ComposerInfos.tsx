import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Composer, device, getCategoryColor } from "../utils/constants";
import { useAuth } from "../utils/context/auth/useAuth";
import BioAndVideos from "./BioAndVideos";

/////////////////////////////////////////////////////////////////////////////STYLE

const ModifyButton = styled(Link)<{ $categoryColor: string }>`
  font-family: "Afacad";
  font-size: 0.8vw;
  background-color: ${(props) => props.$categoryColor};
  color: white;
  text-decoration: none;
  padding: 0.2em;
  position: absolute;
  left: 0%;
  top: 0%;
  border-radius: 0 0 8px 0;
  border: none;
  cursor: pointer;
  @media ${device.switchDisplay} {
    font-size: 2vw;
  }
`;

const IdentityInfos = styled.section`
  /* background-color: aqua; */
  width: 22.2%;
  flex: none;
  margin-left: 1.3vw;
  line-height: 2vw;
  /* @media ${device.lg} {
    line-height: 3vw;
  } */
  @media ${device.xmd} {
    width: 26%;
    line-height: 3vw;
  }
  @media ${device.xmd} {
    line-height: 4vw;
  }
  @media ${device.switchDisplay} {
    width: 16.14%;
    line-height: 1.2em;
  }
`;

const FaMainWrapper = styled.div`
  /* background-color: blue; */
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100vw;
  top: -1%;
  left: 0%;
  @media ${device.switchDisplay} {
    display: flex;
    width: 100vw;
    top: 3.3%;
    left: 0%;
  }
`;

const FaContainer = styled.div`
  /* background-color: aqua; */
  display: flex;
  position: absolute;
  width: 45%;
  top: 4vw;
  left: -0.3vw;
  justify-content: space-between;
  @media ${device.xmd} {
    width: 27.7%;
  }
  @media ${device.switchDisplay} {
    position: static;
    width: 250px;
  }
`;

const buttonsBlink = ($categoryColor: string) => keyframes`
  0% {
    color: white;
  }
  50% {
    color: ${$categoryColor};
  }
  100% {
    color: white;
  }
`;

const FaBackward = styled(FontAwesomeIcon)<{
  $categoryColor: string;
}>`
  transform: translate(50%, -50%);
  font-size: 2.5vw;
  color: white;
  cursor: pointer;
  z-index: 2;
  @media ${device.switchDisplay} {
    font-size: 1.2em;
    transform: inherit;
  }
  &:hover {
    animation: ${({ $categoryColor }) => buttonsBlink($categoryColor)} 0.6s
      infinite;
    @media ${device.switchDisplay} {
      animation: inherit;
    }
  }
`;

const FaForward = styled(FontAwesomeIcon)<{
  $categoryColor: string;
}>`
  transform: translate(-50%, -50%);
  font-size: 2.5vw;
  color: white;
  cursor: pointer;
  z-index: 2;
  @media ${device.switchDisplay} {
    font-size: 1.2em;
    transform: inherit;
  }
  &:hover {
    animation: ${({ $categoryColor }) => buttonsBlink($categoryColor)} 0.6s
      infinite;
    @media ${device.switchDisplay} {
      animation: inherit;
    }
  }
`;

const ComposerInfosElement = styled.li`
  /* background-color: aliceblue; */
  display: flex;
  list-style-type: none;
  width: 100%;
  color: white;
  font-family: "Afacad";
  font-size: 1.2vw;
  /* @media ${device.lg} {
    font-size: 1.6vw;
  } */
  /* @media ${device.xmd} {
    font-size: 1.8vw;
  } */
  @media ${device.switchDisplay} {
    font-size: 0.7em;
  }
  /* @media ${device.md} {
    font-size: 2vw;
  }
  @media ${device.sm} {
    font-size: 2.2vw;
  } */
  /* @media ${device.xs} {
    font-size: 2.4vw;
  } */
`;

const PropertyName = styled.span<{ $categoryColor: string }>`
  display: inline;
  white-space: nowrap;
  color: ${(props) => props.$categoryColor};
  font-family: "Afacad";
  font-size: 1.6vw;
  /* @media ${device.lg} {
    font-size: 2vw;
  } */
  /* @media ${device.xmd} {
    font-size: 2.2vw;
  } */
  @media ${device.switchDisplay} {
    font-size: 1.4em;
  }
  /* @media ${device.md} {
    font-size: 2.4vw;
  }
  @media ${device.sm} {
    font-size: 2.6vw;
  } */
  /* @media ${device.xs} {
    font-size: 2.8vw;
  } */
`;

const PropertyContent = styled.span`
  /* background-color: aliceblue; */
  max-width: 34vw;
  color: white;
  font-family: "Afacad";
  font-size: 1.6vw;
  margin-left: 0.5vw;
  /* @media ${device.lg} {
    font-size: 2vw;
    max-width: 32vw;
  } */
  /* @media ${device.xmd} {
    font-size: 2.2vw;
    max-width: 32vw;
  } */
  @media ${device.switchDisplay} {
    font-size: 1.4em;
    max-width: 60%;
  }
  /* @media ${device.md} {
    font-size: 2.4vw;
  } */
  /* @media ${device.sm} {
    font-size: 2.6vw;
  } */
  /* @media ${device.xs} {
    font-size: 2.8vw;
  } */
`;

const CountryFlag = styled(ReactCountryFlag)`
  font-size: 1.9vw;
  margin: -0.1em 0.5em 0 0.5em;
  @media ${device.switchDisplay} {
    font-size: 0.8em;
  }
`;

const NotableWorksContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const NotableWorksList = styled.ul`
  padding-left: 0.3em;
  margin: 0;
  line-height: 1.9vw;
  @media ${device.switchDisplay} {
    line-height: 1.4em;
  }
`;

const NotableWorksElement = styled.li`
  list-style-type: none;
  color: white;
  font-family: "Afacad";
  font-size: 1.6vw;
  /* @media ${device.lg} {
    font-size: 1.8vw;
  } */
  /* @media ${device.xmd} {
    font-size: 1.9vw;
  } */
  @media ${device.switchDisplay} {
    font-size: 1.2em;
  }
`;

const PhotoSource = styled.span`
  font-family: "Afacad";
  font-size: 1.2vw;
  color: white;
  line-height: 1em;
  margin: -1em 0 0 0.5em;
  opacity: 0.5;
  left: 1%;
  bottom: 41%;
  /* @media ${device.xmd} {
    font-size: 1.5vw;
  } */
  @media ${device.switchDisplay} {
    font-size: 0.7em;
  }
  @supports (-moz-appearance: none) {
    bottom: 44%;
  }
`;

const SeparationLine = styled.hr<{ $categoryColor: string }>`
  width: 27.17%;
  height: 2px;
  border-radius: 25px;
  border: none;
  margin: 0.5em 0 0.5em 0;
  background-color: ${(props) => props.$categoryColor};
  /* @media ${device.xmd} {
    width: 27.45%;
  } */
  @media ${device.switchDisplay} {
    width: 55%;
    margin: 0.3em 0 0.5em 0;
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function ComposerInfos({
  currentComposerInfos,
  handlePrevComposer,
  handleNextComposer,
}: {
  currentComposerInfos: Composer;
  handlePrevComposer: () => void;
  handleNextComposer: () => void;
}) {
  //////////////////////////////////////////////////////////////CONTEXT
  const { isLoggedIn, isAdmin } = useAuth();

  //////////////////////////////////////////////////////BEHAVIOR
  const categoryColor = getCategoryColor(currentComposerInfos.category);
  const composerId = currentComposerInfos._id;

  const handleClickPrevComposer = () => {
    handlePrevComposer();
  };

  const handleClickNextComposer = () => {
    handleNextComposer();
  };

  // console.log("RENDER COMPOSER INFOS");

  //////////////////////////////////////////////////////RENDER
  return (
    <>
      {isLoggedIn && isAdmin && (
        <ModifyButton
          to={`/modify-composer/${composerId}`}
          $categoryColor={categoryColor}
        >
          Modifier
        </ModifyButton>
      )}
      <IdentityInfos>
        <FaMainWrapper>
          <FaContainer>
            <FaBackward
              icon={faChevronLeft}
              $categoryColor={categoryColor}
              onClick={handleClickPrevComposer}
            />
            <FaForward
              icon={faChevronRight}
              $categoryColor={categoryColor}
              onClick={handleClickNextComposer}
            />
          </FaContainer>
        </FaMainWrapper>
        <ComposerInfosElement>
          <PropertyName $categoryColor={categoryColor}>
            Naissance :{" "}
          </PropertyName>
          <PropertyContent>
            {currentComposerInfos.birth} - {currentComposerInfos.birthPlace}{" "}
            <CountryFlag countryCode={currentComposerInfos.countryFlag} svg />
          </PropertyContent>
        </ComposerInfosElement>
        {currentComposerInfos.birthName && (
          <ComposerInfosElement>
            <PropertyName $categoryColor={categoryColor}>
              Nom de naissance :{" "}
            </PropertyName>
            <PropertyContent>{currentComposerInfos.birthName}</PropertyContent>
          </ComposerInfosElement>
        )}
        {currentComposerInfos.death && (
          <ComposerInfosElement>
            <PropertyName $categoryColor={categoryColor}>Décès : </PropertyName>
            <PropertyContent>{currentComposerInfos.death} </PropertyContent>
          </ComposerInfosElement>
        )}
        {currentComposerInfos.musicalGenre && (
          <ComposerInfosElement>
            <PropertyName $categoryColor={categoryColor}>
              Genre musical :{" "}
            </PropertyName>
            <PropertyContent>
              {currentComposerInfos.musicalGenre}
            </PropertyContent>
          </ComposerInfosElement>
        )}
        <ComposerInfosElement>
          <NotableWorksContainer>
            <PropertyName $categoryColor={categoryColor}>
              {currentComposerInfos.musicalGenre
                ? "A produit notamment pour :"
                : "Oeuvres notables :"}
            </PropertyName>
            <NotableWorksList>
              <NotableWorksElement>
                {currentComposerInfos.related[0]}
              </NotableWorksElement>
              <NotableWorksElement>
                {currentComposerInfos.related[1]}
              </NotableWorksElement>
              <NotableWorksElement>
                {currentComposerInfos.related[2]}
              </NotableWorksElement>
            </NotableWorksList>
          </NotableWorksContainer>
        </ComposerInfosElement>
      </IdentityInfos>

      <PhotoSource>
        crédits photo de l'artiste : <br /> {currentComposerInfos.pictureSource}
      </PhotoSource>
      <SeparationLine $categoryColor={categoryColor} />
      <BioAndVideos currentComposerInfos={currentComposerInfos} />
    </>
  );
}

export default ComposerInfos;
