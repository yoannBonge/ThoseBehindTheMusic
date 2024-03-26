import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  Composer,
  ComposerInfosElement,
  CountryFlag,
  IdentityInfos,
  NotableWorksContainer,
  NotableWorksElement,
  NotableWorksList,
  PhotoSource,
  PropertyContent,
  PropertyName,
  SeparationLine,
  device,
  getCategoryColor,
} from "../utils/constants";
import { useAuth } from "../utils/context/auth/useAuth";
import BioAndVideos from "./BioAndVideos";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are isolated and
// come from "/utils/constants".

const ModifyButton = styled(Link)<{ $categoryColor: string }>`
  font-family: "Afacad";
  font-size: 0.9vw;
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
`;

const FaContainer = styled.div<{
  $category: string;
}>`
  display: flex;
  position: absolute;
  top: 4vw;
  left: -0.3vw;
  justify-content: space-between;
  ${({ $category }) => {
    switch ($category) {
      case "music":
        return `
          width: 44.9vw;
        `;
      case "cinema":
        return `
        width: 45.1vw;
        `;
      case "videogame":
        return `
        width: 43.8vw;
        `;
      default:
        return `
          width: 45vw;
        `;
    }
  }}
  @media ${device.xmd} {
    width: 46.6vw;
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
  &:hover {
    animation: ${({ $categoryColor }) => buttonsBlink($categoryColor)} 0.6s
      infinite;
    @media ${device.sm} {
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
  &:hover {
    animation: ${({ $categoryColor }) => buttonsBlink($categoryColor)} 0.6s
      infinite;
    @media ${device.sm} {
      animation: inherit;
    }
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
        <FaContainer $category={currentComposerInfos.category}>
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
