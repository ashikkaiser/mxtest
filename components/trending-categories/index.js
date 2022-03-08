/** @format */

import styled from "@emotion/styled";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import CategoryItem from "./category-item";
import ProductsItem from "./products-item";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";

const TrendingCate = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ProductsData, setProductsData] = useState([]);
  const [CategoriesData, setCateData] = useState([]);
  const [activeCateIndex, setActiveCateIndex] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const categoryTargetRef = useRef([]);
  categoryTargetRef.current = [];

  useEffect(() => {
    if (activeCateIndex === 0) {
      const product = data?.slice(0, 1);
      setActiveCateIndex(0);
      setIsLoading(false);
      setProductsData(product);
    }
  }, [activeCateIndex, data]);
  // Product api fetch
  const Product = ProductsData?.slice(0, 5);
  // Category api fetch
  const Category = data?.slice(0, 6);

  const categoryAddToRuf = (el) => {
    if (el && !categoryTargetRef.current.includes(el)) {
      categoryTargetRef.current.push(el);
    }
    return categoryTargetRef.current;
  };
  const handlerCategory = (index, props) => {
    const getName = props.toLowerCase();
    const targetName = categoryTargetRef.current.filter((item) =>
      item.textContent.toLowerCase().includes(getName)
    );
    const getCategroy = Category.filter((item) => item.name === props);
    setProductsData(getCategroy);
    setActiveCateIndex(index);
  };
  return (
    <SectionWrapper>
      <Container>
        <Row>
          <Col md={12}>
            <Title>Trending Categories</Title>
          </Col>
          <Col
            xs={12}
            md={12}
            lg={4}
            xl={3}
            className="d-md-flex d-lg-block gap-4 align-items-center mb-md-3 mb-4"
          >
            <CategoryWrapper>
              {_.map(Category, (item, index) => {
                const activeItem = activeCateIndex === index ? "active" : "";
                return (
                  <div
                    ref={categoryAddToRuf}
                    onClick={() => handlerCategory(index, item.name)}
                    className={`trending_categories_list ${activeItem}`}
                    key={index}
                  >
                    <CategoryItem item={item} />
                  </div>
                );
              })}
            </CategoryWrapper>
            {!isMobile && (
              <Link href="/all-categories">
                <a className="sps-btn sps-btn-primary">See More Categories</a>
              </Link>
            )}
          </Col>
          <Col xs={12} md={12} lg={8} xl={9}>
            <ProductWrapper>
              {_.map(Product, (item, index) => {
                return <ProductsItem setItem={5} item={item} key={index} />;
              })}
              <div className="text-md-center text-lg-start">
                <Link
                  href={`/category/${Category[activeCateIndex].name
                    .toLowerCase()
                    .replace(/[ |.|/]/g, "-")
                    .replace(/[(|)]/g, "")}`}
                >
                  <a className="sps-btn sps-btn-primary">See More Products</a>
                </Link>
              </div>
            </ProductWrapper>
          </Col>
        </Row>
      </Container>
    </SectionWrapper>
  );
};

export default TrendingCate;
const SectionWrapper = styled.div`
  padding: 60px 0;
  border-bottom: 1px solid var(--lighter);

  @media (max-width: 900px) {
    padding: 40px 0;
  }

`;
const Title = styled.h3`
  margin-bottom: 40px;
  @media only screen and (max-width: 900px) {
    margin-bottom: 10px;
  }
  @media only screen and (max-width: 500px) {
    margin-bottom: 25px;
  }
`;
const CategoryWrapper = styled.div`
  padding-right: 10px;

  & .trending_categories_list.active {
    & h5 {
      background: var(--primary);
      color: var(--white);
      @media only screen and (max-width: 900px) {
        background: transparent;
      }
    }
  }

  @media only screen and (max-width: 900px) {
    padding-right: 0;
    display: flex;
    gap: 40px;
    overflow: scroll;
    white-space: nowrap;
    border-bottom: 2px solid var(--lighter);
    & .trending_categories_list {
      & > div {
        background: transparent;
        box-shadow: none;
        margin-bottom: 0;
      }

      &.active {
        & h5 {
          color: var(--primary);
          border-bottom: 8px solid var(--primary);
          margin-bottom: 0;
        }
      }

      & h5 {
        padding: 0 !important;
        border-radius: 0;
        margin-bottom: 8px;

        &:hover {
          background: none;
          color: var(--primary);
        }

        @media only screen and (max-width: 900px) {
          background: transparent;
          box-shadow: none;
        }
      }

      & h5 {
        font-size: var(--h6) !important;
        font-weight: 500 !important;
      }
    }
  }
`;
const ProductWrapper = styled.div`
  padding-left: 30px;
  @media only screen and (max-width: 1080px) {
    padding-left: 0;
  }
`;
