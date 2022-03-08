/** @format */

import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { RiArrowDropUpLine, RiInstagramFill } from "react-icons/ri";
import HeaderContext from "../../context/headerContext";
import Script from 'next/script';

const ComparePopup = dynamic(() => import("../popup/compare"));

const Footer = () => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const { setIsSticky, siteLoading } = useContext(HeaderContext);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      // site sticky header
      window.scrollY > 300 && setIsSticky(true);
      window.scrollY < 300 && setIsSticky(false);

      // site back to top button
      window.scrollY > 700 &&
        document.getElementById("back-to-top").classList.add("show");
      window.scrollY < 700 &&
        document.getElementById("back-to-top").classList.remove("show");
    });
  }, [setIsSticky]);

  const ScrollToTopHandler = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SectionWrapper>
        <Container>
          <Row>
            <Col xs={6} md={6} lg={4} className="mb-5">
              <Title>Legal</Title>
              <List>
                <li>
                  <Link href="/terms-of-use/">Terms of use</Link>
                </li>
                <li>
                  <Link href="/cookie-policy/">Cookie Policy</Link>
                </li>
                <li>
                  <Link href="/privacy-policy/">Privacy Policy</Link>
                </li>
              </List>
            </Col>
            <Col xs={6} md={6} lg={4} className="mb-5">
              <Title>About</Title>
              <List>
                {/* <li>
                  <Link href="/blog">Blog</Link>
                </li> */}
                <li>
                  <Link href="/glossary/">Know SaaS Terms - Glossary</Link>
                </li>
              </List>
            </Col>
            <Col xs={6} md={6} lg={4} className="mb-5">
              <div className="float-lg-end">
                <FooterLogo>
                  <Link href="/">
                    <a>
                      <Image
                        loader={logoLoader}
                        src="/assets/img/logo/logo-light.png"
                        alt="site-logo"
                        className="footer_logo"
                        width={170}
                        height={33}
                      />
                    </a>
                  </Link>
                </FooterLogo>
                <SocialIcon>
                  <p>Follow us on -</p>
                  <Icons>
                    <Icon className="facebook_icon">
                      <a
                        href={`https://www.facebook.com/spotsaas`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaFacebookF />
                      </a>
                    </Icon>
                    <Icon className="twitter_icon">
                      <a
                        href={`https://twitter.com/saa_spot`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaTwitter />
                      </a>
                    </Icon>
                    <Icon className="instagram_icon">
                      <a
                        href={`https://www.instagram.com/spotsaas/`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <RiInstagramFill />
                      </a>
                    </Icon>
                    <Icon className="linkedin_icon">
                      <a
                        href={`https://www.linkedin.com/company/spotsaas/`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedinIn />
                      </a>
                    </Icon>
                  </Icons>
                </SocialIcon>
                <p className="color-white">
                  If you have queries, please
                  <br />
                  Email us at -{" "}
                  <a href="mailto:admin@spotsaas.com">admin@spotsaas.com</a>
                </p>
              </div>
            </Col>
            <Col xs={6} md={6} lg={12}>
              <FooterBottom>
                <Title>Quick Links</Title>
                <div className="item_list">
                  <li>
                    <Link href="/category/project-management-software/">
                      Project Management Software
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/task-management-software/">
                      Task Management Software
                    </Link>
                  </li>
                  <li>
                    <Link href="/category/crm-software/">CRM Software</Link>
                  </li>
                  <li>
                    <Link href="/category/accounting-software/">
                      Accounting Software
                    </Link>
                  </li>
                  <li>
                    <Link href="/all-categories/">
                      Browse all software category
                    </Link>
                  </li>
                </div>
              </FooterBottom>
            </Col>
          </Row>
        </Container>
        <BackToTop id="back-to-top" onClick={ScrollToTopHandler}>
          <RiArrowDropUpLine />
        </BackToTop>
      </SectionWrapper>
      <ComparePopup />
      {siteLoading && (
        <LoaderWrapper>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </LoaderWrapper>
      )}
       <Script type="text/javascript" src="//cdn.iubenda.com/cs/tcf/stub-v2.js"/>
        <Script type="text/javascript" src="//cdn.iubenda.com/cs/tcf/safe-tcf-v2.js"/>
        <Script type="text/javascript" src="//cdn.iubenda.com/cs/ccpa/stub.js"/>
        <Script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charSet="UTF-8" async/> 
    </>
  );
};

export default Footer;
const SectionWrapper = styled.div`
  padding: 45px 0;
  background-color: var(--primary);
  color: var(--white);
  width: 100%;
  & a {
    color: var(--white);
  }
`;
const FooterLogo = styled.div`
  margin-bottom: 15px;
`;
const Title = styled.h4`
  color: var(--white);
  margin-bottom: 10px;
`;
const List = styled.ul`
  padding: 0;
  margin: 0;

  & li {
    list-style: none;
    line-height: 32px;

    & a {
      color: var(--white);
      display: block;
      font-size: var(--p);

      &:hover {
        color: var(--light);
      }
    }
  }
`;
const BrandLogo = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  gap: 5px;

  & li {
    list-style: none;
    line-height: 32px;
    width: 42px;
    height: 42px;
    border-radius: 5px;
    margin-bottom: 10px;

    & a {
      color: var(--white);
      font-size: var(--p);

      &:hover {
        color: var(--light);
      }
    }
  }
`;
const BackToTop = styled.div`
  position: fixed;
  bottom: 40px;
  right: -80px;
  padding: 3px;
  border: 1px solid var(--lighter);
  border-radius: 4px;
  box-shadow: var(--shadow);
  background: var(--white);
  color: var(--primary);
  z-index: 999;
  cursor: pointer;
  transform: translateX(80px);
  transition: all ease-in-out 300ms;

  &:hover {
    background: var(--primary);
    color: var(--white);
  }

  @media (max-width: 1080px) {
    bottom: 60px;
  }

  & svg {
    font-size: 38px;
  }

  &.show {
    transform: translateX(0);
    right: 30px;
    @media (max-width: 500px) {
      right: 10px;
    }
  }
`;
const LoaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999999;
  background: rgba(255, 255, 255, 0.5);
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary);
`;
const FooterBottom = styled.div`
  & h4 {
    margin-bottom: 20px;
  }

  & .item_list {
    padding: 0;
    margin: 0;

    & li {
      list-style: none;
      line-height: 32px;

      & a {
        color: var(--white);
        display: block;
        font-size: var(--p);

        &:hover {
          color: var(--light);
        }
      }
    }
    @media (min-width: 1024px) {
      justify-content: center;
      display: flex;
      gap: 40px;
      flex-wrap: wrap;
    }
  }

  @media (min-width: 1024px) {
    text-align: center;
  }
`;
const SocialIcon = styled.div`
  margin-bottom: 35px;
  & p {
    color: var(--white);
    margin-bottom: 5px;
  }
`;
const Icons = styled.div`
  display: flex;
  gap: 10px;
`;
const Icon = styled.div`
  &.twitter_icon {
    & a {
      background: #1da1f2;
    }
  }

  &.instagram_icon {
    & a {
      background: #bc2a8d;
    }
  }

  &.facebook_icon {
    & a {
      background: #3b5998;
    }
  }

  &.youtube_icon {
    & a {
      background: #c4302b;
    }
  }

  &.linkedin_icon {
    & a {
      background: #0077b5;
    }
  }

  & a {
    width: 32px;
    height: 32px;
    border-radius: 5px;
    background: var(--primary);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    line-height: 42px;
    color: var(--white);
    @media (max-width: 500px) {
      font-size: 18px;
      width: 24px;
      height: 24px;
    }
  }
`;
