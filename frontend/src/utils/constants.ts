import styled, { css, keyframes } from "styled-components";

////////////////////////////////////// INTERFACES
export interface Composer {
  _id: string;
  category: string;
  name: string;
  birthName?: string;
  birth?: string;
  birthPlace: string;
  countryFlag: string;
  death?: string;
  picture: any;
  pictureSource: string;
  musicalGenre?: string;
  bio?: any;
  related: string[];
  selectedWorks: string[];
}

export interface Contribution {
  category: string;
  name: string;
  birth?: string;
  birthPlace: string;
  death?: string;
  picture: any;
  pictureSource: string;
  musicalGenre?: string;
  related: string[];
  selectedWorks: string[];
  contributorName: string;
  contributorMessage: string;
}

////////////////////////////////////// API ROUTES

const API_URL = "http://localhost:4000";
// const API_URL = "https://those-behind-the-music-server.vercel.app";
export const API_ROUTES = {
  SIGN_UP: `${API_URL}/auth/signup`,
  LOG_IN: `${API_URL}/auth/login`,
  LOG_OUT: `${API_URL}/auth/logout`,
  ADD_COMPOSER: `${API_URL}/composers/add-composer`,
  GET_COMPOSERS: `${API_URL}/composers/get-composers`,
  GET_COMPOSER_BY_ID: (id: string) => `${API_URL}/composers/${id}`,
  UPDATE_COMPOSER: (id: string) => `${API_URL}/composers/update-composer/${id}`,
  SUGGEST_COMPOSER: `${API_URL}/mail/suggest-composer`,
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
  xmd: "1150px",
  lg: "1200px",
  xl: "1478px",
  xxl: "1479px",
};
export const device = {
  xs: `(max-width: ${size.xs})`,
  sm: `(max-width: ${size.sm})`,
  md: `(max-width: ${size.md})`,
  xmd: `(max-width: ${size.xmd})`,
  lg: `(max-width: ${size.lg})`,
  xl: `(max-width: ${size.xl})`,
  xxl: `(min-width: ${size.xxl})`,
};

////////////////////////////////////// COLORS
export const colors = {
  music: "#A84BE5",
  cinema: "#CA9708",
  videogame: "#464E98",
  tbtm: "#7D373D",
  tbtm2: "#F0E5E3",
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

////////////////////////////////////// FUNCTION TO CALCULATE AGE
const months = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

export const calculateAge = (birth: string) => {
  const parts = birth.split(" ");

  let year = 0;
  let month = 0;
  let day = 1;

  if (parts.length === 3) {
    const [dayStr, monthStr, yearStr] = parts;
    day = parseInt(dayStr);
    month = months.findIndex((month) => month === monthStr.toLowerCase());
    year = parseInt(yearStr);
  } else if (parts.length === 1) {
    year = parseInt(parts[0]);
  } else {
    year = parseInt(parts[0]);
  }

  const dateOfBirth = new Date(year, month, day);

  const ageDiffMs = Date.now() - dateOfBirth.getTime();
  const ageDate = new Date(ageDiffMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const calculateAgeOfDeath = (birth: string, death: string) => {
  const [day, monthStr, yearStr] = birth.split(" ");
  const month = months.findIndex((month) => month === monthStr.toLowerCase());
  const year = parseInt(yearStr);
  const dateOfBirth = new Date(year, month, parseInt(day));

  const [deathDay, deathMonthStr, deathYearStr] = death.split(" ");
  const deathMonth = months.findIndex(
    (month) => month === deathMonthStr.toLowerCase()
  );
  const deathYear = parseInt(deathYearStr);
  const dateOfDeath = new Date(deathYear, deathMonth, parseInt(deathDay));

  const ageDiffMs = dateOfDeath.getTime() - dateOfBirth.getTime();
  const ageDate = new Date(ageDiffMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

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

// These components are shared across multiple parents, displayed in the order of rendering,
// allowing for control over their styles (parent-dependent values).

///////////////////////////////////////////////PARENT : OverlayMusic/OverlayCinema/OverlayVideogame
export const OverlayContainer = styled.section<{
  $category: string;
}>`
  /* background-color: red; */
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  height: 100%;
  z-index: 1;
  @media ${device.xxl} {
    /* width: 54.9%; */
    width: 99em;
  }
  @media ${device.xl} {
    /* width: 50.7em; */
    width: 57em;
  }
  @media ${device.xmd} {
    position: relative;
    width: 50vw;
    background-position: center;
    object-fit: cover;
    ${({ $category }) => {
      switch ($category) {
        case "music":
          return `
        background-image: url("/background-music.webp");
        `;
        case "cinema":
          return `
        background-image: url("/background-cinema.webp");
        `;
        case "videogame":
          return `
        background-image: url("/background-videogame.webp");
        `;
        default:
          return `
        background-image: url("/background-music.webp");
        `;
      }
    }};
  }
  @media ${device.md} {
    width: 100%;
    background-position: center;
    object-fit: cover;
    height: 34.6%;
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

///////////////////////////////////////////////PARENT : PAGES AddComposer/ModifyComposer/SuggestComposer
export const FormPageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100vw;
  height: 90vh;
  background-color: black;
  overflow: hidden;
  background-image: url("/tape-background.webp");
  background-size: cover;
  background-attachment: fixed;
  background-position: center 65%;
  background-repeat: no-repeat;
  @media ${device.md} {
    background-position: inherit;
    background-image: inherit;
    background-color: #d1ddcc;
    align-items: center;
  }
`;

export const FormContentWrapper = styled.main`
  display: flex;
  height: 88vh;
  flex-direction: column;
  margin-left: 2vw;
  @media ${device.md} {
    margin: 0;
    align-items: center;
  }
  h2 {
    font-family: "Bakbak One";
    font-size: 3em;
    color: black;
    margin: 0.5em 0 0em 0;
    @media ${device.md} {
      font-size: 6vw;
      text-align: center;
    }
  }
  p {
    font-family: "Afacad";
    font-size: 1.4em;
    letter-spacing: -1px;
    color: black;
    max-width: 60%;
    padding-bottom: 1em;
    border-bottom: 2px solid black;
    @media ${device.md} {
      max-width: 90%;
      font-size: 3.1vw;
      text-align: center;
    }
    @media ${device.sm} {
      font-size: 3.7vw;
    }
  }
`;

///////////////////////////////////////////////PARENT : ComposerForm/SuggestForm (not all for SuggestForm)
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

export const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: 1px;
    height: 1px;
    background-color: black;
    border-radius: 100%;
    border: 4px solid black;
    margin: 0 6px 0 6px;
  }
  span:nth-child(1) {
    animation: preloader 0.6s ease-in-out alternate infinite;
  }
  span:nth-child(2) {
    animation: preloader 0.6s ease-in-out alternate 0.2s infinite;
  }
  span:nth-child(3) {
    animation: preloader 0.6s ease-in-out alternate 0.4s infinite;
  }
  @keyframes preloader {
    100% {
      transform: scale(1.7);
    }
  }
`;

export const LogLoading = styled(Loading)`
  span {
    background-color: white;
    border: 4px solid white;
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
