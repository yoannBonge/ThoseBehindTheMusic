import { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";
import styled from "styled-components";
import { device } from "../utils/constants";

/////////////////////////////////////////////////////////////////////////////STYLE
const BioContainer = styled.div`
  /* background-color: red; */
  width: 122vw;
  height: 100%;
  overflow: hidden;
  @media ${device.xmd} {
    width: 139vw;
  }
  @media ${device.md} {
    width: 690vw;
  }
`;

const BioContent = styled.p`
  /* background-color: red; */
  font-family: "Afacad";
  font-size: 1.6vw;
  /* font-size: 1.5em; */
  color: #e4e4e4;
  line-height: 1.2em;
  letter-spacing: -1px;
  padding-right: 1em;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;

  @media ${device.lg} {
    font-size: 2vw;
  }
  @media ${device.md} {
    font-size: 1.3em;
  }
  @media ${device.xs} {
    font-size: 1.1em;
  }
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
