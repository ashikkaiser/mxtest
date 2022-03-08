/** @format */

import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import Reviews from "../review";

const ProductLayout = ({ item, closeSearch }) => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <ProductItem>
      <Row className="align-items-center">
        <Col md={2} lg={2} xs={3} className="p-0">
          <ProductImg onClick={closeSearch}>
            <Link href={`/product/${item.slug}`}>
              <a>
                <Image
                  loader={logoLoader}
                  src={item.logo}
                  alt={item.logoAltText}
                  width={48}
                  height={96}
                  priority
                />
              </a>
            </Link>
          </ProductImg>
        </Col>
        <Col md={10} lg={8} xs={9}>
          <h5 onClick={closeSearch}>
            <Link href={`/product/${item.slug}`}>{item.name}</Link>
          </h5>
          <p>{item.categoryName}</p>
          {item.rating > 0 && (
            <ProductReviews>
              <Icons>
                <Reviews value={item.rating} />
              </Icons>
              {/* <div>
                <p className="font-small">{item.rating}</p>
              </div> */}
              {item.numberOfReviews > 0 && (
                <div>
                  <Link
                    href={`/product/${item.name
                      .toLowerCase()
                      .replace(/[ |.|/]/g, "-")
                      .replace(/[(|)]/g, "")}/reviews`}
                  >
                    <a>
                      ({item.numberOfReviews}{" "}
                      {item.numberOfReviews > 1 ? "ratings" : "rating"})
                    </a>
                  </Link>
                </div>
              )}
            </ProductReviews>
          )}
        </Col>
        <Col
          md={12}
          lg={2}
          xs={12}
          className="d-grid justify-content-end align-items-center"
        >
          <p>Product</p>
        </Col>
      </Row>
    </ProductItem>
  );
};
export default ProductLayout;
const ProductItem = styled.div`
  padding: 10px 0;
  text-align: left;

  & h5,
  h6,
  p {
    margin: 0;

    @media (max-width: 500px) {
      font-size: 12px !important;
    }

    & a {
      color: var(--dark);
    }
  }

  & h5 {
    font-size: var(--p) !important;
  }

  & p {
    font-size: var(--sm-p) !important;
  }
`;
const ProductImg = styled.div`
  text-align: center;

  & img {
    border-radius: 100px;
    width: 50%;
    height: 100%;
  }
`;
const ProductReviews = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  & > div {
    display: flex;
    gap: 10px;
  }

  & a {
    color: var(--light-primary);
    font-size: var(--sm-p);
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
  gap: 10px;
  align-items: center;

  & p {
    font-weight: 500 !important;

    @media (max-width: 500px) {
      font-size: 12px !important;
    }
  }

  @media (max-width: 500px) {
    gap: 7px;
  }
`;
