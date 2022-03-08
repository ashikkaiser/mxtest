/** @format */

import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { Col } from "react-bootstrap";
import { GrFormClose } from "react-icons/gr";
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";

const Item = ({ item, close, active }) => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <ProductItem>
      <Col xs={3} md={2} lg={1}>
        <ProductImg>
          <Link href={`/product/${item.slug}/`}>
            <a>
              <Image
                loader={logoLoader}
                src={item.logo}
                alt={item.logoAltText}
                width={64}
                height={64}
                priority
              />
            </a>
          </Link>
        </ProductImg>
      </Col>
      <Col xs={9} md={10} lg={8} className="px-3">
        <h4>
          <Link href={`/product/${item.slug}/`}>{item.name}</Link>
        </h4>
        <p>{item.subtitle}</p>
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
            {/*<Reviews value={4.6} />*/}
          </Icons>
          {(item.numberOfReviews > 0 || item.ratingCount > 0) && (
            <Link href={`/product/${item.slug}/reviews`}>
              <a>
                (
                {item.numberOfReviews === undefined
                  ? item.ratingCount
                  : item.numberOfReviews}{" "}
                {item.numberOfReviews > 1 || item.ratingCount > 1
                  ? "ratings"
                  : "rating"}
                )
              </a>
            </Link>
          )}
        </ProductReviews>
      </Col>
      {!active && (
        <div
          onClick={() => close(item.slug, item.name)}
          className={`close_item_btn`}
        >
          <GrFormClose />
        </div>
      )}
    </ProductItem>
  );
};

export default Item;
const ProductItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 8px;
  padding: 10px;
  position: relative;

  & .close_item_btn {
    position: absolute;
    top: 0;
    right: -8px;
    padding: 10px;
    cursor: pointer;

    & svg {
      font-size: 28px;
    }

    &:hover svg {
      color: var(--error) !important;
    }
  }

  @media (max-width: 500px) {
    & h4 {
      font-size: 18px !important;
    }
  }

  & p {
    font-size: 14px !important;
  }

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
const ProductImg = styled.div`
  text-align: center;

  & img {
    border-radius: 100px;
  }
`;
