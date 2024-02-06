import styled from "styled-components";
import Header from "../components/Header";
import OverlayVideogame from "../components/OverlayVideogame";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #000000;
`;

function Videogame() {
  return (
    <>
      <Header />
      <Wrapper>
        <OverlayVideogame />
      </Wrapper>
    </>
  );
}

export default Videogame;
