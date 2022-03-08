/** @format */

import styled from "@emotion/styled";
import { Container } from "react-bootstrap";
import Image from "next/image";
import ReactIdSwiper from "react-id-swiper";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import _ from "lodash";

const Customers = ({ data }) => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });
  const swiperRef = useRef(null);
  const params = {
    slidesPerView: isTablet ? "auto" : 6,
    spaceBetween: 60,
    autoplay: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1024: {
        spaceBetween: 37,
      },
      768: {
        spaceBetween: 30,
      },
      320: {
        spaceBetween: 20,
      },
    },
  };
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  return (
    <CustomersWrapper id="customers">
      {data.length >= 6 ? (
        <>
          <div className="d-flex justify-content-between align-content-center mb-4">
            <h3>Customers</h3>
            <div className="d-flex gap-3">
              <a className="swiper-sps-btn-round-prev" onClick={goPrev}>
                <RiArrowLeftSLine />
              </a>
              <a className="swiper-sps-btn-round-next" onClick={goNext}>
                <RiArrowRightSLine />
              </a>
            </div>
          </div>
          <Container>
            <ReactIdSwiper
              {...params}
              ref={swiperRef}
              className="swiper-container"
            >
              {_.map(data, (item, index) => (
                <ProductContent key={index}>
                  <Image
                    loader={logoLoader}
                    src={item.logo}
                    alt={item.name.toLowerCase()}
                    width={100}
                    height={60}
                  />
                  <h4>{item.name}</h4>
                </ProductContent>
              ))}
            </ReactIdSwiper>
          </Container>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between align-content-center mb-4">
            <h3>Customers</h3>
          </div>
          <Container>
            {isTablet ? (
              <ReactIdSwiper
                {...params}
                ref={swiperRef}
                className="swiper-container"
              >
                {_.map(data, (item, index) => (
                  <ProductContent key={index}>
                    <Image
                      loader={logoLoader}
                      src={item.logo}
                      alt={item.name.toLowerCase()}
                      width={100}
                      height={60}
                      property
                    />
                    <h4>{item.name}</h4>
                  </ProductContent>
                ))}
              </ReactIdSwiper>
            ) : (
              <Grid>
                {_.map(data, (item, index) => (
                  <ProductContent key={index}>
                    <Image
                      loader={logoLoader}
                      src={item.logo}
                      alt={item.name.toLowerCase()}
                      width={100}
                      height={60}
                      priority
                    />
                    <h4>{item.name}</h4>
                  </ProductContent>
                ))}
              </Grid>
            )}
          </Container>
        </>
      )}
    </CustomersWrapper>
  );
};
export default Customers;

const CustomersWrapper = styled.div`
  border-bottom: 1px solid var(--lighter);
  padding-top: 190px;
  padding-bottom: 40px;
  margin-top: -140px;
  
  @media (max-width:900px){
	  margin-top: -170px;
  	padding-bottom: 20px;
  }

  & .container {
    @media (max-width: 900px) {
      max-width: 100%;
    }
  }

  & .swiper-sps-btn-round-prev,
  .swiper-sps-btn-round-next {
    opacity: 0;
    visibility: hidden;
    transform: scale(0);
    transition: all ease-in-out 300ms;
  }

  &:hover {
    & .swiper-sps-btn-round-prev,
    .swiper-sps-btn-round-next {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }

  & .swiper-wrapper .swiper-slide {
    width: 20%;
    @media (max-width: 500px) {
      width: 40%;
    }
  }

  & h4 {
    word-wrap: anywhere;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 37px;
  justify-content: center;
`;
const ProductContent = styled.div`
  text-align: center;
`;
