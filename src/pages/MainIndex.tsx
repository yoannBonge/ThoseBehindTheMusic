import styled from "styled-components";
import Header from "../components/Header";
import Carousel from "../components/Carousel";

///////////////////////////////////////////////STYLE
const Wrapper = styled.div`
  width: 100%;
  height: 100vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const About = styled.div`
  display: flex;
  flex-direction: column;
  width: 25vw;
`;

const MainTitle = styled.h1`
  font-family: "rangile";
  margin-bottom: 0;
  font-size: 5em;
  text-align: center;
`;

const Introduction = styled.p`
  font-family: "Afacad";
  font-size: 1.4em;
  text-align: center;
`;

const SortTitle = styled.h2`
  font-family: "rangile";
  margin: 2em 0 0.5em 0;
  font-size: 3em;
  text-align: center;
`;

///////////////////////////////////////////////COMPONENT
function MainIndex() {
  return (
    <>
      <Header />
      <Wrapper>
        <About>
          <MainTitle>Index</MainTitle>
          <Introduction>
            Les <strong>compositeurs</strong> sont classés soit par support
            (musique, cinéma, jeux vidéos), soit l'ensemble par ordre
            alphabétique, et vous pouvez également rechercher un artiste dans la
            barre de recherche située plus bas sur cette page. <br /> <br />{" "}
            Bonne découverte !
          </Introduction>
        </About>
        <SortTitle>Par support</SortTitle>
        <Carousel />
      </Wrapper>
    </>
  );
}

export default MainIndex;
