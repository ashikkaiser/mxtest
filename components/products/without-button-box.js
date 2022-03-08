/** @format */

import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import Reviews from "../review";
import Score from "./score";

const WithoutButtonBox = ({ item }) => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 100}`;
  };
  return (
    <Item>
      <Score score={item.score} />
      <ProductImg>
        <Link href={`/product/${item.slug}`}>
          <a>
            <Image
              loader={logoLoader}
              src={item.logo}
              alt={item.LogoAltText}
              width={64}
              height={64}
              priority
            />
          </a>
        </Link>
      </ProductImg>
      <ProductInfo>
        <h4>
          <Link href={`/product/${item.slug}`}>{item.name}</Link>
        </h4>
        <p>{item.categoryName}</p>
        <p className="font-small">{item.subtitle}</p>
        {item.rating > 0 && (
          <ProductReviews>
            <Icons>
              <Reviews value={item.rating} />
              <p className="font-small">{item.rating}</p>
            </Icons>
          </ProductReviews>
        )}
      </ProductInfo>
    </Item>
  );
};
export default WithoutButtonBox;
const Item = styled.div`
  background: var(--white);
  box-shadow: var(--shadow);
  border-radius: 8px;
  padding: 16px 40px;
  text-align: center;
  height: 100%;
  @media only screen and (max-width: 900px) {
    padding: 16px 20px;
  }

  & img {
    margin-bottom: 5px;
    border-radius: 100px;
  }
`;
const ProductInfo = styled.div`
  & h4,
  a {
    margin: 0;
    color: var(--dark);
  }

  & > p {
    margin-bottom: 15px;
    line-height: 19px;
  }
`;
const ProductImg = styled.div`
  text-align: center;

  & img {
    border-radius: 100px;
  }
`;
const ProductReviews = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;

  & a {
    text-decoration: underline !important;
  }
`;
const Icons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  & p {
    margin-bottom: 0;
  }
`;
const Icon = styled.div`
  display: flex;
  gap: 3px;
  justify-content: center;
  align-items: center;

  .full-bg {
    width: 16px;
    height: 16px;
    background-color: var(--warning);

    & svg {
      display: block;
      padding: 2px;
      color: var(--white);
    }
  }
`;
