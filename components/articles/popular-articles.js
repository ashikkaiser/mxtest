/** @format */

import { useRef } from "react";
import styled from "@emotion/styled";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Swiper from "react-id-swiper";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import _ from "lodash";

const PopularArticles = ({ posts }) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1080px)" });
  const postData = posts.slice(0, 6);
  const articleRef = useRef(null);
  const params = {
    slidesPerView: isTablet ? "auto" : 3,
    spaceBetween: 20,
    loop: true,
    autoplay: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1170: {
        spaceBetween: 20,
      },
      1080: {
        slidesPerView: "auto",
        spaceBetween: 15,
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
    if (articleRef.current && articleRef.current.swiper) {
      articleRef.current.swiper.slideNext();
    }
  };
  const goPrev = () => {
    if (articleRef.current && articleRef.current.swiper) {
      articleRef.current.swiper.slidePrev();
    }
  };
  return (
    <SectionWrapper>
      <Container>
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-between align-content-center">
              <Title>Popular Article</Title>
              {!isTablet && (
                <div className="d-flex gap-3">
                  <a className="swiper-sps-btn-round-prev" onClick={goPrev}>
                    <RiArrowLeftSLine />
                  </a>
                  <a className="swiper-sps-btn-round-next" onClick={goNext}>
                    <RiArrowRightSLine />
                  </a>
                </div>
              )}
            </div>
          </Col>
          <Col className="p-0">
            <Swiper ref={articleRef} {...params} className="box_product_swiper">
              {_.map(postData, (post, index) => {
                const logoLoader = ({ src, width, quality }) => {
                  return `${src}?w=${width}&q=${quality || 75}`;
                };
                return (
                  <Article key={index} className="imageContainer">
                    <Image
                      className="image"
                      loader={logoLoader}
                      src={post.fimg_url}
                      alt="blog title"
                      layout="fill"
                      priority
                    />
                    <InfoBox>
                      <h4>{post.title.rendered} </h4>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.rendered.slice(0, 150),
                        }}
                      />
                    </InfoBox>
                  </Article>
                );
              })}
            </Swiper>
            <ViewAll>
              <a href="#" className="sps-btn sps-btn-primary">
                View all articles
              </a>
            </ViewAll>
          </Col>
        </Row>
      </Container>
    </SectionWrapper>
  );
};

export default PopularArticles;
const SectionWrapper = styled.div`
  background: var(--white);
  padding: 80px 0;
  border-top: 1px solid var(--lighter);
  border-bottom: 1px solid var(--lighter);

  @media (max-width: 900px) {
    padding: 40px 0;
  }

  & .container {
    @media (max-width: 1080px) {
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
    margin-right: 20px;
    @media (max-width: 1080px) {
      width: 290px !important;
      margin-right: 20px;
    }
    @media (max-width: 900px) {
      width: 35% !important;
      margin-right: 15px;
    }
    @media (max-width: 500px) {
      width: 73% !important;
      margin-right: 20px;
    }
  }
`;

const Title = styled.h3`
  margin-bottom: 35px;
`;
const Article = styled.div`
  background: var(--white);
  box-shadow: var(--shadow);
  border-radius: 8px;
  margin-bottom: 40px;
`;
const InfoBox = styled.div`
  padding: 20px 16px;

  & h3 {
    margin-bottom: 11px;
  }

  & p {
    margin: 0;
  }
`;
const ViewAll = styled.div`
  display: flex;
  justify-content: center;

  & .sps-btn {
    margin: 0;
  }
`;
