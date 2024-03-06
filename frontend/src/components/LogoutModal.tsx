import Modal from "react-modal";
import styled from "styled-components";
import { useState } from "react";
import { API_ROUTES } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

/////// The code below is a trick to style the overlay of a react-modal when using styled-components.
interface Props extends ReactModal.Props {
  className?: string;
}

const ReactModalAdapter: React.FunctionComponent<Props> = ({
  className,
  ...props
}: Props) => {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;
  return (
    <Modal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    />
  );
};

/////// Then i use a styled(ReactModalAdapter)
const StyledModal = styled(ReactModalAdapter)`
  &__overlay {
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    inset: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    opacity: 0;
    transition: opacity 500ms ease-in-out;
    box-sizing: border-box;
    &.ReactModal__Overlay--after-open {
      opacity: 1;
    }
    &.ReactModal__Overlay--before-close {
      opacity: 0;
    }
  }

  &__content {
    background-color: #1a1a1a;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;
    min-height: 18vw;
    padding-bottom: 1em;
    border: 1px solid white;
    box-shadow: 0px 0px 10px #ffffff;
    border-radius: 10px;
    overflow: hidden;
    z-index: 4;
  }
  h2 {
    font-family: "Rangile";
    font-size: 3em;
    color: white;
    margin: 0.7em 0 0.3em 0;
  }
  p {
    font-family: "Afacad";
    font-size: 1.3em;
    color: white;
    margin-bottom: 1.4em;
    text-align: center;
    /* max-width: 24em; */
    width: 24em;
    span {
      font-family: "Afacad";
      font-size: 1em;
      color: red;
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  margin: 0.5em 0 1em 0;
`;

const Button = styled.button`
  color: white;
  font-family: "Afacad";
  font-size: 1.1em;
  border-radius: 4px;
  padding: 0.3em;
`;

const ConfirmationButton = styled(Button)<{
  $isSubmitting: boolean;
}>`
  background-color: ${({ $isSubmitting }) =>
    $isSubmitting ? "#626262" : "red"};
  cursor: ${({ $isSubmitting }) => ($isSubmitting ? "not-allowed" : "pointer")};
`;

const CancelButton = styled(Button)<{
  $isSubmitting: boolean;
}>`
  background-color: ${({ $isSubmitting }) =>
    $isSubmitting ? "#626262" : "#0c832c"};
  cursor: ${({ $isSubmitting }) => ($isSubmitting ? "not-allowed" : "pointer")};
`;

const ErrorMessage = styled.span`
  color: #fb2c2c;
  font-family: "Afacad";
  font-size: 1em;
  font-weight: 500;
  display: block;
`;

const SuccessMessage = styled.span`
  color: #55fb2c;
  font-family: "Afacad";
  font-size: 1em;
  font-weight: 500;
  display: block;
`;

const CloseButton = styled.button<{ onClick: () => void }>`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.2em;
  background-color: transparent;
  color: white;
  border: none;
  padding: 10px 10px 4px 4px;
  border-radius: 5px;
  cursor: pointer;
`;

function LogoutModal({
  showLogoutModal,
  closeModal,
}: {
  showLogoutModal: boolean;
  closeModal: () => void;
}) {
  const { logout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsSubmitting(true);

    try {
      let apiUrl = "";
      apiUrl = API_ROUTES.LOG_OUT;
      setSuccessMessage("Vous êtes bien déconnecté(e).");
      const token = sessionStorage.getItem("token");

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        setSuccessMessage(null);
        throw new Error(responseData.message || "Une erreur s'est produite.");
      }
      // console.log(responseData);

      if (responseData.token) {
        sessionStorage.removeItem("token");
      }
    } catch (error: any) {
      console.error(error.message);
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      logout();
      setTimeout(() => {
        setSuccessMessage("Redirection vers la page d'accueil du site...");
      }, 500);
      setTimeout(() => {
        closeModal();
        navigate("/");
      }, 2000);
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessMessage(null);
      }, 2500);
    }, 1500);
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <StyledModal
      isOpen={showLogoutModal}
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={false}
      closeTimeoutMS={500}
    >
      <h2>Déconnexion</h2>
      <p>
        Vous êtes sur le point de vous <span>déconnecter</span> :
      </p>
      <ButtonsWrapper>
        <ConfirmationButton onClick={handleLogout} $isSubmitting={isSubmitting}>
          Confirmer
        </ConfirmationButton>
        <CancelButton onClick={handleCloseModal} $isSubmitting={isSubmitting}>
          Annuler
        </CancelButton>
      </ButtonsWrapper>
      {errorMessage === null && successMessage && (
        <SuccessMessage>{successMessage}</SuccessMessage>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <CloseButton onClick={handleCloseModal}>
        <i className='fa-solid fa-xmark'></i>
      </CloseButton>
    </StyledModal>
  );
}

export default LogoutModal;
