import { useRef, useEffect } from "react";
import Scrollbar from "smooth-scrollbar";
import styled from "styled-components";

const BioContainer = styled.div`
  width: 40vw;
  overflow: hidden;
`;

const BioContent = styled.p`
  font-family: "Afacad";
  font-size: 1.5em;
  color: white;
  line-height: 1.2em;
  padding-right: 1em;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

function Bio({ bioContent }: { bioContent: string }) {
  const bioRef = useRef(null);
  const scrollbarRef = useRef<Scrollbar | null>(null);

  useEffect(() => {
    if (bioRef.current) {
      scrollbarRef.current = Scrollbar.init(bioRef.current, {
        alwaysShowTracks: false,
        continuousScrolling: true,
        damping: 0.01,
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
  }, [bioContent]);

  return (
    <BioContainer ref={bioRef}>
      <BioContent>{bioContent}</BioContent>
    </BioContainer>
  );
}

export default Bio;
