/** @format */

import styled from "@emotion/styled";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import BannerSearch from "../search-forms/banner-search";
import { useEffect, useState } from "react";

const Banner = ({ trendingproducts }) => {
  const isDesktop = useMediaQuery({ query: "(max-width: 1080px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [items, setItems] = useState(5);
  useEffect(() => {
    const productsHandler = async () => {
      if (isDesktop) {
        setItems(5);
      }
      if (isTablet) {
        setItems(4);
      }
      if (isMobile) {
        setItems(3);
      }
    };
    productsHandler();
  }, [isDesktop, isTablet, isMobile]);

  const TrendingProducts = trendingproducts.slice(0, items);
  return (
    <MainWrapper>
      <Container>
        <Row>
          <Col>
            <BannerWrapper>
              <Title>Find the right products for you</Title>
              <BannerSearch />
              <TrendingProd>
                <span className="sub_title">Week’s Trending Products</span>
                <ProductList>
                  {TrendingProducts.map((item) => {
                    const logoLoader = ({ src, width, quality }) => {
                      return `${src}?w=${width}&q=${quality || 100}`;
                    };
                    return (
                      <li key={item._id}>
                        <Link
                          href={`/product/${item.name
                            .toLowerCase()
                            .replace(/[ |.|/]/g, "-")
                            .replace(/[(|)]/g, "")}`}
                        >
                          <a>
                            <Image
                              loader={logoLoader}
                              src={item.logo}
                              alt={item.logoAltText}
                              width={54}
                              height={54}
                              priority
                            />
                            <p>{item.name}</p>
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ProductList>
              </TrendingProd>
            </BannerWrapper>
          </Col>
        </Row>
      </Container>
    </MainWrapper>
  );
};

export default Banner;
const MainWrapper = styled.div`
  background-color: var(--white);
  position: relative;
  height: 550px;
  display: grid;
  align-items: center;
  @media only screen and (max-width: 500px) {
    height: 100%;
    padding: 60px 0 30px 0;
  }
`;
const BannerWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 100px;

  & .search-btn {
    background-color: var(--primary);
    position: absolute;
    border: none;
    height: 100%;
    right: 0;
    padding: 0 15px;
    color: var(--white);
    font-size: var(--h4);
    font-weight: 500;
    border-radius: 0 8px 8px 0;
    line-height: 34px;

    & svg {
      display: block;
    }
  }
`;
const Title = styled.h1`
  margin-bottom: 30px;
  line-height: 58px;
  @media only screen and (max-width: 500px) {
    line-height: 35px;
  }
`;
const TrendingProd = styled.div`
  display: grid;
  justify-content: center;

  & .sub_title {
    margin-bottom: 18px;
    font-size: 16px;
    font-weight: 500;
  }
`;
const ProductList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  padding: 0;
  gap: 20px;

  & li {
    list-style: none;

    & a {
      color: var(--dark);

      & img {
        border-radius: 100px;
      }
    }
  }

  & img {
    margin-bottom: 5px;
  }
`;
