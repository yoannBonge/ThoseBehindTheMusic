import styled from "styled-components";
import Vinyl from "../components/Vinyl";

/////////////////////////////////////////////////////////////////////////////STYLE
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 90vh;
  justify-content: space-between;
`;

const WelcomeDiv = styled.div`
  width: 50%;
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 50px rgb(255, 255, 255);
`;

const Title = styled.h1`
  color: black;
  font-family: "Bakbak One";
  font-size: 4em;
`;

const About = styled.p`
  font-family: "Afacad";
  font-weight: 500;
  color: #39464a;
  font-size: 1.5em;
  text-align: justify;
  padding: 1em;
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function Landing() {
  // console.log("RENDER PAGE LANDING");

  //////////////////////////////////////////////////////RENDER
  return (
    <>
      <Wrapper>
        <Vinyl />
        <WelcomeDiv>
          <Title>Those Behind The Music</Title>
          <About>
            Ce site a pour but de répertorier des <strong>compositeurs</strong>{" "}
            qui œuvrent plus ou moins souvent dans l'ombre du travail d'autres
            artistes, dans les domaines de la <strong>musique</strong>, du{" "}
            <strong>cinéma</strong> et du <strong>jeu vidéo</strong>.
            <br /> <br />
            Ayant toujours adoré la musique tous styles confondus, je souhaite à
            travers ce site partager ma passion en présentant la plupart des
            compositeurs dont j'admire le travail, et plus largement ceux que je
            juge légitimes à apparaître ici. J'écoute beaucoup de Hip Hop à la
            base, mais j'aime tout donc il y en aura pour tous les goûts.
            <br />
            Cliquez sur le vinyl pour découvrir ces artistes ainsi que
            quelques-unes de leurs meilleures œuvres !{" "}
          </About>
        </WelcomeDiv>
      </Wrapper>
    </>
  );
}

export default Landing;
