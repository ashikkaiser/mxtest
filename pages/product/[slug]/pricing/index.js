/** @format */

import styled from "@emotion/styled";
import _ from "lodash";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import Score from "../../../../components/products/score";
import Reviews from "../../../../components/review";
import Alternatives from "../../../../components/single-product/alternatives";
import Customers from "../../../../components/single-product/customers";
import Features from "../../../../components/single-product/features";
import Integrations from "../../../../components/single-product/integrations";
import Media from "../../../../components/single-product/media";
import Overview from "../../../../components/single-product/overview";
import Pricing from "../../../../components/single-product/pricing";
import RatingsReviews from "../../../../components/single-product/ratings-reviews";
import SocialMediaIcon from "../../../../components/single-product/social-icon";
import Support from "../../../../components/single-product/support";
import HeaderContext from "../../../../context/headerContext";
import Item from "../../../../components/categories/item";
import { useRouter } from "next/router";



export default function SingleProductPage({
}) {
  const [activeListIndex, setActiveListIndex] = useState(0);
  const listHandler = (index) => {
    setActiveListIndex(index);
  };
  const listRuf = useRef(null);
  const { openComparePopup, setBreadcrumbs, windowWidth, country } =
    useContext(HeaderContext);
  const router = useRouter();
  const [getData, setGetData] = useState({});
  const [overviewData, setOverviewData] = useState(null);
  const [AlternativesData, setAlternativesData] = useState([]);
  const [mediaData, setMedia] = useState(null);
  const [relCategories, setCategoryData] = useState([]);
  const [popCategories, setPopularCate] = useState([]);
  const host = 'http://spotsaas.com';
  const path = router.asPath;
  useEffect(() => {
    const slug = router?.query?.slug;

    if (router?.query?.slug) {
      const ApiCall = async () => {
        const res = await fetch(`https://api.spotsaas.com/product/${slug}`, {
          headers: {
            'country_name': country
          }
        });
        const dataRes = await res.json();
        setGetData(dataRes);

        // Overview api fetch
        const overviewRes = await fetch(
          `https://api.spotsaas.com/product/${slug}/overview`, {
          headers: {
            'country_name': country
          }
        }
        );
        const overviewData = await overviewRes.json();
        setOverviewData(overviewData);
        const AlternativesData = await fetch(
          `https://api.spotsaas.com/product/${slug}/alternates`, {
          headers: {
            'country_name': country
          }
        }
        )
          .then((response) => response.json())
          .then((responseJSON) => {
            return responseJSON;
          });
        setAlternativesData(AlternativesData);
        // Compare api fetch
        const compareRes = await fetch(
          `https://api.spotsaas.com/product/${slug}/compare`, {
          headers: {
            'country_name': country
          }
        }
        );
        const compareData = await compareRes.json();

        // Media api fetch
        const mediaRes = await fetch(
          `https://api.spotsaas.com/product/${slug}/media`, {
          headers: {
            'country_name': country
          }
        }
        );
        const mediaData = await mediaRes.json();
        setMedia(mediaData);
        if (getData?.categorySlug) {// Fetch related categories api
          const relatedCategoriesRes = await fetch(
            `https://api.spotsaas.com/category/${getData?.categorySlug}/products/related-categories`, {
            headers: {
              'country_name': country
            }
          }
          )
            .then((response) => response.json())
            .then((responseJSON) => {
              return responseJSON;
            });
          const relCategories = relatedCategoriesRes.relatedCategories;
          setCategoryData(relCategories);
        }

        const PopularCateRes = await fetch(
          `https://api.spotsaas.com/home/popular-categories`, {
          headers: {
            'country_name': country
          }
        }
        );
        const PopularCate = await PopularCateRes.json();
        setPopularCate(PopularCate?.slice(0, 3));
      }
      ApiCall();
    }
  }, [router]);

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
        link: `/product/${getData?.slug}`,
      },
      {
        name: `Pricing`,
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
    `${mediaData?.priceImageInfo.length > 0 && "Pricing"}`,
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
          Find {getData?.name || ''} Pricing, Features, Reviews & Alternatives |
          spotSaaS
        </title>

        <meta
          name="title"
          content={`${getData?.name || ''} Pricing: Cost and Pricing plan`}
        />
        <meta
          name="description"
          content={`Check out detailed pricing for ${getData?.name || ''} Explore and compare pricing against alternatives.`}
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
                <h1>{getData?.name} Pricing</h1>
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
            <ProductBody>
              {mediaData?.priceImageInfo?.length > 0 && (
                <Pricing isShowLine={true} data={mediaData} isShowViewAllBtn={false} btnUrl={getData?.productPricingUrl} overviewData={overviewData} getData={getData} />
              )}

              {getData?.alternatives?.length > 0 && (
                <Alternatives data={AlternativesData} slug={getData?.slug} />
              )}
              {relCategories?.length > 0 && (
                <RelatedWrapper>
                  <RelatedCateTitle>Related Categories</RelatedCateTitle>
                  <RelatedCate>
                    {relCategories?.slice(0, 6).map((item, index) => (
                      <div key={index}>
                        <Item item={item} />
                      </div>
                    ))}
                  </RelatedCate>
                </RelatedWrapper>
              )}
              {popCategories?.length > 0 && (
                <RelatedWrapper>
                  <RelatedCateTitle>Popular Categories</RelatedCateTitle>
                  <RelatedCate>
                    {popCategories.map((item, index) => (
                      <div key={index}>
                        {item?.popularCategoryInfo && <CategoryItem categoryItems={item?.popularCategoryInfo} />}
                      </div>
                    ))}
                  </RelatedCate>
                </RelatedWrapper>
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

export const CategoryItem = ({ categoryItems }) => {
  return (
    <>
      {_.map(categoryItems, (item, key) => (
        <Item item={item} key={key} />
      ))}
    </>
  );
};

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
