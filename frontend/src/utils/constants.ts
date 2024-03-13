import styled from "styled-components";
import ReactCountryFlag from "react-country-flag";
// import { Link, NavLink } from "react-router-dom";

////////////////////////////////////// INTERFACES

export interface Composer {
  _id: string;
  category: string;
  name: string;
  birthName?: string;
  birth: string;
  birthPlace: string;
  countryFlag: string;
  death?: string;
  picture: any;
  pictureSource: string;
  musicalGenre?: string;
  bio: any;
  related: string[];
  selectedWorks: string[];
}

////////////////////////////////////// API ROUTES

const API_URL = "http://localhost:4000";
export const API_ROUTES = {
  SIGN_UP: `${API_URL}/api/auth/signup`,
  LOG_IN: `${API_URL}/api/auth/login`,
  LOG_OUT: `${API_URL}/api/auth/logout`,
  ADD_COMPOSER: `${API_URL}/api/composers/add-composer`,
  GET_COMPOSERS: `${API_URL}/api/composers/get-composers`,
  GET_COMPOSER_BY_ID: (id: string) => `${API_URL}/api/composers/${id}`,
  UPDATE_COMPOSER: (id: string) =>
    `${API_URL}/api/composers/update-composer/${id}`,
};

////////////////////////////////////// COLORS
const colors = {
  music: "#A84BE5",
  cinema: "#CA9708",
  videogame: "#464E98",
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

////////////////////////////////////// FUNCTION TO HANDLE ADD COMPOSER PICTURE IN ADD COMPOSER FORM
export const handleAddPhoto = (
  event: React.MouseEvent<HTMLButtonElement>,
  setValidImageUrl: (url: string | null) => void,
  setIsBlinkingToAlert: (value: boolean) => void
) => {
  event.preventDefault();

  const photoInput = document.getElementById("picture") as HTMLInputElement;

  if (photoInput) {
    photoInput.value = "";

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        const image = new Image();
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target) {
            const imgSrc = e.target.result as string;
            image.src = imgSrc;
            image.onload = () => {
              const width = image.width;
              const height = image.height;

              if (width > height) {
                setValidImageUrl(null);
                setValidImageUrl(imgSrc);
              } else {
                setValidImageUrl(null);
                setIsBlinkingToAlert(true);
                setTimeout(() => {
                  setIsBlinkingToAlert(false);
                }, 2000);
              }

              URL.revokeObjectURL(image.src);

              photoInput.removeEventListener("change", handleChange);
            };
          }
        };
        reader.readAsDataURL(file);
      }
    };
    photoInput.addEventListener("change", handleChange);
    photoInput.click();
  }
};

////////////////////////////////////// FUNCTION TO CONVERT BINARY PICTURE OF DATABASE IN BASE64
export function arrayBufferToBase64(buffer: number[]): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
}

////////////////////////////////////// FUNCTION TO CONVERT BINARY BIO OF DATABASE IN STRING
export const convertBufferToString = (buffer: number[]): string => {
  const decoder = new TextDecoder("utf-8");
  const text = decoder.decode(new Uint8Array(buffer));
  return text;
};

////////////////////////////////////// FUNCTION TO HANDLE ADD COMPOSER BIO TEXT FILE IN ADD COMPOSER FORM
export const handleAddBio = (
  event: React.MouseEvent<HTMLButtonElement>,
  setValidTextFileSrc: (url: string | null) => void,
  setIsBlinkingToAlert: (value: boolean) => void
) => {
  event.preventDefault();

  const textInput = document.getElementById("bio") as HTMLInputElement;

  if (textInput) {
    textInput.value = "";

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        const maxSizeInBytes = 20 * 1024;

        if (file.size > maxSizeInBytes) {
          console.log(
            "Le fichier dépasse la taille maximale autorisée de 20 Ko."
          );
          setValidTextFileSrc(null);
          setIsBlinkingToAlert(true);
          setTimeout(() => {
            setIsBlinkingToAlert(false);
          }, 2000);
        } else if (!file.name.endsWith(".txt")) {
          console.log("Le fichier doit être au format .txt.");
          setIsBlinkingToAlert(true);
          setTimeout(() => {
            setIsBlinkingToAlert(false);
          }, 2000);
        } else {
          const reader = new FileReader();

          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target) {
              const textSrc = e.target.result as string;
              setValidTextFileSrc(textSrc);
            }
          };
          reader.readAsText(file);
        }

        textInput.removeEventListener("change", handleChange);
      }
    };

    textInput.addEventListener("change", handleChange);
    textInput.click();
  }
};

////////////////////////////////////// FUNCTION TO CHECK IF THERE IS DUPLICATE STRING VALUES INTO FORM
export const isDuplicateStringValue = (
  valuesArray: string[],
  value: string,
  currentIndex: number
) => {
  return valuesArray.some((item, index) => {
    return item === value && index !== currentIndex;
  });
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

export const ComposerPresentation = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
`;

//PARENT : OverlayMusic/OverlayCinema/OverlayVideogame
export const OverlayContainer = styled.div`
  background-color: black;
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

export const ComposerInfosContainer = styled.div`
  display: flex;
  height: 100%;
  background-image: url("acoustic-panel-background.webp");
  background-size: cover;
  z-index: 0;
`;

//PARENT: ComposerInfosContent
export const ComposerName = styled.h2`
  color: white;
  font-family: "Bebas Neue";
  font-size: 6em;
  margin: 0.1em 0 0 1.2rem;
  @supports (-moz-appearance: none) {
    font-size: 5.5em;
  }
`;

// PARENT: ComposerInfosContent
export const IdentityInfos = styled.div`
  height: 36%;
  margin-left: 1.2rem;
  line-height: 2.1em;
`;

export const ComposerInfosElement = styled.li`
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

//PARENT: ComposerInfosContent
export const PhotoSource = styled.span`
  font-family: "Afacad";
  font-size: 1em;
  color: white;
  line-height: 1em;
  position: absolute;
  opacity: 0.5;
  left: 1%;
  bottom: 41%;
  @supports (-moz-appearance: none) {
    bottom: 44%;
  }
`;

// export const ModifyButton = styled(Link)<{ $categoryColor: string }>`
//   font-family: "Afacad";
//   font-size: 0.9em;
//   background-color: ${(props) => props.$categoryColor};
//   color: white;
//   text-decoration: none;
//   padding: 0.2em;
//   position: absolute;
//   left: 0%;
//   top: 0%;
//   border-radius: 0 0 8px 0;
//   border: none;
//   cursor: pointer;
// `;

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
