import styled from "styled-components";
import { API_ROUTES, Composer, PageWrapper } from "../utils/constants";
import Scrollbar from "smooth-scrollbar";
import { useEffect, useRef, useState } from "react";
import ComposerForm from "../components/ComposerForm";
import { useParams } from "react-router-dom";

/////////////////////////////////////////////////////////////////////////////STYLE

// Some components appearing in the render are shared and
// come from "/utils/constants".

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
    max-width: 70%;
    padding-bottom: 1em;
    border-bottom: 2px solid black;
  }
`;

const FormContainer = styled.div`
  height: 60vh;
  width: 59.5vw;
  overflow: hidden;
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
    <Wrapper>
      <ContentWrapper>
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
      </ContentWrapper>
    </Wrapper>
  );
}

export default ModifyComposer;
