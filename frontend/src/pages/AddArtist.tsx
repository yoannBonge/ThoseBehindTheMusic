import styled from "styled-components";
import { PageWrapper } from "../utils/constants";
import Scrollbar from "smooth-scrollbar";
import { useEffect, useRef, useState } from "react";
import AddArtistForm from "../components/AddArtistForm";

const Wrapper = styled(PageWrapper)`
  background-image: url("tape-background.webp");
  background-size: cover;
  background-attachment: fixed;
  background-position: center 65%;
  background-repeat: no-repeat;
  align-items: flex-start;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2vw;
  h2 {
    font-family: "Rangile";
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
  /* background-color: rebeccapurple; */
  height: 60vh;
  width: 59.5vw;
  overflow: hidden;
`;

function AddArtist() {
  const formRef = useRef(null);
  const scrollbarRef = useRef<Scrollbar | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  return (
    <Wrapper>
      <ContentWrapper>
        <h2>Ajouter un artiste</h2>
        <p>
          Renseigner toutes les informations suivantes concernant un compositeur
          que vous souhaiter voir apparaître sur le site.
        </p>
        <FormContainer ref={formRef}>
          <AddArtistForm onFormSubmitSuccess={handleFormSubmitSuccess} />
        </FormContainer>
      </ContentWrapper>
    </Wrapper>
  );
}

export default AddArtist;
