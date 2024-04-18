import styled from "styled-components";
import { device } from "../utils/constants";

interface AudioFaderProps {
  switched: boolean;
  onToggle: () => void;
}

/////////////////////////////////////////////////////////////////////////////STYLE
const Channel = styled.div`
  display: flex;
  height: 100%;
  max-height: 4vw;
  margin: 0.5vw 1.5vw;
  background: #b6afaf;
  color: rgba(255, 255, 255, 0.9);
  box-shadow: inset 0px 0px 4px 0px rgba(0, 0, 0, 0.75);
  @media ${device.md} {
    height: 1em;
    max-height: inherit;
    width: 5.1em;
  }
`;

const Slider = styled.div`
  display: flex;
  flex-direction: column;
  flex-flow: column nowrap;
  justify-content: center;
  width: 13.5vw;
  padding-right: 1.2vw;
  padding-left: 1.2vw;
  @media ${device.md} {
    width: 4.8em;
    padding-right: 9%;
    padding-left: 9%;
  }
`;

const FaderTrack = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  height: 0.5vw;
  position: relative;
  @media ${device.md} {
    height: 0.5%;
  }

  &:after {
    content: "";
    display: block;
    height: 0.2vw;
    width: 100%;
    background: #131313;
    position: absolute;
    @media ${device.md} {
      height: 1px;
    }
  }
`;

const Fader = styled.div<{ $switched: boolean }>`
  height: 1.5vw;
  width: 2.7vw;
  background: linear-gradient(
    to bottom,
    rgba(14, 14, 14, 1) 0%,
    rgba(79, 79, 79, 1) 5%,
    rgba(79, 79, 79, 1) 5%,
    rgba(79, 79, 79, 1) 10%,
    rgba(14, 14, 14, 1) 25%,
    rgba(22, 22, 22, 1) 34%,
    rgba(22, 22, 22, 1) 34%,
    rgba(79, 79, 79, 1) 73%,
    rgba(79, 79, 79, 1) 75%,
    rgba(14, 14, 14, 1) 100%
  );
  z-index: 10;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: transform 0.4s ease-in;
  transform: ${({ $switched }) =>
    $switched ? "translateX(400.8%)" : "translateX(0%)"};
  @media ${device.md} {
    height: 10px;
    width: 15px;
    transform: ${({ $switched }) =>
      $switched ? "translateX(438%)" : "translateX(0%)"};
  }
  @media ${device.xs} {
    height: 7px;
    width: 12px;
    transform: ${({ $switched }) =>
      $switched ? "translateX(463%)" : "translateX(0%)"};
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function AudioFader({ switched, onToggle }: AudioFaderProps) {
  return (
    <Channel>
      <Slider>
        <FaderTrack>
          <Fader $switched={switched} onClick={onToggle} />
        </FaderTrack>
      </Slider>
    </Channel>
  );
}

export default AudioFader;
