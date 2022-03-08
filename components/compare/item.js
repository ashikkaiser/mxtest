/** @format */

import Image from "next/image";
import Reviews from "../review";
import Link from "next/link";
import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import HeaderContext from "../../context/headerContext";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import { Button, OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useRouter } from "next/router";

const CompareItem = ({ item }) => {
  const [loading, setLoading] = useState(true);
  return (
    <CompareOverview limit={allIds.length}>
      {allIds.length > 0 &&
        _.map(allIds, (item, index) => {
          return (
            <ProductInfo
              key={index * 3242342}
              length={allIds.length}
              item={item}
            />
          );
        })}
    </CompareOverview>
  );
};

export const ProductInfo = (props) => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const { item, length } = props;
  const [getData, setGetData] = useState(null);
  const router = useRouter();
  const { activeId, allIds, setAllIds, setActiveId, setSiteLoading, country } =
    useContext(HeaderContext);

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
  }, [item]);

  const CloseItemHandler = async (id, name) => {
    const filtered = allIds.filter((item) => item !== id);

    setAllIds(filtered);
    if (id === activeId) {
      const getName = name.toLowerCase().replace(/ /g, "-");
      const slugArray = router.query.slug.split("-vs-");
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
      setSiteLoading(true);
      setTimeout(() => {
        setSiteLoading(false);
      }, 2500);
    } else {
      const getName = name.toLowerCase().replace(/ /g, "-");
      const slugArray = router.query.slug.split("-vs-");
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
      setTimeout(() => {
        setSiteLoading(false);
      }, 1500);
    }
  };

  return getData !== null ? (
    <ProductItem>
      <ProductImg>
        <Image
          loader={logoLoader}
          src={getData.logo}
          alt={getData.logoAltText}
          width={25}
          height={25}
          priority
        />
        <h4>{getData.name}</h4>
      </ProductImg>
      <ProductReviews>
        <Icons>
          <Reviews value={getData.rating} />
        </Icons>
        <div className="review_reading">
          {getData.ratingCount > 0 && (
            <Link href={`/product/${getData.name}/reviews`}>
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
        <CloseItem onClick={() => CloseItemHandler(getData._id, getData.name)}>
          <RiCloseLine />
        </CloseItem>
      )}
    </ProductItem>
  ) : (
    <img
      src="/assets/img/loading/product-info.gif"
      alt="loading image"
      width="100%"
    />
  );
};

export default CompareItem;
const CompareOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.limit}, 1fr);
  gap: 20px;
`;

const ProductItem = styled.div`
  padding: 20px 0;
  text-align: left;
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
