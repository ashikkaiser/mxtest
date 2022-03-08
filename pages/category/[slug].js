/** @format */

import styled from "@emotion/styled";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Item from "../../components/categories/item";
import FilterResultsForm from "../../components/filter/filter-results-form";
import HeaderContext from "../../context/headerContext";

export default function CategoryPage() {
  const [CategoryData, setCategoryData] = useState(null);
  const [glanceData, setGlanceData] = useState([]);
  const [relCategories, setRelCategories] = useState([]);
  const [info, setInfo] = useState("");
  const [reading, setReading] = useState(false);
  const { setBreadcrumbs, country } = useContext(HeaderContext);
  const router = useRouter();
  const host = 'http://spotsaas.com';
  const path = router.asPath;
  console.log('host+path', host + path);


  // const canonicalURL = site + useRouter().pathname;
  useEffect(() => {
    if (router.query.slug) {
      const ApiCall = async () => {
        const slug = router.query.slug;
        //   Fetch at a glance api using dynamic category
        const glanceData = await fetch(`https://api.spotsaas.com/category/${slug}/glance`, {
          headers: {
            'country_name': country
          }
        })
          .then((response) => response.json())
          .then((responseJSON) => {
            return responseJSON;
          });


        //   Fetch products api using dynamic category
        const CategoryData = await fetch(
          `https://api.spotsaas.com/category/${slug}/products`, {
          headers: {
            'country_name': country
          }
        }
        )
          .then((response) => response.json())
          .then((responseJSON) => {
            return responseJSON;
          });

        // Fetch related categories api
        const relatedCategoriesRes = await fetch(
          `https://api.spotsaas.com/category/${slug}/products/related-categories`, {
          headers: {
            'country_name': country
          }
        }
        )
          .then((response) => response.json())
          .then((responseJSON) => {
            return responseJSON;
          });

        setGlanceData(glanceData);
        setCategoryData(CategoryData);
        setRelCategories(relatedCategoriesRes.relatedCategories);
      };
      ApiCall();
    }
  }, [router]);

  useEffect(() => {
    if (CategoryData !== null) {
      if (CategoryData.desc.length > 300) {
        const content = CategoryData.desc.slice(0, 300);
        setInfo(content);
        setReading(false);
      } else {
        setInfo(CategoryData.desc);
      }
    }
  }, [CategoryData]);

  useEffect(() => {
    if (CategoryData !== null) {
      let array = [
        {
          name: "Home",
          link: "/",
        },
        {
          name: `${CategoryData.name}`,
          link: ``,
        },
      ];
      setBreadcrumbs(array);
    }
  }, [CategoryData]);

  const readMoreHandler = () => {
    const fullContent = CategoryData.desc;
    setInfo(fullContent);
    setReading(true);
  };

  const closeHandler = () => {
    const fullContent = CategoryData.desc.slice(0, 300);
    setInfo(fullContent);
    setReading(false);
  };

  const fullYear = new Date().getFullYear();

  return CategoryData !== null ? (
    <div>
      <Head>
        <title>
          The best {CategoryData.name} in {fullYear}. Compare software
          alternatives and pricing.
        </title>
        <meta
          name="description"
          content={`Find the best ${CategoryData.name} for your business in ${fullYear}. Compare software alternatives, features, and pricing. Find software reviews from verified users.`}
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href={host + path} />
      </Head>
      <Main>
        <Container>
          <Row>
            <Col md={12} lg={12} className="mt-5">
              <ProductHeader>
                <h1 style={{ "wordBreak": "break-all" }}>{CategoryData.name}</h1>
                <p>
                  {`${info}${info.length === 300 ? "..." : ""}`}
                  {CategoryData.desc.length > 300 && (
                    <>
                      {!reading ? (
                        <a
                          className="sps-read-more-btn read_more_btn"
                          onClick={readMoreHandler}
                        >
                          Read More
                        </a>
                      ) : (
                        <a
                          className="sps-read-more-btn read_more_btn"
                          onClick={closeHandler}
                        >
                          Close
                        </a>
                      )}
                    </>
                  )}
                </p>
              </ProductHeader>
            </Col>
            <Col md={12} lg={12}>
              {/*
                <Box>
                  <BoxTitle>At a Glance</BoxTitle>
                  <Row>
                      <Col xs={12} md={6} lg={3}>
                        <InfoItem>
                            <h4>Typical Features</h4>
                            <ul className="check_list">
                              {glanceData.features.map((list) => {
                                  return <li key={list._id}>{list.name}</li>
                              })}
                            </ul>
                        </InfoItem>
                      </Col>
                      <Col xs={12} md={6} lg={3}>
                        <InfoItem>
                            <h4>Pricing</h4>
                            <ul className="check_list">
                              <li>{glanceData.pricing}</li>
                            </ul>
                        </InfoItem>
                      </Col>
                      <Col xs={12} md={12} lg={6}>
                        <InfoItem>
                            <Row>
                              <Col xs={12} md={6} lg={12}>
                                  <Link href="/">
                                    <a className="sps-btn sps-btn-full sps-btn-primary">
                                        Read Buyer’s Guide
                                    </a>
                                  </Link>
                              </Col>
                              <Col xs={12} md={6} lg={12}>
                                  <Link href="/">
                                    <a className="sps-btn sps-btn-full sps-btn-primary">
                                        Chat with us to get recommendations
                                    </a>
                                  </Link>
                              </Col>
                            </Row>
                        </InfoItem>
                      </Col>
                  </Row>
                </Box>
              */}
              <ProductsBody>
                <BodyTitle>Products</BodyTitle>
                <Row>
                  <FilterResultsForm filter={CategoryData} />
                </Row>
              </ProductsBody>
              {relCategories.length > 0 && (
                <RelatedWrapper>
                  <RelatedCateTitle>Related Categories</RelatedCateTitle>
                  <RelatedCate>
                    {relCategories.slice(0, 6).map((item, index) => (
                      <div key={index}>
                        <Item item={item} />
                      </div>
                    ))}
                  </RelatedCate>
                </RelatedWrapper>
              )}
            </Col>
          </Row>
        </Container>
      </Main>
    </div>
  ) : (
    <Loader className="sps_loader">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Loader>
  );
}
const Main = styled.div``;
const Box = styled.div`
  background: var(--white);
  box-shadow: var(--shadow);
  padding: 40px 46px;
  border-radius: 8px;
`;
const BoxTitle = styled.h3`
  margin-bottom: 32px;
`;
const BoxInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  & > div {
    padding: 0 34px;

    &:first-of-type {
      padding-left: 0;
      padding-right: 34px;
    }
  }

  & > div:last-of-type {
    padding-left: 70px;
    padding-right: 0;
    border-left: 1px solid var(--lighter);
  }
`;
const InfoItem = styled.div`
  & h4 {
    margin-bottom: 16px;
  }

  & .sps-btn {
    margin-top: 0;
    line-height: 24px;
    white-space: inherit;
  }
`;
const Loader = styled.div`
  height: 60vh;
  display: grid;
  justify-content: center;
  align-items: center;
`;
const ProductHeader = styled.div`
  & .read_more_btn {
    margin-top: 10px;
    font-size: 14px;
    cursor: pointer;
  }

  & .review_source {
    margin-top: 15px;
  }

  & .sps-read-more-btn {
    margin-left: 10px;
    color: var(--primary);
    font-weight: 500;
  }
`;
const ProductsBody = styled.div`
  background: var(--white);
  box-shadow: var(--shadow);
  padding: 40px 46px;
  border-radius: 8px;
  margin: 40px 0 60px 0;
  @media (max-width: 1080px) {
    margin: 20px 0 40px 0;
  }
  @media only screen and (max-width: 900px) {
    padding: 30px 20px;
    box-shadow: none;
    border-radius: 10px;
  }
`;
const BodyTitle = styled.h3`
  margin-bottom: 40px;
  @media (max-width: 1080px) {
    margin-bottom: 10px;
  }
`;
const RelatedWrapper = styled.div`
  padding: 40px 0;
`;
const RelatedCate = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 38px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 18px;
  }
`;
const RelatedCateTitle = styled.h3`
  margin-bottom: 18px;
`;
