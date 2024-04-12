import { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";
import styled from "styled-components";
import { device } from "../utils/constants";

/////////////////////////////////////////////////////////////////////////////STYLE
const BioContainer = styled.div`
  /* background-color: red; */
  width: 121vw;
  height: 100%;
  overflow: hidden;
  @media ${device.xmd} {
    width: 135vw;
  }
  @media ${device.switchDisplay} {
    width: 690vw;
  }
`;

const BioContent = styled.p`
  /* background-color: red; */
  font-family: "Afacad";
  font-size: 1.6vw;
  /* font-size: 1.5em; */
  color: white;
  line-height: 1.2em;
  padding-right: 1em;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;

  /* @media ${device.lg} {
    font-size: 2vw;
  } */
  @media ${device.xmd} {
    font-size: 2.2vw;
  }
  @media ${device.switchDisplay} {
    font-size: 0.9em;
  }
  /* @media ${device.md} {
    font-size: 2.4vw;
  }
  @media ${device.sm} {
    font-size: 2.6vw;
  }
  @media ${device.xs} {
    font-size: 2.8vw;
  } */
`;
/////////////////////////////////////////////////////////////////////////////COMPONENT
function Bio({ bioContent }: { bioContent: string }) {
  //////////////////////////////////////////////////////REF
  const bioRef = useRef(null);
  const scrollbarRef = useRef<Scrollbar | null>(null);

  //////////////////////////////////////////////////////BEHAVIOR
  useEffect(() => {
    if (bioRef.current) {
      scrollbarRef.current = Scrollbar.init(bioRef.current, {
        alwaysShowTracks: true,
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

  // console.log("RENDER BIO");

  //////////////////////////////////////////////////////RENDER
  return (
    <BioContainer ref={bioRef}>
      <BioContent>{bioContent}</BioContent>
    </BioContainer>
  );
}

export default Bio;
