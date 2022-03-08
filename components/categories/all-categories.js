/** @format */

import styled from "@emotion/styled";
import { Col, Container, Row } from "react-bootstrap";
import CategoryGroup from "../categories/category-group";
import Masonry from "react-masonry-css";
import _ from "lodash";
import Item from "./item";

const AllCategories = ({ data }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    900: 2,
    500: 1,
  };

  const dataFormat = data.sort((a, b) => {
    return b.subCategoryInfo.length - a.subCategoryInfo.length;
  });

  return (
    <AllCategoriesWrapper>
      <Container>
        <Row className="categories_list">
          <Col md={12}>
            <Title>All Categories</Title>
          </Col>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {_.map(dataFormat, (item, index) => {
              return (
                item._id && (
                  <div key={index}>
                    {item.subCategoryInfo.length > 0 && (
                      <CateItem>
                        <CategoryGroup item={item} />
                      </CateItem>
                    )}
                  </div>
                )
              );
            })}
          </Masonry>

          {_.map(data, (item, index) => {
            return (
              !item._id && (
                <div key={index}>
                  {item.subCategoryInfo.length > 0 && (
                    <OthersCategory item={item} />
                  )}
                </div>
              )
            );
          })}
        </Row>
      </Container>
    </AllCategoriesWrapper>
  );
};

export const OthersCategory = ({ item }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    900: 2,
    500: 1,
  };
  return (
    <Main>
      <h4 className="list-title mb-4">
        {item.name} <span />
      </h4>
      <CategoryWrapper>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {_.map(item.subCategoryInfo, (value, index) => (
            <Item key={index} item={value} />
          ))}
        </Masonry>
      </CategoryWrapper>
    </Main>
  );
};

export default AllCategories;
const AllCategoriesWrapper = styled.div`
  background: var(--white);
  padding: 40px 0;
  border: 1px solid var(--lighter);

  & .my-masonry-grid {
    display: flex;
  }

  & .my-masonry-grid_column {
    padding: 0 18px;
    background-clip: padding-box;

    &:first-of-type {
      padding-left: 0;
    }

    &:last-of-type {
      padding-right: 0;
    }

    @media only screen and (min-width: 1080px) {
      &:nth-of-type(2) {
        border-width: 0 1px 0 1px;
        border-color: var(--lighter);
        border-style: solid;
      }
    }
    @media only screen and (max-width: 900px) {
      border-width: 0 0 0 1px;
      &:nth-of-type(2) {
        border-width: 0 0 0 1px;
        border-color: var(--lighter);
        border-style: solid;
      }
    }
    @media only screen and (max-width: 500px) {
      border-width: 0;
      padding: 0;
      &:nth-of-type(2) {
        border-width: 0;
      }
    }

    & .list-title {
      margin-bottom: 13px;
      position: relative;
      display: flex;
      align-items: center;
      white-space: nowrap;
      font-size: var(--md-text) !important;
      @media only screen and (max-width: 1080px) {
        font-size: var(--h5) !important;
        display: inline-block;
        white-space: unset;
      }

      & span {
        height: 1px;
        background: var(--lighter);
        width: 100%;
        margin-left: 10px;
      }
    }
  }

  /* Style your items */

  & .my-masonry-grid_column > div {
    /* change div to reference your elements you put in <Masonry> */
    margin-bottom: 30px;
  }
`;
const Title = styled.h2`
  margin-bottom: 40px;
  font-size: var(--h2);
  @media (max-width: 1080px) {
    font-size: var(--h3) !important;
  }
`;
const CateItem = styled.div``;
const Main = styled.div`
  margin-bottom: 50px !important;

  &:last-child {
    margin-bottom: 0;
  }
`;
const CategoryWrapper = styled.div`
  & > div {
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
