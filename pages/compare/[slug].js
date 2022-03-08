/** @format */

import styled from "@emotion/styled";
import _ from "lodash";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  Col,
  Container,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from "react-bootstrap";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import CompareSearch from "../../components/compare/search-box";
import SuggestedList from "../../components/compare/suggested-list";
import Score from "../../components/products/score";
import Reviews from "../../components/review";
import HeaderContext from "../../context/headerContext";

const Name = () => {
  const router = useRouter();
  const {
    isCompare,
    allIds,
    setAllIds,
    activeId,
    setActiveId,
    compareIds,
    setCompareIds,
    setBreadcrumbs,
    compareNames,
    country
  } = useContext(HeaderContext);
  const isTablet = useMediaQuery({ query: "(max-width:1080px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const [slug, setSlug] = useState([]);

  useEffect(() => {
    if (slug.length > 0) {
      setActiveId(slug[0]);
    }
    if (slug.length > 1) {
      if (!compareIds.includes(slug[1])) {
        compareIds.push(slug[1]);
      }
    }
    if (slug.length > 2) {
      if (!compareIds.includes(slug[2])) {
        compareIds.push(slug[2]);
      }
    }
    if (slug.length > 3) {
      if (!compareIds.includes(slug[3])) {
        compareIds.push(slug[3]);
      }
    }
    if (slug.length > 4) {
      if (!compareIds.includes(slug[4])) {
        compareIds.push(slug[4]);
      }
    }
  }, [slug, compareNames]);

  useEffect(() => {
    const isUrl = router.asPath !== slug;
    if (isUrl && allIds.length > 0) {
      setAllIds([]);
    }
  }, [router, slug]);

  useEffect(() => {
    const isSlug = router.query.slug;
    if (isSlug) {
      const name = isSlug.replace(/-/g, " ");
      const nameArray = isSlug.split("-vs-");
      setSlug(nameArray);
      const getBreadCrumbs = async () => {
        if (nameArray.length > 0) {
          const res = await fetch(
            `https://api.spotsaas.com/product/${nameArray[0]}`,
            {
              headers: {
                'country_name': country
              }
            }
          )
            .then((response) => response.json())
            .then((responseJSON) => {
              return responseJSON;
            });

          let array = [
            {
              name: "Home",
              link: "/",
            },
            {
              name: `${res.categoryName}`,
              link: `/category/${res.categorySlug}`,
            },
            {
              name: `${name}`,
              link: "",
            },
          ];
          setBreadcrumbs(array);
        }
      };

      getBreadCrumbs();
    }
  }, [compareNames]);

  return (
    slug.length > 0 && (
      <>
        <Head>
          <title>Compare | spotSaaS</title>
          <meta
            name="description"
            content="You can choose the right software and services for your business based on our best score."
          />
          <link rel="icon" href="/favicon.png" />
        </Head>

        <SectionWrapper>
          <Container>
            <Row>
              <Col
                xs={slug.length <= 1 ? 6 : 12}
                md={slug.length <= 2 ? 8 : 12}
                lg={slug.length <= 3 ? 9 : 12}
              >
                <Row>
                  <Col lg={slug.length < 2 ? 4 : 12}>
                    <CompareOverview limit={slug.length}>
                      {slug.length > 0 &&
                        _.map(slug, (item, index) => {
                          return (
                            <ProductInfo
                              key={index * 3242342}
                              length={slug.length}
                              slugs={slug}
                              setSlugs={setSlug}
                              item={item}
                            />
                          );
                        })}
                    </CompareOverview>
                    <CompareOverview limit={slug.length}>
                      {slug.length > 0 &&
                        _.map(slug, (value, index) => {
                          return (
                            <CompareOverviewItem
                              key={index * 34534}
                              item={value}
                            />
                          );
                        })}
                    </CompareOverview>
                    <CompareOverview limit={slug.length}>
                      {slug.length > 0 &&
                        _.map(slug, (item, key) => {
                          return <PricingInfo key={key} item={item} />;
                        })}
                    </CompareOverview>
                    <CompareOverview limit={slug.length}>
                      {slug.length > 0 &&
                        _.map(slug, (item, key) => {
                          return <FeaturesInfo key={key} item={item} />;
                        })}
                    </CompareOverview>
                    <CompareOverview limit={slug.length}>
                      {slug.length > 0 &&
                        _.map(slug, (item, key) => {
                          return <ReviewInfo key={key} item={item} />;
                        })}
                    </CompareOverview>
                    <CompareOverview limit={slug.length}>
                      {slug.length > 0 &&
                        _.map(slug, (item, key) => {
                          return <AlternativesInfo key={key} item={item} />;
                        })}
                    </CompareOverview>
                  </Col>
                </Row>
              </Col>
              {isMobile ? (
                <>
                  {slug.length < 2 && (
                    <>
                      <Col xs={6} md={4} lg={3}>
                        <CompareSearch />
                        <SuggestedList slug={slug} />
                      </Col>
                    </>
                  )}
                </>
              ) : (
                <>
                  {slug.length < (isTablet ? 3 : 4) && (
                    <>
                      <Col xs={6} md={4} lg={3}>
                        <CompareSearch />
                        <SuggestedList slug={slug} />
                      </Col>
                    </>
                  )}
                </>
              )}
            </Row>
          </Container>
        </SectionWrapper>
      </>
    )
  );
};

export const ProductInfo = (props) => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const { item, length, slugs, setSlugs } = props;
  const [getData, setGetData] = useState(null);
  const router = useRouter();
  const [error, setError] = useState("");
  const { activeId, allIds, setAllIds, setActiveId, setSiteLoading, country } =
    useContext(HeaderContext);

  const apiGet = async () => {
    const dataRes = await fetch(`https://api.spotsaas.com/product/${item}`, { headers: { 'country_name': country } })
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      });
    setGetData(dataRes);
    if (!allIds.includes(item)) {
      allIds.push(item);
    }
  };
  useEffect(() => {
    apiGet();
  }, [item]);

  const CloseItemHandler = async (id, name) => {
    if (id === activeId) {
      const getName = name;
      const slugArray = router.query.slug.split("-vs-");
      const getIds = allIds.filter((item) => item != id);
      if (slugArray.includes(getName)) {
        const value = slugArray.filter((slug) => slug !== getName);
        const newSlug = value.join("-vs-");
        router.push(
          {
            pathname: `/compare/${newSlug}`,
          },
          undefined,
          { shallow: true }
        );
      }
      setActiveId("");
      setAllIds(getIds);
      setSiteLoading(true);
      setTimeout(() => {
        setSiteLoading(false);
      }, 2500);
    } else {
      const getName = name;
      const slugArray = router.query.slug.split("-vs-");

      const getIds = allIds.filter((item) => item != id);
      if (slugArray.includes(getName)) {
        const value = slugArray.filter((slug) => slug !== getName);
        const newSlug = value.join("-vs-");
        router.push(
          {
            pathname: `/compare/${newSlug}`,
          },
          undefined,
          { shallow: true }
        );
      }
      setSiteLoading(true);
      setAllIds(getIds);
      setTimeout(() => {
        setSiteLoading(false);
      }, 1500);
    }
  };

  const CloseHandler = async (name) => {
    const value = slugs.filter((item) => item !== name);
    setSlugs(value);
    const slugArray = router.query.slug.split("-vs-");
    if (slugArray.includes(name)) {
      const value = slugArray.filter((slug) => slug !== name);
      const newSlug = value.join("-vs-");
      router.push(
        {
          pathname: `/compare/${newSlug}`,
        },
        undefined,
        { shallow: true }
      );
    }
  };

  return getData !== null ? (
    <ProductItem>
      <ProductImg>
        <Image
          loader={logoLoader}
          src={getData.logo}
          alt={getData.logoAltText}
          width={60}
          height={60}
          priority
        />
        <h4>{getData.name}</h4>
      </ProductImg>
      <Score score={getData.score} />
      <ProductReviews>
        <Icons>
          <Reviews value={getData.rating} />
        </Icons>
        <div className="review_reading">
          {getData.ratingCount > 0 && (
            <Link href={`/product/${getData.slug}/reviews/`}>
              <a>
                ({getData.ratingCount}{" "}
                {getData.ratingCount > 1 ? "ratings" : "rating"})
              </a>
            </Link>
          )}
        </div>
      </ProductReviews>
      <ProductVisit>
        <a
          href={`${getData.url}?utm_source=spotsaas.com&utm_medium=cpc`}
          target="_blank"
          className="sps-btn sps-btn-success"
          rel="noreferrer"
        >
          Visit Website
        </a>
      </ProductVisit>
      {length > 1 && (
        <CloseItem onClick={() => CloseItemHandler(getData.slug, getData.slug)}>
          <RiCloseLine />
        </CloseItem>
      )}
    </ProductItem>
  ) : error === "" ? (
    <div className="imageContainer">
      <Image
        className="image"
        loader={logoLoader}
        src="/assets/img/loading/product-info.gif"
        alt="loading image"
        layout="fill"
      />
    </div>
  ) : (
    <ProductItem>
      <p>{error}</p>
      {length > 1 && (
        <CloseItem onClick={() => CloseHandler(item)}>
          <RiCloseLine />
        </CloseItem>
      )}
    </ProductItem>
  );
};
export const CompareOverviewItem = (props) => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const { item } = props;
  const [loading, setLoading] = useState(true);
  const [getData, setGetData] = useState(null);
  const [overview, setOverview] = useState(null);
  const [info, setInfo] = useState([]);
  const [error, setError] = useState("");
  const [reading, setReading] = useState(false);
  const { country } = useContext(HeaderContext);
  useEffect(() => {
    if (overview !== null) {
      if (overview.desc) {
        const content = overview.desc.slice(0, 85);
        setInfo(content);
      }
    }
  }, [loading]);

  const apiGet = async () => {
    const res = await fetch(`https://api.spotsaas.com/product/${item}`, { headers: { 'country_name': country } })
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      });

    const overviewRes = await fetch(
      `https://api.spotsaas.com/product/${item}/overview`, { headers: { 'country_name': country } }
    )
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      });

    setGetData(res);
    setOverview(overviewRes);
    setLoading(false);
  };

  useEffect(() => {
    apiGet();
  }, [item]);

  const readMoreHandler = () => {
    const fullContent = overview.desc;
    setInfo(fullContent);
    setReading(true);
  };

  const closeHandler = () => {
    const fullContent = overview.desc.slice(0, 85);
    setInfo(fullContent);
    setReading(false);
  };

  return getData !== null && overview !== null ? (
    <Overview>
      <h3>Overview</h3>
      <h5>Description</h5>
      <p>
        {`${info}${!reading && "..."}`}
        {overview.desc.length > 85 && (
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
      <ListItem>
        <h4>Platforms</h4>
        <ul className="list">
          {overview.platforms.map((value, index) => {
            if (value.toLowerCase().includes("web")) {
              return (
                <li key={index} className="d-flex gap-2 align-items-center">
                  <span>
                    <Image
                      loader={logoLoader}
                      src={`/assets/img/icons/web.png`}
                      alt="category image"
                      width={25}
                      height={25}
                      priority
                    />
                  </span>
                  {value}
                </li>
              );
            } else if (value.toLowerCase().includes("android")) {
              return (
                <li key={index} className="d-flex gap-2 align-items-center">
                  <span>
                    <Image
                      loader={logoLoader}
                      src={`/assets/img/icons/android.png`}
                      alt="category image"
                      width={25}
                      height={25}
                      priority
                    />
                  </span>
                  {value}
                </li>
              );
            } else if (value.toLowerCase().includes("ios")) {
              return (
                <li key={index} className="d-flex gap-2 align-items-center">
                  <span>
                    <Image
                      loader={logoLoader}
                      src={`/assets/img/icons/ios.png`}
                      alt="category image"
                      width={25}
                      height={25}
                      priority
                    />
                  </span>
                  {value}
                </li>
              );
            } else if (
              value.toLowerCase().includes("macos") ||
              value.toLowerCase().includes("mac")
            ) {
              return (
                <li key={index} className="d-flex gap-2 align-items-center">
                  <span>
                    <Image
                      loader={logoLoader}
                      src={`/assets/img/icons/macos.png`}
                      alt="category image"
                      width={25}
                      height={25}
                      priority
                    />
                  </span>
                  {value}
                </li>
              );
            } else if (value.toLowerCase().includes("windows")) {
              return (
                <li key={index} className="d-flex gap-2 align-items-center">
                  <span>
                    <Image
                      loader={logoLoader}
                      src={`/assets/img/icons/windows.png`}
                      alt="category image"
                      width={25}
                      height={25}
                      priority
                    />
                  </span>
                  {value}
                </li>
              );
            } else if (value.toLowerCase().includes("linux")) {
              return (
                <li key={index} className="d-flex gap-2 align-items-center">
                  <span>
                    <Image
                      loader={logoLoader}
                      src={`/assets/img/icons/linux.png`}
                      alt="category image"
                      width={25}
                      height={25}
                      priority
                    />
                  </span>
                  {value}
                </li>
              );
            } else {
              return (
                <li key={index} className="d-flex gap-2 align-items-center">
                  <span>
                    <Image
                      loader={logoLoader}
                      src={`/assets/img/icons/draft.png`}
                      alt="category image"
                      width={25}
                      height={25}
                      priority
                    />
                  </span>
                  {value}
                </li>
              );
            }
          })}
        </ul>
      </ListItem>
      <ListItem>
        <h4>Customer Type</h4>
        <ul className="list">
          {getData.customerTypes.map((name, index) => {
            if (name.toLowerCase().includes("business")) {
              if (name.toLowerCase().includes("big")) {
                return (
                  <li key={index} className="d-flex gap-2 align-items-center">
                    <span>
                      <Image
                        loader={logoLoader}
                        src={`/assets/img/icons/big-business.png`}
                        alt="category image"
                        width={25}
                        height={25}
                        priority
                      />
                    </span>
                    {name}
                  </li>
                );
              } else if (name.toLowerCase().includes("medium")) {
                return (
                  <li key={index} className="d-flex gap-2 align-items-center">
                    <span>
                      <Image
                        loader={logoLoader}
                        src={`/assets/img/icons/mid-sized.png`}
                        alt="category image"
                        width={25}
                        height={25}
                        priority
                      />
                    </span>
                    {name}
                  </li>
                );
              } else if (name.toLowerCase().includes("small")) {
                return (
                  <li key={index} className="d-flex gap-2 align-items-center">
                    <span>
                      <Image
                        loader={logoLoader}
                        src={`/assets/img/icons/small-enterprise.png`}
                        alt="category image"
                        width={25}
                        height={25}
                        priority
                      />
                    </span>
                    {name}
                  </li>
                );
              }
            } else if (name.toLowerCase().includes("enterprise")) {
              if (name.toLowerCase().includes("large")) {
                return (
                  <li key={index} className="d-flex gap-2 align-items-center">
                    <span>
                      <Image
                        loader={logoLoader}
                        src={`/assets/img/icons/big-business.png`}
                        alt="category image"
                        width={25}
                        height={25}
                        priority
                      />
                    </span>
                    {name}
                  </li>
                );
              } else if (name.toLowerCase().includes("mid")) {
                return (
                  <li key={index} className="d-flex gap-2 align-items-center">
                    <span>
                      <Image
                        loader={logoLoader}
                        src={`/assets/img/icons/mid-sized.png`}
                        alt="category image"
                        width={25}
                        height={25}
                        priority
                      />
                    </span>
                    {name}
                  </li>
                );
              } else if (name.toLowerCase().includes("small")) {
                return (
                  <li key={index} className="d-flex gap-2 align-items-center">
                    <span>
                      <Image
                        loader={logoLoader}
                        src={`/assets/img/icons/small-enterprise.png`}
                        alt="category image"
                        width={25}
                        height={25}
                        priority
                      />
                    </span>
                    {name}
                  </li>
                );
              }
            } else if (name.toLowerCase().includes("mid-sized")) {
              return (
                <li key={index} className="d-flex gap-2 align-items-center">
                  <span>
                    <Image
                      loader={logoLoader}
                      src={`/assets/img/icons/mid-sized.png`}
                      alt="category image"
                      width={25}
                      height={25}
                      priority
                    />
                  </span>
                  {name}
                </li>
              );
            } else if (name.toLowerCase().includes("individual")) {
              return (
                <li key={index} className="d-flex gap-2 align-items-center">
                  <span>
                    <Image
                      loader={logoLoader}
                      src={`/assets/img/icons/individual.png`}
                      alt="category image"
                      width={25}
                      height={25}
                      priority
                    />
                  </span>
                  {name}
                </li>
              );
            } else if (name.toLowerCase().includes("freelancer")) {
              return (
                <li key={index} className="d-flex gap-2 align-items-center">
                  <span>
                    <Image
                      loader={logoLoader}
                      src={`/assets/img/icons/freelancer.png`}
                      alt="category image"
                      width={25}
                      height={25}
                      priority
                    />
                  </span>
                  {name}
                </li>
              );
            } else {
              return (
                <li key={index} className="d-flex gap-2 align-items-center">
                  <span>
                    <Image
                      loader={logoLoader}
                      src={`/assets/img/icons/draft.png`}
                      alt="category image"
                      width={25}
                      height={25}
                      priority
                    />
                  </span>
                  {name}
                </li>
              );
            }
          })}
        </ul>
      </ListItem>
    </Overview>
  ) : error === "" ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <div></div>
  );
};
export const PricingInfo = (props) => {
  const { item } = props;
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const [getData, setGetData] = useState(null);
  const [media, setMedia] = useState(null);
  const [error, setError] = useState("");
  const { compareIds, country } = useContext(HeaderContext);

  const apiGet = async () => {
    const res = await fetch(`https://api.spotsaas.com/product/${item}`, { headers: { 'country_name': country } })
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      });

    const mediaRes = await fetch(
      `https://api.spotsaas.com/product/${item}/media`, { headers: { 'country_name': country } }
    )
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      });

    setGetData(res);
    setMedia(mediaRes);
  };

  useEffect(() => {
    apiGet();
  }, [item, compareIds]);

  return getData !== null && media !== null ? (
    <>
      {media.priceImageInfo.length > 0 ? (
        <PricingWrapper id="pricing">
          <h3>Pricing</h3>
          <Disclaimer>
            <p>
              Disclaimer: The pricing details were last updated from the vendor
              website and may be different from actual. Please confirm with the
              vendor website before purchasing.
            </p>
          </Disclaimer>
          <PricingImage>
            <a
              href={`${getData.productPricingUrl}?utm_source=spotsaas.com&utm_medium=cpc`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="imageContainer">
                <Image
                  className="image"
                  loader={logoLoader}
                  src={media.priceImageInfo[0].url}
                  alt={media.priceImageInfo[0].altText}
                  layout="fill"
                  priority
                />
              </div>
            </a>
          </PricingImage>
        </PricingWrapper>
      ) : (
        <PricingWrapper id="pricing">
          <h3>Pricing</h3>
          <p className="text-center">This product have no pricing 😀️</p>
        </PricingWrapper>
      )}
    </>
  ) : (
    error !== "" && <div></div>
  );
};
export const FeaturesInfo = (props) => {
  const { item } = props;
  const [getData, setGetData] = useState(null);
  const [error, setError] = useState("");
  const { compareIds, country } = useContext(HeaderContext);

  const apiGet = async () => {
    const res = await fetch(`https://api.spotsaas.com/product/${item}`, { headers: { 'country_name': country } })
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      });

    setGetData(res);
  };

  useEffect(() => {
    apiGet();
  }, [item, compareIds]);

  return getData !== null ? (
    <FeaturesWrapper id="features">
      <FeaturesTitle>Features</FeaturesTitle>
      <CheckLists>
        {getData.features.length > 0 ? (
          getData.features.map((item, index) => (
            <li key={index}>
              <Link href={`/glossary#${item.toLowerCase().replace(/ /g, "-")}`}>
                <a>
                  <RiCheckLine /> {item}
                </a>
              </Link>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={`popover-positioned-top`}>
                    Features tooltip content will be here. when api have the
                    info.
                  </Tooltip>
                }
              >
                <Button className={`sps_overlay_trigger`}>
                  <AiOutlineQuestionCircle className="font-small" />
                </Button>
              </OverlayTrigger>
            </li>
          ))
        ) : (
          <p className="text-center">No Features ☹️</p>
        )}
      </CheckLists>
    </FeaturesWrapper>
  ) : (
    error !== "" && <div></div>
  );
};
export const ReviewInfo = (props) => {
  const { item } = props;
  const [getData, setGetData] = useState(null);
  const [error, setError] = useState("");
  const { compareIds, country } = useContext(HeaderContext);

  const apiGet = async () => {
    const res = await fetch(`https://api.spotsaas.com/product/${item}`, { headers: { 'country_name': country } })
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      });

    setGetData(res);
  };

  useEffect(() => {
    apiGet();
  }, [item, compareIds]);

  return getData !== null ? (
    <RatingsReviewsWrapper id="ratings">
      <ReviewHeading>
        <div>
          <h3>Ratings</h3>
        </div>
        <div>
          <i>{getData?.ratingCount || 0} ratings</i>
        </div>
      </ReviewHeading>
      <ReviewStars>
        <div className="d-flex gap-3 mb-3 stars-count">
          <div className="d-flex gap-1">
            <ImStarFull />
            <ImStarFull />
            <ImStarFull />
            <ImStarFull />
            <ImStarFull />
          </div>
          <div>
            <h4 className="stars-title">
              {getData.ratingsInfo.fiveStarRatings}
            </h4>
          </div>
        </div>
        <div className="d-flex gap-3 mb-3 stars-count">
          <div className="d-flex gap-1">
            <ImStarFull />
            <ImStarFull />
            <ImStarFull />
            <ImStarFull />
            <ImStarEmpty />
          </div>
          <div>
            <h4 className="stars-title">
              {getData.ratingsInfo.fourStarRatings}
            </h4>
          </div>
        </div>
        <div className="d-flex gap-3 mb-3 stars-count">
          <div className="d-flex gap-1">
            <ImStarFull />
            <ImStarFull />
            <ImStarFull />
            <ImStarEmpty />
            <ImStarEmpty />
          </div>
          <div>
            <h4 className="stars-title">
              {getData.ratingsInfo.threeStarRatings}
            </h4>
          </div>
        </div>
        <div className="d-flex gap-3 mb-3 stars-count">
          <div className="d-flex gap-1">
            <ImStarFull />
            <ImStarFull />
            <ImStarEmpty />
            <ImStarEmpty />
            <ImStarEmpty />
          </div>
          <div>
            <h4 className="stars-title">
              {getData.ratingsInfo.twoStarRatings}
            </h4>
          </div>
        </div>
        <div className="d-flex gap-3 mb-3 stars-count">
          <div className="d-flex gap-1">
            <ImStarFull />
            <ImStarEmpty />
            <ImStarEmpty />
            <ImStarEmpty />
            <ImStarEmpty />
          </div>
          <div>
            <h4 className="stars-title">
              {getData.ratingsInfo.oneStarRatings}
            </h4>
          </div>
        </div>
      </ReviewStars>
    </RatingsReviewsWrapper>
  ) : (
    error !== "" && <div></div>
  );
};
export const AlternativesInfo = (props) => {
  const { item } = props;
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 100}`;
  };
  const [alternates, setAlternates] = useState(null);
  const [error, setError] = useState("");
  const { compareIds, country } = useContext(HeaderContext);

  const apiGet = async () => {
    const alternatesRes = await fetch(
      `https://api.spotsaas.com/product/${item}/alternates`, { headers: { 'country_name': country } }
    )
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      });

    setAlternates(alternatesRes);
  };

  useEffect(() => {
    apiGet();
  }, [item, compareIds]);

  return alternates !== null ? (
    <AlternativesWrapper id="alternatives">
      <h3>Alternatives</h3>
      {alternates.length > 0 ? (
        alternates.length > 0 &&
        alternates.slice(0, 2).map((value, index) => (
          <div key={index}>
            <Link href={`/product/${value.slug}/`}>
              <a>
                <Image
                  loader={logoLoader}
                  src={value.logo}
                  alt={value.logoAltText}
                  width={85}
                  height={85}
                  priority
                />
                <h4>{value.name}</h4>
              </a>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center">No Alternatives Products ☹️</p>
      )}
    </AlternativesWrapper>
  ) : (
    error !== "" && <div></div>
  );
};

export default Name;

const SectionWrapper = styled.div`
  padding: 80px 0;
  text-align: center;

  @media (max-width: 900px) {
    padding: 40px 0 0 0;
  }
`;
const CompareOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.limit}, 1fr);
  gap: 20px;
`;

const ProductItem = styled.div`
  padding: 20px 0;
  text-align: left;
  position: relative;
  border-bottom: 1px solid var(--lighter);
  position: relative;
  min-height: 220px;
  display: grid;
  align-content: space-between;

  & p {
    margin: 0;
    font-size: var(--sm-p) !important;
  }

  @media (max-width: 900px) {
    padding-bottom: 0;
  }
`;
const ProductReviews = styled.div`
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
  margin-bottom: 8px;
`;
const ProductImg = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  word-wrap: anywhere;

  & h4 {
    margin: 0;
  }

  & img {
    border-radius: 100px;
    margin-top: 20px;
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
`;
const CloseItem = styled.div`
  position: absolute;
  padding: 5px 10px;
  line-height: 15px;
  top: -15px;
  right: 10px;
  font-size: 22px;
  cursor: pointer;

  &:hover {
    color: var(--error);
  }
`;

const Overview = styled.div`
  text-align: left;
  padding: 20px 0;
  border-bottom: 1px solid var(--lighter);

  & .title {
    min-height: 33.6px;
  }

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
const ListItem = styled.div`
  margin-bottom: 20px;
  min-height: 210px;
  @media (min-width: 1080px) {
    width: auto;
  }

  & h4 {
    margin-bottom: 10px;
  }

  & .list {
    padding: 0;

    & li {
      list-style: none;
      line-height: 35px;

      & span {
        line-height: 0;
      }
    }
  }
`;

const PricingWrapper = styled.div`
  border-bottom: 1px solid var(--lighter);
  padding: 20px 0;
  text-align: left;

  & .title {
    min-height: 33.6px;
  }

  @media (max-width: 500px) {
    min-height: auto;
  }
`;
const Disclaimer = styled.div`
  margin: 10px 0;
`;
const PricingImage = styled.div``;

const FeaturesWrapper = styled.div`
  border-bottom: 1px solid var(--lighter);
  padding: 20px 0;
  text-align: left;
`;
const FeaturesTitle = styled.h3`
  margin-bottom: 10px;
  min-height: 33.6px;
`;
const CheckLists = styled.ul`
  padding: 0;
  display: grid;
  gap: 10px;

  & a {
    color: var(--black);
    @media (max-width: 900px) {
      font-size: var(--sm-p);
      display: flex;
      gap: 10px;
    }
  }

  & .sps_overlay_trigger {
    background: transparent;
    padding: 0 5px;
    border-color: transparent;
    color: var(--darker);
  }

  & li {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 22px;
    @media (max-width: 900px) {
      line-height: 16px;
      justify-content: space-between;
    }

    & svg {
      font-size: 25px;
    }

    & .font-small {
      font-size: var(--sm-p) !important;
    }
  }
`;

const RatingsReviewsWrapper = styled.div`
  border-bottom: 1px solid var(--lighter);
  padding: 20px 0;
  text-align: left;

  & .reviews-item-wrapper {
    height: 100%;
  }
`;
const ReviewHeading = styled.div`
  margin-bottom: 20px;

  & .title {
    min-height: 33.6px;
  }
`;
const ReviewStars = styled.div`
  & svg {
    font-size: 22px;
    color: var(--warning);
    @media (max-width: 1080px) {
      font-size: 16px;
    }
    @media (max-width: 500px) {
      font-size: 14px;
    }
  }

  & .stars-title {
    font-weight: 400 !important;
    font-size: 20px !important;
    line-height: 24px;
    margin: 0;
    @media (max-width: 500px) {
      font-size: 18px !important;
      line-height: 22px;
    }
  }
`;

const AlternativesWrapper = styled.div`
  padding: 20px 0;
  text-align: left;

  & .title {
    min-height: 33.6px;
  }

  & > div {
    margin-bottom: 25px;
  }

  & img {
    border-radius: 100px;
  }

  & h4 {
    color: var(--dark);
    margin-bottom: 25px;
  }
`;

const Button = styled.button`
  padding: 5px 30px;

  & svg {
    vertical-align: sub;
    margin-right: 5px;
  }

  @media (max-width: 500px) {
    padding: 5px 15px;
  }
`;
