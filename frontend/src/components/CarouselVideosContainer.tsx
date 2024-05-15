/* eslint-disable react-hooks/rules-of-hooks */
//ESLint believes useEffect is rendered conditionally
import { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { Composer, device } from "../utils/constants";
import YoutubeVideo from "./YoutubeVideo";

const StyledSlider = styled(Slider)`
  /* background-color: #1541b9; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 41.6vw;
  height: 11vw;
  margin-top: 0.5em;
  transform: translateX(100.3%);
  @media ${device.xmd} {
    transform: translateX(100.5%);
    width: 47vw;
  }
  @media ${device.md} {
    width: 89.9vw;
    height: 100%;
    margin-top: 0;
  }
  .slick-prev,
  .slick-next {
    font-size: 0;
    margin: 0;
    padding: 0;
    color: white;
    z-index: 1;
    background: transparent;
    border: none;
  }

  .slick-prev::before,
  .slick-next::before {
    font-family: "FontAwesome";
    font-size: 2vw;
    color: rgb(255, 255, 255);
    cursor: pointer;
    @media ${device.md} {
      font-size: 20px;
    }
  }

  .slick-prev::before {
    content: "\uf053";
    margin-right: 0.6vw;
    @media ${device.xmd} {
      margin-right: 2.1vw;
    }
    @media ${device.md} {
      margin-right: 2.2vw;
    }
  }

  .slick-next::before {
    content: "\uf054";
    @media ${device.md} {
      margin-left: -0.1vw;
    }
  }
`;

/////////////////////////////////////////////////////////////////////////////COMPONENT
function CarouselVideosContainer({
  currentComposerInfos,
}: {
  currentComposerInfos: Composer;
}) {
  //////////////////////////////////////////////////////////////STATE
  const [sliderKey, setSliderKey] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(0);
  //////////////////////////////////////////////////////////////BEHAVIOR

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    swipe: true,
  };

  const tracks = currentComposerInfos.selectedWorks;

  if (!tracks) {
    return null;
  }

  useEffect(() => {
    setSliderKey((prevKey) => prevKey + 1);
    setPlayingIndex(0);
  }, [currentComposerInfos]);

  const handlePlay = (index: number) => {
    setPlayingIndex(index);
  };

  // console.log("RENDER VIDEO CONTAINER");

  //////////////////////////////////////////////////////////////RENDER
  return (
    <>
      <StyledSlider key={sliderKey} {...settings}>
        {tracks.map((track, index) => (
          <YoutubeVideo
            key={index}
            url={track}
            playing={playingIndex === index}
            onPlay={() => handlePlay(index)}
          />
        ))}
      </StyledSlider>
    </>
  );
}

export default CarouselVideosContainer;
