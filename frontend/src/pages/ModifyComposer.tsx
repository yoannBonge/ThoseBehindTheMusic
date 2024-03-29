import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Scrollbar from "smooth-scrollbar";
import styled from "styled-components";
import ComposerForm from "../components/ComposerForm";
import {
  API_ROUTES,
  Composer,
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
function ModifyComposer() {
  //////////////////////////////////////////////////////////////STATE
  const [composer, setComposer] = useState<Composer | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  //////////////////////////////////////////////////////////////REF
  const formRef = useRef(null);
  const scrollbarRef = useRef<Scrollbar | null>(null);
  //////////////////////////////////////////////////////////////ID
  const { id } = useParams<{ id: string }>();

  //////////////////////////////////////////////////////////////BEHAVIOR
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

  useEffect(() => {
    const fetchComposer = async () => {
      if (!id) {
        console.error("ID not found in URL params");
        return;
      }
      try {
        const apiUrl = API_ROUTES.GET_COMPOSER_BY_ID(id);
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur lors de la requête GET : ${response.status}`);
        }

        const fetchedComposer: Composer = await response.json();
        setComposer(fetchedComposer);
      } catch (error) {
        console.error("Erreur lors de la récupération du compositeur :", error);
      }
    };

    fetchComposer();
  }, [id]);

  // console.log("RENDER PAGE MODIFY COMPOSER");

  //////////////////////////////////////////////////////////////RENDER
  return (
    <FormPageWrapper>
      <FormContentWrapper>
        <h2>Modifier le compositeur</h2>
        <p>
          Veuillez modifier les informations du compositeur que vous souhaitez
          mettre à jour.
        </p>
        <FormContainer ref={formRef}>
          <ComposerForm
            $initialValues={composer}
            onFormSubmitSuccess={handleFormSubmitSuccess}
          />
        </FormContainer>
      </FormContentWrapper>
    </FormPageWrapper>
  );
}

export default ModifyComposer;
