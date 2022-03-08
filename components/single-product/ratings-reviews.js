/** @format */

import styled from "@emotion/styled";
import { Col, Container, Row } from "react-bootstrap";
import ReviewItem from "../review/item";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import Reviews from "../review";
import { ImStarEmpty, ImStarFull } from "react-icons/im";

const RatingsReviews = ({ data }) => {
  const reviewsInfo = data.reviewsInfo;
  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });
  const reviews = reviewsInfo.reviews.slice(0, 6);
  const ratingsInfo = data.ratingsInfo;

  return (
    <RatingsReviewsWrapper id="ratings">
      <ReviewHeading>
        <div>
          <h3>Ratings and Reviews</h3>
        </div>
        <div>
          <i>
            Based on {data.ratingCount} ratings &{" "}
            {data.reviewsInfo.numberOfReviews} reviews
          </i>
        </div>
      </ReviewHeading>
      <ReviewStars>
        <Row>
          <Col xs={12} md={12} lg={6} className="mb-3">
            <GetStars>
              <Reviews value={data.rating} />
            </GetStars>
            <StarValues>{`${data.rating} / 5`}</StarValues>
          </Col>
          <Col xs={12} md={12} lg={6} className="mb-3">
            <Row>
              <Col xs={12} md={6} lg={6}>
                <div className="d-flex gap-3 mb-4 stars-count">
                  <div className="d-flex gap-1">
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarFull />
                  </div>
                  <div>
                    <h4 className="stars-title">
                      {ratingsInfo.fiveStarRatings}
                    </h4>
                  </div>
                </div>
                <div className="d-flex gap-3 mb-4 stars-count">
                  <div className="d-flex gap-1">
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarEmpty />
                  </div>
                  <div>
                    <h4 className="stars-title">
                      {ratingsInfo.fourStarRatings}
                    </h4>
                  </div>
                </div>
                <div className="d-flex gap-3 mb-4 stars-count">
                  <div className="d-flex gap-1">
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarEmpty />
                    <ImStarEmpty />
                  </div>
                  <div>
                    <h4 className="stars-title">
                      {ratingsInfo.threeStarRatings}
                    </h4>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <div className="d-flex gap-3 mb-4 stars-count">
                  <div className="d-flex gap-1">
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarEmpty />
                    <ImStarEmpty />
                    <ImStarEmpty />
                  </div>
                  <div>
                    <h4 className="stars-title">
                      {ratingsInfo.twoStarRatings}
                    </h4>
                  </div>
                </div>
                <div className="d-flex gap-3 mb-4 stars-count">
                  <div className="d-flex gap-1">
                    <ImStarFull />
                    <ImStarEmpty />
                    <ImStarEmpty />
                    <ImStarEmpty />
                    <ImStarEmpty />
                  </div>
                  <div>
                    <h4 className="stars-title">
                      {ratingsInfo.oneStarRatings}
                    </h4>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </ReviewStars>
      <Container className="p-0">
        <Row>
          {reviews.map((item) => (
            <Col key={item._id} xs={12} md={12} lg={6} className="mb-4">
              <ReviewItem item={item} />
            </Col>
          ))}
        </Row>
      </Container>
		{reviews.length > 0 && (
      <Button>
        <Link
          href={`/product/${data.name
            .toLowerCase()
            .replace(/[ |.|/]/g, "-")
            .replace(/[(|)]/g, "")}/reviews/`}
        >
          <a className="sps-btn sps-btn-primary">View All Reviews</a>
        </Link>
      </Button>
		)}
    </RatingsReviewsWrapper>
  );
};
export default RatingsReviews;
const RatingsReviewsWrapper = styled.div`
  border-bottom: 1px solid var(--lighter);
  padding-bottom: 30px;
  padding-top: 190px;
  margin-top: -140px;
  
  @media (max-width:900px){
	margin-top: -170px;
  	padding-bottom: 20px;
  }

  & .reviews-item-wrapper {
    height: 100%;
  }
`;
const ReviewHeading = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const ReviewStars = styled.div`
  margin-bottom: 60px;

  & svg {
    font-size: 34px;
    color: var(--warning);
    @media (max-width: 1080px) {
      font-size: 26px;
    }
    @media (max-width: 500px) {
      font-size: 24px;
    }
  }

  & .stars-title {
    font-weight: 400 !important;
    font-size: 38px !important;
    line-height: 34px;
    @media (max-width: 1080px) {
      font-size: 32px !important;
      line-height: 27px;
      margin: 0;
    }
    @media (max-width: 500px) {
      font-size: 28px !important;
      line-height: 22px;
    }
  }
`;
const ResponsiveReviewStars = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-bottom: 25px;
`;
const GetStars = styled.div`
  & .review-wrapper {
    gap: 12px;
  }

  & svg {
    font-size: 80px;

    @media (max-width: 1080px) {
      font-size: 70px;
    }
    @media (max-width: 500px) {
      font-size: 35px;
    }
  }
`;
const StarValues = styled.h1`
  font-size: 52px;
  margin-top: 25px;
`;
const Button = styled.div`
  display: grid;
  justify-content: center;
`;
