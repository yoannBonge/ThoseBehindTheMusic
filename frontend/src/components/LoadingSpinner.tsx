import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { colors } from "../utils/constants";

/////////////////////////////////////////////////////////////////////////////STYLE
const fadeOut = keyframes`
0% {
  opacity: 1
}
100% {
  opacity: 0
}
`;

const loader = keyframes`
  0%, 100% {
    height: 1.5em;
    background-color: ${colors.tbtm2};
  }
  25% {
    height: 9em;
    background-color: #cf969b;
  }
  50% {
    height: 5em;
    background-color: #996569;
  }
  75% {
    height: 9em;
    background-color: ${colors.tbtm};
  }
`;

const Overlay = styled.div<{ $isFadingOut: boolean; $isVisible: boolean }>`
  position: absolute;
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  box-sizing: border-box;
  z-index: 1000;
  ${({ $isFadingOut }) =>
    $isFadingOut &&
    css`
      animation: ${fadeOut} 1.5s ease;
    `}
`;

const Animation = styled.div`
  display: flex;
  height: 9em;
  transform: rotate(180deg);
  z-index: 1001;
  span {
    z-index: 1000;
    width: 2em;
    margin: 0 0.5em;
    border-radius: 6px;
    animation: ${loader} 1.8s infinite;
  }
  span:nth-child(1) {
    animation-delay: 0.2s;
  }
  span:nth-child(2) {
    animation-delay: 0.4s;
  }
  span:nth-child(3) {
    animation-delay: 0.6s;
  }
  span:nth-child(4) {
    animation-delay: 0.8s;
  }
  span:nth-child(5) {
    animation-delay: 1s;
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function LoadingSpinner({
  isLoaded,
  short,
}: {
  isLoaded?: boolean;
  short?: boolean;
}) {
  //////////////////////////////////////////////////////STATE
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  //////////////////////////////////////////////////////BEHAVIOR

  useEffect(() => {
    if (isLoaded) {
      setIsAnimationStarted(false);
      const timer = setTimeout(() => {
        setIsAnimationStarted(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (short) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [short]);

  // console.log("RENDER LOADING SPINNER");

  //////////////////////////////////////////////////////RENDER
  return (
    <Overlay $isFadingOut={isAnimationStarted} $isVisible={isVisible}>
      <Animation>
        <span />
        <span />
        <span />
        <span />
        <span />
      </Animation>
    </Overlay>
  );
}

export default LoadingSpinner;
