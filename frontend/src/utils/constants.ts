import ReactCountryFlag from "react-country-flag";
import styled, { css, keyframes } from "styled-components";

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
  xmd: string;
  lg: string;
  xl: string;
  xxl: string;
}

const size: Size = {
  xs: "430px",
  sm: "600px",
  md: "800px",
  xmd: "1050px",
  lg: "1200px",
  xl: "1500px",
  xxl: "1920px",
};
export const device = {
  xs: `(max-width: ${size.xs})`,
  sm: `(max-width: ${size.sm})`,
  md: `(max-width: ${size.md})`,
  xmd: `(max-width: ${size.xmd})`,
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
  width: 100vw;
  height: 90vh;
  background-color: black;
  overflow: hidden;
`;

export const ComposerPresentation = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  /* @media ${device.xs} {
    flex-direction: column-reverse;
  } */
`;

///////////////////////////////////////////////PARENT : OverlayMusic/OverlayCinema/OverlayVideogame
export const OverlayContainer = styled.div<{
  $category: string;
}>`
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  width: 50.7em;
  display: flex;
  height: 100%;
  z-index: 1;
  @media ${device.xmd} {
    width: 50vw;
    background-position: center;
    object-fit: cover;
    ${({ $category }) => {
      switch ($category) {
        case "music":
          return `
        background-image: url("background-music.webp");
        `;
        case "cinema":
          return `
        background-image: url("background-cinema.webp");
        `;
        case "videogame":
          return `
        background-image: url("background-videogame.webp");
        `;
        default:
          return `
        background-image: url("background-music.webp");
        `;
      }
    }};
  }
`;

export const Overlay = styled.img`
  height: 100%;
  width: 100%;
  z-index: 2;
  @media ${device.xmd} {
    display: none;
  }
`;

///////////////////////////////////////////////PAGES Music/Cinema/Videogame
export const ImageInfosSeparationLine = styled.div<{
  $categoryColor: string;
}>`
  position: absolute;
  right: 44.5%;
  display: flex;
  width: 0.6vw;
  height: 90%;
  background-color: ${(props) => props.$categoryColor};
  box-shadow: 0px 0px 4.9px ${(props) => props.$categoryColor},
    0px 0px 39px ${(props) => props.$categoryColor};
  z-index: 1;
  @media ${device.xmd} {
    right: 50%;
    z-index: 2;
  }
`;

export const ComposerInfosContainer = styled.div<{
  $category: string;
}>`
  position: absolute;
  top: 10%;
  right: 0;
  display: flex;
  width: 44.5vw;
  height: 90vh;
  background-image: url("acoustic-panel-background.webp");
  background-size: cover;
  z-index: 1;
  @media ${device.xmd} {
    width: 50vw;
    /* max-height: 85vh; */
  }
`;

///////////////////////////////////////////////PARENT: ComposerInfosContent
export const ComposerNameContainer = styled.div`
  /* background-color: red; */
  width: 40vw;
  height: 8.6vw;
  margin: 0.1em 0 0 2.2vw;
  @media ${device.xmd} {
    width: 41.6vw;
  }
`;

export const ComposerName = styled.h2`
  color: white;
  font-family: "Bebas Neue";
  font-size: 6.4vw;
  margin: 0;
  padding: 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  /* @media ${device.lg} {
    font-size: 7.1vw;
    line-height: 0.9em;
  } */
  @supports (-moz-appearance: none) {
    font-size: 5.5vw;
  }
`;

///////////////////////////////////////////////PARENT: ComposerInfosContent
export const IdentityInfos = styled.div`
  /* background-color: aqua; */
  height: 36%;
  margin-left: 1.3vw;
  line-height: 2em;
  @media ${device.lg} {
    line-height: 1.8em;
  }
  @media ${device.xmd} {
    height: 40%;
  }
`;

export const ComposerInfosElement = styled.li`
  display: flex;
  list-style-type: none;
  max-width: 42vw;
  color: white;
  font-family: "Afacad";
  font-size: 1.2vw;
`;

export const PropertyName = styled.span<{ $categoryColor: string }>`
  display: inline;
  color: ${(props) => props.$categoryColor};
  font-family: "Afacad";
  font-size: 1.6vw;
  @media ${device.lg} {
    font-size: 1.8vw;
  }
`;

export const PropertyContent = styled.span`
  max-width: 34vw;
  color: white;
  font-family: "Afacad";
  font-size: 1.6vw;
  margin-left: 0.5vw;
  @media ${device.lg} {
    font-size: 1.8vw;
    max-width: 32vw;
  }
`;

export const CountryFlag = styled(ReactCountryFlag)`
  font-size: 1.9vw;
  margin: -0.1em 0.5em 0 0.5em;
`;

export const NotableWorksContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

export const NotableWorksList = styled.ul`
  padding-left: 0.3em;
  margin: 0;
  line-height: 1.9vw;
`;

export const NotableWorksElement = styled.li`
  list-style-type: none;
  color: white;
  font-family: "Afacad";
  font-size: 1.6vw;
  @media ${device.lg} {
    font-size: 1.8vw;
  }
`;

///////////////////////////////////////////////PARENT: ComposerInfosContent

export const PhotoSource = styled.span`
  font-family: "Afacad";
  font-size: 1.2vw;
  color: white;
  line-height: 1em;
  /* position: absolute; */
  margin: -1em 0 0 0.5em;
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
  @media ${device.xmd} {
    width: 65%;
  }
`;

export const SwitchAndBioAndVideosWrapper = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 35%;
  margin-left: 1.3vw;
  overflow-x: hidden;
  @media ${device.xmd} {
    height: 35%;
  }
`;

export const BioAndVideosSwitch = styled.div<{ $categoryColor: string }>`
  display: flex;
  align-items: center;
  font-family: "Afacad";
  font-size: 1.5vw;
  font-weight: 400;
  color: ${(props) => props.$categoryColor};
  @media ${device.lg} {
    font-size: 1.8vw;
  }
`;

export const BioAndVideosWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 78%;
  margin-top: 1vw;
`;

///////////////////////////////////////////////PARENT : ComposerForm/SuggestForm
export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0.5em 0.5em 0.5em;
  gap: 1.5em;
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
    width: 32em;
    height: 1.6em;
    border-radius: 4px;
    @media ${device.md} {
      width: 55vw;
    }
    @media ${device.sm} {
      width: 65vw;
    }
    @media ${device.xs} {
      width: 100%;
    }
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
  padding: 0 0.2em;
  animation: ${(props) =>
    props.$blinkAlert
      ? css`
          ${blinkAnimation} 0.7s infinite
        `
      : "none"};
  @media ${device.sm} {
    font-size: 3.2vw;
  }
  @media ${device.xs} {
    font-size: 3.5vw;
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
