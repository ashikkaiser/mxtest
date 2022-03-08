/** @format */

import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Overlay, Row, Tooltip } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const CallToAction = () => {
  const [show, setShow] = useState(false);
  const emailRef = useRef(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const callToActionHandler = async (e) => {
    e.preventDefault();
    const value = emailRef.current[0].value;
    if (value === "") {
      setShow(true);
      setMessage("Invalid Email");
    } else if (value !== "") {
      const res = await fetch("https://api.spotsaas.com/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: `${value}`,
        }),
      });
      if (res.status === 200) {
        setSuccess(true);
        setShow(false);
        setMessage("");
        emailRef.current.reset();
      }
      if (res.status === 400) {
        setShow(true);
        setMessage("Invalid Email");
      }
      if (res.status === 422) {
        setShow(true);
        setMessage("User already exist!");
      }
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSuccess(false);
    }, 15000);
    return () => clearTimeout(timeOut);
  }, [success]);

  return (
    <MainWrapper>
      <Container>
        <Row className="align-items-center text-center">
          {!isMobile && (
            <Col xs={12} md={6} lg={2}>
              <div className="imageContainer">
                <Image
                  className="image"
                  loader={logoLoader}
                  src="/assets/img/call-to-action.png"
                  alt="call to action"
                  layout="fill"
                  priority
                />
              </div>
            </Col>
          )}
          <Col xs={12} md={6} lg={10}>
            <Row>
              <Col xs={12} md={12} lg={6}>
                <h3>Keep in touch with latest SAAS products!</h3>
              </Col>
              <Col xs={12} md={12} lg={6}>
                <NewsLatter>
                  <form
                    method="POST"
                    ref={emailRef}
                    onSubmit={callToActionHandler}
                  >
                    <Overlay
                      target={emailRef.current}
                      show={show}
                      placement="top"
                    >
                      <Tooltip id="error_overlay">{message}</Tooltip>
                    </Overlay>
                    <input type="email" placeholder="Email ID" />
                    <button type="submit" className="sps-btn-subscribe-outline">
                      Subscribe
                    </button>
                  </form>
                  {success && (
                    <span className="success">
                      Thanks for your subscription
                    </span>
                  )}
                </NewsLatter>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </MainWrapper>
  );
};

export default CallToAction;
const MainWrapper = styled.div`
  padding: 30px 0;
  background: var(--white);

  & h3 {
    margin-bottom: 20px;
  }

  .success {
    border: 1px solid var(--success);
    padding: 3px 15px;
    color: var(--success);
    border-radius: 5px;
  }
`;
const NewsLatter = styled.div`
  & form {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    & input::placeholder {
      color: var(--black) !important;
    }

    & input {
      border: 1px solid #a2a2a2;
      border-radius: 8px 0 0 8px;
      padding: 11px 15px;
      font-weight: 500;
      @media only screen and (max-width: 500px) {
        padding: 8px 0 9px 10px;
        width: 100%;
      }
    }

    & .sps-btn-subscribe-outline {
      padding: 11px 15px;
      border: 2px solid var(--primary);
      border-radius: 0 8px 8px 0;
      font-family: ProximaNovo;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 23px;
      color: var(--primary);
      background: transparent;
      transition: all ease-in-out 300ms;

      &:hover {
        background: var(--primary);
        color: var(--white);
      }
      @media only screen and (max-width: 500px) {
        line-height: 17px;
      }
    }
  }
`;
