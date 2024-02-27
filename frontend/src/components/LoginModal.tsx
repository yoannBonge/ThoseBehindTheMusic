import Modal from "react-modal";
import styled from "styled-components";
import Form from "./Form";
import { useState } from "react";

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
    justify-content: flex-start;
    position: fixed;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40vw;
    min-height: 30vw;
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
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -3em;
  width: 76vw;
`;

const LoginWrapper = styled.div<{ isSwitchedToSignup: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: ${({ isSwitchedToSignup }) =>
    isSwitchedToSignup ? "translateX(-100%)" : "translateX(18.5%)"};
  transition: transform 0.5s ease;
  z-index: 0;
`;

const SignupWrapper = styled.div<{ isSwitchedToSignup: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: ${({ isSwitchedToSignup }) =>
    isSwitchedToSignup ? "translateX(40%)" : "translateX(-81%)"};
  transition: transform 0.5s ease;
  z-index: 0;
`;

const LoginOrSignup = styled.span`
  margin: 1.6em 0 1em 0;
  font-family: "Afacad";
  font-size: 1.2em;
  color: #1e84d7;
  cursor: pointer;
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

function LoginModal({
  showModal,
  closeModal,
  setIsLoggedIn,
}: {
  showModal: boolean;
  closeModal: () => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
}) {
  const handleCloseModal = () => {
    closeModal();
    setTimeout(() => {
      setIsSwitchedToSignup(false);
    }, 500);
  };
  const [isSwitchedToSignup, setIsSwitchedToSignup] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoggedOut, setIsLoggedOut] = useState(false);

  const toggleContent = () => {
    setIsSwitchedToSignup(!isSwitchedToSignup);
  };

  const handleSignupSuccess = () => {
    setTimeout(() => {
      setIsSwitchedToSignup(false);
    }, 1500);
  };

  const handleLoginSuccess = () => {
    setTimeout(() => {
      closeModal();
      setIsLoggedIn(true);
    }, 1500);
  };

  // const handleLogoutSuccess = () => {
  //   setTimeout(() => {
  //     setIsLoggedOut(true);
  //   }, 1500);
  // };

  return (
    <StyledModal
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={500}
    >
      <ContentWrapper>
        <LoginWrapper isSwitchedToSignup={isSwitchedToSignup}>
          <h2>Connexion</h2>
          <p>Si vous avez déjà un compte, entrez vos identifiants :</p>
          <Form formType='login' onLoginSuccess={handleLoginSuccess} />
          <LoginOrSignup onClick={toggleContent}>Créer un compte</LoginOrSignup>
        </LoginWrapper>

        <SignupWrapper isSwitchedToSignup={!isSwitchedToSignup}>
          <h2>Créer un compte</h2>
          <p>Veuillez entrer votre adresse mail ainsi qu'un mot de passe :</p>
          <Form formType='signup' onSignupSuccess={handleSignupSuccess} />
          <LoginOrSignup onClick={toggleContent}>
            Revenir à la page de connexion
          </LoginOrSignup>
        </SignupWrapper>
      </ContentWrapper>

      <CloseButton onClick={handleCloseModal}>
        <i className='fa-solid fa-xmark'></i>
      </CloseButton>
    </StyledModal>
  );
}

export default LoginModal;
