/** @format */

import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { RiSearch2Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import HeaderContext from "../../context/headerContext";
import BannerSearch from "../search-forms/banner-search";
import Breadcrumbs from "./breadcrumbs";

const Header = () => {
  const logoLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 475}`;
  };
  const router = useRouter();
  const { isSticky, openSearch, setOpenSearch, windowWidth } =
    useContext(HeaderContext);
  const isTablet = useMediaQuery({ query: "(max-width: 1080px)" });
  const isDesktop = useMediaQuery({ query: "(max-width: 1200px)" });

  const OpenSearchHandler = () => {
    setOpenSearch(true);
  };

  const closeSearchPopup = () => {
    setOpenSearch(false);
  };

  return (
    <>
      <SectionWrapper>
        <Container>
          <Row className="align-items-center">
            <Col xs={5} sm={3} md={3} lg={3} xl={3}>
              <Link href="/">
                <a className="main_logo imageContainer">
                  <Image
                    loader={logoLoader}
                    src="/assets/img/logo/logo-light.png"
                    alt="site-logo"
                    layout="fill"
                    className="image"
                  />
                </a>
              </Link>
            </Col>
            {windowWidth > 1080 && (
              <Col xs={1} md={5} xl={5}>
                {router.asPath !== "/" && <BannerSearch isHeader />}
              </Col>
            )}
            <Col
              xs={7}
              sm={9}
              md={windowWidth > 1080 ? 4 : 9}
              lg={windowWidth > 1080 ? 4 : 9}
              xl={4}
            >
              <NavMenu>
                {windowWidth > 1200 && (
                  <>
                    <Link href="/all-categories">
                      <a>Browse Categories</a>
                    </Link>
                  </>
                )}
                <Link href="https://forms.gle/nmVgpnEQo1JLKVcQ8">
                  <a target="_blank" className="sps-btn sps-btn-outline-white">
                    Get Listed
                  </a>
                </Link>
                {router.asPath !== "/" && windowWidth < 1080 && (
                  <SearchButton
                    onClick={openSearch ? closeSearchPopup : OpenSearchHandler}
                    className="sps-btn sps-btn-outline-white"
                  >
                    <RiSearch2Line />
                  </SearchButton>
                )}
              </NavMenu>
            </Col>
          </Row>
        </Container>
      </SectionWrapper>
      {router.asPath !== "/" && <Breadcrumbs />}

      {/*	 Sticky header */}
      <StickyHeader className={`${isSticky ? "isSticky" : ""}`}>
        <Container>
          <Row className="align-items-center justify-content-between">
            <Col xs={5} md={3} lg={3}>
              <Link href="/">
                <a className="main_logo">
                  <Image
                    loader={logoLoader}
                    src="/assets/img/logo/logo-light.png"
                    alt="site-logo"
                    width={155}
                    height={30}
                  />
                </a>
              </Link>
            </Col>
            {windowWidth > 1080 && (
              <Col xs={1} md={5} lg={5}>
                <BannerSearch isHeader />
              </Col>
            )}
            <Col
              xs={7}
              md={windowWidth > 1080 ? 4 : 9}
              lg={windowWidth > 1080 ? 4 : 9}
            >
              <MobileNavMenu>
                {windowWidth > 1200 && (
                  <Link href="/all-categories">
                    <a>Browse Categories</a>
                  </Link>
                )}
                <Link href="https://forms.gle/nmVgpnEQo1JLKVcQ8">
                  <a target="_blank" className="sps-btn sps-btn-outline-white">
                    Get Listed
                  </a>
                </Link>
                {windowWidth < 1080 && (
                  <SearchButton
                    onClick={openSearch ? closeSearchPopup : OpenSearchHandler}
                    className="sps-btn sps-btn-outline-white"
                  >
                    <RiSearch2Line />
                  </SearchButton>
                )}
              </MobileNavMenu>
            </Col>
          </Row>
        </Container>
      </StickyHeader>
      <SearchPopup
        className={`${openSearch ? "active" : ""} ${isSticky ? "fixed" : ""}`}
      >
        <BannerSearch isHeader />
      </SearchPopup>
      <SearchOverlay
        onClick={closeSearchPopup}
        className={openSearch ? "active" : ""}
      />
    </>
  );
};

export default Header;
const SectionWrapper = styled.div`
  height: 70px;
  background-color: var(--primary);
  color: var(--white);
  display: flex;
  position: relative;
  z-index: 999;
  width: 100%;
  align-items: center;

  & .main_logo {
    line-height: 0;
    display: block;
    width: 170px;
    @media (max-width: 991px) {
      width: 140px;
    }
    @media (max-width: 500px) {
      width: 120px;
    }
  }

  @media (max-width: 1080px) {
    height: 60px;
    .container,
    .container-sm {
      max-width: 95% !important;
    }
  }
`;
const StickyHeader = styled.div`
  height: 60px;
  background-color: var(--primary);
  color: var(--white);
  display: flex;
  width: 100%;
  align-items: center;
  top: 0;
  position: fixed;
  z-index: -9;
  transform: translateY(-100px);
  transition: all ease-in-out 500ms;
  visibility: hidden;
  opacity: 0;

  &.isSticky {
    transform: translateY(0);
    visibility: visible;
    opacity: 1;
    z-index: 999;
  }

  & .sps-btn {
    font-size: 16px;
    padding: 7px 20px;
    margin: 0;
  }

  & input {
    font-size: 14px;
  }

  & .main_logo {
    line-height: 0;
    display: block;
  }

  @media (max-width: 1080px) {
    height: 60px;
    .container,
    .container-sm {
      max-width: 95% !important;
    }
  }
`;
const NavMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 32px;
  font-size: 18px;
  @media only screen and (max-width: 500px) {
    font-size: 16px;
  }

  & a {
    color: var(--white);
    @media (max-width: 1392px) {
      font-size: var(--sm-p);
    }
    @media (max-width: 900px) {
      font-size: var(--p);
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid var(--white);
    }

    &:hover {
      color: var(--light);
    }
  }

  @media (max-width: 500px) {
    gap: 15px;
    & .sps-btn {
      padding: 7px 15px;
    }
  }

  & .sps-btn-outline-white {
    margin: 0;
    @media (max-width: 900px) {
      font-size: var(--sm-p);
    }
  }
`;
const MobileNavMenu = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 20px;
  font-size: 18px;
  @media only screen and (max-width: 500px) {
    font-size: 16px;
  }

  & a {
    color: var(--white);

    @media (max-width: 900px) {
      font-size: var(--p);
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid var(--white);
    }

    &:hover {
      color: var(--light);
    }
  }

  @media (max-width: 500px) {
    gap: 15px;
    & .sps-btn {
      padding: 7px 15px;
    }
  }

  & .sps-btn-outline-white {
    margin: 0;
    @media (max-width: 900px) {
      font-size: var(--sm-p);
    }
  }
`;
const SearchButton = styled.button`
  background: var(--white);
  color: var(--black);
  padding: 0 10px !important;
  font-size: 22px !important;

  & svg {
    vertical-align: sub;
  }
`;
const SearchPopup = styled.div`
  padding: 20px;
  background: var(--primary);
  display: inline-block;
  width: 100%;
  position: absolute;
  transform: translateY(-50px);
  transition: all ease-in-out 300ms;
  box-shadow: var(--shadow);
  margin-top: 10px;
  visibility: hidden;
  opacity: 0;
  z-index: -2;

  &.fixed {
    position: fixed;
    top: 60px;
  }

  &.active {
    transform: translateY(0);
    visibility: visible;
    opacity: 1;
    z-index: 999;
  }

  & input {
    max-width: 100% !important;
  }
`;
const SearchOverlay = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 99;
  display: none;

  &.active {
    display: block;
  }
`;
