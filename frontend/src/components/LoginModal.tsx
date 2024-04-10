import { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { device } from "../utils/constants";
import { useAuth } from "../utils/context/auth/useAuth";
import LogForm from "./LogForm";

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

/////////////////////////////////////////////////////////////////////////////STYLE
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
    justify-content: start;
    position: fixed;
    top: 55vh;
    left: 50vw;
    transform: translate(-50%, -50%);
    width: 40vw;
    min-height: 35vh;
    max-height: 87vh;
    padding-bottom: 1em;
    border: 1px solid white;
    box-shadow: 0px 0px 10px #ffffff;
    border-radius: 10px;
    overflow: hidden;
    z-index: 4;
    @media ${device.lg} {
      width: 50vw;
    }
    @media ${device.sm} {
      width: 60vw;
    }
  }
  h2 {
    font-family: "Bakbak One";
    font-size: 3em;
    color: white;
    margin: 0.7em 0 0.3em 0;
    text-align: center;
    @media ${device.lg} {
      font-size: 4vw;
    }
    @media ${device.md} {
      font-size: 5vw;
    }
    @media ${device.sm} {
      font-size: 7vw;
    }
  }
  p {
    font-family: "Afacad";
    font-size: 1.3em;
    color: white;
    margin-bottom: 1.4em;
    text-align: center;
    width: 33vw;
    @media ${device.lg} {
      font-size: 1.9vw;
    }
    @media ${device.md} {
      font-size: 2.5vw;
    }
    @media ${device.sm} {
      font-size: 3.5vw;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const LoginWrapper = styled.div<{ $isSwitchedToSignup: boolean }>`
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: ${({ $isSwitchedToSignup }) =>
    $isSwitchedToSignup ? "translateX(-100%)" : "translateX(10.5%)"};
  transition: transform 0.5s ease;
  z-index: 0;
  @media ${device.lg} {
    transform: ${({ $isSwitchedToSignup }) =>
      $isSwitchedToSignup ? "translateX(-100%)" : "translateX(25.3%)"};
  }
  @media ${device.sm} {
    transform: ${({ $isSwitchedToSignup }) =>
      $isSwitchedToSignup ? "translateX(-100%)" : "translateX(40.5%)"};
  }
`;

const SignupWrapper = styled.div<{ $isSwitchedToSignup: boolean }>`
  /* background-color: green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: ${({ $isSwitchedToSignup }) =>
    $isSwitchedToSignup ? "translateX(40%)" : "translateX(-89.5%)"};
  transition: transform 0.5s ease;
  z-index: 0;
  @media ${device.lg} {
    transform: ${({ $isSwitchedToSignup }) =>
      $isSwitchedToSignup ? "translateX(60%)" : "translateX(-75%)"};
  }
  @media ${device.sm} {
    transform: ${({ $isSwitchedToSignup }) =>
      $isSwitchedToSignup ? "translateX(90%)" : "translateX(-60%)"};
  }
`;

const LoginOrSignup = styled.span`
  margin: 1.6em 0 1em 0;
  font-family: "Afacad";
  font-size: 1.2em;
  color: #1e84d7;
  text-align: center;
  cursor: pointer;
  @media ${device.lg} {
    font-size: 1.8vw;
  }
  @media ${device.md} {
    font-size: 2.4vw;
  }
  @media ${device.sm} {
    font-size: 2.9vw;
  }
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
  @media ${device.sm} {
    font-size: 3.5vw;
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function LoginModal({
  showLoginModal,
  closeModal,
}: {
  showLoginModal: boolean;
  closeModal: () => void;
}) {
  //////////////////////////////////////////////////////STATE
  const [isSwitchedToSignup, setIsSwitchedToSignup] = useState(false);
  //////////////////////////////////////////////////////CONTEXT
  const { login } = useAuth();

  //////////////////////////////////////////////////////BEHAVIOR
  const handleCloseModal = () => {
    closeModal();
    setTimeout(() => {
      setIsSwitchedToSignup(false);
    }, 500);
  };

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
      login();
    }, 1500);
  };

  // console.log("RENDER LOGIN MODAL");

  //////////////////////////////////////////////////////RENDER
  return (
    <StyledModal
      isOpen={showLoginModal}
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={500}
    >
      <ContentWrapper>
        <LoginWrapper $isSwitchedToSignup={isSwitchedToSignup}>
          <h2>Connexion</h2>
          <p>Si vous avez déjà un compte, entrez vos identifiants</p>
          <LogForm formType='login' onLoginSuccess={handleLoginSuccess} />
          <LoginOrSignup onClick={toggleContent}>Créer un compte</LoginOrSignup>
        </LoginWrapper>

        <SignupWrapper $isSwitchedToSignup={!isSwitchedToSignup}>
          <h2>Créer un compte</h2>
          <p>Veuillez entrer votre adresse mail ainsi qu'un mot de passe</p>
          <LogForm formType='signup' onSignupSuccess={handleSignupSuccess} />
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
