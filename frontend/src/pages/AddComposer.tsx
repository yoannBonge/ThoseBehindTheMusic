import { useEffect, useRef, useState } from "react";
import Scrollbar from "smooth-scrollbar";
import styled from "styled-components";
import ComposerForm from "../components/ComposerForm";
import {
  FormContentWrapper,
  FormPageWrapper,
  device,
} from "../utils/constants";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some styled-components appearing in the render are shared and
// come from "/utils/constants".

const FormContainer = styled.div`
  height: 57vh;
  width: 59.5vw;
  overflow: hidden;
  @media ${device.md} {
    width: 90vw;
  }
  @media ${device.sm} {
    height: 58vh;
    width: 90vw;
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function AddComposer() {
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

  // console.log("RENDER PAGE ADD COMPOSER");

  //////////////////////////////////////////////////////RENDER
  return (
    <FormPageWrapper>
      <FormContentWrapper>
        <h2>Ajouter un compositeur</h2>
        <p>
          Veuillez renseigner toutes les informations suivantes concernant un
          compositeur que vous souhaiter voir apparaître sur le site.
        </p>
        <FormContainer ref={formRef}>
          <ComposerForm
            $initialValues={null}
            onFormSubmitSuccess={handleFormSubmitSuccess}
          />
        </FormContainer>
      </FormContentWrapper>
    </FormPageWrapper>
  );
}

export default AddComposer;
