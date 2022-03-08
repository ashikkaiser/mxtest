/** @format */

import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import HeaderContext from "../../context/headerContext";
import Reviews from "../review";
import Score from "./score";

const BoxItem = ({ item, compareList, isPricingModelShow }) => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 100}`;
  };
  const { openComparePopup, compareIds, allIds, setCompareIds } =
    useContext(HeaderContext);
  const router = useRouter();

  const selectIdHandler = async (id, name) => {
    if (!allIds.includes(id)) {
      setCompareIds([...compareIds, id]);
      router.push(
        {
          pathname: `/compare/${router.query.slug}-vs-${name}`,
        },
        undefined,
        { shallow: true }
      );
      await window.scrollTo(0, 0);
    }
  };
  return (
    item.url !== "" && (
      <Item>
        <Score score={item.score} />
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
            </a>
          </Link>
        </ProductImg>
        <ProductInfo>
          <h4>
            <Link href={`/product/${item.slug}`}>{item.name}</Link>
          </h4>
          <Link href={ `/category/${item?.categoryName?.toLowerCase()?.replace(/[ |.|/]/g, "-")?.replace(/[(|)]/g, "")}/`} >
            <CatgeoryName>{item.categoryName}</CatgeoryName>
          </Link>
          <p className="font-small">{item.subtitle.slice(0, 40)}</p>
        </ProductInfo>
        <div>
          {item.rating > 0 && (
            <ProductReviews>
              <Icons>
                <Reviews value={item.rating} />
              </Icons>
              {item.numberOfReviews > 0 && (
                <Link href={`/product/${item.slug}/reviews`}>
                  <a>
                    ({item.numberOfReviews}{" "}
                    {item.numberOfReviews > 1 || item.ratingCount > 1
                      ? "ratings"
                      : "rating"}
                    )
                  </a>
                </Link>
              )}
            </ProductReviews>
          )}

          {/* <span className="mb-5">
          Freemium, XYZ model <br/>
          Free trial Available
            </span>
            <br/> */}
          <ProductVisit>
            <a
              href={`${item.url}?utm_source=spotsaas.com&utm_medium=cpc`}
              target="_blank"
              className="sps-btn sps-btn-success"
              rel="noreferrer"
            >
              Visit Website
            </a>
          </ProductVisit>
          <ProductVisit>
            {compareList ? (
              <button
                className="sps-btn sps-btn-small sps-btn-outline"
                onClick={() => selectIdHandler(item.slug, item.slug)}
              >
                <AiOutlinePlusCircle /> Add to Compare
              </button>
            ) : (
              <button
                className="sps-btn sps-btn-small sps-btn-outline"
                onClick={() => openComparePopup(item.slug)}
              >
                <AiOutlinePlusCircle /> Compare
              </button>
            )}
          </ProductVisit>
        </div>
      </Item>
    )
  );
};
export default BoxItem;
const Item = styled.div`
  background: var(--white);
  box-shadow: var(--shadow);
  border-radius: 8px;
  padding: 16px 20px;
  text-align: center;
  height: 100%;
  display: grid;
  align-content: space-between;
  word-wrap: anywhere;
  @media only screen and (max-width: 900px) {
    padding: 16px 10px;
    display: block;
    word-wrap: anywhere;

    & .sps-btn {
      font-size: 14px;
    }
  }

  & h4 {
    margin: 0;

    & a {
      color: var(--dark);
    }
  }

  & img {
    margin-bottom: 5px;
    border-radius: 100px;
  }
`;
const ProductInfo = styled.div`
  & h4 {
    margin: 0;
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
const CatgeoryName = styled.a`
  color: initial;
  cursor: pointer;
  text-decoration: underline !important;

  &:hover {
    color: var(--primary);
  }
`;
const ProductReviews = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;

  & a {
    color: var(--light-primary);
    font-weight: 400;
  }
`;
const Icons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;

  & p {
    margin-bottom: 0;
  }
`;
const Icon = styled.div`
  display: flex;
  gap: 3px;
  justify-content: center;
  align-items: center;
  position: relative;

  & .review-star {
    width: 16px;
    height: 16px;

    @media (max-width: 500px) {
      width: 14px;
      height: 14px;
    }
  }
`;
const ProductVisit = styled.div``;
