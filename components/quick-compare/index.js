import React, { useState } from "react";
import styled from "@emotion/styled";
import { Container, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Swiper from "react-id-swiper";

const compareItems = [1, 2, 3, 4];
const CategoryQuickCompare = ({ productOne, FourProducts }) => {
  const compareItems = FourProducts?.slice(0, 1);
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const params = {
    slidesPerView: 4,
    spaceBetween: 17,
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 17,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 17,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
    },
  };
  return (
    FourProducts?.length > 0 && (
      <QuickCompareWrapper id="quick-compare">
        <Title>Quick Compare</Title>
        <Container className="p-0">
          <Row>
            <Swiper {...params}>
              {FourProducts?.slice(1, 9).map((item, index) => (
                <ContentWrapper key={index} className="shadow">
                  <Link href={`/compare/${productOne?.slug}-vs-${item?.slug}`}>
                    <a>
                      <ProductOne>
                        <Image
                          loader={logoLoader}
                          src={productOne?.logo}
                          alt={productOne?.name}
                          width={40}
                          height={40}
                          priority
                        />
                        <h6>{productOne?.name}</h6>
                      </ProductOne>
                      <span className="font-small text-center w-100 d-block">
                        vs
                      </span>
                      <ProductOne>
                        <Image
                          loader={logoLoader}
                          src={item?.logo}
                          alt={item?.name}
                          width={40}
                          height={40}
                          priority
                        />
                        <h6>{item?.name}</h6>
                      </ProductOne>
                    </a>
                  </Link>
                </ContentWrapper>
              ))}
            </Swiper>
          </Row>
        </Container>
      </QuickCompareWrapper>
    )
  );
};
export default CategoryQuickCompare;
const QuickCompareWrapper = styled.div`
  padding-bottom: 24px;
`;
const Title = styled.h4`
  font-weight: 500 !important;
`;
const ContentWrapper = styled.div`
  padding: 15px;
  border-radius: 10px;
  background: var(--white);
`;

const ProductOne = styled.div`
  display: flex;
  align-items: self-end;

  & h6 {
    margin-left: 10px;
    text-align: center;
  }
`;
