/** @format */

import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import HeaderContext from "../../context/headerContext";

const CategoryLayout = ({ item, closeSearch }) => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const { currentPageDefault } = useContext(HeaderContext);
  return (
    <ProductItem>
      <Row className="align-items-center">
        <Col md={2} lg={2} xs={3} className="p-0">
          <ProductImg
            onClick={() => {
              closeSearch();
              currentPageDefault();
            }}
          >
            <Link href={`/category/${item.slug}`}>
              <a>
                <Image
                  loader={logoLoader}
                  src="/assets/img/category-img.png"
                  alt="category"
                  width={48}
                  height={96}
                  priority
                />
              </a>
            </Link>
          </ProductImg>
        </Col>
        <Col md={10} lg={8} xs={9} className="d-grid align-items-center">
          <div>
            <h5
              onClick={() => {
                closeSearch();
                currentPageDefault();
              }}
            >
              <Link href={`/category/${item.slug}`}>{item.name}</Link>
            </h5>
            {item.productCount > 1 ? (
              <p>{item.productCount} Products</p>
            ) : item.productCount === 1 ? (
              <p>{item.productCount} Product</p>
            ) : (
              <p>0 Product</p>
            )}
          </div>
        </Col>
        <Col
          md={12}
          lg={2}
          xs={12}
          className="d-grid justify-content-end align-items-center"
        >
          <p>Category</p>
        </Col>
      </Row>
    </ProductItem>
  );
};
export default CategoryLayout;
const ProductItem = styled.div`
  padding: 10px 0;
  text-align: left;

  & h5,
  h6,
  p {
    margin: 0;

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
