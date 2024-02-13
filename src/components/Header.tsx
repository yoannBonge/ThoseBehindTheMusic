import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

/////////////////////////////////////////////////////////////////////////////STYLE
const StyledHeader = styled.header`
  display: flex;
  position: fixed;
  top: 0%;
  background-color: #000000;
  width: 100%;
  height: 5.5vw;
  align-items: center;
  gap: 2em;
  z-index: 100;

  a {
    color: white;
    text-decoration: none;
    font-family: "rangile";
    font-size: 1.7em;
  }

  img {
    width: 2.5vw;
    margin: 0 1em;
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function Header() {
  return (
    <StyledHeader>
      <img src='tbtm-logo.webp' alt='logo du site ThoseBehindTheMusic' />
      <NavLink to='/'>Accueil</NavLink>
    </StyledHeader>
  );
}

export default Header;
