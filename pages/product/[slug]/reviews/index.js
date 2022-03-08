/** @format */

import styled from "@emotion/styled";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Accordion, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsArrowDownUp } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { HiChevronLeft } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";
import {
  FiveReviewInput,
  FourReviewInput,
  OneReviewInput,
  ThreeReviewInput,
  TwoReviewInput,
} from "../../../../components/filter/input-item";
import { ReviewShowPageProduct } from "../../../../components/filter/show-page-product";
import Pagination from "../../../../components/pagination";
import Reviews from "../../../../components/review";
import ReviewItem from "../../../../components/review/item";
import HeaderContext from "../../../../context/headerContext";
import Score from "../../../../components/products/score";
import Player from "../../../../components/shimmerAnimation/player"


export const getServerSideProps = async ({ params, req }) => {
  const option = {
    headers: {
      'country_name': req.cookies.countryCode || "null"
    }
  }

  const slug = params.slug;
  const getData = await fetch("https://api.spotsaas.com/product-review/" + slug, option)
    .then((response) => response.json())
    .then((responseJSON) => {
      return responseJSON;
    });

  const item = await fetch(`https://api.spotsaas.com/product/${slug}`, option)
    .then((response) => response.json())
    .then((responseJSON) => {
      return responseJSON;
    });

  if (!getData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { getData, item },
  };
};

export default function ProductReview({ getData, item }) {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const isTablet = useMediaQuery({ query: "(max-width: 1080px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const { setBreadcrumbs } = useContext(HeaderContext);
  const [allData, setAllData] = React.useState([]); // filtered get all data here
  const [filterReview, setFilterReview] = React.useState([]); // filter all product from filtered
  const [countryCode, setCountryCode] = React.useState('');
  const [ipAddress, setIpAddress] = React.useState('');
  const {
    reviewId,
    setReviewId,
    reviewCheckedId,
    setReviewCheckedId,
    reviewSortBy,
    setReviewSortBy,
    reviewSortByChecked,
    setReviewSortByChecked,
    currentPage,
    setCurrentPage,
    openComparePopup,
    openSiteLoadingPopup,
  } = React.useContext(HeaderContext); // pagination current
  // page number
  const router = useRouter();

  useEffect(() => {
    let array = [
      {
        name: "Home",
        link: "/",
      },
      {
        name: `${item.categoryName}`,
        link: `/category/${item.categorySlug}`,
      },
      {
        name: `${item.name}`,
        link: `/product/${item.slug}`,
      },
      {
        name: "reviews",
        link: "",
      },
    ];
    setBreadcrumbs(array);
  }, [item]);

  useEffect(() => {
    const isUrl = router.asPath === `/product/${item.slug}/reviews/`;
    const isValue =
      reviewId.length > 0 ||
      reviewCheckedId.length > 0 ||
      reviewSortBy !== "" ||
      reviewSortByChecked !== "";
    if (isUrl && reviewId.length > 0) {
      setReviewId([]);
      setReviewCheckedId([]);
      setReviewSortBy([]);
      setReviewSortByChecked([]);
      setCurrentPage(1);
    }
  }, [router, item]);

  /*------------------ Review Dom useRef -----------------------*/
  const filterReviewRef = React.useRef();
  const filterTwoReviewRef = React.useRef();
  const filterThreeReviewRef = React.useRef();
  const filterFourReviewRef = React.useRef();
  const filterFiveReviewRef = React.useRef();

  const filterMobileReviewRef = React.useRef();
  const filterMobileTwoReviewRef = React.useRef();
  const filterMobileThreeReviewRef = React.useRef();
  const filterMobileFourReviewRef = React.useRef();
  const filterMobileFiveReviewRef = React.useRef();

  /* ------------------------------------------------------------------------ */
  /*                       Fetch api filter products                          */
  /* ------------------------------------------------------------------------ */
  React.useEffect(() => {
    const reviewString = reviewId.length > 0 ? `&rating=${reviewId.toString().replace(/,/g, "%2C")}` : ``;
    if (isTablet) {
      const deployTime = setTimeout(() => {
        const AllMobileProductsFilterHandler = async () => {
          if (reviewId.length > 0) {
            const res = await fetch(
              `https://api.spotsaas.com/product-review/${getData.productInfo.slug
              }?page=${currentPage}${reviewString}${reviewSortBy !== "" ? `&sort=${reviewSortBy}` : ``
              }`, {
              headers: {
                'country_name': country
              }
            }
            )
              .then((response) => response.json())
              .then((responseJSON) => {
                // do stuff with responseJSON here...
                return responseJSON;
              });

            if (!res) {
              return {
                notFound: true,
              };
            }

            const data = res.reviewsInfo.reviews;
            await setFilterReview(data);
            await setAllData(res);
          } else {
            const res = await fetch(
              `https://api.spotsaas.com/product-review/${getData.productInfo.slug
              }?page=${currentPage}${reviewString}${reviewSortBy !== "" ? `&sort=${reviewSortBy}` : ``
              }`, {
              headers: {
                'country_name': country
              }
            }
            )
              .then((response) => response.json())
              .then((responseJSON) => {
                // do stuff with responseJSON here...
                return responseJSON;
              });

            const data = await res.reviewsInfo.reviews;

            if (!data) {
              return {
                notFound: true,
              };
            }

            await setAllData(getData);
            await setFilterReview(data);
          }
        };

        AllMobileProductsFilterHandler();
      }, 300);

      return () => clearTimeout(deployTime);
    } else {
      const AllProductsFilterHandler = async () => {
        if (reviewId.length > 0) {
          const res = await fetch(
            `https://api.spotsaas.com/product-review/${getData.productInfo.slug
            }?page=${currentPage}${reviewString}${reviewSortBy !== "" ? `&sort=${reviewSortBy}` : ``
            }`, {
            headers: {
              'country_name': country
            }
          }
          )
            .then((response) => response.json())
            .then((responseJSON) => {
              // do stuff with responseJSON here...
              return responseJSON;
            });

          if (!res) {
            return {
              notFound: true,
            };
          }

          const data = res.reviewsInfo.reviews;
          await setFilterReview(data);
          await setAllData(res);
        } else {
          const res = await fetch(
            `https://api.spotsaas.com/product-review/${getData.productInfo.slug
            }?page=${currentPage}${reviewString}${reviewSortBy !== "" ? `&sort=${reviewSortBy}` : ``
            }`, {
            headers: {
              'country_name': country
            }
          }
          )
            .then((response) => response.json())
            .then((responseJSON) => {
              // do stuff with responseJSON here...
              return responseJSON;
            });

          const data = await res.reviewsInfo.reviews;

          if (!data) {
            return {
              notFound: true,
            };
          }
          await setAllData(getData);
          await setFilterReview(data);
        }
      };

      AllProductsFilterHandler();
    }
  }, [reviewId, currentPage, reviewSortBy]);

  /* ------------------------------------------------------------------------ */
  /*                        Review active Id                                  */
  /* ------------------------------------------------------------------------ */
  const filterReviewId = async (number) => {
    const value = number.toString();

    if (!reviewId.includes(value)) {
      await setReviewId([...reviewId, value]);
      await setCurrentPage(1);
      await openSiteLoadingPopup();
    }
  };
  const filterCloseReview = async (number) => {
    const value = number.toString();

    const filteredArray = reviewId.filter((item) => item !== value);

    if (reviewId.length === 0) {
      await setReviewId([]);
    }
    await setReviewId(filteredArray);
    await setCurrentPage(1);
    await openSiteLoadingPopup();
  };

  // Review Apply filters button function
  const applyFilterReview = async (number) => {
    const value = number.toString();

    if (!reviewCheckedId.includes(value)) {
      await setReviewCheckedId([...reviewCheckedId, value]);
    }
  };
  const applyFilterCloseReview = async (number) => {
    const value = number.toString();
    const sum = reviewId.concat(reviewCheckedId);
    const newIds = [...new Set(sum)];
    const filteredArray = newIds.filter((item) => item !== value);

    if (reviewCheckedId.length === 0) {
      await setReviewCheckedId([]);
    }
    await setReviewCheckedId(filteredArray);
    await setReviewId(filteredArray);
  };

  /*------------------ Review star array ------------------------- */
  const starsArray = ["5", "4", "3", "2", "1"];

  const [mobileFilter, setMobileFilter] = React.useState(false);
  const [mobileSortBy, setMobileSortBy] = React.useState(false);

  const handleFilterClose = () => setMobileFilter(false);
  const handleFilterShow = () => setMobileFilter(true);
  const handleSortByShow = () => setMobileSortBy(true);
  const handleSortByClose = () => setMobileSortBy(false);

  const sortByHandler = async (e) => {
    await setReviewSortBy(e.target.value);
    await openSiteLoadingPopup();
  };
  const applySortByHandler = async (e) => {
    await setReviewSortByChecked(e.target.value);
  };

  const mobileApplyFilterHandler = async () => {
    if (reviewCheckedId.length > 0) {
      await setReviewId(reviewCheckedId);
    } else if (reviewCheckedId.length < 1) {
      await setReviewId([]);
    }

    if (reviewSortByChecked !== "") {
      await setReviewSortBy(reviewSortByChecked);
    } else if (reviewSortByChecked === "") {
      await setReviewSortBy("");
    }

    await setMobileFilter(false);
    await setMobileSortBy(false);
    await window.scrollTo(0, 150);
    await openSiteLoadingPopup();
  };
  // Clear all filters
  const clearFiltersHandler = () => {
    setReviewId([]);
    setReviewCheckedId([]);
    setReviewSortBy("");
    setReviewSortByChecked("");
    openSiteLoadingPopup();
  };

  const isThere =
    reviewId.length > 0 ||
    reviewCheckedId.length > 0 ||
    reviewSortBy !== "" ||
    reviewSortByChecked !== "";

  const metaDesc = item.desc.slice(0, 150);

  return (
    <div>
      <Head>
        <title>{item.name} Reviews - Pros & Cons & Ratings and more</title>
        <meta
          name="description"
          content={`Find the latest verified ratings & reviews for ${item.name}. Make better educated decision after comparing real user opinions on the pros and cons.`}
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <MainWrapper>
        <Container>
          <ReviewWrapper>
            <ProductThumbnail>
              {!isMobile ? (
                <Image
                  loader={logoLoader}
                  src="/assets/img/product-banner/laptop.png"
                  alt="product thumbs"
                  width="1380"
                  height="200"
                  priority
                />
              ) : (
                <Image
                  loader={logoLoader}
                  src="/assets/img/product-banner/Mobile.png"
                  alt="product thumbs"
                  width="500"
                  height="90"
                  priority
                />
              )}
            </ProductThumbnail>
            <ProductItem>
              <Col xs={5} md={2} lg={1} className="position-relative">
                <ProductImg>
                  <Link href={`/product/${item.slug}`}>
                    <a>
                      <Image
                        loader={logoLoader}
                        src={item.logo}
                        alt={item.logoAltText}
                        width="156"
                        height="156"
                      />
                    </a>
                  </Link>
                </ProductImg>
                <Score score={item.score} />
              </Col>
              <Col xs={12} md={10} lg={8} className="px-3">
                <h2>
                  <Link href={`/product/${item.slug}`}>
                    {getData.productInfo.name}
                  </Link>
                </h2>
                <p>{getData.productInfo.subtitle}</p>
                <ProductReviews>
                  <Icons>
                    <Reviews value={getData.productInfo.rating} />
                  </Icons>

                  {getData.reviewsInfo.numberOfReviews > 0 && (
                    <span>
                      ({getData.reviewsInfo.numberOfReviews}{" "}
                      {getData.reviewsInfo.numberOfReviews > 1
                        ? "ratings"
                        : "rating"}
                      )
                    </span>
                  )}
                </ProductReviews>
              </Col>
              <Col
                xs={12}
                md={{ span: 4, offset: 2 }}
                lg={{ span: 3, offset: 0 }}
              >
                <ProductVisit>
                  {getData.productInfo.url !== "" && (
                    <a
                      href={`${getData.productInfo.url}?utm_source=spotsaas.com&utm_medium=cpc`}
                      target="_blank"
                      rel="noreferrer"
                      className="sps-btn sps-btn-success"
                    >
                      Visit Website
                    </a>
                  )}
                  <button
                    className="sps-btn sps-btn-small sps-btn-outline"
                    onClick={() => openComparePopup(getData.productInfo.slug)}
                  >
                    <AiOutlinePlusCircle /> Compare
                  </button>
                </ProductVisit>
              </Col>
            </ProductItem>
            <AllReviews>
              <Row>
                {!isTablet && (
                  <Col sm={12} md={3} lg={3} className="d-md-none d-lg-block">
                    <DesktopFilter>
                      {/* Ratings */}
                      <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Ratings</Accordion.Header>
                          <Accordion.Body>
                            {starsArray.map((item, index) => {
                              return (
                                <div key={index}>
                                  {item === "5" && (
                                    <FiveReviewInput
                                      domRef={filterFiveReviewRef}
                                      value={getData.ratingInfo.fiveStarRatings}
                                      count={5}
                                      Ides={reviewId}
                                      show={filterReviewId}
                                      hide={filterCloseReview}
                                    />
                                  )}
                                  {item === "4" && (
                                    <FourReviewInput
                                      domRef={filterFourReviewRef}
                                      value={getData.ratingInfo.fourStarRatings}
                                      count={4}
                                      id={reviewId}
                                      show={filterReviewId}
                                      hide={filterCloseReview}
                                    />
                                  )}
                                  {item === "3" && (
                                    <ThreeReviewInput
                                      domRef={filterThreeReviewRef}
                                      value={
                                        getData.ratingInfo.threeStarRatings
                                      }
                                      count={3}
                                      id={reviewId}
                                      show={filterReviewId}
                                      hide={filterCloseReview}
                                    />
                                  )}
                                  {item === "2" && (
                                    <TwoReviewInput
                                      domRef={filterTwoReviewRef}
                                      value={getData.ratingInfo.twoStarRatings}
                                      count={2}
                                      id={reviewId}
                                      show={filterReviewId}
                                      hide={filterCloseReview}
                                    />
                                  )}
                                  {item === "1" && (
                                    <OneReviewInput
                                      domRef={filterReviewRef}
                                      value={getData.ratingInfo.oneStarRatings}
                                      count={1}
                                      id={reviewId}
                                      show={filterReviewId}
                                      hide={filterCloseReview}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </DesktopFilter>
                  </Col>
                )}
                <Col sm={12} md={12} lg={12} xl={9}>
                  {!isTablet && (
                    <ReviewShowPageProduct
                      currentPage={currentPage}
                      totalProducts={getData.reviewsInfo.numberOfReviews}
                      pageItems={filterReview.length}
                      onChange={sortByHandler}
                    />
                  )}
                  {isTablet && (
                    <div className="mb-4">
                      <span>
                        Showing{" "}
                        {getData.reviewsInfo.numberOfReviews > 0
                          ? `${currentPage > 1
                            ? `${currentPage * 10 + 1 - 10}`
                            : currentPage
                          }-${filterReview.length < 10
                            ? getData.reviewsInfo.numberOfReviews
                            : currentPage * 10
                          }`
                          : "0 - 0"}{" "}
                        out of {getData.reviewsInfo.numberOfReviews}
                      </span>
                    </div>
                  )}
                  {filterReview.length > 0 ? filterReview.map((item, index) => (
                    <ReviewItem key={index} item={item} />
                  )) : (
                    isMobile ? (<>
                      <Player width="450px" height="650px" src="/assets/json/ReviewShimmerMobile.json" />
                      <Player width="450px" height="650px" src="/assets/json/ReviewShimmerMobile.json" />
                    </>) : (<>
                      <Player width="900px" height="150px" src="/assets/json/ReviewShimmerDesktop.json" />
                      <Player width="900px" height="150px" src="/assets/json/ReviewShimmerDesktop.json" />
                      <Player width="900px" height="150px" src="/assets/json/ReviewShimmerDesktop.json" />
                      <Player width="900px" height="150px" src="/assets/json/ReviewShimmerDesktop.json" />
                      <Player width="900px" height="150px" src="/assets/json/ReviewShimmerDesktop.json" />
                      <Player width="900px" height="150px" src="/assets/json/ReviewShimmerDesktop.json" />
                      <Player width="900px" height="150px" src="/assets/json/ReviewShimmerDesktop.json" />
                      <Player width="900px" height="150px" src="/assets/json/ReviewShimmerDesktop.json" />
                      <Player width="900px" height="150px" src="/assets/json/ReviewShimmerDesktop.json" />
                      <Player width="900px" height="150px" src="/assets/json/ReviewShimmerDesktop.json" />
                    </>)
                  )}
                  {getData.reviewsInfo.numberOfReviews > 10 && (
                    <Pagination
                      totalCount={getData.reviewsInfo.numberOfReviews}
                    />
                  )}
                </Col>
              </Row>
              {/* Filter Mobile function */}
              <MobileFilter>
                <FilterPopup>
                  <Content onClick={handleFilterShow}>
                    <FiFilter /> <span>Filter</span>
                  </Content>
                  <Content onClick={handleSortByShow}>
                    <BsArrowDownUp /> <span>Sort By</span>
                  </Content>
                </FilterPopup>
              </MobileFilter>

              <MobileSortByPopup
                className={`${mobileSortBy ? "show" : "hide"}`}
              >
                <HeaderWrapper>
                  <div onClick={handleSortByClose} className="filter_close">
                    <HiChevronLeft />
                  </div>
                  <h4>Filter Results by</h4>
                  <p onClick={clearFiltersHandler} className="filter_reset">
                    {isThere && <span>Close Filters</span>}
                  </p>
                </HeaderWrapper>
                <MobileSortByBody>
                  <ReviewShowPageProduct
                    currentPage={currentPage}
                    totalProducts={getData.reviewsInfo.numberOfReviews}
                    pageItems={filterReview.length}
                    onChange={applySortByHandler}
                  />
                </MobileSortByBody>
                <FooterWrapper>
                  {isThere && (
                    <button onClick={mobileApplyFilterHandler}>
                      Apply Filter
                    </button>
                  )}
                </FooterWrapper>
              </MobileSortByPopup>

              <MobileFilterPopup
                className={`${mobileFilter ? "show" : "hide"}`}
              >
                <HeaderWrapper>
                  <div onClick={handleFilterClose} className="filter_close">
                    <HiChevronLeft />
                  </div>
                  <h4>Filter Results by</h4>
                  <p onClick={clearFiltersHandler} className="filter_reset">
                    {isThere && <span>Close Filters</span>}
                  </p>
                </HeaderWrapper>
                <Tab.Container id="left-tabs-example" defaultActiveKey="rating">
                  <MobileFilterWrapper>
                    <MobileFilterSidebar>
                      <Nav className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="rating">Rating</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </MobileFilterSidebar>
                    <MobileFilterBody>
                      <Tab.Content>
                        <Tab.Pane eventKey="rating">
                          {starsArray.map((item, index) => {
                            return (
                              <div key={index}>
                                {item === "5" && (
                                  <FiveReviewInput
                                    domRef={filterMobileFiveReviewRef}
                                    value={getData.ratingInfo.fiveStarRatings}
                                    count={5}
                                    show={applyFilterReview}
                                    hide={applyFilterCloseReview}
                                  />
                                )}
                                {item === "4" && (
                                  <FourReviewInput
                                    domRef={filterMobileFourReviewRef}
                                    value={getData.ratingInfo.fourStarRatings}
                                    count={4}
                                    show={applyFilterReview}
                                    hide={applyFilterCloseReview}
                                  />
                                )}
                                {item === "3" && (
                                  <ThreeReviewInput
                                    domRef={filterMobileThreeReviewRef}
                                    value={getData.ratingInfo.threeStarRatings}
                                    count={3}
                                    show={applyFilterReview}
                                    hide={applyFilterCloseReview}
                                  />
                                )}
                                {item === "2" && (
                                  <TwoReviewInput
                                    domRef={filterMobileTwoReviewRef}
                                    value={getData.ratingInfo.twoStarRatings}
                                    count={2}
                                    show={applyFilterReview}
                                    hide={applyFilterCloseReview}
                                  />
                                )}
                                {item === "1" && (
                                  <OneReviewInput
                                    domRef={filterMobileReviewRef}
                                    value={getData.ratingInfo.oneStarRatings}
                                    count={1}
                                    show={applyFilterReview}
                                    hide={applyFilterCloseReview}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </Tab.Pane>
                      </Tab.Content>
                    </MobileFilterBody>
                  </MobileFilterWrapper>
                </Tab.Container>
                <FooterWrapper>
                  {isThere && (
                    <button onClick={mobileApplyFilterHandler}>
                      Apply Filter
                    </button>
                  )}
                </FooterWrapper>
              </MobileFilterPopup>
            </AllReviews>
          </ReviewWrapper>
        </Container>
      </MainWrapper>
    </div>
  );
}
const MainWrapper = styled.div`
  padding: 40px 0 100px 0;
`;
const ReviewWrapper = styled.div`
  background: var(--white);
  display: inline-block;
`;
const ProductThumbnail = styled.div``;
const ProductItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 15px 33px 35px 33px;
  border-bottom: 1px solid var(--lighter);

  & h2,
  h6,
  p {
    margin: 0;

    & a {
      color: var(--dark);
    }
  }
`;
const ProductReviews = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  & span {
    font-weight: 500;
  }
`;
const Icons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  & p {
    font-weight: 500 !important;

    &:last-child::after {
      content: "|";
      margin-left: 10px;
      font-weight: 500;
    }
  }
`;
const DesktopFilter = styled.div`
  & .review-star {
    width: 20px !important;
    height: 20px !important;
  }

  @media (max-width: 1080px) {
    display: none;
  }

  & .accordion-body {
    font-size: 14px;
  }

  & .form-check {
    display: inline-flex;
    padding: 0;

    & label {
      line-height: 18px;
      margin-left: 10px;
    }
  }

  & .accordion-button {
    padding: 0.5rem 1.25rem;

    &:focus {
      border: none;
      box-shadow: none;
    }

    &:not(.collapsed) {
      color: var(--dark);
      background-color: transparent;
      box-shadow: none;
    }

    &::after {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='var(--primary)'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    }
  }
`;
const ProductImg = styled.div`
  text-align: center;

  & img {
    border-radius: 100px;
  }
`;
const FooterWrapper = styled.div`
  background-color: var(--primary);
  height: 50px;
  width: 100%;
  justify-content: end;
  align-items: center;
  margin-top: -110px;
  z-index: 999;
  position: relative;
  display: flex;

  & button {
    margin-right: 40px;
    border: none;
    padding: 5px 15px;
    border-radius: 4px;
    background: var(--bs-green);
    color: var(--white);
  }
`;
const AllReviews = styled.div`
  padding: 40px 46px;
  @media (max-width: 500px) {
    padding: 40px 26px;
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

  @media (max-width: 990px) {
    display: inline-block;

    & .sps-btn-success {
      position: relative;
    }

    & .sps-btn-outline {
      position: relative;
      top: auto;
    }
  }
  @media (max-width: 767px) {
    display: flex;
    width: 100%;
    height: auto;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;
const MobileFilter = styled.div`
  display: none;
  @media (max-width: 1080px) {
    display: block;
  }
`;
const MobileFilterPopup = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background: var(--white);
  z-index: 999;
  transition: all ease-in-out 400ms;

  & h4 {
    margin: 0;
    font-weight: 400 !important;
  }

  &.hide {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-150px);
  }

  &.show {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }

  & .filter_close,
  .filter_reset {
    cursor: pointer;
    color: var(--white);
    margin: 0;
    line-height: 60px;
    padding: 0 20px;
    font-weight: 400 !important;
  }

  & .filter_reset {
    background-color: var(--error);
    border-radius: 4px;
    line-height: 32px;
    margin-right: 10px;
  }
`;
const MobileSortByPopup = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background: var(--white);
  z-index: 999;
  transition: all ease-in-out 400ms;

  & h4 {
    margin: 0;
    font-weight: 400 !important;
  }

  &.hide {
    opacity: 0;
    visibility: hidden;
    transform: translateX(150px);
  }

  &.show {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }

  & .filter_close,
  .filter_reset {
    cursor: pointer;
    color: var(--white);
    margin: 0;
    line-height: 60px;
    padding: 0 20px;
    font-weight: 400 !important;
  }

  & .filter_reset {
    background-color: var(--error);
    border-radius: 4px;
    line-height: 32px;
    margin-right: 10px;
  }
`;
const MobileFilterWrapper = styled.div`
  display: flex;
`;
const MobileFilterSidebar = styled.div`
  width: 130px;
  height: 100vh;
  background-color: var(--lightest);

  & .nav-link {
    font-size: 16px;
    color: var(--dark);
    padding: 11px;
    cursor: pointer;

    &.active {
      background: var(--white);
    }
  }
`;
const MobileFilterBody = styled.div`
  height: 100vh;
  width: 280px;
  padding: 15px 25px;

  & .review-star {
    width: 20px;
    height: 20px;
  }
`;
const HeaderWrapper = styled.div`
  background-color: var(--primary);
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--white);

  & svg {
    font-size: 25px;
  }
`;
const MobileSortByBody = styled.div`
  padding: 20px;
  height: 100vh;
`;
const FilterPopup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: fixed;
  left: 0;
  bottom: 0;
  box-shadow: 10px 0 20px 0 #fff;
  background: var(--white);
  z-index: 99;
`;
const Content = styled.div`
  padding: 10px;
  cursor: pointer;
  color: var(--primary);
  display: flex;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &:first-of-type {
    border-right: 2px solid var(--lighter);
  }

  @media (max-width: 500px) {
    font-size: 18px;
  }
`;
