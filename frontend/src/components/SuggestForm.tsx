import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../utils/AuthContext";
import {
  API_ROUTES,
  Contribution,
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
  handleAddPhoto,
  isDuplicateStringValue,
} from "../utils/constants";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are shared and
// come from "/utils/constants".

/////////////////////////////////////////////////////////////////////////////COMPONENT
function SuggestForm({
  onFormSubmitSuccess,
}: {
  onFormSubmitSuccess: () => void;
}) {
  //////////////////////////////////////////////////////////////STATE
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isBlinkingToAlert, setIsBlinkingToAlert] = useState(false);
  const [validImageUrl, setValidImageUrl] = useState<string | null>(null);
  //////////////////////////////////////////////////////////////CONTEXT
  const { isLoggedIn, email } = useAuth();
  //////////////////////////////////////////////////////////////BEHAVIOR

  const handleAddPhotoClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    handleAddPhoto(event, setValidImageUrl, setIsBlinkingToAlert);
  };

  let imageRef = useRef<File | null>(null);

  const resetImage = () => {
    imageRef.current = null;
    setValidImageUrl(null);
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<Contribution>({
    mode: "all",
  });

  const onSubmit: SubmitHandler<Contribution> = async (data) => {
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (!isLoggedIn) {
        throw new Error(
          "Vous devez avoir un compte et être connecté pour proposer un compositeur."
        );
      }

      let emailContent = `L'utilisateur "${data.contributorName}" enregistré sous l'adresse
      e-mail : "${email}" vient de vous suggérer l'ajout de "${data.name}" à la
      base de données de votre site ! Voici les informations du compositeur proposé :<br><br>`;

      emailContent += `Catégorie : ${data.category}<br><br>`;
      emailContent += `Nom : ${data.name}<br><br>`;
      emailContent += `Date de naissance : ${data.birth}<br><br>`;
      emailContent += `Lieu de naissance : ${data.birthPlace}<br><br>`;
      if (data.death) {
        emailContent += `Date de décès : ${data.death}<br><br>`;
      }
      if (data.musicalGenre) {
        emailContent += `Genre musical : ${data.musicalGenre}<br><br>`;
      }
      emailContent += `Artistes ou œuvres liés :<br>`;
      data.related.forEach((related, index) => {
        emailContent += `  ${index + 1}. ${related}<br>`;
      });
      emailContent += `<br>Productions sélectionnées :<br>`;
      data.selectedWorks.forEach((work, index) => {
        emailContent += `  ${index + 1}. ${work}<br>`;
      });

      // ADD PICTURE
      if (imageRef.current) {
        const file = imageRef.current;
        const reader = new FileReader();

        // PICTURE PROMISE
        const readImage = new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const imageDataUrl = reader.result?.toString() || "";
            resolve(imageDataUrl);
          };
          reader.onerror = reject;
        });

        // PICTURE READING
        reader.readAsDataURL(file);

        const imageDataUrl = await readImage;
        emailContent += "<br><br>Image choisie :<br>";
        emailContent += `<div style="max-width: 600px;">
        <img src="${imageDataUrl}" alt="Image du compositeur" style="max-width: 100%; height: auto;" /><br>
    </div>`;
      }
      emailContent += `<br>Source de l'image : ${data.pictureSource}`;
      const apiUrl = API_ROUTES.SUGGEST_COMPOSER;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: emailContent,
          contentType: "text/html",
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setSuccessMessage(null);
        throw new Error(responseData.message || "Une erreur s'est produite.");
      }
      ////////////////////////////SUCCESS
      const successMessage = "Suggestion envoyée, merci !";
      setSuccessMessage(successMessage);

      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessMessage(null);
        reset();
        resetImage();
        onFormSubmitSuccess();
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

  // console.log("RENDER SUGGEST FORM");

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
            : "La photo doit être en orientation 'paysage' (plus large que haute)"}
        </Indication>
        <input
          id='picture'
          type='file'
          accept='.jpg, .jpeg, .png, .webp, .avif'
          {...register("picture", {
            required: "Vous devez sélectionner une photo du compositeur",
            validate: {
              fileSize: (value) => {
                if (value && value[0] && value[0].size > 4 * 1024 * 1024) {
                  return "La poids du fichier est trop élevé. Veuillez sélectionner un fichier de moins de 4 MB.";
                }
                return true;
              },
            },
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
                "Saisissez au moins l'adresse du site web d'où provient la photo (ex: www.unsplash.com)",
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
          <u>trois productions du compositeur</u>
          <br />
          <SubLabel>
            (Accédez à chaque musique ou clip sur YouTube et copiez-collez les
            liens de la barre d'adresse dans les champs ci-dessous)
          </SubLabel>
        </label>
        {[1, 2, 3].map((index) => (
          <div key={index}>
            <input
              id={`selectedWorks${index}`}
              type='text'
              {...register(`selectedWorks.${index - 1}` as const, {
                validate: {
                  duplicateValue: (value) =>
                    !isDuplicateStringValue(
                      Object.values(getValues().selectedWorks),
                      value,
                      index - 1
                    ) || "Vous avez déjà inséré le lien de ce morceau",
                },
                required:
                  "Vous devez insérer trois liens YouTube de productions du compositeur",
                pattern: {
                  value: /^https:\/\/www\.youtube\.com\/watch\?v=/,
                  message:
                    "Il doit s'agir d'un lien d'une vidéo provenant de YouTube",
                },
              })}
            />
            {errors.selectedWorks && (
              <ErrorMessage>
                {errors.selectedWorks[index - 1]?.message}
              </ErrorMessage>
            )}
          </div>
        ))}
      </FormField>

      <FormField>
        <label htmlFor='contributorName'>Votre nom (ou alias)</label>
        <input
          id='contributorName'
          type='text'
          {...register("contributorName", {
            required: "Ce champ est requis",
            pattern: {
              value: /^[A-Za-z0-9._%+-]*[A-Za-z][A-Za-z0-9._%+-]*[A-Za-z0-9]$/i,
              message: "Indiquez votre nom ou alias",
            },
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </FormField>

      <SubmitButtonAndMessageContainer>
        <SubmitButton
          type='submit'
          $isSubmitting={isSubmitting}
          disabled={!isValid}
        >
          Envoyer votre suggestion
        </SubmitButton>
        {errorMessage === null && successMessage && (
          <SuccessMessage>{successMessage}</SuccessMessage>
        )}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </SubmitButtonAndMessageContainer>
    </FormWrapper>
  );
}

export default SuggestForm;
