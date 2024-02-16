import { Composer } from "../common/types";
import { getCategoryColor } from "../common/colors";
import {
  IdentityInfos,
  ArtistInfosElement,
  Property,
  CountryFlag,
  NotableWorksContainer,
  NotableWorksList,
  NotableWorksElement,
  SeparationLine,
} from "../common/shared-and-isolated-components";
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
          <Property $categoryColor={categoryColor}>Naissance : </Property>
          {currentArtistInfos.birth} - {currentArtistInfos.birthPlace}{" "}
          <CountryFlag countryCode={currentArtistInfos.countryFlag} svg />
        </ArtistInfosElement>
        {currentArtistInfos.birthname && (
          <ArtistInfosElement>
            <Property $categoryColor={categoryColor}>
              Nom de naissance :{" "}
            </Property>
            {currentArtistInfos.birthname}
          </ArtistInfosElement>
        )}
        {currentArtistInfos.death !== "" && (
          <ArtistInfosElement>
            <Property $categoryColor={categoryColor}>Décès : </Property>
            {currentArtistInfos.death}{" "}
          </ArtistInfosElement>
        )}
        {currentArtistInfos.musicalGenre && (
          <ArtistInfosElement>
            <Property $categoryColor={categoryColor}>Genre musical : </Property>
            {currentArtistInfos.musicalGenre}
          </ArtistInfosElement>
        )}
        <ArtistInfosElement>
          <NotableWorksContainer>
            <Property $categoryColor={categoryColor}>
              Oeuvres notables :{" "}
            </Property>
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
      <SeparationLine $categoryColor={categoryColor} />
      <BioAndVideos currentArtistInfos={currentArtistInfos} />
    </>
  );
}

export default ArtistInfos;
