import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";
import { checkAdminStatus } from "../utils/constants";

/////////////////////////////////////////////////////////////////////////////STYLE
const StyledHeader = styled.header`
  display: flex;
  position: fixed;
  top: 0%;
  background-color: #000000;
  width: 100%;
  height: 10vh;
  align-items: center;
  justify-content: space-between;
  z-index: 100;

  a {
    color: white;
    text-decoration: none;
    font-family: "rangile";
    font-size: 1.7em;
  }
`;

const LogoAndCategories = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 4vh;
  display: flex;
  margin: 0 1em;
`;

const Categories = styled.div`
  display: flex;
  margin-left: 3em;
  gap: 3em;
`;

const Login = styled.span<{ onClick: () => void }>`
  display: flex;
  color: white;
  text-decoration: none;
  font-family: "rangile";
  font-size: 1.7em;
  margin-right: 1em;
  padding: 0.5em 0;
  cursor: pointer;
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const isAdmin = checkAdminStatus();

  const openModal = () => {
    if (isUserLoggedIn === true) {
      setShowLogoutModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const closeModal = () => {
    setShowLoginModal(false);
    setShowLogoutModal(false);
  };

  const setIsLoggedIn = (loggedIn: boolean) => {
    setIsUserLoggedIn(loggedIn);
  };

  // console.log("RENDER HEADER");
  return (
    <StyledHeader>
      <LogoAndCategories>
        <Logo src='tbtm-logo.webp' alt='logo du site ThoseBehindTheMusic' />
        <Categories>
          <NavLink to='/'>Accueil</NavLink>
          <NavLink to='/music'>Musique</NavLink>
          <NavLink to='/cinema'>Cinéma</NavLink>
          <NavLink to='/videogame'>Jeu Vidéo</NavLink>
          {isUserLoggedIn && isAdmin && (
            <NavLink to='/contribute'>Contribuer</NavLink>
          )}
        </Categories>
      </LogoAndCategories>
      <Login onClick={openModal}>
        {isUserLoggedIn ? "Se Déconnecter" : "Se Connecter"}
      </Login>
      <LoginModal
        showLoginModal={showLoginModal}
        closeModal={closeModal}
        setIsLoggedIn={setIsLoggedIn}
      />
      <LogoutModal
        showLogoutModal={showLogoutModal}
        closeModal={closeModal}
        setIsLoggedIn={setIsLoggedIn}
      />
    </StyledHeader>
  );
}

export default Header;
