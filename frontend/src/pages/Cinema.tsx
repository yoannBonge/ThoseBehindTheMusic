import { API_ROUTES, Composer } from "../utils/constants";
import { getCategoryColor } from "../utils/constants";
import styled from "styled-components";
import {
  PageWrapper,
  ArtistPresentation,
  ModelImageInfosSeparationLine,
} from "../utils/constants";
import OverlayCinema from "../components/OverlayCinema";
import ArtistInfosWrapper from "../components/ArtistInfosWrapper";
import { useEffect, useState } from "react";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are shared and
// come from "/shared-and-isolated-components".

const ImageInfosSeparationLine = styled(ModelImageInfosSeparationLine)`
  left: calc(55%);
`;
/////////////////////////////////////////////////////////////////////////////COMPONENT
function Cinema() {
  //////////////////////////////////////////////////////////////STATE
  const [CinemaInfos, setCinemaInfos] = useState<Composer[]>([]);
  const [currentArtistIndex, setCurrentArtistIndex] = useState<number>(0);
  const [isArtistContentFading, setisArtistContentFading] = useState(false);

  //////////////////////////////////////////////////////////////BEHAVIOR
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = API_ROUTES.GET_COMPOSERS;
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(
            "Une erreur s'est produite lors de la récupération des données."
          );
        }
        const infos: Composer[] = await response.json();

        const filteredData = infos.filter((item) => item.category === "cinema");

        filteredData.sort((a, b) => a.name.localeCompare(b.name));

        setCinemaInfos(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const currentArtistInfos = CinemaInfos[currentArtistIndex];
  if (!currentArtistInfos) {
    return null;
  }

  const categoryColor = getCategoryColor(currentArtistInfos.category);

  const handlePrevArtist = () => {
    setisArtistContentFading(true);
    setTimeout(() => {
      setCurrentArtistIndex((prevIndex) =>
        prevIndex === 0 ? CinemaInfos.length - 1 : prevIndex - 1
      );
      setisArtistContentFading(false);
    }, 400);
  };

  const handleNextArtist = () => {
    setisArtistContentFading(true);
    setTimeout(() => {
      setCurrentArtistIndex((prevIndex) =>
        prevIndex === CinemaInfos.length - 1 ? 0 : prevIndex + 1
      );
      setisArtistContentFading(false);
    }, 400);
  };

  // console.log("RENDER PAGE CINEMA");

  //////////////////////////////////////////////////////////////RENDER
  return (
    <>
      <PageWrapper>
        <ArtistPresentation>
          <OverlayCinema
            currentArtistInfos={currentArtistInfos}
            handlePrevArtist={handlePrevArtist}
            handleNextArtist={handleNextArtist}
          />
          <ImageInfosSeparationLine $categoryColor={categoryColor} />
          <ArtistInfosWrapper
            currentArtistInfos={currentArtistInfos}
            isArtistContentFading={!isArtistContentFading}
          />
        </ArtistPresentation>
      </PageWrapper>
    </>
  );
}

export default Cinema;
