import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

/////////////////////////////////////////////////////////////////////////////STYLE
const rotateAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const VinylContainer = styled.div`
  animation: ${rotateAnimation} 2s linear infinite;
  transform-origin: center center;
  margin-left: 8.5em;
`;

const VinylPicture = styled.img`
  height: 29.1vw;
  cursor: pointer;
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
      <VinylPicture src='vinyl.webp' onClick={() => handleClick()} />
    </VinylContainer>
  );
}

export default Vinyl;
