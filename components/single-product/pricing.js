/** @format */

import styled from "@emotion/styled";
import Image from "next/image";
import { useRef } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import ReactIdSwiper from "react-id-swiper";
import { useMediaQuery } from "react-responsive";
import _ from "lodash";
import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";
import { RiShareBoxLine } from "react-icons/ri";
// import FreePricing from "../pricing/free";
// import ProPricing from "../pricing/pro";
// import ProTeamsPricing from "../pricing/pro-teams";

const Pricing = ({
  data,
  btnUrl,
  slug,
  getData,
  overviewData,
  isShowViewAllBtn,
  isShowLine,
}) => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 100}`;
  };
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const swiperRef = useRef(null);
  const params = {
    slidesPerView: 1,
    spaceBetween: 37,
    pagination: {
      el: `.swiper-pagination`,
      clickable: true,
      renderBullet: (index, className) => {
        return (
          '<span class="' +
          className +
          '"><Image loader="' +
          logoLoader +
          '" src="' +
          data.priceImageInfo[index].url +
          '" alt="' +
          data.priceImageInfo[index].altText +
          '" width="40" height="30" /></span>'
        );
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <PricingWrapper id="pricing">
      {isShowLine && <Line></Line>}
      <h3>Pricing details for {getData?.name}</h3>
      <div className="row mb-4">
        <PricingModel className="mt-1 col-sm-6">
          {getData?.pricing && (
            <>
              <b><u>Pricing Models:</u></b>{" "}
              {" " + getData?.pricing.toString().replace(/,/g, ", ")}
            </>
          )}
        </PricingModel>
        <div className="mt-2 col-sm-8">
          {overviewData?.freeTrial === "Yes" && (
            <FreeTrialWrapper>
              <BsCheckCircle />
              <a
                href={overviewData?.productPricingUrl}
                target="_blank"
                rel="noreferrer"
                className="price_link"
              >
                Free trial available
                <RiShareBoxLine className="color-primary" />
              </a>
            </FreeTrialWrapper>
          )}
        </div>
      </div>
      <h5 className="mb-4">Screenshot of the {getData?.name} Pricing Page</h5>
      {/* <h4>Price Models: { getData?.pricing?.map((item) => {return <h4>item<h4/>}) </h4> */}

      <ContainerWrapper>
        <ReactIdSwiper
          ref={swiperRef}
          {...params}
          className="box_product_swiper"
        >
          {_.map(data.priceImageInfo, (item, index) => (
            <div key={index}>
              <a
                className="imageContainer"
                href={`${btnUrl}?utm_source=spotsaas.com&utm_medium=cpc`}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  loader={logoLoader}
                  src={item.url}
                  alt={item.altText}
                  layout="fill"
                  priority
                  className="image"
                />
              </a>
            </div>
          ))}
        </ReactIdSwiper>
        {!isMobile && (
          <>
            <a
              className="swiper-sps-btn-round-prev media_slider_prev"
              onClick={goPrev}
            >
              <RiArrowLeftSLine />
            </a>
            <a
              className="swiper-sps-btn-round-next media_slider_next"
              onClick={goNext}
            >
              <RiArrowRightSLine />
            </a>
          </>
        )}
        {/*<FreePricing/>*/}
        {/*<ProPricing/>*/}
        {/*<ProTeamsPricing/>*/}
      </ContainerWrapper>
      <Disclaimer>
        <p>
          Disclaimer: The pricing details were last updated from the vendor
          website and may be different from actual. Please confirm with the
          vendor website before purchasing.
        </p>
        <Button>
          <a
            href={`${btnUrl}?utm_source=spotsaas.com&utm_medium=cpc`}
            target="_blank"
            className="sps-btn sps-btn-primary"
            rel="noreferrer"
          >
            See Website
          </a>
        </Button>
        {data.priceImageInfo.length > 0 && isShowViewAllBtn && (
          <Button>
            <Link href={`/product/${slug}/pricing`}>
              <a className="sps-btn sps-btn-primary">View All Pricing for {getData?.name}
              </a>
            </Link>
          </Button>
        )}
      </Disclaimer>
    </PricingWrapper>
  );
};
export default Pricing;
const PricingWrapper = styled.div`
  border-bottom: 1px solid var(--lighter);
  padding-top: 190px;
  padding-bottom: 20px;
  margin-top: -140px;

  @media (max-width: 900px) {
    margin-top: -170px;
  }
`;
const Line = styled.div`
  width: 100%;
  height: 0px;
  left: 164px;
  top: 732px;
  border-bottom: 2px solid #b0b4c3;
  margin-bottom: 37px;
`;
const FreeTrialWrapper = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  font-size: var(--h4);
  margin-bottom: 24px;

  & svg {
    vertical-align: sub;
    font-size: 23px;
  }
  & svg {
    margin-right: 5px;
  }
`;
const PricingModel = styled.div`
  font-size: var(--h4);
`;
const ContainerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  & .media_slider_prev,
  .media_slider_next {
    opacity: 0;
    visibility: hidden;
    transform: scale(0);
    transition: all ease-in-out 300ms;
  }

  &:hover {
    & .media_slider_prev,
    .media_slider_next {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }

  & .swiper-container {
    width: 85%;
    margin: 0 auto;
    padding-bottom: 100px !important;
    @media (max-width: 500px) {
      width: 100%;
    }

    & img {
      width: 100%;
    }

    & .swiper-pagination-bullets {
      & span {
        height: 100%;
        margin: 5px;
      }

      @media (max-width: 500px) {
        display: flex !important;
        justify-content: center;
        width: 100%;
      }
    }

    & .swiper-pagination-bullet {
      width: 60px;
      border-radius: 0;
      border: 1px solid var(--primary);
      background: transparent;
      transition: all ease-in-out 300ms;

      &.swiper-pagination-bullet-active {
        transform: scale(1.2);
      }

      @media (max-width: 500px) {
        width: 50px;
      }
    }
  }

  & .media_slider_next {
    position: absolute;
    right: 0;
    z-index: 99;
  }

  & .media_slider_prev {
    position: absolute;
    left: 0;
    z-index: 99;
  }

  /* display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  gap: 38px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  } */
`;
const Disclaimer = styled.div`
  margin: 30px 0;
  @media (max-width: 900px) {
    margin: 10px 0;
  }
`;
const Button = styled.div`
  display: grid;
  justify-content: center;
`;
