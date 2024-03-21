import ReactCountryFlag from "react-country-flag";
import styled, { css, keyframes } from "styled-components";
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

export interface Contribution {
  category: string;
  name: string;
  birth: string;
  birthPlace: string;
  death?: string;
  picture: any;
  pictureSource: string;
  musicalGenre?: string;
  related: string[];
  selectedWorks: string[];
  contributorName: string;
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
  SUGGEST_COMPOSER: `${API_URL}/api/mail/suggest-composer`,
};

////////////////////////////////////// BREAKPOINTS
interface Size {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

const size: Size = {
  xs: "400px",
  sm: "600px",
  md: "800px",
  lg: "1200px",
  xl: "1500px",
  xxl: "1920px",
};
export const device = {
  xs: `(max-width: ${size.xs})`,
  sm: `(max-width: ${size.sm})`,
  md: `(max-width: ${size.md})`,
  lg: `(max-width: ${size.lg})`,
  xl: `(max-width: ${size.xl})`,
  xxl: `(max-width: ${size.xxl})`,
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

///////////////////////////////////////////////PARENT : PAGES Music/Cinema/Videogame
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

///////////////////////////////////////////////PARENT : OverlayMusic/OverlayCinema/OverlayVideogame
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

///////////////////////////////////////////////PAGES Music/Cinema/Videogame
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

///////////////////////////////////////////////PARENT: ComposerInfosContent
export const ComposerName = styled.h2`
  color: white;
  font-family: "Bebas Neue";
  font-size: 6em;
  margin: 0.1em 0 0 1.2rem;
  @supports (-moz-appearance: none) {
    font-size: 5.5em;
  }
`;

///////////////////////////////////////////////PARENT: ComposerInfosContent
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

///////////////////////////////////////////////PARENT: ComposerInfosContent
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

///////////////////////////////////////////////PARENT : ComposerForm/SuggestForm
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0.5em 0.5em 0.5em;
  gap: 1.5em;
  @media ${device.md} {
  }
`;

export const FormRadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.7em;
  label {
    color: black;
    font-family: "Afacad";
    font-size: 1.1em;
    font-weight: 500;
  }
`;

export const RadioGroupContainer = styled.div`
  div {
    display: flex;
    align-items: center;
    gap: 0.7em;
  }
  input {
    height: 1.6em;
    border-radius: 4px;
  }
  label {
    font-weight: 400;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 2px;
  label {
    color: black;
    font-family: "Afacad";
    font-size: 1.1em;
    font-weight: 500;
  }
  input {
    width: 62%;
    height: 1.6em;
    border-radius: 4px;
    &:focus {
      outline-color: #374e66;
    }
  }
  div {
    margin-bottom: 0.6em;
  }
`;

export const SubLabel = styled.span`
  color: black;
  font-family: "Afacad";
  font-size: 1em;
  font-weight: 400;
`;

export const ImageLabel = styled.label`
  color: black;
  font-family: "Afacad";
  font-size: 1.1em;
  font-weight: 500;
  margin-bottom: -1.1em;
  overflow: hidden;
  @media ${device.md} {
    align-self: center;
    text-align: center;
  }
`;

export const blinkAnimation = keyframes`
  0%, 50%, 100% {
    color: #374e66;
  }
  25%, 75% {
    color: red;
  }
`;

export const Indication = styled.span<{
  $blinkAlert: boolean;
  $validImage?: string | null;
  $validTextFile?: string | null;
}>`
  font-family: "Afacad";
  font-size: 1em;
  text-align: center;
  color: ${(props) =>
    props.$validImage || props.$validTextFile ? "#0f9d35" : "#374e66"};
  margin: 0.5em 0 0.8em 0;
  animation: ${(props) =>
    props.$blinkAlert
      ? css`
          ${blinkAnimation} 0.7s infinite
        `
      : "none"};
  @media ${device.md} {
    padding: 0 0.2em;
  }
  @media ${device.sm} {
    font-size: 3.5vw;
    padding: 0 0.2em;
  }
`;

export const ImageInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 27em;
  height: 20em;
  background-color: #e8f1f6;
  border: 2px solid #374e66;
  border-radius: 4px;
  @media ${device.md} {
    align-self: center;
  }
  @media ${device.sm} {
    width: 72vw;
    height: 55vw;
  }
  img {
    width: 70%;
    @media ${device.sm} {
      width: 70%;
    }
  }
  i {
    font-family: "FontAwesome";
    font-size: 9em;
    color: #374e66;
    @media ${device.sm} {
      font-size: 25vw;
    }
  }
  button {
    font-family: "Afacad";
    font-size: 1.2em;
    color: #374e66;
    background-color: #cbd6dc;
    border: none;
    padding: 0.5em 1em;
    margin-top: 0.3em;
    border-radius: 10px;
    cursor: pointer;
    @media ${device.sm} {
      font-size: 3.2vw;
    }
    &:hover {
      color: #cbd6dc;
      background-color: #374e66;
    }
  }
  input {
    display: none;
  }
`;

export const ErrorMessage = styled.span`
  color: #fb2c2c;
  font-family: "Afacad";
  font-size: 1em;
  font-weight: 500;
  display: flex;
  text-align: center;
`;

export const SuccessMessage = styled.span`
  color: #34971b;
  font-family: "Afacad";
  font-size: 1em;
  font-weight: 500;
  display: flex;
  text-align: center;
`;

export const SubmitButtonAndMessageContainer = styled.div`
  height: 6em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5em;
  align-self: center;
  gap: 0.8em;
`;

export const SubmitButton = styled.button<{
  $isSubmitting: boolean;
}>`
  background-color: ${({ $isSubmitting }) =>
    $isSubmitting ? "#626262" : "#0c832c"};
  color: white;
  width: 7.2em;
  font-family: "Afacad";
  font-size: 1.1em;
  border-radius: 4px;
  padding: 0.3em;
  cursor: ${({ $isSubmitting }) => ($isSubmitting ? "not-allowed" : "pointer")};
  &:disabled {
    background-color: #b0b0b0;
    color: #454545;
    cursor: not-allowed;
  }
`;
