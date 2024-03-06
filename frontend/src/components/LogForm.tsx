import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { API_ROUTES } from "../utils/constants";
import { useAuth } from "../utils/AuthContext";

type FormInputs = {
  email: string;
  password: string;
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15vw;
  gap: 1em;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2px;
  label {
    color: white;
    font-family: "Afacad";
    font-size: 1.1em;
  }
  input {
    width: 100%;
    height: 1.6em;
    border-radius: 4px;
    &:focus {
      outline-color: #0c832c;
    }
  }
`;

const ErrorMessage = styled.span`
  color: #fb2c2c;
  font-family: "Afacad";
  font-size: 1em;
  font-weight: 500;
  display: block;
`;

const ErrorSubmitMessage = styled(ErrorMessage)`
  white-space: nowrap;
`;

const SuccessMessage = styled.span`
  color: #55fb2c;
  font-family: "Afacad";
  font-size: 1em;
  font-weight: 500;
  display: block;
`;

const SubmitButton = styled.button<{
  $isSubmitting: boolean;
  formType: string;
}>`
  background-color: ${({ $isSubmitting }) =>
    $isSubmitting ? "#626262" : "#0c832c"};
  margin-top: 0.5em;
  color: white;
  font-family: "Afacad";
  font-size: 1.1em;
  border-radius: 4px;
  padding: 0.3em;
  cursor: ${({ $isSubmitting }) => ($isSubmitting ? "not-allowed" : "pointer")};
  &:disabled {
    background-color: #cccccc;
    color: #454545;
    cursor: not-allowed;
  }
`;

type FormProps = {
  formType: "login" | "signup";
  onSignupSuccess?: () => void;
  onLoginSuccess?: () => void;
};

function LogForm({ formType, onSignupSuccess, onLoginSuccess }: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true);

    try {
      let apiUrl = "";
      if (formType === "signup") {
        apiUrl = API_ROUTES.SIGN_UP;
        setSuccessMessage("Compte créé avec succès");
      } else if (formType === "login") {
        apiUrl = API_ROUTES.LOG_IN;
        setSuccessMessage("Vous êtes bien connecté(e)");
      }
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (!response.ok) {
        setSuccessMessage(null);
        throw new Error(responseData.message || "Une erreur s'est produite.");
      }
      console.log(responseData);

      if (onSignupSuccess) {
        onSignupSuccess();
        setTimeout(() => {
          setSuccessMessage(null);
          reset();
        }, 1500);
      }
      if (onLoginSuccess && responseData.token) {
        sessionStorage.setItem("token", responseData.token);
        sessionStorage.setItem(
          "isAdmin",
          responseData.isAdmin === true ? "true" : "false"
        );
        login();
        onLoginSuccess();
      }

      //////////////////////////////////////////////////////////
    } catch (error: any) {
      console.error(error.message);
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const passwordValidation = {
    required: "Ce champ est requis",
    minLength: {
      value: 8,
      message: "Le mot de passe doit contenir au moins 8 caractères",
    },
    maxLength: {
      value: 18,
      message: "Le mot de passe doit contenir maximum 18 caractères",
    },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/,
      message:
        "Le mot de passe doit contenir entre 8 et 18 caractères, dont 1 majuscule, 1 caractère spécial et 1 chiffre",
    },
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <label htmlFor='email'>E-mail</label>
        <input
          id='email'
          type='email'
          {...register("email", {
            required: "Ce champ est requis",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Adresse e-mail invalide",
            },
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </FormField>

      <FormField>
        <label htmlFor='password'>Mot de passe</label>
        <input
          id='password'
          type='password'
          {...register("password", passwordValidation)}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </FormField>

      <SubmitButton
        type='submit'
        $isSubmitting={isSubmitting}
        formType={formType}
        disabled={!isValid}
      >
        {formType === "login" ? "Se connecter" : "Créer mon compte"}
      </SubmitButton>
      {errorMessage === null && successMessage && (
        <SuccessMessage>{successMessage}</SuccessMessage>
      )}
      {errorMessage && <ErrorSubmitMessage>{errorMessage}</ErrorSubmitMessage>}
    </FormWrapper>
  );
}

export default LogForm;
