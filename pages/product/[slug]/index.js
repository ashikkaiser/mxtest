/** @format */

import styled from "@emotion/styled";
import _ from "lodash";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import Score from "../../../components/products/score";
import Reviews from "../../../components/review";
import Alternatives from "../../../components/single-product/alternatives";
import Customers from "../../../components/single-product/customers";
import Features from "../../../components/single-product/features";
import Integrations from "../../../components/single-product/integrations";
import Media from "../../../components/single-product/media";
import Overview from "../../../components/single-product/overview";
import Pricing from "../../../components/single-product/pricing";
import RatingsReviews from "../../../components/single-product/ratings-reviews";
import SocialMediaIcon from "../../../components/single-product/social-icon";
import Support from "../../../components/single-product/support";
import HeaderContext from "../../../context/headerContext";
import useFetch from "../../../lib/useFatch"

export const getServerSideProps = async ({ params, req }) => {
  const option = {
    headers: {
      'country_name': req.cookies.countryCode || "null"
    }
  }

  const slug = params.slug;
  const res = await fetch(`https://api.spotsaas.com/product/${slug}`, option);
  var getData;
  if (res.status !== 200) getData = null;
  else getData = await res.json();

  // Overview api fetch
  const overviewRes = await fetch(
    `https://api.spotsaas.com/product/${slug}/overview`, option
  );
  const overviewData = await overviewRes.json();
  const AlternativesData = await fetch(
    `https://api.spotsaas.com/product/${slug}/alternates`, option
  )
    .then((response) => response.json())
    .then((responseJSON) => {
      return responseJSON?.alternatives;
    });
  // Compare api fetch
  const compareRes = await fetch(
    `https://api.spotsaas.com/product/${slug}/compare`, option
  );
  const compareData = await compareRes.json();
  // Media api fetch
  const mediaRes = await fetch(
    `https://api.spotsaas.com/product/${slug}/media`, option
  );
  const mediaData = await mediaRes.json();

  return {
    props: { getData, overviewData, compareData, mediaData, AlternativesData: (AlternativesData || []) },
  };
};

export default function SingleProductPage({ getData,
  AlternativesData,
  overviewData,
  compareData,
  mediaData }) {
  const [activeListIndex, setActiveListIndex] = useState(0);
  const router = useRouter();
  const { slug } = router.query


  const host = 'http://spotsaas.com';
  const path = router.asPath;
  const listHandler = (index) => {
    setActiveListIndex(index);
  };
  const listRuf = useRef(null);
  const { openComparePopup, setBreadcrumbs, windowWidth } =
    useContext(HeaderContext);
  useEffect(() => {
    if (!getData) router.replace(
      `/404`,
      undefined,
      { shallow: true }
    );
  }, [getData]);
  useEffect(() => {
    let array = [
      {
        name: "Home",
        link: "/",
      },
      {
        name: `${getData?.categoryName}`,
        link: `/category/${getData?.categorySlug}`,
      },
      {
        name: `${getData?.name}`,
        link: "",
      },
    ];
    setBreadcrumbs(array);
  }, [getData]);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (listRuf.current) {
        // sticky the page heading's
        window.scrollY > 500 && listRuf.current.classList.add("sticky");
        window.scrollY < 500 && listRuf.current.classList.remove("sticky");
      }
    });
  }, []);

  const ListLinks = [
    "Overview",
    `${mediaData?.priceImageInfo?.length > 0 && "Pricing"}`,
    `${getData?.features?.length > 0 && "Features"}`,
    `${getData?.alternatives?.length > 0 && "Alternatives"}`,
    `${getData?.rating > 0 && "Ratings"}`,
    `${mediaData?.imageInfo?.length > 0 && "Media"}`,
    `${getData?.integrations?.length > 0 && "Integrations"}`,
    `${getData?.customers?.length > 0 && "Customers"}`,
    "Support",
  ];
  const filter = ListLinks.filter((item) => item !== "false");
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 100}`;
  };
  const fullYear = new Date().getFullYear();

  return (
    <div>
      <Head>
        <title>
          Find {getData?.name} Pricing, Features, Reviews & Alternatives |
          spotSaaS
        </title>
        <meta
          name="description"
          content={`Find ${getData?.name} features, pricing plans, alternatives, integrations, rating, & in-depth user reviews in ${fullYear}.`}
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href={host + path} />
      </Head>

      <MainWrapper>
        <Container>
          <ProductItemWrapper>
            <ProductThumbnail>
              {windowWidth < 600 ? (
                <Image
                  loader={logoLoader}
                  src={"/assets/img/product-banner/Mobile.png"}
                  alt="product thumbs"
                  width="800"
                  height="110"
                  priority
                />
              ) : windowWidth < 992 ? (
                <Image
                  loader={logoLoader}
                  src={"/assets/img/product-banner/Tablet.png"}
                  alt="product thumbs"
                  width="1180"
                  height="200"
                  priority
                />
              ) : (
                <div className="imageContainer">
                  <Image
                    loader={logoLoader}
                    src={"/assets/img/product-banner/laptop.png"}
                    alt="product thumbs"
                    width="1580"
                    height="200"
                    priority
                  />
                </div>
              )}
            </ProductThumbnail>
            <ProductItem className="row">
              <Col xs={3} md={2} lg={1} className="position-relative">
                <ProductImg>
                  {getData?.logo && <Image
                    loader={logoLoader}
                    src={getData?.logo}
                    alt={getData?.logoAltText}
                    width={156}
                    height={156}
                    priority
                  />}
                </ProductImg>
                <Score score={getData?.score} />
              </Col>
              <Col xs={9} md={7} lg={8} className="px-3">
                <h1 style={{ "wordBreak": "break-all" }}>{getData?.name}</h1>
                <div>{getData?.subtitle}</div>
                <ProductReviews>
                  {getData?.rating > 0 && (
                    <Icons>
                      <Reviews value={getData?.rating} />
                    </Icons>
                  )}
                  {getData?.ratingCount > 0 && (
                    <div className="review_reading">
                      <Link href={`/product/${getData?.slug}/reviews`}>
                        <a>
                          ({getData?.ratingCount}{" "}
                          {getData?.ratingCount > 1 || getData?.ratingCount > 1
                            ? "ratings"
                            : "rating"}
                          )
                        </a>
                      </Link>
                    </div>
                  )}
                  {/*
										<div className="d-flex align-items-center gap-2">
											<svg
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M8.18555 12.9476L3.9434 7.11461L12.4277 7.11461L8.18555 12.9476ZM1.05538 6.68562L7.34312 15.3313C7.75911 15.9032 8.612 15.9032 9.02798 15.3313L15.3157 6.68562C15.8165 5.99711 15.3246 5.03128 14.4733 5.03128L1.89781 5.03128C1.04647 5.03128 0.554644 5.99711 1.05538 6.68562Z"
													fill="#5C6BC0"
												/>
												<path
													d="M14.4356 0.86461C15.0108 0.86461 15.4772 1.33098 15.4772 1.90628C15.4772 2.48157 15.0108 2.94794 14.4356 2.94794L1.93555 2.94794C1.36026 2.94794 0.893886 2.48157 0.893886 1.90628C0.893886 1.33098 1.36025 0.864609 1.93555 0.864609L14.4356 0.86461Z"
													fill="#5C6BC0"
												/>
											</svg>
											<span>97</span>
										</div>
									*/}
                </ProductReviews>
              </Col>
              <Col xs={12} md={3} lg={{ span: 3, offset: 0 }}>
                <ProductVisit>
                  {getData?.url !== "" && (
                    <a
                      href={`${getData?.url}?utm_source=spotsaas.com&utm_medium=cpc`}
                      target="_blank"
                      className="sps-btn sps-btn-success"
                      rel="noreferrer"
                    >
                      Visit Website
                    </a>
                  )}
                  <button
                    className="sps-btn sps-btn-small sps-btn-outline"
                    onClick={() => openComparePopup(getData?.slug)}
                  >
                    <AiOutlinePlusCircle /> Compare
                  </button>
                </ProductVisit>
              </Col>
            </ProductItem>
            <AllLinks ref={listRuf} id="product-item-heading">
              <div className={`lists_body`}>
                {_.map(filter, (item, index) => {
                  const activeItem = activeListIndex === index ? "active" : "";
                  return (
                    <div key={index} className={`list_wrapper ${activeItem}`}>
                      <span onClick={() => listHandler(index)}>
                        <Link href={`#${item.toLowerCase()}`}>{item}</Link>
                      </span>
                    </div>
                  );
                })}
              </div>
            </AllLinks>
            <ProductBody>
              {getData && overviewData && <Overview data={overviewData} />}
              {mediaData?.priceImageInfo?.length > 0 && (
                <Pricing isShowViewAllBtn={true} data={mediaData} getData={getData} btnUrl={getData?.productPricingUrl} slug={getData?.slug} isShowLine={false} />
              )}
              {getData?.features?.length > 0 && (
                <Features data={getData?.features} />
              )}
              {getData?.alternatives?.length > 0 && (
                <Alternatives data={AlternativesData} slug={getData?.slug} />
              )}
              {getData?.rating > 0 && <RatingsReviews data={getData} />}
              {/*
                <QuickCompare data={compareData} />
              */}
              {mediaData?.imageInfo?.length > 0 && (
                <Media data={mediaData?.imageInfo} />
              )}
              {getData?.integrations?.length > 0 && (
                <Integrations data={getData?.integrations} />
              )}
              {getData?.customers?.length > 0 && (
                <Customers data={getData?.customers} />
              )}
              {getData && <Support data={getData} />}
            </ProductBody>
          </ProductItemWrapper>
        </Container>
        <EndText>That’s all folks :)</EndText>
      </MainWrapper>
      {getData?.socialMediaUrls && <SocialMediaIcon data={getData?.socialMediaUrls} />}
    </div>
  );
}

const MainWrapper = styled.div`
  padding: 40px 0 50px 0;
`;
const ProductItemWrapper = styled.div`
  background: var(--white);
`;
const ProductThumbnail = styled.div``;
const ProductItem = styled.div`
  display: flex;
  padding: 15px 33px 0 33px;

  & h1,
  h6,
  p {
    margin: 0;
  }

  @media (max-width: 900px) {
    padding-bottom: 0;
  }
`;
const ProductReviews = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;

  & span {
    font-weight: 400;
  }

  & .review_reading a {
    color: var(--light-primary);
  }
`;
const Icons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;
const ProductImg = styled.div`
  text-align: center;
  margin-top: 20px;

  & img {
    border-radius: 100px;
  }

  @media (max-width: 500px) {
    text-align: left;
    margin-bottom: 10px;
  }
`;
const ProductVisit = styled.div`
  position: relative;
  height: 100%;
  margin-top: 15px;

  & .sps-btn-success {
    position: absolute;
    right: 0;
    top: 0;
  }

  & .sps-btn-outline {
    position: absolute;
    top: 50px;
    right: 0;
  }

  @media (max-width: 767px) {
    display: flex;
    width: 100%;
    height: auto;
    flex-wrap: wrap;
    justify-content: space-between;
    & .sps-btn-success {
      position: relative;
    }

    & .sps-btn-outline {
      position: relative;
      top: auto;
    }
  }
`;
const AllLinks = styled.div`
  & .lists_body {
    display: flex;
    overflow: auto;
    gap: 40px;
    padding: 40px 33px 0;
    border-bottom: 2px solid var(--lighter);
    z-index: 1;
    position: relative;
    @media (max-width: 900px) {
      padding: 40px 10px 8px;
    }

    & > div {
      display: block;
      transition: all ease-in-out 300ms;
    }
  }

  &.sticky {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    background: var(--white);
    box-shadow: var(--shadow);
    z-index: 99;
    padding-top: 10px;

    & .lists_body {
      padding: 0 20px;
      justify-content: center;
      @media (max-width: 900px) {
        justify-content: start;
      }
    }
  }

  & a {
    color: var(--dark);
    font-size: var(--h4);
    padding: 0 10px;
  }

  & .active {
    border-bottom: 8px solid var(--primary);
  }
`;
const ProductBody = styled.div`
  padding: 0 33px;
  @media (max-width: 900px) {
    padding: 0 20px;
  }
`;
const EndText = styled.div`
  text-align: center;
  font-style: italic;
  margin-top: 40px;
`;
