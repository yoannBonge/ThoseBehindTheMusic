import { useEffect, useRef, useState } from "react";
import Scrollbar from "smooth-scrollbar";
import styled from "styled-components";
import ComposerForm from "../components/ComposerForm";
import { PageWrapper, device } from "../utils/constants";

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
    max-width: 60%;
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
    height: 11%;
  }
  @media ${device.xs} {
    height: 14.5%;
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
    <Wrapper>
      <ContentWrapper>
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
      </ContentWrapper>
    </Wrapper>
  );
}

export default AddComposer;
