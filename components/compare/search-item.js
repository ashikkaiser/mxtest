/** @format */

import { Col, Row } from "react-bootstrap";
import styled from "@emotion/styled";
import Reviews from "../review";
import Image from "next/image";
import { useContext } from "react";
import HeaderContext from "../../context/headerContext";
import { useRouter } from "next/router";

const SearchItem = ({ item, closeSearch }) => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const router = useRouter();
  const { allIds, setAllIds } = useContext(HeaderContext);

  const selectIdHandler = async (id, name) => {
    const slug = router.query.slug.split("-vs-");
    const getName = name
      .toLowerCase()
      .replace(/[ |.|/]/g, "-")
      .replace(/[(|)]/g, "");
    if (!slug.includes(getName)) {
      setAllIds([...allIds, id]);
      router.push(
        {
          pathname: `/compare/${router.query.slug}-vs-${name
            .toLowerCase()
            .replace(/[ |.|/]/g, "-")
            .replace(/[(|)]/g, "")}`,
        },
        undefined,
        { shallow: true }
      );
      closeSearch();
    }
  };

  return (
    <ProductItem onClick={() => selectIdHandler(item._id, item.name)}>
      <Row className="align-items-center">
        <Col md={2} lg={2} xs={3} className="p-0">
          <ProductImg>
            <Image
              loader={logoLoader}
              src={item.logo}
              alt={item.logoAltText}
              width={48}
              height={96}
              priority
            />
          </ProductImg>
        </Col>
        <Col md={10} lg={10} xs={9}>
          <h5>{item.name}</h5>
          <p>{item.categoryName}</p>
          {item.rating > 0 && (
            <ProductReviews>
              <Icons>
                <Reviews value={item.rating} />
              </Icons>
              {item.numberOfReviews > 0 && (
                <div>
                  <a>
                    ({item.numberOfReviews}{" "}
                    {item.numberOfReviews > 1 ? "ratings" : "rating"})
                  </a>
                </div>
              )}
            </ProductReviews>
          )}
        </Col>
      </Row>
    </ProductItem>
  );
};
export default SearchItem;
const ProductItem = styled.div`
  padding: 10px 0;
  text-align: left;
  cursor: pointer;

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
