import { Composer } from "../utils/constants";
import { getCategoryColor } from "../utils/constants";
import {
  IdentityInfos,
  ArtistInfosElement,
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

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are isolated and
// come from "/shared-and-isolated-components".

/////////////////////////////////////////////////////////////////////////////COMPONENT
function ArtistInfos({ currentArtistInfos }: { currentArtistInfos: Composer }) {
  //////////////////////////////////////////////////////////////STATE

  //////////////////////////////////////////////////////BEHAVIOR
  const categoryColor = getCategoryColor(currentArtistInfos.category);

  // console.log("RENDER ARTIST INFOS");

  //////////////////////////////////////////////////////RENDER
  return (
    <>
      <IdentityInfos>
        <ArtistInfosElement>
          <PropertyName $categoryColor={categoryColor}>
            Naissance :{" "}
          </PropertyName>
          <PropertyContent>
            {currentArtistInfos.birth} - {currentArtistInfos.birthPlace}{" "}
            <CountryFlag countryCode={currentArtistInfos.countryFlag} svg />
          </PropertyContent>
        </ArtistInfosElement>
        {currentArtistInfos.birthname && (
          <ArtistInfosElement>
            <PropertyName $categoryColor={categoryColor}>
              Nom de naissance :{" "}
            </PropertyName>
            <PropertyContent>{currentArtistInfos.birthname}</PropertyContent>
          </ArtistInfosElement>
        )}
        {currentArtistInfos.death !== "" && (
          <ArtistInfosElement>
            <PropertyName $categoryColor={categoryColor}>Décès : </PropertyName>
            <PropertyContent>{currentArtistInfos.death} </PropertyContent>
          </ArtistInfosElement>
        )}
        {currentArtistInfos.musicalGenre && (
          <ArtistInfosElement>
            <PropertyName $categoryColor={categoryColor}>
              Genre musical :{" "}
            </PropertyName>
            <PropertyContent>{currentArtistInfos.musicalGenre}</PropertyContent>
          </ArtistInfosElement>
        )}
        <ArtistInfosElement>
          <NotableWorksContainer>
            <PropertyName $categoryColor={categoryColor}>
              Oeuvres notables :{" "}
            </PropertyName>
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
      </IdentityInfos>
      <PhotoSource>
        crédits photo de l'artiste : <br /> {currentArtistInfos.pictureSource}
      </PhotoSource>
      <SeparationLine $categoryColor={categoryColor} />
      <BioAndVideos currentArtistInfos={currentArtistInfos} />
    </>
  );
}

export default ArtistInfos;
