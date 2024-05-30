import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import { device } from "../utils/constants";
import OverlayCarousel from "./OverlayCarousel";

/////////////////////////////////////////////////////////////////////////////STYLE
const StyledSlider = styled(Slider)`
  width: 50vw;
  height: 30vw;
  align-items: center;
  position: relative;
  @media ${device.lg} {
    width: 60vw;
  }
  @media ${device.md} {
    width: 70vw;
  }
  @supports (-moz-appearance: none) {
    height: 31vw;
  }
  .slick-prev,
  .slick-next {
    position: absolute;
    top: 45%;
    width: 4em;
    height: 4em;
    color: transparent;
    z-index: 1;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    @media ${device.xs} {
      width: 4em;
    }
  }
  .slick-prev {
    left: -5%;
    transform: translate(-50%, 50%);
    @media ${device.md} {
      transform: translate(-50%, 95%);
    }
    @media ${device.sm} {
      transform: translate(-50%, 60%);
    }
    @media ${device.xs} {
      transform: translate(-50%, 30%);
    }
  }

  .slick-next {
    right: -5%;
    transform: translate(50%, 50%);
    @media ${device.md} {
      transform: translate(50%, 95%);
    }
    @media ${device.sm} {
      transform: translate(50%, 60%);
    }
    @media ${device.xs} {
      transform: translate(50%, 30%);
    }
  }

  .slick-prev::before,
  .slick-next::before {
    font-family: "FontAwesome";
    font-size: 3.5em;
    color: rgba(125, 55, 61, 0.8);
    cursor: pointer;
    @media ${device.md} {
      font-size: 6vw;
    }
  }

  .slick-prev::before {
    content: "\uf048";
  }

  .slick-next::before {
    content: "\uf051";
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function Carousel() {
  const navigate = useNavigate();
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    focusOnSelect: true,
    autoplaySpeed: 4000,
    fade: true,
  };

  // console.log("RENDER CAROUSEL");

  //////////////////////////////////////////////////////RENDER
  return (
    <StyledSlider {...settings}>
      <OverlayCarousel
        imageUrl='music-carousel.webp'
        title='Musique'
        onClick={async () => navigate("/composers/music")}
      >
        <p>
          Les producteurs de musique qui œuvrent souvent dans l'ombre des
          interprètes (s'ils ne sont pas eux-mêmes interprètes). Des musiciens
          du XVIIIème siècle écrivant leur musique sur papier jusqu'aux
          producteurs de musique assistée par ordinateur, découvrez ces artisans
          du son et quelques-unes de leurs plus illustres œuvres.
        </p>
      </OverlayCarousel>
      <OverlayCarousel
        imageUrl='cinema-carousel.webp'
        title='Cinéma'
        onClick={async () => navigate("/composers/cinema")}
      >
        <p>
          Les compositeurs de bandes originales de films, dont certaines ont
          tant participé au succès de films et séries, dont certaines
          résonneront toujours en nous en ressassant des scènes cultes. L'art
          d'accompagner l'image en sonnant juste.
        </p>
      </OverlayCarousel>
      <OverlayCarousel
        imageUrl='videogames-carousel.webp'
        title='Jeu Vidéo'
        onClick={async () => navigate("/composers/videogame")}
      >
        <p>
          Les compositeurs qui se sont spécialisés dans la musique de jeu vidéo
          et qui, de fait, ont grandement participé au succès de certains jeux.
          Avec ou sans limitations techniques, ils ont su marquer la culture par
          leur créativité.
        </p>
      </OverlayCarousel>
    </StyledSlider>
  );
}

export default Carousel;
