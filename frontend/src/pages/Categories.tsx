import styled from "styled-components";
import Carousel from "../components/Carousel";
import { device } from "../utils/constants";

/////////////////////////////////////////////////////////////////////////////STYLE
const PageWrapper = styled.div`
  width: 100%;
  height: 90vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const VideoBackground = styled.video`
  width: 100vw;
  height: 100%;
  position: fixed;
  object-fit: cover;
  @media ${device.xs} {
    display: none;
  }
`;

const PictureBackground = styled.img`
  width: 100vw;
  height: 100%;
  position: fixed;
  object-fit: cover;
  display: none;
  @media ${device.xs} {
    display: flex;
  }
`;

const ContentContainer = styled.main`
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 1;
  @media ${device.md} {
    top: 30%;
  }
`;

const Title = styled.h2`
  font-family: "Bakbak One";
  margin: 0.4em 0 0.3em 0;
  font-size: 3.5em;
  line-height: 1em;
  color: rgba(125, 55, 61, 0.9);
  text-align: center;
  @media ${device.md} {
    font-size: 9vw;
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function Categories() {
  // console.log("RENDER PAGE CATEGORIES");

  //////////////////////////////////////////////////////RENDER
  return (
    <>
      <PageWrapper>
        <VideoBackground autoPlay muted loop>
          <source
            src='categories-background-video.mp4'
            type='video/mp4'
            aria-label="Cette vidéo d'arrière-plan montre un disque vinyl 33 tours en cours de lecture."
          />
          Votre navigateur ne peut afficher la vidéo d'arrière-plan.
        </VideoBackground>
        <PictureBackground
          src='categories-background-picture.webp'
          alt="Image d'arrière-plan montrant un vinyl en lecture"
          loading='lazy'
        />
        <ContentContainer>
          <Title>Par support</Title>
          <Carousel />
        </ContentContainer>
      </PageWrapper>
    </>
  );
}

export default Categories;
