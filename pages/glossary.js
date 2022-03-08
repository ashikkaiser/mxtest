/** @format */

import styled from "@emotion/styled";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  CloseButton,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { RiShareBoxLine } from "react-icons/ri";
import HeaderContext from "../context/headerContext";

export const getServerSideProps = async (req) => {
  const option = {
    headers: {
      'country_name': req.cookies.countryCode || "null"
    }
  }
  const res = await fetch(`https://api.spotsaas.com/glossary`, option);
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
};

export default function Glossary({ data }) {
  const { setBreadcrumbs } = useContext(HeaderContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadData, setLoadData] = useState(null);
  const [items, setItems] = useState(2);

  const metaDesc = Object.entries(data[0])[0][1][0].desc.slice(0, 150);

  useEffect(() => {
    let array = [
      {
        name: "Home",
        link: "/",
      },
      {
        name: `Glossary`,
        link: ``,
      },
    ];
    setBreadcrumbs(array);
  }, [data]);

  useEffect(() => {
    if (searchTerm !== "") {
      setLoadData(data);
    } else {
      setLoadData(data?.slice(0, items));
    }
  }, [items, searchTerm]);

  const LoadDataHandler = () => {
    setItems(items + 2);
  };

  const SearchHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  const CloseSearchTerm = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <Head>
        <title>Glossary | Spotsaas</title>
        <meta name="description" content={metaDesc} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <MainWrapper>
        <Container>
          <Row>
            <Col xs={12} className="mb-5">
              <Row>
                <Col xs={12} md={7} lg={9}>
                  <h2>Glossary</h2>
                </Col>
                <Col xs={12} md={5} lg={3}>
                  <InputGroup className="glossary-search-form">
                    <FormControl
                      placeholder="Search Categories"
                      aria-label="Search Categories"
                      aria-describedby="search-categories"
                      onChange={SearchHandler}
                      value={searchTerm}
                    />
                    {searchTerm !== "" && (
                      <CloseButton onClick={CloseSearchTerm} />
                    )}
                    <InputGroup.Text id="search-categories">
                      <svg
                        width="27"
                        height="27"
                        viewBox="0 0 27 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.1403 0.638672C5.18023 0.638672 0.348633 5.47027 0.348633 11.4303C0.348633 17.3904 5.18023 22.222 11.1403 22.222C13.5643 22.222 15.8017 21.4228 17.6032 20.0735L23.9253 26.3956C24.5273 26.9976 25.5035 26.9976 26.1055 26.3956C26.7076 25.7935 26.7076 24.8174 26.1055 24.2153L19.7835 17.8933C21.1328 16.0917 21.932 13.8544 21.932 11.4303C21.932 5.47027 17.1004 0.638672 11.1403 0.638672ZM3.43197 11.4303C3.43197 7.17314 6.8831 3.72201 11.1403 3.72201C15.3975 3.72201 18.8486 7.17314 18.8486 11.4303C18.8486 15.6875 15.3975 19.1387 11.1403 19.1387C6.8831 19.1387 3.43197 15.6875 3.43197 11.4303Z"
                          fill="#5C6BC0"
                        />
                      </svg>
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
            </Col>
            {loadData !== null &&
              loadData.map((item, index) => {
                return (
                  <Col key={index} xs={12}>
                    <GlossaryItems item={item} searchTerm={searchTerm} />
                  </Col>
                );
              })}
            {loadData !== null && data.length !== loadData.length && (
              <Col xs={12} className="text-center pt-4">
                <button
                  onClick={LoadDataHandler}
                  className="sps-btn sps-btn-primary"
                >
                  Load More
                </button>
              </Col>
            )}
          </Row>
        </Container>
      </MainWrapper>
    </div>
  );
}

export const GlossaryItems = ({ item, searchTerm }) => {
  return (
    <div>
      {Object.entries(item)[0][1].filter((list) => {
        if (searchTerm === "") {
          return list;
        } else if (list.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return list;
        }
      }).length > 0 && (
          <Title>
            {Object.entries(item)[0][0]} <span />
          </Title>
        )}
      {Object.entries(item)[0][1]
        .filter((list) => {
          if (searchTerm === "") {
            return list;
          } else if (
            list.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return list;
          }
        })
        .map((list, index) => {
          return <SingleItem item={list} key={index} />;
        })}
    </div>
  );
};

export const SingleItem = (item) => {
  const idName = item.item.name.toLowerCase().replace(/ /g, "-");
  return (
    <SingleWrapper>
      <div id={idName} />
      <div className={`info-wrapper`}>
        <h4>{item.item.name}</h4>
        <p>{item.item.desc}</p>
        <div className="category_lists">
          {item.item.categories.map((item, index) => {
            return <CategoryItem item={item} key={index} />;
          })}
        </div>
      </div>
    </SingleWrapper>
  );
};

export const CategoryItem = (item) => {
  return (
    <Link
      href={`/category/${item.item.categoryName
        .toLowerCase()
        .replace(/[ |.|/]/g, "-")
        .replace(/[(|)]/g, "")}/`}
    >
      <a>
        <Wrapper>
          <h5>{item.item.categoryName}</h5>
          <div>
            <RiShareBoxLine />
          </div>
        </Wrapper>
      </a>
    </Link>
  );
};

const MainWrapper = styled.div`
  padding: 40px 0 60px 0;

  & .glossary-search-form {
    & input {
      box-shadow: none;
      border: none;
      padding: 5px 15px;
      font-weight: 600;
      background: transparent;
      color: var(--black);
      font-size: 18px;
      border-bottom: 2px solid #b0b4c3;
      border-radius: 0;
    }

    & .btn-close {
      position: absolute;
      right: 45px;
      top: 5px;
      z-index: 9;
    }

    & .input-group-text {
      background: transparent;
      border: none;
      border-radius: 0;
      border-bottom: 2px solid #b0b4c3;
    }
  }

  & .sps-btn {
    padding: 10px 40px;
  }
`;
const SingleWrapper = styled.div`
  &:first-of-type {
    & .info-wrapper {
      padding-top: 0;
    }
  }

  & .info-wrapper {
    padding-top: 60px;
    word-wrap: anywhere;
  }

  & .category_lists {
    display: flex;
    flex-wrap: wrap;

    & > div {
      margin-right: 30px;
    }
  }
`;
const Title = styled.h3`
  margin-bottom: 15px;
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;

  & span {
    height: 1px;
    background: var(--lighter);
    width: 100%;
    margin-left: 10px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  color: var(--primary);
  padding: 5px 0;
  transition: all ease-in-out 300ms;
  margin-bottom: 16px;
  margin-right: 40px;

  & h5 {
    margin: 0 10px 0 0;
    font-weight: 500 !important;
  }

  & svg {
    font-size: 22px;
  }
`;
