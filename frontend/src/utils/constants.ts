import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";

////////////////////////////////////// INTERFACES

export interface Composer {
  category: string;
  name: string;
  birthname?: string;
  birth: string;
  birthPlace: string;
  countryFlag: string;
  death?: string;
  picture: string;
  pictureSource: string;
  musicalGenre?: string;
  bio: string;
  related: string[];
  hitSongs?: string[];
  famousSoundtracks?: string[];
}

////////////////////////////////////// API ROUTES

const API_URL = "http://localhost:4000";
export const API_ROUTES = {
  SIGN_UP: `${API_URL}/api/auth/signup`,
  LOG_IN: `${API_URL}/api/auth/login`,
  LOG_OUT: `${API_URL}/api/auth/logout`,
  COMPOSERS: `${API_URL}/api/composers`,
};

export const APP_ROUTES = {
  SIGN_UP: "/Inscription",
  LOG_IN: "/Connexion",
  LOG_OUT: "/Déconnexion",
  ADD_COMPOSER: "/Ajouter",
  COMPOSER: "/artiste/:id",
};

////////////////////////////////////// COLORS
const colors = {
  music: "#5854DB",
  cinema: "#FBA40A",
  videogame: "#C90944",
};

export function getCategoryColor(category: string): string {
  switch (category) {
    case "music":
      return colors.music;
    case "cinema":
      return colors.cinema;
    case "videogame":
      return colors.videogame;
    default:
      return "#ffffff";
  }
}

////////////////////////////////////// FUNCTION TO CHECK IF ADMIN
export const checkAdminStatus = () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    if (decodedToken.isAdmin) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du statut isAdmin :", error);
    return false;
  }
};

////////////////////////////////////// COMPONENTS

// These components are shared across multiple parents as well as isolated components
// that do not need to be re-rendered unnecessarily, displayed in the order of rendering,
// allowing for control over their styles (parent-dependent values).

//PARENT : PAGES
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  background-color: black;
`;

export const ArtistPresentation = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
`;

//PARENT : OverlayMusic/OverlayCinema/OverlayVideogame
export const OverlayContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  z-index: 2;
`;

export const Overlay = styled.img`
  height: 100%;
  z-index: 2;
`;

//PARENT: PAGES
export const ModelImageInfosSeparationLine = styled.div<{
  $categoryColor: string;
}>`
  position: absolute;
  top: 0%;
  width: 6px;
  height: 100%;
  background-color: ${(props) => props.$categoryColor};
  box-shadow: 0px 0px 4.9px ${(props) => props.$categoryColor},
    0px 0px 39px ${(props) => props.$categoryColor};
  z-index: 2;
`;

export const ArtistInfosContainer = styled.div`
  display: flex;
  height: 100%;
  background-image: url("acoustic-panel-background.webp");
  background-size: cover;
  z-index: 0;
`;

//PARENT: ArtistInfosContent
export const ArtistName = styled.h2`
  color: white;
  font-family: "Bebas Neue";
  font-size: 6em;
  margin: 0.1em 0 0 1.2rem;
`;

// PARENT: ArtistInfosContent
export const IdentityInfos = styled.div`
  height: 36%;
  margin-left: 1.2rem;
  line-height: 2.1em;
`;

export const ArtistInfosElement = styled.li`
  display: flex;
  list-style-type: none;
  max-width: 50vw;
  color: white;
  font-family: "Afacad";
  font-size: 1.2em;
`;

export const PropertyName = styled.span<{ $categoryColor: string }>`
  display: inline;
  color: ${(props) => props.$categoryColor};
  font-family: "Afacad";
  font-size: 1.5rem;
`;

export const PropertyContent = styled.span`
  max-width: 30vw;
  color: white;
  font-family: "Afacad";
  font-size: 1.3em;
  margin-left: 0.3em;
`;

export const CountryFlag = styled(ReactCountryFlag)`
  font-size: 1.3em;
  margin: -0.1em 0.5em 0 0.5em;
`;

export const NotableWorksContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

export const NotableWorksList = styled.ul`
  padding-left: 0.3em;
  margin: 0;
  line-height: 1.4em;
`;

export const NotableWorksElement = styled.li`
  list-style-type: none;
  color: white;
  font-family: "Afacad";
  font-size: 1.3em;
`;

//PARENT: ArtistInfosContent
export const PhotoSource = styled.span`
  font-family: "Afacad";
  font-size: 1em;
  color: white;
  line-height: 1em;
  position: absolute;
  opacity: 0.5;
  left: 1%;
  bottom: 41%;
`;

export const SeparationLine = styled.div<{ $categoryColor: string }>`
  width: 56%;
  height: 2px;
  border-radius: 25px;
  margin: 0.5em 0 0.5em 0;
  background-color: ${(props) => props.$categoryColor};
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 37%;
  margin-left: 1.2rem;
`;

export const BioAndVideosSwitch = styled.div<{ $categoryColor: string }>`
  display: flex;
  font-family: "Afacad";
  font-size: 1.5em;
  font-weight: 400;
  color: ${(props) => props.$categoryColor};
`;

export const BioAndVideosWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 77%;
  margin-top: 1em;
`;
