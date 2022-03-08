/** @format */

import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

const Advertise = () => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <SectionWrapper>
      <Container>
        <Row>
          <Col md={12} lg={6} className="mb-4 mb-lg-0">
            <Box>
              <Col md={6} lg={6}>
                <div className="imageContainer">
                  <Image
                    className="image"
                    loader={logoLoader}
                    src="/assets/img/listed.png"
                    alt="listed-image"
                    layout="fill"
                  />
                </div>
              </Col>
              <Col md={6} lg={6}>
                <p className="content_box">
                  Look through a curated set of reviews Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Proin dolor ligula Lorem
                  ipsum
                </p>
                <Link href="/">
                  <a className="sps-btn sps-btn-full sps-btn-primary">
                    Get listed
                  </a>
                </Link>
              </Col>
            </Box>
          </Col>
          <Col md={12} lg={6}>
            <Box>
              <Col md={6} lg={6}>
                <div className="imageContainer">
                  <Image
                    className="image"
                    loader={logoLoader}
                    src="/assets/img/advertise.png"
                    alt="listed-image"
                    layout="fill"
                  />
                </div>
              </Col>
              <Col md={6} lg={6}>
                <p className="content_box">
                  Look through a curated set of reviews Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Proin dolor ligula Lorem
                  ipsum
                </p>
                <Link href="/">
                  <a className="sps-btn sps-btn-full sps-btn-primary">
                    Advertise with us
                  </a>
                </Link>
              </Col>
            </Box>
          </Col>
        </Row>
      </Container>
    </SectionWrapper>
  );
};

export default Advertise;
const SectionWrapper = styled.div`
  background: var(--lightest);
  padding: 80px 0;

  @media (max-width: 900px) {
    padding: 40px 0;
  }
`;
const Box = styled.div`
  background: var(--white);
  padding: 34px 22px;
  border-radius: 8px;
  box-shadow: var(--shadow);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;

  & > div {
    padding-right: calc(var(--bs-gutter-x) * 0.5);
    padding-left: calc(var(--bs-gutter-x) * 0.5);
    margin-top: var(--bs-gutter-y);
  }

  & .content_box {
    margin-bottom: 32px;
  }

  & .sps-btn {
    margin-bottom: 0;
  }
`;
