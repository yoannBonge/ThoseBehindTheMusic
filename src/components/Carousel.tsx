import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import OverlayCarousel from "./OverlayCarousel";

/////////////////////////////////////////////////////////////////////////////STYLE
const StyledSlider = styled(Slider)`
  width: 50vw;
  height: 30vw;
  align-items: center;
  position: relative;
  .slick-prev,
  .slick-next {
    position: absolute;
    top: 45%;
    width: 5em;
    height: 4em;
    color: transparent;
    z-index: 1;
    transform: translateY(-50%);
    background: transparent;
    border: none;
  }
  .slick-prev {
    left: -5%;
    transform: translate(-50%, 50%);
  }

  .slick-next {
    right: -5%;
    transform: translate(50%, 50%);
  }

  .slick-prev::before,
  .slick-next::before {
    font-family: "FontAwesome";
    font-size: 3.5em;
    color: rgba(147, 28, 28, 0.7);
    cursor: pointer;
  }

  .slick-prev::before {
    content: "\uf049";
  }

  .slick-next::before {
    content: "\uf050";
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

  return (
    <StyledSlider {...settings}>
      <OverlayCarousel
        imageUrl='music.webp'
        title='Musique'
        onClick={async () => navigate("/music")}
      >
        <p>
          Les producteurs de musique qui oeuvrent souvent dans l'ombre des
          interprètes (s'ils ne sont pas eux-mêmes interprètes). Des musiciens
          du XVIIIème siècle écrivant leur musique sur papier jusqu'aux
          producteurs de musique assistée par ordinateur, découvrez ces artisans
          du son et quelques-unes de leurs plus illustres oeuvres.
        </p>
      </OverlayCarousel>
      <OverlayCarousel
        imageUrl='cinema.webp'
        title='Cinéma'
        onClick={async () => navigate("/cinema")}
      >
        <p>
          Les compositeurs de bandes originales de films, dont certaines ont
          tant participé au succès de films et séries, dont certaines
          résonneront toujours en nous en ressassant des scènes cultes. L'art
          d'accompagner l'image en sonnant juste.
        </p>
      </OverlayCarousel>
      <OverlayCarousel
        imageUrl='videogames.webp'
        title='Jeu Vidéo'
        onClick={async () => navigate("/videogame")}
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
