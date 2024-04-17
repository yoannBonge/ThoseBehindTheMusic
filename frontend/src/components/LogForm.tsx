import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { API_ROUTES, device } from "../utils/constants";
import { useAuth } from "../utils/context/auth/useAuth";

/////////////////////////////////////////////////////////////////////////////STYLE
type FormInputs = {
  email: string;
  password: string;
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  gap: 2vw;
  @media ${device.lg} {
    width: 70%;
  }
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
    @media ${device.lg} {
      font-size: 1.7vw;
    }
    @media ${device.switchDisplay} {
      font-size: 2.3vw;
    }
    @media ${device.sm} {
      font-size: 3vw;
    }
  }
  input {
    height: 1.7vw;
    border-radius: 4px;
    @media ${device.lg} {
      height: 1.8vw;
    }
    @media ${device.switchDisplay} {
      height: 1.9vw;
      max-width: 30vw;
    }
    @media ${device.sm} {
      height: 2vw;
    }
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
  text-align: center;
  @media ${device.lg} {
    font-size: 1.6vw;
  }
  @media ${device.switchDisplay} {
    font-size: 2.2vw;
  }
  @media ${device.sm} {
    font-size: 2.5vw;
  }
`;

const ErrorSubmitMessage = styled(ErrorMessage)`
  white-space: nowrap;
  text-align: center;
`;

const SuccessMessage = styled.span`
  color: #55fb2c;
  font-family: "Afacad";
  font-size: 1em;
  font-weight: 500;
  display: block;
  text-align: center;
  @media ${device.lg} {
    font-size: 1.6vw;
  }
  @media ${device.switchDisplay} {
    font-size: 2.2vw;
  }
  @media ${device.sm} {
    font-size: 2.5vw;
  }
`;

const SubmitButton = styled.button<{
  $isSubmitting: boolean;
  $formType: string;
}>`
  display: flex;
  background-color: ${({ $isSubmitting }) =>
    $isSubmitting ? "#626262" : "#0c832c"};
  margin-top: 0.5em;
  color: white;
  font-family: "Afacad";
  font-size: 1.1em;
  border-radius: 4px;
  padding: 0.3em;
  line-height: 1em;
  align-self: center;
  cursor: ${({ $isSubmitting }) => ($isSubmitting ? "not-allowed" : "pointer")};
  @media ${device.lg} {
    font-size: 1.7vw;
  }
  @media ${device.switchDisplay} {
    font-size: 2.3vw;
  }
  @media ${device.sm} {
    font-size: 3vw;
  }
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

/////////////////////////////////////////////////////////////////////////////COMPONENT
function LogForm({ formType, onSignupSuccess, onLoginSuccess }: FormProps) {
  //////////////////////////////////////////////////////STATE
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  //////////////////////////////////////////////////////CONTEXT
  const { login } = useAuth();

  //////////////////////////////////////////////////////BEHAVIOR
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
      } else if (formType === "login") {
        apiUrl = API_ROUTES.LOG_IN;
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
        // setSuccessMessage(null);
        throw new Error(responseData.message || "Une erreur s'est produite.");
      }

      if (onSignupSuccess) {
        setErrorMessage(null);
        onSignupSuccess();
        setSuccessMessage("Compte créé avec succès");

        setTimeout(() => {
          setSuccessMessage(null);
          reset();
        }, 1500);
      }

      if (onLoginSuccess && responseData.token) {
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("tokenExpiration", responseData.tokenExpiration);
        localStorage.setItem("email", responseData.email);
        localStorage.setItem(
          "isAdmin",
          responseData.isAdmin === true ? "true" : "false"
        );
        setSuccessMessage("Vous êtes bien connecté(e)");
        login();
        onLoginSuccess();

        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      }
    } catch (error: any) {
      console.error(error.message);
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
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

  // console.log("RENDER LOGFORM");

  //////////////////////////////////////////////////////RENDER
  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <label htmlFor={formType === "login" ? "login-email" : "signup-email"}>
          E-mail
        </label>
        <input
          id={formType === "login" ? "login-email" : "signup-email"}
          type='email'
          autoComplete='email'
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
        <label
          htmlFor={formType === "login" ? "login-password" : "signup-password"}
        >
          Mot de passe
        </label>
        <input
          id={formType === "login" ? "login-password" : "signup-password"}
          type='password'
          autoComplete={
            formType === "login" ? "current-password" : "new-password"
          }
          {...register("password", passwordValidation)}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </FormField>

      <SubmitButton
        type='submit'
        $isSubmitting={isSubmitting}
        $formType={formType}
        disabled={!isValid}
      >
        {formType === "login" ? "Se connecter" : "Créer mon compte"}
      </SubmitButton>
      {errorMessage === null && successMessage && (
        <SuccessMessage>{successMessage}</SuccessMessage>
      )}
      {successMessage === null && errorMessage && (
        <ErrorSubmitMessage>{errorMessage}</ErrorSubmitMessage>
      )}
    </FormWrapper>
  );
}

export default LogForm;
