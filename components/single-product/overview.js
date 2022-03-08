/** @format */

import styled from "@emotion/styled";
import _ from "lodash";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import { RiShareBoxLine } from "react-icons/ri";

const Overview = ({ data }) => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 100}`;
  };

  return (
    <OverviewWrapper id="overview">
      <OverviewTitle>Overview</OverviewTitle>
      <Row>
        <Col xs={12} md={12} lg={5}>
          <MainContent>
            <h4>Description</h4>
            <p>{data.desc}</p>
            <div className="overview_list">
              <div>
                <BsCheckCircle />
                {data.api === "Yes" ? "API available" : "API not available"}
              </div>
              {data.freeTrial === "Yes" && (
                <div>
                  <BsCheckCircle />
                  <a
                    href={data.productPricingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="price_link"
                  >
                    Free trial available
                    <RiShareBoxLine className="color-primary" />
                  </a>
                </div>
              )}
            </div>
          </MainContent>
        </Col>
        <Col xs={12} md={12} lg={7}>
          <Lists>
            {data.mainFeatures.length > 0 && (
              <ListItem>
                <h4>Main Features</h4>
                <ul className="list">
                  {_.map(data.mainFeatures, (item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </ListItem>
            )}
            <ListItem>
              <h4>Platforms</h4>
              <ul className="list">
                {_.map(data.platforms, (value, index) => {
                  if (value.toLowerCase().includes("web")) {
                    return (
                      <li
                        key={index}
                        className="d-flex gap-2 align-items-center"
                      >
                        <span>
                          <Image
                            loader={logoLoader}
                            src={`/assets/img/icons/web.png`}
                            alt="category image"
                            width={25}
                            height={25}
                            priority
                          />
                        </span>
                        {value}
                      </li>
                    );
                  } else if (value.toLowerCase().includes("android")) {
                    return (
                      <li
                        key={index}
                        className="d-flex gap-2 align-items-center"
                      >
                        <span>
                          <Image
                            loader={logoLoader}
                            src={`/assets/img/icons/android.png`}
                            alt="category image"
                            width={25}
                            height={25}
                            priority
                          />
                        </span>
                        {value}
                      </li>
                    );
                  } else if (value.toLowerCase().includes("ios")) {
                    return (
                      <li
                        key={index}
                        className="d-flex gap-2 align-items-center"
                      >
                        <span>
                          <Image
                            loader={logoLoader}
                            src={`/assets/img/icons/ios.png`}
                            alt="category image"
                            width={25}
                            height={25}
                            priority
                          />
                        </span>
                        {value}
                      </li>
                    );
                  } else if (
                    value.toLowerCase().includes("macos") ||
                    value.toLowerCase().includes("mac")
                  ) {
                    return (
                      <li
                        key={index}
                        className="d-flex gap-2 align-items-center"
                      >
                        <span>
                          <Image
                            loader={logoLoader}
                            src={`/assets/img/icons/macos.png`}
                            alt="category image"
                            width={25}
                            height={25}
                            priority
                          />
                        </span>
                        {value}
                      </li>
                    );
                  } else if (value.toLowerCase().includes("windows")) {
                    return (
                      <li
                        key={index}
                        className="d-flex gap-2 align-items-center"
                      >
                        <span>
                          <Image
                            loader={logoLoader}
                            src={`/assets/img/icons/windows.png`}
                            alt="category image"
                            width={25}
                            height={25}
                            priority
                          />
                        </span>
                        {value}
                      </li>
                    );
                  } else if (value.toLowerCase().includes("linux")) {
                    return (
                      <li
                        key={index}
                        className="d-flex gap-2 align-items-center"
                      >
                        <span>
                          <Image
                            loader={logoLoader}
                            src={`/assets/img/icons/linux.png`}
                            alt="category image"
                            width={25}
                            height={25}
                            priority
                          />
                        </span>
                        {value}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={index}
                        className="d-flex gap-2 align-items-center"
                      >
                        <span>
                          <Image
                            loader={logoLoader}
                            src={`/assets/img/icons/draft.png`}
                            alt="category image"
                            width={25}
                            height={25}
                            priority
                          />
                        </span>
                        {value}
                      </li>
                    );
                  }
                })}
              </ul>
            </ListItem>
            <ListItem>
              <h4>Customer Type</h4>
              <ul className="list">
                {_.map(data.customerTypes, (name, index) => {
                  if (name.toLowerCase().includes("business")) {
                    if (name.toLowerCase().includes("big")) {
                      return (
                        <li
                          key={index}
                          className="d-flex gap-2 align-items-center"
                        >
                          <span>
                            <Image
                              loader={logoLoader}
                              src={`/assets/img/icons/big-business.png`}
                              alt="category image"
                              width={25}
                              height={25}
                              priority
                            />
                          </span>
                          {name}
                        </li>
                      );
                    } else if (name.toLowerCase().includes("medium")) {
                      return (
                        <li
                          key={index}
                          className="d-flex gap-2 align-items-center"
                        >
                          <span>
                            <Image
                              loader={logoLoader}
                              src={`/assets/img/icons/mid-sized.png`}
                              alt="category image"
                              width={25}
                              height={25}
                              priority
                            />
                          </span>
                          {name}
                        </li>
                      );
                    } else if (name.toLowerCase().includes("small")) {
                      return (
                        <li
                          key={index}
                          className="d-flex gap-2 align-items-center"
                        >
                          <span>
                            <Image
                              loader={logoLoader}
                              src={`/assets/img/icons/small-enterprise.png`}
                              alt="category image"
                              width={25}
                              height={25}
                              priority
                            />
                          </span>
                          {name}
                        </li>
                      );
                    }
                  } else if (name.toLowerCase().includes("enterprise")) {
                    if (name.toLowerCase().includes("large")) {
                      return (
                        <li
                          key={index}
                          className="d-flex gap-2 align-items-center"
                        >
                          <span>
                            <Image
                              loader={logoLoader}
                              src={`/assets/img/icons/big-business.png`}
                              alt="category image"
                              width={25}
                              height={25}
                              priority
                            />
                          </span>
                          {name}
                        </li>
                      );
                    } else if (name.toLowerCase().includes("mid")) {
                      return (
                        <li
                          key={index}
                          className="d-flex gap-2 align-items-center"
                        >
                          <span>
                            <Image
                              loader={logoLoader}
                              src={`/assets/img/icons/mid-sized.png`}
                              alt="category image"
                              width={25}
                              height={25}
                              priority
                            />
                          </span>
                          {name}
                        </li>
                      );
                    } else if (name.toLowerCase().includes("small")) {
                      return (
                        <li
                          key={index}
                          className="d-flex gap-2 align-items-center"
                        >
                          <span>
                            <Image
                              loader={logoLoader}
                              src={`/assets/img/icons/small-enterprise.png`}
                              alt="category image"
                              width={25}
                              height={25}
                              priority
                            />
                          </span>
                          {name}
                        </li>
                      );
                    }
                  } else if (name.toLowerCase().includes("mid-sized")) {
                    return (
                      <li
                        key={index}
                        className="d-flex gap-2 align-items-center"
                      >
                        <span>
                          <Image
                            loader={logoLoader}
                            src={`/assets/img/icons/mid-sized.png`}
                            alt="category image"
                            width={25}
                            height={25}
                            priority
                          />
                        </span>
                        {name}
                      </li>
                    );
                  } else if (name.toLowerCase().includes("individual")) {
                    return (
                      <li
                        key={index}
                        className="d-flex gap-2 align-items-center"
                      >
                        <span>
                          <Image
                            loader={logoLoader}
                            src={`/assets/img/icons/individual.png`}
                            alt="category image"
                            width={25}
                            height={25}
                            priority
                          />
                        </span>
                        {name}
                      </li>
                    );
                  } else if (name.toLowerCase().includes("freelancer")) {
                    return (
                      <li
                        key={index}
                        className="d-flex gap-2 align-items-center"
                      >
                        <span>
                          <Image
                            loader={logoLoader}
                            src={`/assets/img/icons/freelancer.png`}
                            alt="category image"
                            width={25}
                            height={25}
                            priority
                          />
                        </span>
                        {name}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={index}
                        className="d-flex gap-2 align-items-center"
                      >
                        <span>
                          <Image
                            loader={logoLoader}
                            src={`/assets/img/icons/draft.png`}
                            alt="category image"
                            width={25}
                            height={25}
                            priority
                          />
                        </span>
                        {name}
                      </li>
                    );
                  }
                })}
              </ul>
            </ListItem>
          </Lists>
        </Col>
      </Row>
    </OverviewWrapper>
  );
};
export default Overview;
const OverviewWrapper = styled.div`
  border-bottom: 1px solid var(--lighter);
  padding-bottom: 20px;
  padding-top: 110px;
  margin-top: -70px;

  @media (max-width: 900px) {
    margin-top: -90px;
  }

  & h4 {
    font-weight: 500 !important;
  }
`;
const OverviewTitle = styled.h3`
  margin-bottom: 25px;
`;
const MainContent = styled.div`
  border-right: 1px solid #aba5a5;
  padding-right: 12px;
  @media (max-width: 991px) {
    border: none;
    padding: 0;
  }

  & .overview_list {
    display: flex;
    justify-content: start;
    gap: 40px;
    flex-wrap: wrap;
    font-size: var(--h4);
    margin-bottom: 24px;
    @media (max-width: 1080px) {
      gap: 15px;
    }
    @media (max-width: 900px) {
      display: grid;
    }

    & svg {
      vertical-align: sub;
      font-size: 23px;
    }
  }

  & svg {
    margin-right: 5px;
  }

  & p {
    padding-bottom: 20px;
  }

  & .price_link {
    color: var(--primary);

    & svg {
      margin-left: 5px;
    }
  }
`;
const Lists = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  @media (max-width: 1080px) {
    gap: 60px;
  }
  @media (max-width: 500px) {
    gap: 30px;
  }
`;
const ListItem = styled.div`
  width: 30%;
  @media (max-width: 1080px) {
    width: auto;
  }
  @media (max-width: 500px) {
    width: 45%;
  }

  & .list {
    padding: 0;

    & li {
      list-style: none;
      line-height: 35px;

      & span {
        line-height: 0;
      }
    }
  }
`;
