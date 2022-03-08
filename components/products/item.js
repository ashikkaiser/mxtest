/** @format */

import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
import HeaderContext from "../../context/headerContext";
import Score from "./score";

const ProductsItem = ({ item }) => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const { openComparePopup } = useContext(HeaderContext);
  const [info, setInfo] = useState([]);
  const [reading, setReading] = useState(false);

  const readMoreHandler = () => {
    const fullContent = item?.desc ? item?.desc : '';
    setInfo(fullContent);
    setReading(true);
  };

  const truncate = (str, max, suffix) => str?.length < max ? str : `${str?.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;

  const closeHandler = () => {
    // const fullContent = item?.desc?.slice(0, 120);
    const fullContent = truncate((item?.desc ? item?.desc : ''), 118, '');
    setInfo(fullContent);
    setReading(false);
  };
  useEffect(() => {
    if (info?.length < 1) {
      const content = truncate((item?.desc ? item?.desc : ''), 118, '');
      setInfo(content);
    }
  }, [item, info]);
  return (
    item.url !== "" && (
      <ProductItem>
        <Col xs={3} md={2} lg={1}>
          <ProductImg>
            <Link href={`/product/${item.slug}`}>
              <a>
                <Image
                  loader={logoLoader}
                  src={item.logo}
                  alt={item.logoAltText}
                  width={64}
                  height={64}
                  priority
                />
                <Score score={item.score} />
              </a>
            </Link>
          </ProductImg>
        </Col>
        <Col xs={9} md={7} lg={8} className="px-3">
          <h4>
            <Link href={`/product/${item.slug}`}>{item.name}</Link>
          </h4>
          <p>{item.subtitle.slice(0, 120)}</p>
          {item.rating > 0 && (
            <ProductReviews>
              <Icons>
                {(() => {
                  const number = Math.floor(item.rating);
                  const lastValue = (item.rating % 1).toFixed(2).substring(2);
                  if (number === 1) {
                    return (
                      <>
                        <ImStarFull />
                        {lastValue !== "00" ? <ImStarHalf /> : <ImStarEmpty />}
                        <ImStarEmpty />
                        <ImStarEmpty />
                        <ImStarEmpty />
                      </>
                    );
                  } else if (number === 2) {
                    return (
                      <>
                        <ImStarFull />
                        <ImStarFull />
                        {lastValue !== "00" ? <ImStarHalf /> : <ImStarEmpty />}
                        <ImStarEmpty />
                        <ImStarEmpty />
                      </>
                    );
                  } else if (number === 3) {
                    return (
                      <>
                        <ImStarFull />
                        <ImStarFull />
                        <ImStarFull />
                        {lastValue !== "00" ? <ImStarHalf /> : <ImStarEmpty />}
                        <ImStarEmpty />
                      </>
                    );
                  } else if (number === 4) {
                    return (
                      <>
                        <ImStarFull />
                        <ImStarFull />
                        <ImStarFull />
                        <ImStarFull />
                        {lastValue !== "00" ? <ImStarHalf /> : <ImStarEmpty />}
                      </>
                    );
                  } else if (number === 5) {
                    return (
                      <>
                        <ImStarFull />
                        <ImStarFull />
                        <ImStarFull />
                        <ImStarFull />
                        <ImStarFull />
                      </>
                    );
                  }
                })()}
                {/*<Reviews value={item.rating} />*/}
              </Icons>
              {item.numberOfReviews > 0 && (
                <Link href={`/product/${item.slug}/reviews`}>
                  <a>
                    ({item.numberOfReviews}{" "}
                    {item.numberOfReviews > 1 ? "ratings" : "rating"})
                  </a>
                </Link>
              )}
            </ProductReviews>
          )}
          {/*
							<MainFeatures>
								{item.mainFeatures &&
									item.mainFeatures.map((list, index) => {
										return <li key={index}>{list}</li>;
									})}
							</MainFeatures>
					 */}
          <p className={`review_content`}>
            {item?.desc ? truncate((item?.desc ? item?.desc : ''), 118, '') : null} {info && !reading ? "..." : ""}{item?.desc?.length > 120 && (<Link href={`/product/${item.slug}`}><a
              className="sps-read-more-btn read_more_btn" style={{ "marginLeft": "0px" }}
            >Read more about {item?.name}</a></Link>
            )}
          </p>
          <div className="mt-2">
            <h6>
              {item.pricing && (
                <>
                  <Link href={`/product/${item.slug}#pricing`}>
                    <a className="color-primary underline">
                      {item.name} pricing:
                    </a>
                  </Link>
                  {" " + item.pricing.toString().replace(/,/g, ", ")}
                </>
              )}
            </h6>
          </div>
        </Col>
        <Col xs={12} md={3} lg={3}>
          <ProductVisit>
            <a
              href={`${item.url}?utm_source=spotsaas.com&utm_medium=cpc`}
              target="_blank"
              className="sps-btn sps-btn-success"
              rel="noreferrer"
            >
              Visit Website
            </a>
            <button
              className="sps-btn sps-btn-small sps-btn-outline"
              onClick={() => openComparePopup(item.slug)}
            >


              <AiOutlinePlusCircle /> Compare
            </button>
            {item.isSponsored && <p style={{ color: '#B0B4C3', fontStyle: 'italic', fontWeight: 'normal', fontSize: '14px', lineHeight: '17px', textAlign: 'right' }}>*Sponsored</p>}
          </ProductVisit>
        </Col>
      </ProductItem>
    )
  );
};

export default ProductsItem;
const ProductItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  word-break: break-word;
  background: var(--white);
  box-shadow: var(--shadow);
  border-radius: 8px;
  padding: 18px;
  margin-bottom: 24px;

  & h4,
  h6,
  p {
    margin: 0;

    & a {
      color: var(--dark);
    }

    & a.color-primary {
      color: var(--primary) !important;
      text-decoration: underline !important;
    }
  }
  & .read_more_btn {
    margin-top: 10px;
    cursor: pointer;
  }

  & .sps-read-more-btn {
    margin-left: 10px;
    color: var(--primary);
    font-weight: 500;
  }
`;
const ProductReviews = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 5px;

  & a {
    color: var(--light-primary);
    font-weight: 400;
    white-space: nowrap;
    @media (max-width: 500px) {
      font-size: 12px !important;
    }
  }

  @media (max-width: 500px) {
    gap: 7px;
  }
`;
const Icons = styled.div`
  display: flex;
  gap: 5px;
  color: var(--warning);
  align-items: center;

  & p {
    font-weight: 500 !important;

    &:last-child::after {
      content: "|";
      margin-left: 10px;
      font-weight: 500;
      @media (max-width: 500px) {
        margin-left: 7px;
      }
    }

    @media (max-width: 500px) {
      font-size: 12px !important;
    }
  }

  @media (max-width: 500px) {
    gap: 7px;
  }
`;
const Icon = styled.div`
  display: flex;
  gap: 3px;
  justify-content: center;
  align-items: center;

  & .review-star {
    width: 16px;
    height: 16px;

    @media (max-width: 500px) {
      width: 14px;
      height: 14px;
    }
  }
`;
const ProductImg = styled.div`
  text-align: center;
  margin-top: 20px;

  & img {
    border-radius: 100px;
  }
`;

const ProductVisit = styled.div`
  display: grid;
  justify-content: end;
  text-align: center;

  @media (max-width: 500px) {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const MainFeatures = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  align-items: center;

  & li {
    list-style: none;
    font-weight: 500;

    &::after {
      content: "|";
      margin: 0 10px;
    }

    &:last-of-type {
      &::after {
        display: none;
      }
    }
  }
`;
