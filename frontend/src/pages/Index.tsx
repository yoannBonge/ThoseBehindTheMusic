import { countries } from "countries-list";
import { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Composer, device } from "../utils/constants";
import { useComposers } from "../utils/context/useComposers";

/////////////////////////////////////////////////////////////////////////////STYLE

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url("/acoustic-panel-background.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow: hidden;
`;

const Title = styled.h3`
  font-family: "Bakbak One";
  font-size: 3.5em;
  color: rgb(125, 55, 61);
  text-align: center;
  margin: 0.4em 0 0.3em 0;
  @media ${device.md} {
    font-size: 7vw;
  }
  @media ${device.xmd} {
    margin-bottom: 0.5em;
  }
`;

const IndexWrapper = styled.div`
  width: 100%;
  height: 73%;
  margin: 0 auto;
`;

const FilterBar = styled.div`
  /* background-color: rebeccapurple; */
  display: flex;
  align-items: center;
  width: 100%;
  height: 15%;
  @media ${device.xmd} {
    justify-content: center;
    margin-bottom: 1em;
  }
`;

const FilterTitle = styled.h3`
  font-family: "Afacad";
  font-size: 1.4em;
  color: white;
  white-space: nowrap;
  margin-left: 1em;
  margin-right: 2em;
  @media ${device.xmd} {
    margin-right: 5vw;
  }
  @media ${device.md} {
    margin-right: 3vw;
    font-size: 2.8vw;
  }
`;

const Categories = styled.div`
  /* background-color: beige; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 25em;
  margin-right: 3vw;
  flex-wrap: wrap;
  @media ${device.xmd} {
    width: 13em;
    justify-content: space-evenly;
    margin-right: 8vw;
    gap: 1em;
  }
  @media ${device.md} {
    margin-right: 2vw;
  }
`;

const FilterButton = styled.button<{ active: boolean }>`
  background-color: white;
  color: rgb(125, 55, 61);
  font-family: "Afacad";
  font-size: 1.2em;
  white-space: nowrap;
  border: 2px solid rgb(125, 55, 61);
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "rgb(125, 55, 61)" : "white")};
  color: ${(props) => (props.active ? "white" : "rgb(95, 41, 46)")};
  border-color: ${(props) => (props.active ? "white" : "rgb(125, 55, 61)")};
  @media ${device.xmd} {
    width: 46%;
  }
  @media ${device.md} {
    font-size: 2.4vw;
  }
  @media ${device.sm} {
    width: 45%;
  }
  @media ${device.xs} {
    width: 42.5%;
  }
`;

const FilterOptionsContainer = styled.div`
  /* background-color: blue; */
  display: flex;
  justify-content: space-between;
  width: 22em;
  margin-left: 2em;
  margin-right: 1em;
  @media ${device.xmd} {
    flex-direction: column;
    width: 11em;
    gap: 1em;
  }
`;

const FilterOption = styled.select`
  display: flex;
  align-self: center;
  background-color: white;
  color: rgb(95, 41, 46);
  font-family: "Afacad";
  font-size: 1.2em;
  border: 2px solid rgb(125, 55, 61);
  border-radius: 5px;
  cursor: pointer;
  &:focus {
    background-color: rgb(125, 55, 61);
    color: white;
  }
  @media ${device.xmd} {
    width: 9em;
  }
  @media ${device.md} {
    font-size: 2.4vw;
  }
  @media ${device.sm} {
    width: 23vw;
  }
`;

const SeparationLine = styled.hr`
  width: 100%;
  height: 2px;
  background-color: rgb(125, 55, 61);
  border: none;
`;

const ComposersListWrapper = styled.div`
  display: flex;
  /* background-color: #382727; */
  width: 100%;
  height: 84%;
  overflow-x: auto;
`;

const ComposersList = styled.ul`
  color: white;
  list-style-type: none;
`;

const ComposerLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-family: "Afacad";
  font-size: 1.4em;
  &:visited {
    color: rgb(125, 55, 61);
  }
  @media ${device.md} {
    font-size: 3vw;
  }
  @media ${device.sm} {
    font-size: 3.5vw;
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT

function Index() {
  //////////////////////////////////////////////////////STATE
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMusicalGenre, setSelectedMusicalGenre] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [activeButton, setActiveButton] = useState("");

  //////////////////////////////////////////////////////CONTEXT
  const composers: Composer[] = useComposers().allComposers;

  //////////////////////////////////////////////////////BEHAVIOR

  ///////////FILTERING BY MUSICAL GENRE
  const musicalGenres = [
    "Hip Hop",
    "Pop",
    "R'n'B",
    "Folk",
    "Electro",
    "Dance",
    "Rock",
  ];

  const filteredComposers = composers
    .filter((composer) => {
      if (selectedCategory === "all") {
        return true;
      }
      if (selectedCategory === "music" && selectedMusicalGenre !== "") {
        return composer.musicalGenre?.includes(selectedMusicalGenre);
      }
      return composer.category === selectedCategory;
    })
    .filter((composer) => {
      if (selectedCountry === "") {
        return true;
      }
      return (
        composer.countryFlag.toLowerCase() === selectedCountry.toLowerCase()
      );
    });

  const handleFilterClick = (category: string) => {
    setSelectedCategory(category);
    setActiveButton(category);
    if (category === "all") {
      setSelectedCountry("");
      const selectElement = document.getElementById(
        "countrySelect"
      ) as HTMLSelectElement;
      if (selectElement) {
        selectElement.selectedIndex = 0;
      }
    }
    if (category !== "music") {
      setSelectedMusicalGenre("");
    }
  };

  const handleMusicalGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMusicalGenre(event.target.value);
  };

  ///////////FILTERING BY COUNTRY

  const composersCountries = new Set(
    filteredComposers.map((composer) => composer.countryFlag.toUpperCase())
  );

  const availableCountries = Object.entries(countries)
    .filter(([code]) => composersCountries.has(code.toUpperCase()))
    .map(([code, country]) => ({
      code,
      name: country.name,
    }));

  const countryOptions = availableCountries.map((country) => (
    <option key={country.code} value={country.code}>
      {country.name}
    </option>
  ));

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  // console.log("RENDER INDEX");
  //////////////////////////////////////////////////////RENDER
  return (
    <PageWrapper>
      <Title>Index des compositeurs</Title>
      <IndexWrapper>
        <FilterBar>
          <FilterTitle>Catégorie</FilterTitle>
          <Categories>
            <FilterButton
              active={activeButton === "all"}
              onClick={() => handleFilterClick("all")}
            >
              Tous
            </FilterButton>
            <FilterButton
              active={activeButton === "music"}
              onClick={() => handleFilterClick("music")}
            >
              Musique
            </FilterButton>
            <FilterButton
              active={activeButton === "cinema"}
              onClick={() => handleFilterClick("cinema")}
            >
              Cinéma
            </FilterButton>
            <FilterButton
              active={activeButton === "videogame"}
              onClick={() => handleFilterClick("videogame")}
            >
              Jeu Vidéo
            </FilterButton>
          </Categories>
          <FilterOptionsContainer>
            {selectedCategory === "music" && (
              <FilterOption onChange={handleMusicalGenreChange}>
                <option value=''>Genre musical</option>
                {musicalGenres.map((musicalGenre, index) => (
                  <option key={index} value={musicalGenre}>
                    {musicalGenre}
                  </option>
                ))}
              </FilterOption>
            )}
            <FilterOption id='countrySelect' onChange={handleCountryChange}>
              <option value=''>Pays de naissance</option>
              {countryOptions}
            </FilterOption>
          </FilterOptionsContainer>
        </FilterBar>
        <SeparationLine />
        <ComposersListWrapper>
          <ComposersList>
            {" "}
            {filteredComposers.map((composer, index) => (
              <li key={index}>
                <ComposerLink to={`/composer/${composer._id}`}>
                  {composer.name}
                </ComposerLink>
              </li>
            ))}
          </ComposersList>
        </ComposersListWrapper>
      </IndexWrapper>
    </PageWrapper>
  );
}

export default Index;
