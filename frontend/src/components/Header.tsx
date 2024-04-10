import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { device } from "../utils/constants";
import { useAuth } from "../utils/context/auth/useAuth";
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";

/////////////////////////////////////////////////////////////////////////////STYLE
const StyledHeader = styled.header`
  display: flex;
  position: fixed;
  top: 0;
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
    @media ${device.lg} {
      font-size: 2.5vw;
    }
    @media ${device.md} {
      font-size: 2.6vw;
    }
  }
`;

const LogoAndCategories = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 6vh;
  display: flex;
  margin: 0 0.5vw;
`;

const Categories = styled.div`
  display: flex;
  margin-left: 3em;
  gap: 3vw;
  @media ${device.md} {
    margin-left: 5vw;
    gap: 2.5vw;
  }
  @media ${device.sm} {
    margin-left: 3vw;
  }
`;

const Login = styled.span<{ onClick: () => void }>`
  display: flex;
  color: white;
  text-decoration: none;
  font-family: "Bakbak One";
  font-size: 1.8em;
  margin-right: 1em;
  padding: 0.5em 0;
  cursor: pointer;
  @media ${device.lg} {
    font-size: 2.5vw;
    margin-right: 1em;
  }
  @media ${device.xmd} {
    margin-right: 2em;
  }
  @media ${device.md} {
    font-size: 2.6vw;
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function Header() {
  //////////////////////////////////////////////////////STATE
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  //////////////////////////////////////////////////////CONTEXT
  const { isLoggedIn, isAdmin } = useAuth();
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
        <Logo
          src='/favicon.png'
          alt="logo du site représentant la fusion d'une clef de sol et d'un stylo plume"
        />
        <Categories>
          <NavLink to='/'>Accueil</NavLink>
          <NavLink to='/composers/music'>Musique</NavLink>
          <NavLink to='/composers/cinema'>Cinéma</NavLink>
          <NavLink to='/composers/videogame'>Jeu Vidéo</NavLink>
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
