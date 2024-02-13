import styled from "styled-components";
import Header from "../components/Header";
import Vinyl from "../components/Vinyl";

/////////////////////////////////////////////////////////////////////////////STYLE
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 40vw;
  justify-content: space-between;
`;

const WelcomeDiv = styled.div`
  width: 50%;
  background-color: white;
  height: 41vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 50px rgb(255, 255, 255);
`;

const Title = styled.h1`
  color: black;
  font-family: "rangile";
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
  return (
    <>
      <Header />
      <Wrapper>
        <Vinyl />
        <WelcomeDiv>
          <Title>Those Behind The Music</Title>
          <About>
            Ce site a pour but de répertorier (de manière non exhaustive,
            quoique) les <strong>compositeurs</strong> qui travaillent plus ou
            moins souvent dans l'ombre du travail d'autres artistes, dans les
            domaines de la <strong>musique</strong>, du <strong>cinéma</strong>{" "}
            et du <strong>jeu vidéo</strong>.
            <br /> <br />
            "Mélomane" depuis mon plus jeune âge, je souhaite à travers ce site
            partager ma passion pour la musique tous styles et supports
            confondus en présentant la plupart des compositeurs dont j'admire le
            travail, et plus largement ceux que je juge légitimes à apparaître
            ici. Je suis très "Hip-Hop" à la base, mais j'aime tout donc il y en
            aura pour tous les goûts. Cliquez sur le vinyl pour découvrir ces
            artistes !{" "}
          </About>
        </WelcomeDiv>
      </Wrapper>
    </>
  );
}

export default Landing;
