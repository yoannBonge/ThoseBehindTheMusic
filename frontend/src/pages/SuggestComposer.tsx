import { useEffect, useRef, useState } from "react";
import Scrollbar from "smooth-scrollbar";
import styled from "styled-components";
import SuggestForm from "../components/SuggestForm";
import {
  FormContentWrapper,
  FormPageWrapper,
  device,
} from "../utils/constants";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some styled-components appearing in the render are shared and
// come from "/utils/constants".

const ContentWrapper = styled(FormContentWrapper)`
  h2 {
    line-height: 1em;
  }
  p {
    @media ${device.md} {
      font-size: 3.1vw;
    }
  }
`;

const FormContainer = styled.div`
  height: 100%;
  width: 59.5vw;
  overflow: hidden;
  @media ${device.md} {
    width: 90vw;
  }
  @media ${device.switchDisplay} {
    height: 90%;
  }
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
    <FormPageWrapper>
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
    </FormPageWrapper>
  );
}

export default SuggestComposer;
