import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  API_ROUTES,
  Composer,
  ErrorMessage,
  FormField,
  FormRadioGroup,
  FormWrapper,
  ImageInput,
  ImageLabel,
  Indication,
  RadioGroupContainer,
  SubLabel,
  SubmitButton,
  SubmitButtonAndMessageContainer,
  SuccessMessage,
  device,
  handleAddBio,
  handleAddPhoto,
  isDuplicateStringValue,
} from "../utils/constants";
import { useAuth } from "../utils/context/auth/useAuth";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some styled-components appearing in the render are shared and
// come from "/utils/constants".

const BioLabel = styled.label`
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

const BioInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 27em;
  height: 13em;
  background-color: #e8f1f6;
  border: 2px solid #374e66;
  border-radius: 4px;
  @media ${device.md} {
    align-self: center;
  }
  @media ${device.sm} {
    width: 72vw;
    height: 48vw;
  }
  i {
    font-family: "FontAwesome";
    font-size: 6em;
    color: #374e66;
    @media ${device.sm} {
      font-size: 20vw;
    }
    /* @media ${device.xs} {
      font-size: 18vw;
    } */
  }
  button {
    font-family: "Afacad";
    font-size: 1.2em;
    color: #374e66;
    background-color: #cbd6dc;
    border: none;
    padding: 0.5em 1em;
    margin-top: 0.5em;
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

const BookIcon = styled.i<{
  $validTextFile: string | null;
  className: string;
}>`
  opacity: ${(props) => (props.$validTextFile ? 1 : 0.2)};
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function ComposerForm({
  onFormSubmitSuccess,
  $initialValues,
}: {
  onFormSubmitSuccess: () => void;
  $initialValues?: Composer | null;
}) {
  //////////////////////////////////////////////////////////////STATE
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isBlinkingToAlert, setIsBlinkingToAlert] = useState(false);
  const [validImageUrl, setValidImageUrl] = useState<string | null>(null);
  const [validTextFileSrc, setValidTextFileSrc] = useState<string | null>(null);
  //////////////////////////////////////////////////////////////CONTEXT
  const { isLoggedIn, isAdmin } = useAuth();
  //////////////////////////////////////////////////////////////BEHAVIOR
  const navigate = useNavigate();

  const handleAddPhotoClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    handleAddPhoto(event, setValidImageUrl, setIsBlinkingToAlert);
  };

  const handleAddBioClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    handleAddBio(event, setValidTextFileSrc, setIsBlinkingToAlert);
  };

  const imageRef = useRef<File | null>(null);
  const bioRef = useRef<File | null>(null);

  const resetImageAndBio = () => {
    imageRef.current = null;
    setValidImageUrl(null);
    bioRef.current = null;
    setValidTextFileSrc(null);
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<Composer>({
    mode: "all",
  });

  useEffect(() => {
    if ($initialValues) {
      Object.keys($initialValues).forEach((key) => {
        setValue(key as keyof Composer, $initialValues[key as keyof Composer], {
          shouldValidate: true,
        });
        trigger(key as keyof Composer);
        trigger();
      });
    }
  }, [$initialValues, setValue, trigger]);

  const onSubmit: SubmitHandler<Composer> = async (data) => {
    setIsSubmitting(true);

    try {
      const apiUrl = $initialValues
        ? API_ROUTES.UPDATE_COMPOSER($initialValues._id)
        : API_ROUTES.ADD_COMPOSER;
      const method = $initialValues ? "PUT" : "POST";
      const token = localStorage.getItem("token");

      if (!isLoggedIn || !isAdmin) {
        throw new Error(
          "Vous devez être administrateur pour soumettre le formulaire."
        );
      }

      const formData = new FormData();
      formData.append("category", data.category);
      formData.append("name", data.name);
      {
        data.birthName && formData.append("birthName", data.birthName);
      }
      formData.append("birth", data.birth);
      formData.append("birthPlace", data.birthPlace);
      formData.append("countryFlag", data.countryFlag);
      {
        data.death && formData.append("death", data.death);
      }
      imageRef.current && formData.append("picture", imageRef.current);
      formData.append("pictureSource", data.pictureSource);
      {
        data.musicalGenre && formData.append("musicalGenre", data.musicalGenre);
      }
      bioRef.current && formData.append("bio", bioRef.current);
      formData.append("related", data.related[0]);
      formData.append("related", data.related[1]);
      formData.append("related", data.related[2]);
      data.selectedWorks.forEach((selectedWork) => {
        formData.append("selectedWorks", selectedWork);
      });

      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        setSuccessMessage(null);
        throw new Error(responseData.message || "Une erreur s'est produite.");
      }
      ////////////////////////////SUCCESS
      const successMessage = $initialValues
        ? "Compositeur modifié !"
        : "Compositeur enregistré !";
      setSuccessMessage(successMessage);

      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessMessage(null);
        reset();
        resetImageAndBio();
        onFormSubmitSuccess();

        if ($initialValues) {
          const redirectUrl = `/${$initialValues.category}`;
          navigate(redirectUrl);
        }
      }, 2000);
    } catch (error: any) {
      console.error(error.message);
      setErrorMessage(error.message);

      setTimeout(() => {
        setErrorMessage(null);
        setIsSubmitting(false);
      }, 2000);
    }
  };

  // console.log("RENDER ADD COMPOSER FORM");

  //////////////////////////////////////////////////////////////RENDER
  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormRadioGroup>
        <label htmlFor='category'>Catégorie du compositeur</label>
        <RadioGroupContainer>
          <div>
            <input
              id='music'
              type='radio'
              value='music'
              {...register("category", {
                required: "Le choix de la catégorie est requis",
              })}
            />
            <label htmlFor='music'>Musique</label>
          </div>
          <div>
            <input
              id='cinema'
              type='radio'
              value='cinema'
              {...register("category", {
                required: "Le choix de la catégorie est requis",
              })}
            />
            <label htmlFor='cinema'>Cinéma</label>
          </div>
          <div>
            <input
              id='videogame'
              type='radio'
              value='videogame'
              {...register("category", {
                required: "Le choix de la catégorie est requis",
              })}
            />
            <label htmlFor='videogame'>Jeu Vidéo</label>
          </div>
          {errors.category && (
            <ErrorMessage>{errors.category.message}</ErrorMessage>
          )}
        </RadioGroupContainer>
      </FormRadioGroup>
      <FormField>
        <label htmlFor='name'>Nom du compositeur</label>
        <input
          id='name'
          type='text'
          {...register("name", {
            required: "Ce champ est requis",
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </FormField>
      <FormField>
        <label htmlFor='birthName'>
          Nom de naissance du compositeur <br></br>{" "}
          <SubLabel>
            (si différent du nom de scène, sinon laissez ce champ vide)
          </SubLabel>
        </label>
        <input
          id='birthName'
          type='text'
          {...register("birthName", {
            pattern: {
              value: /^(?=.*[a-zA-Z]{2,}.*[a-zA-Z]{2,})[\w\s]+$/,
              message:
                "Veuillez saisir le nom de naissance complet du compositeur",
            },
          })}
        />
        {errors.birthName && (
          <ErrorMessage>{errors.birthName.message}</ErrorMessage>
        )}
      </FormField>

      <FormField>
        <label htmlFor='birth'>Date de naissance du compositeur</label>
        <input
          id='birth'
          type='text'
          {...register("birth", {
            required: "Ce champ est requis",
            pattern: {
              value: /\d{4}/,
              message: "Veuillez saisir au minimum une année de naissance",
            },
          })}
        />
        {errors.birth && <ErrorMessage>{errors.birth.message}</ErrorMessage>}
      </FormField>

      <FormField>
        <label htmlFor='birthPlace'>Lieu de naissance du compositeur</label>
        <input
          id='birthPlace'
          type='text'
          {...register("birthPlace", {
            required: "Ce champ est requis",
            pattern: {
              value: /^[a-zA-Z ,.'-]{3,}$/i,
              message: "Le lieu de naissance doit contenir au moins 3 lettres",
            },
          })}
        />
        {errors.birthPlace && (
          <ErrorMessage>{errors.birthPlace.message}</ErrorMessage>
        )}
      </FormField>

      <FormField>
        <label htmlFor='countryFlag'>
          Code ISO du pays de naissance du compositeur <br />
          <SubLabel>(ex: pour la France : "fr")</SubLabel>
        </label>
        <input
          id='countryFlag'
          type='text'
          {...register("countryFlag", {
            required: "Ce champ est requis",
            pattern: {
              value: /^[a-zA-Z]{2}$/i,
              message: "Le code ISO doit strictement contenir deux lettres",
            },
          })}
        />
        {errors.countryFlag && (
          <ErrorMessage>{errors.countryFlag.message}</ErrorMessage>
        )}
      </FormField>

      <FormField>
        <label htmlFor='death'>
          Si le compositeur est décédé, la date de son décès <br />
          <SubLabel>(Sinon, laissez ce champ vide)</SubLabel>
        </label>
        <input
          id='death'
          type='text'
          {...register("death", {
            pattern: {
              value: /\d{4}/,
              message: "Veuillez saisir au minimum une année de décès",
            },
          })}
        />
        {errors.death && <ErrorMessage>{errors.death.message}</ErrorMessage>}
      </FormField>
      <ImageLabel htmlFor='picture'>
        Sélectionner une photo du compositeur sur votre appareil
      </ImageLabel>
      <ImageInput>
        {validImageUrl ? (
          <img src={validImageUrl} alt='Aperçu de la photo du compositeur' />
        ) : (
          <i className='fa-solid fa-camera'></i>
        )}
        <button onClick={handleAddPhotoClick}>Ajouter Photo</button>
        <Indication $blinkAlert={isBlinkingToAlert} $validImage={validImageUrl}>
          {validImageUrl
            ? "Cette photo est valide, vous pouvez continuer"
            : "La photo doit être en orientation 'paysage'"}
        </Indication>
        <input
          id='picture'
          type='file'
          accept='.jpg, .jpeg, .png, .webp, .avif'
          {...register("picture", {
            required: "Vous devez sélectionner une photo du compositeur",
          })}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              imageRef.current = e.target.files[0];
            }
          }}
        />
      </ImageInput>
      <FormField>
        <label htmlFor='pictureSource'>
          Site sur lequel vous avez trouvé la photo et auteur de la photo <br />
          <SubLabel>(au minimum le nom du site)</SubLabel>
        </label>
        <input
          id='pictureSource'
          type='text'
          {...register("pictureSource", {
            pattern: {
              value:
                /(?:\b(?:https?|ftp):\/\/|www\.)[\w-]+\.[a-zA-Z]{2,}(?:\/\S*)?/i,
              message:
                "Veuillez saisir au moins l'adresse du site web d'où provient la photo",
            },
            required: true,
          })}
        />
        {errors.pictureSource && (
          <ErrorMessage>{errors.pictureSource.message}</ErrorMessage>
        )}
      </FormField>

      <FormField>
        <label htmlFor='musicalGenre'>
          Si catégorie "Musique", style de musique du compositeur <br />
          <SubLabel>(Sinon, laissez ce champ vide)</SubLabel>
        </label>
        <input
          id='musicalGenre'
          type='text'
          {...register("musicalGenre", {
            pattern: {
              value: /^(?=.{3})[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ -/]*$/,
              message:
                "Veuillez saisir le style de musique du compositeur (ex: Rock)",
            },
          })}
        />
        {errors.musicalGenre && (
          <ErrorMessage>{errors.musicalGenre.message}</ErrorMessage>
        )}
      </FormField>

      <BioLabel htmlFor='bio'>
        Chargez une présentation du compositeur au format .txt
      </BioLabel>
      <BioInput>
        <BookIcon
          $validTextFile={validTextFileSrc}
          className='fa-solid fa-book'
        ></BookIcon>
        <button onClick={handleAddBioClick}>Ajouter Bio</button>
        <Indication
          $blinkAlert={isBlinkingToAlert}
          $validTextFile={validTextFileSrc}
        >
          {validTextFileSrc
            ? "Ce fichier est valide, vous pouvez continuer"
            : "Le fichier doit être au format .txt et ne pas excéder 20 Ko"}
        </Indication>
        <input
          id='bio'
          type='file'
          accept='.txt'
          {...register("bio", {
            required:
              "Vous devez charger une présentation du compositeur au format .txt",
          })}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              bioRef.current = e.target.files[0];
            }
          }}
        />
      </BioInput>
      <FormField>
        <label htmlFor='related'>
          Trois Artistes ou œuvres lié(e)s au compositeur <br />
          <SubLabel>
            (ex: pour Quincy Jones =&gt; Michael Jackson, Hans Zimmer =&gt; Le
            Roi Lion...)
          </SubLabel>
        </label>
        {[1, 2, 3].map((index) => (
          <div key={index}>
            <input
              id={`related${index}`}
              type='text'
              {...register(`related.${index - 1}` as const, {
                validate: {
                  duplicateValue: (value) =>
                    !isDuplicateStringValue(
                      Object.values(getValues().related),
                      value,
                      index - 1
                    ) || "Vous avez déjà renseigné l'artiste/œuvre",
                },
                required:
                  "Vous devez préciser trois artistes ou œuvres liés au compositeur",
              })}
            />
            {errors.related && (
              <ErrorMessage>{errors.related[index - 1]?.message}</ErrorMessage>
            )}
          </div>
        ))}
      </FormField>
      <FormField>
        <label htmlFor='selectedWorks'>
          Veuillez renseigner les liens de vidéos YouTube de{" "}
          <u>quatre productions (ou plus) du compositeur</u>
          <br />
          <SubLabel>
            (Accédez à chaque musique ou clip sur YouTube et copiez-collez les
            liens de la barre d'adresse dans les champs ci-dessous)
          </SubLabel>
        </label>
        {[...Array(12).keys()].map((index) => (
          <div key={index}>
            <input
              id={`selectedWorks${index}`}
              type='text'
              {...register(`selectedWorks.${index}` as const, {
                validate: (value, { selectedWorks }) => {
                  if (value === "") {
                    return true;
                  }
                  return (
                    !isDuplicateStringValue(
                      Object.values(selectedWorks),
                      value,
                      index
                    ) || "Vous avez déjà inséré le lien de ce morceau"
                  );
                },
                required:
                  index < 4
                    ? "Vous devez insérer au moins quatre liens YouTube de productions du compositeur"
                    : false,
                pattern: {
                  value: /^https:\/\/www\.youtube\.com\/watch\?v=/,
                  message:
                    "Il doit s'agir d'un lien d'une vidéo provenant de YouTube",
                },
              })}
            />
            {errors.selectedWorks && (
              <ErrorMessage>
                {errors.selectedWorks[index]?.message}
              </ErrorMessage>
            )}
          </div>
        ))}
      </FormField>
      <SubmitButtonAndMessageContainer>
        <SubmitButton
          type='submit'
          $isSubmitting={isSubmitting}
          disabled={!isValid}
        >
          {$initialValues
            ? "Modifier le compositeur"
            : "Ajouter le compositeur"}
        </SubmitButton>
        {errorMessage === null && successMessage && (
          <SuccessMessage>{successMessage}</SuccessMessage>
        )}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </SubmitButtonAndMessageContainer>
    </FormWrapper>
  );
}

export default ComposerForm;
