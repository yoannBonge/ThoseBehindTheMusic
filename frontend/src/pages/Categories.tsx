import styled from "styled-components";
import Carousel from "../components/Carousel";

/////////////////////////////////////////////////////////////////////////////STYLE
const Wrapper = styled.div`
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
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 1;
`;

const Title = styled.h2`
  font-family: "rangile";
  margin: 0.4em 0 0.3em 0;
  font-size: 3.5em;
  color: rgba(147, 28, 28, 0.9);
  text-align: center;
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function Categories() {
  // console.log("RENDER PAGE CATEGORIES");
  return (
    <>
      <Wrapper>
        <VideoBackground autoPlay muted loop>
          <source src='categories-background-video.mp4' type='video/mp4' />
          Votre navigateur ne peut afficher la vidéo d'arrière-plan.
        </VideoBackground>
        <ContentContainer>
          <Title>Par support</Title>
          <Carousel />
        </ContentContainer>
      </Wrapper>
    </>
  );
}

export default Categories;
