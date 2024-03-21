import styled from "styled-components";
import Vinyl from "../components/Vinyl";
import { device } from "../utils/constants";

/////////////////////////////////////////////////////////////////////////////STYLE
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 90vh;
  justify-content: space-between;
  /* overflow: hidden; */
  @media ${device.sm} {
    flex-direction: column-reverse;
    justify-content: flex-end;
    /* gap: 1em; */
  }
`;

const WelcomeDiv = styled.div`
  width: 60vw;
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: space-around; */
  box-shadow: 0px 0px 50px rgb(255, 255, 255);
  @media ${device.lg} {
    width: 65vw;
  }
  @media ${device.md} {
    width: 69vw;
  }
  @media ${device.sm} {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const Title = styled.h1`
  color: black;
  font-family: "Bakbak One";
  font-size: 5vw;
  text-align: center;
  margin: 0.2em 0 0 0;
  @supports (-moz-appearance: none) {
    line-height: 1em;
  }
  @media ${device.md} {
    font-size: 6vw;
  }
  @media ${device.sm} {
    font-size: 5vw;
    margin-top: 0.7em;
  }
`;

const About = styled.p`
  font-family: "Afacad";
  font-weight: 500;
  color: #39464a;
  font-size: 1.7em;
  padding: 1em;
  @media ${device.lg} {
    font-size: 1.4em;
  }
  @media ${device.md} {
    font-size: 1.2em;
  }
  @media ${device.sm} {
    padding: 0 1em;
    text-align: center;
  }
  @media ${device.xs} {
    font-size: 4.8vw;
  }
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
            Cliquez sur le vinyl pour découvrir ces artistes et un aperçu de
            leurs meilleures productions !{" "}
          </About>
        </WelcomeDiv>
      </Wrapper>
    </>
  );
}

export default Landing;
