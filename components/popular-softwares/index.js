/** @format */

import styled from "@emotion/styled";
import { Col, Container, Row } from "react-bootstrap";
import BoxItem from "../products/box-item";
// Import Swiper React components
import ReactIdSwiper from "react-id-swiper";

import { useRef } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import WithoutButtonBox from "../products/without-button-box";
import { useMediaQuery } from "react-responsive";
import _ from "lodash";

const PopularSoft = ({ title, data, noButton, ...restProps }) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1080px)" });
  const Product = data?.slice(0, 12);
  const swiperRef = useRef(null);
  const loopCount = data?.length > 4 ? true : false;
  const params = {
    slidesPerView: isTablet ? "auto" : 4,
    spaceBetween: 37,
    // loop: loopCount,
    autoplay: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1170: {
        spaceBetween: 37,
      },
      1024: {
        slidesPerView: "auto",
        spaceBetween: 30,
      },
      768: {
        slidesPerView: "auto",
        spaceBetween: 15,
      },
      320: {
        slidesPerView: "auto",
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
  return Product?.length > 0 ? (
    <SectionWrapper {...restProps}>
      <Container className="p-0">
        <Row>
          <Col xs={12}>
            <div className="d-flex px-3 px-xl-0 justify-content-between align-content-center">
              <Title>{title}</Title>
              {!isTablet && Product?.length > 4 && (
                <div className="d-flex gap-3">
                  <div
                    className={`swiper-sps-btn-round-prev swiper-button-prev`}
                    onClick={goPrev}
                  >
                    <RiArrowLeftSLine />
                  </div>
                  <div
                    className="swiper-sps-btn-round-next swiper-button-next"
                    onClick={goNext}
                  >
                    <RiArrowRightSLine />
                  </div>
                </div>
              )}
            </div>
          </Col>
          <Col>
            {noButton ? (
              <ReactIdSwiper
                ref={swiperRef}
                {...params}
                className="box_product_swiper"
              >
                {_.map(Product, (item, index) => (
                  <div key={index}>
                    <WithoutButtonBox item={item} />
                  </div>
                ))}
              </ReactIdSwiper>
            ) : (
              <ReactIdSwiper
                ref={swiperRef}
                {...params}
                className="box_product_swiper"
              >
                {_.map(Product, (item, index) => (
                  <div key={index}>
                    <BoxItem item={item} />
                  </div>
                ))}
              </ReactIdSwiper>
            )}
          </Col>
        </Row>
      </Container>
    </SectionWrapper>
  ) : (
    <div className="text-center my-4">
      <h2>No Data Found!</h2>
      <p>This api don&apos;t have nay data. Please check your api url. </p>
    </div>
  );
};

export default PopularSoft;
const SectionWrapper = styled.div`
  padding: 60px 0;

  @media (max-width: 900px) {
    padding: 40px 0;
  }

  & .container {
    @media (max-width: 1080px) {
      max-width: 100%;
      overflow: hidden;
    }
  }

  & .swiper-button-prev,
  .swiper-button-next {
    opacity: 0;
    visibility: hidden;
    transform: scale(0);
    transition: all ease-in-out 300ms;
  }

  &:hover {
    & .swiper-button-prev,
    .swiper-button-next {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }

  & .swiper-wrapper .swiper-slide {
    margin-right: 37px;
    @media (max-width: 1080px) {
      width: 290px !important;
      margin-right: 30px;
    }
    @media (max-width: 900px) {
      width: 35% !important;
      margin-right: 15px;
    }
    @media (max-width: 500px) {
      width: 94% !important;
      margin-right: 20px;
    }
  }
`;
const Title = styled.h3`
  margin-bottom: 45px;
`;
