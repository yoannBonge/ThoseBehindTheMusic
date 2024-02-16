import { useState } from "react";
import styled, { css, keyframes } from "styled-components";

interface OverlayCarouselProps {
  imageUrl: string;
  title: string;
  children: React.ReactNode;
  onClick: () => Promise<void>;
}

/////////////////////////////////////////////////////////////////////////////STYLE
const moveUp = keyframes`
  from {
    transform: translate(-50%,-50%)
  }
  to {
    transform: translate(-50%,-200%)
  }
`;

const moveDown = keyframes`
  from {
    transform: translate(-50%, -200%);
  }
  to {
    transform: translate(-50%, -50%);
  }
`;

const moveDownFadeIn = keyframes`
  from {
    transform: translate(-50%,-100%)
  }
  to {
    transform: translate(-50%,-50%)
  }
`;

const moveUpFadeOut = keyframes`
  from {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 50vw;
  height: auto;
  margin: auto;
  overflow: hidden;
  border-radius: 20px;
  z-index: 3;
  box-sizing: content-box;
  cursor: pointer;
`;

const Filter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  z-index: 2;
`;

const Image = styled.img`
  width: 98.7%;
  height: auto;
  border: 5px solid rgba(147, 28, 28, 0.7);
  border-radius: 20px;
  z-index: 1;
`;

const Title = styled.h3<{ $isHovered: boolean }>`
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Rangile";
  font-size: 4em;
  color: white;
  z-index: 3;
  animation: ${(props) =>
    props.$isHovered
      ? css`
          ${moveUp} 0.3s ease-out forwards
        `
      : css`
          ${moveDown} 0.3s ease-out forwards
        `};
`;

const Description = styled.div<{ $isHovered: boolean }>`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-family: "Afacad";
  font-size: 1.3em;
  font-weight: 600;
  text-align: center;
  z-index: 3;
  opacity: ${(props) => (props.$isHovered ? 1 : 0)};
  pointer-events: ${(props) => (props.$isHovered ? "auto" : "none")};
  transition: opacity 0.2s ease-out;
  animation: ${(props) =>
    props.$isHovered
      ? css`
          ${moveDownFadeIn} 0.3s ease-out
        `
      : css`
          ${moveUpFadeOut} 0.3s ease-out
        `};
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function OverlayCarousel({
  imageUrl,
  title,
  children,
  onClick,
}: OverlayCarouselProps) {
  //////////////////////////////////////////////////////////////STATE
  const [hoverState, setHoverState] = useState(false);
  // console.log("RENDER OVERLAY CAROUSEL");
  //////////////////////////////////////////////////////////////RENDER
  return (
    <Wrapper
      onMouseOver={() => {
        setHoverState(true);
      }}
      onMouseOut={() => {
        setHoverState(false);
      }}
      onClick={async () => {
        await onClick();
      }}
    >
      <Image src={imageUrl} alt={title}></Image>
      <Filter />
      <Title $isHovered={hoverState}>{title}</Title>
      <Description $isHovered={hoverState}>{children}</Description>
    </Wrapper>
  );
}

export default OverlayCarousel;
