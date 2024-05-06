import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { colors, device } from "../utils/constants";
import { useAuthStore } from "../utils/store/authStore";
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";

/////////////////////////////////////////////////////////////////////////////STYLE
const StyledHeader = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000;
  width: 100vw;
  height: 10vh;
  align-items: center;
  justify-content: space-between;
  z-index: 100;

  a {
    color: white;
    text-decoration: none;
    font-family: "Bakbak One";
    font-size: 1.8em;
    text-align: center;
    @media (max-width: 990px) {
      font-size: 1.6em;
    }
    @media (max-width: 890px) {
      font-size: 2.8vw;
    }
    &.active {
      color: ${colors.tbtm};
    }
  }
`;

const LogoAndCategories = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 7vh;
  display: flex;
  margin: 0 0 0 5px;
  @media (max-width: 450px) {
    height: 8.2vw;
  }
`;

const Categories = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3em;
  gap: 3vw;
  @media ${device.xmd} {
    margin-left: 2vw;
  }
  @media ${device.md} {
    gap: 2.5vw;
  }
`;

const Login = styled.span<{ onClick: () => void }>`
  display: flex;
  color: white;
  text-decoration: none;
  font-family: "Bakbak One";
  font-size: 1.8em;
  margin-right: 0.5em;
  padding: 0.5em 0;
  text-align: center;
  cursor: pointer;
  @media (max-width: 990px) {
    font-size: 1.6em;
  }
  @media (max-width: 890px) {
    font-size: 2.8vw;
  }
  @media ${device.md} {
    margin-right: 0.8em;
  }
  @media ${device.sm} {
    margin-right: 0.5em;
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function Header() {
  //////////////////////////////////////////////////////STATE
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  //////////////////////////////////////////////////////CONTEXT
  const { isLoggedIn, isAdmin } = useAuthStore();
  //////////////////////////////////////////////////////BEHAVIOR
  const openModal = () => {
    if (isLoggedIn) {
      setShowLogoutModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const closeModal = () => {
    setShowLoginModal(false);
    setShowLogoutModal(false);
  };

  // console.log("RENDER HEADER");

  //////////////////////////////////////////////////////RENDER
  return (
    <StyledHeader>
      <LogoAndCategories>
        <NavLink to='/'>
          <Logo
            src='/favicon.png'
            alt="logo du site représentant la fusion d'une clef de sol et d'un stylo plume"
          />
        </NavLink>

        <Categories>
          <NavLink to='/composers/music'>Musique</NavLink>
          <NavLink to='/composers/cinema'>Cinéma</NavLink>
          <NavLink to='/composers/videogame'>Jeu Vidéo</NavLink>
          <NavLink to='/index'>Index</NavLink>
          {isLoggedIn && isAdmin && (
            <NavLink to='/add-composer'>Ajouter</NavLink>
          )}
          {isLoggedIn && !isAdmin && (
            <NavLink to='/suggest-composer'>Contribuer</NavLink>
          )}
        </Categories>
      </LogoAndCategories>
      <Login onClick={openModal}>
        {isLoggedIn ? "Se Déconnecter" : "Se Connecter"}
      </Login>
      <LoginModal showLoginModal={showLoginModal} closeModal={closeModal} />
      <LogoutModal showLogoutModal={showLogoutModal} closeModal={closeModal} />
    </StyledHeader>
  );
}

export default Header;
