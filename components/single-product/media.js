/** @format */

import styled from "@emotion/styled";
import { Container } from "react-bootstrap";
import ReactIdSwiper from "react-id-swiper";
import Image from "next/image";
import { useRef } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import _ from "lodash";

const Media = ({ data }) => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 100}`;
  };

  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const sliderRef = useRef(null);
  const options = {
    spaceBetween: 37,
    autoplay: true,
    pagination: {
      el: `.swiper-pagination`,
      clickable: true,
      renderBullet: (index, className) => {
        return (
          '<span class="' +
          className +
          '"><Image loader="' +
          logoLoader +
          '" src="' +
          data[index].url +
          '" alt="' +
          data[index].altText +
          '" width="40" height="30" /></span>'
        );
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };
  const sliderGoNext = () => {
    if (sliderRef.current && sliderRef.current.swiper) {
      sliderRef.current.swiper.slideNext();
    }
  };
  const sliderGoPrev = () => {
    if (sliderRef.current && sliderRef.current.swiper) {
      sliderRef.current.swiper.slidePrev();
    }
  };
  return (
    <MediaWrapper id="media">
      <h3>Media</h3>
      <Container>
        <MediaSlider>
          {data.length > 2 ? (
            <>
              <ReactIdSwiper
                {...options}
                ref={sliderRef}
                className="media_swiper_slider"
              >
                {_.map(data, (item, index) => (
                  <div key={index} className="imageContainer">
                    <Image
                      className="image"
                      loader={logoLoader}
                      src={item.url}
                      alt={item.altText}
                      layout="fill"
                      priority
                    />
                  </div>
                ))}
              </ReactIdSwiper>
              {!isMobile && (
                <>
                  <a
                    className="swiper-sps-btn-round-prev media_slider_prev"
                    onClick={sliderGoPrev}
                  >
                    <RiArrowLeftSLine />
                  </a>
                  <a
                    className="swiper-sps-btn-round-next media_slider_next"
                    onClick={sliderGoNext}
                  >
                    <RiArrowRightSLine />
                  </a>
                </>
              )}
            </>
          ) : (
            <div className="imageContainer">
              <Image
                loader={logoLoader}
                src={data[0].url}
                alt={data[0].altText}
                layout="fill"
                className="image"
                priority
              />
            </div>
          )}
        </MediaSlider>
      </Container>
    </MediaWrapper>
  );
};
export default Media;
const MediaWrapper = styled.div`
  border-bottom: 1px solid var(--lighter);
  padding-bottom: 40px;
  padding-top: 190px;
  margin-top: -140px;
  
  @media (max-width:900px){
	  margin-top: -170px;
  	padding-bottom: 20px;
  }
`;
const MediaSlider = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & .media_slider_prev,
  .media_slider_next {
    opacity: 0;
    visibility: hidden;
    transform: scale(0);
    transition: all ease-in-out 300ms;
  }

  &:hover {
    & .media_slider_prev,
    .media_slider_next {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }

  & .swiper-container {
    width: 80%;
    margin: 0 auto;
    padding-bottom: 100px !important;
    @media (max-width: 500px) {
      width: 100%;
    }

    & img {
      width: 100%;
    }

    & .swiper-pagination-bullets {
      & span {
        height: 100%;
        margin: 5px;
      }

      @media (max-width: 500px) {
        display: flex !important;
        justify-content: center;
        width: 100%;
      }
    }

    & .swiper-pagination-bullet {
      width: 60px;
      border-radius: 0;
      border: 1px solid var(--primary);
      background: transparent;
      transition: all ease-in-out 300ms;

      &.swiper-pagination-bullet-active {
        transform: scale(1.2);
      }

      @media (max-width: 500px) {
        width: 50px;
      }
    }
  }

  & .media_slider_next {
    position: absolute;
    right: 0;
    z-index: 99;
  }

  & .media_slider_prev {
    position: absolute;
    left: 0;
    z-index: 99;
  }
`;
