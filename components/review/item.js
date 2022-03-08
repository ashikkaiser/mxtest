/** @format */

import styled from "@emotion/styled";
import moment from "moment";
import Image from "next/image";
import { Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Reviews from "./index";

const ReviewItem = ({ item }) => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const [info, setInfo] = useState([]);
  const [reading, setReading] = useState(false);

  useEffect(() => {
    if (info.length < 1) {
      const content = item.desc.slice(0, 155);
      setInfo(content);
    }
  }, [item, info]);

  const date = moment(item.reviewDate).format("DD/MM/YY");
  const readMoreHandler = () => {
    const fullContent = item.desc;
    setInfo(fullContent);
    setReading(true);
  };

  const closeHandler = () => {
    const fullContent = item.desc.slice(0, 155);
    setInfo(fullContent);
    setReading(false);
  };

  return (
    <ReviewsItem className="reviews-item-wrapper">
      <Col xs={12} md={2} lg={2}>
        <ProductImg>
          <Image
            loader={logoLoader}
            src="/assets/img/iu.png"
            alt="category image"
            width={84}
            height={84}
            priority
          />
          <ReviewUser>
            <h6>{item.userName}</h6>
            <p className="font-small">{date}</p>
          </ReviewUser>
        </ProductImg>
      </Col>
      <Col xs={12} md={10} lg={10} className="px-3">
        <ReviewTitle>
          <h4>{item.heading}</h4>
          {item.rating > 0 && (
            <ProductReviews>
              <Icons>
                <Reviews value={item.rating} />
              </Icons>
            </ProductReviews>
          )}
        </ReviewTitle>
        <p className={`review_content`}>
          {info} {!reading ? "..." : ""}
          {item.desc.length > 155 && (
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
        <p className="review_source font-small">
          <p> Source: {item.source}</p>
        </p>
      </Col>
    </ReviewsItem>
  );
};

export default ReviewItem;
const ReviewsItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: var(--white);
  box-shadow: var(--shadow);
  border-radius: 8px;
  padding: 18px;
  margin-bottom: 24px;

  & h4,
  h6,
  p {
    margin: 0;
    word-wrap: anywhere;
    margin-bottom: 5px;
  }

  & .read_more_btn {
    margin-top: 10px;
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
const ReviewTitle = styled.div`
  display: flex;
  gap: 26px;
  align-items: center;
  margin-bottom: 8px;
  @media (max-width: 1080px) {
    display: grid;
    gap: 5px;
  }
`;
const ProductReviews = styled.div``;
const Icons = styled.div`
  display: flex;
  gap: 5px;
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
const ProductImg = styled.div`
  text-align: center;

  & img {
    border-radius: 100%;
  }
`;
const ReviewUser = styled.div``;
