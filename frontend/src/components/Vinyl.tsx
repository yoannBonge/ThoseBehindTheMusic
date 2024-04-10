import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { device } from "../utils/constants";

/////////////////////////////////////////////////////////////////////////////STYLE
const rotateAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const VinylContainer = styled.div`
  animation: ${rotateAnimation} 2s linear infinite;
  transform-origin: center center;
  margin: auto;
  @media ${device.sm} {
    animation: inherit;
    transform-origin: initial;
  }
  @media ${device.xs} {
    margin: 0;
  }
`;

const VinylPicture = styled.img`
  height: 29.1vw;
  cursor: pointer;
  @media ${device.sm} {
    max-height: 47vw;
    height: auto;
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function Vinyl() {
  //////////////////////////////////////////////////////BEHAVIOR
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/categories");
  };

  // console.log("RENDER VINYL");

  //////////////////////////////////////////////////////RENDER
  return (
    <VinylContainer>
      <VinylPicture
        src='/vinyl.webp'
        alt='Disque vinyl 33 tours'
        onClick={() => handleClick()}
        loading='lazy'
      />
    </VinylContainer>
  );
}

export default Vinyl;
