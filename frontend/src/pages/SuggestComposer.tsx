import styled from "styled-components";
import { PageWrapper } from "../utils/constants";
import Scrollbar from "smooth-scrollbar";
import { useEffect, useRef, useState } from "react";
import SuggestForm from "../components/SuggestForm";

/////////////////////////////////////////////////////////////////////////////STYLE
const Wrapper = styled(PageWrapper)`
  background-image: url("/tape-background.webp");
  background-size: cover;
  background-attachment: fixed;
  background-position: center 65%;
  background-repeat: no-repeat;
  align-items: flex-start;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2vw;
  h2 {
    font-family: "Bakbak One";
    font-size: 3em;
    color: black;
    margin: 0.5em 0 0em 0;
  }
  p {
    font-family: "Afacad";
    font-size: 1.4em;
    color: black;
    max-width: 60%;
    padding-bottom: 1em;
    border-bottom: 2px solid black;
  }
`;

const FormContainer = styled.div`
  height: 52vh;
  width: 59.5vw;
  overflow: hidden;
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function SuggestComposer() {
  //////////////////////////////////////////////////////STATE
  const [formSubmitted, setFormSubmitted] = useState(false);
  //////////////////////////////////////////////////////REF
  const formRef = useRef(null);
  const scrollbarRef = useRef<Scrollbar | null>(null);

  //////////////////////////////////////////////////////BEHAVIOR
  useEffect(() => {
    if (formRef.current) {
      scrollbarRef.current = Scrollbar.init(formRef.current, {
        alwaysShowTracks: true,
        continuousScrolling: true,
        damping: 0.03,
      });

      if (scrollbarRef.current) {
        scrollbarRef.current.scrollTo(0, 0);
      }
    }

    return () => {
      if (scrollbarRef.current) {
        scrollbarRef.current.destroy();
      }
    };
  }, [formSubmitted]);

  const handleFormSubmitSuccess = () => {
    setFormSubmitted(!formSubmitted);
  };

  // console.log("RENDER PAGE SUGGEST COMPOSER");

  //////////////////////////////////////////////////////RENDER
  return (
    <Wrapper>
      <ContentWrapper>
        <h2>Proposer un compositeur</h2>
        <p>
          Veuillez renseigner les informations suivantes concernant un
          compositeur que vous souhaiteriez voir apparaître sur le site puis
          soumettez le formulaire pour que votre suggestion soit transmise à
          l'administrateur du site. Merci d'avance pour votre contribution !
        </p>
        <FormContainer ref={formRef}>
          <SuggestForm onFormSubmitSuccess={handleFormSubmitSuccess} />
        </FormContainer>
      </ContentWrapper>
    </Wrapper>
  );
}

export default SuggestComposer;
