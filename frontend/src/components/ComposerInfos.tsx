import { Composer } from "../utils/constants";
import { getCategoryColor } from "../utils/constants";
import {
  IdentityInfos,
  ComposerInfosElement,
  PropertyName,
  PropertyContent,
  CountryFlag,
  NotableWorksContainer,
  NotableWorksList,
  NotableWorksElement,
  PhotoSource,
  SeparationLine,
} from "../utils/constants";
import BioAndVideos from "./BioAndVideos";
import { useAuth } from "../utils/AuthContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are isolated and
// come from "/utils/constants".

const ModifyButton = styled(Link)<{ $categoryColor: string }>`
  font-family: "Afacad";
  font-size: 0.9em;
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

/////////////////////////////////////////////////////////////////////////////COMPONENT
function ComposerInfos({
  currentComposerInfos,
}: {
  currentComposerInfos: Composer;
}) {
  //////////////////////////////////////////////////////////////CONTEXT
  const { isLoggedIn, isAdmin } = useAuth();

  //////////////////////////////////////////////////////BEHAVIOR
  const categoryColor = getCategoryColor(currentComposerInfos.category);
  const composerId = currentComposerInfos._id;

  // console.log("RENDER COMPOSER INFOS");

  //////////////////////////////////////////////////////RENDER
  return (
    <>
      <IdentityInfos>
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
      {isLoggedIn && isAdmin && (
        <ModifyButton
          to={`/modify-composer/${composerId}`}
          $categoryColor={categoryColor}
        >
          Modifier
        </ModifyButton>
      )}
      <SeparationLine $categoryColor={categoryColor} />
      <BioAndVideos currentComposerInfos={currentComposerInfos} />
    </>
  );
}

export default ComposerInfos;
