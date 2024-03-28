import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Scrollbar from "smooth-scrollbar";
import styled from "styled-components";
import ComposerForm from "../components/ComposerForm";
import { API_ROUTES, Composer, PageWrapper, device } from "../utils/constants";

/////////////////////////////////////////////////////////////////////////////STYLE

const Wrapper = styled(PageWrapper)`
  background-image: url("/tape-background.webp");
  background-size: cover;
  background-attachment: fixed;
  background-position: center 65%;
  background-repeat: no-repeat;
  align-items: flex-start;
  overflow: hidden;
  @media ${device.md} {
    display: flex;
    background-position: inherit;
    background-image: inherit;
    background-color: #d1ddcc;
    align-items: center;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2vw;
  @media ${device.md} {
    margin: 0;
    align-items: center;
  }
  h2 {
    font-family: "Bakbak One";
    font-size: 3em;
    color: black;
    margin: 0.5em 0 0em 0;
    @media ${device.md} {
      font-size: 6vw;
      text-align: center;
    }
  }
  p {
    font-family: "Afacad";
    font-size: 1.4em;
    color: black;
    max-width: 70%;
    padding-bottom: 1em;
    border-bottom: 2px solid black;
    @media ${device.md} {
      max-width: 90%;
      font-size: 3.1vw;
      text-align: center;
    }
    @media ${device.sm} {
      font-size: 3.7vw;
    }
  }
`;

const FormContainer = styled.div`
  height: 15%;
  width: 59.5vw;
  overflow: hidden;
  @media ${device.md} {
    width: 90vw;
    height: 11.5%;
  }
  @media ${device.sm} {
    width: 90vw;
    height: 12.5%;
  }
  @media ${device.xs} {
    height: 15%;
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
