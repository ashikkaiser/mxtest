import styled from "@emotion/styled";
import {Col, Container, Row} from "react-bootstrap";
import Link from "next/link";
import Item from "../categories/item";
import _ from "lodash";

const PopularCategories = ({data}) => {
	const category = data?.slice(0, 3);
	return (
		<SectionWrapper>
			<Container>
				<Row>
					<Col md={12}>
						<Title>Popular Categories</Title>
					</Col>
					<CateItems>
						{_.map(category, (item, index) => (
							<CateItem key={index}>
								<h4 className="mb-4">{item.name}</h4>
								<CategoryItem categoryItems={item.popularCategoryInfo}/>
							</CateItem>
						))}
					</CateItems>
					<Col md={12} className="text-center mt-4">
						<Link href="/all-categories">
							<a className="sps-btn sps-btn-primary">View all categories</a>
						</Link>
					</Col>
				</Row>
			</Container>
		</SectionWrapper>
	);
};

export const CategoryItem = ({categoryItems}) => {
	return (
		<>
			{_.map(categoryItems, (item, key) => (
				<Item item={item} key={key}/>
			))}
		</>
	);
};

export default PopularCategories;
const SectionWrapper = styled.div`
  background: var(--white);
  padding: 60px 0;

  @media (max-width: 900px) {
    padding: 40px 0;
  }
`;
const Title = styled.h3`
  margin-bottom: 40px;
`;
const CateItems = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }

  & > div {
    border-width: 0 1px 0 1px;
    border-color: var(--lighter);
    border-style: solid;
    padding: 0 18px;
    @media (max-width: 900px) {
      &:nth-of-type(2) {
        border-width: 0 0 0 1px !important;
        padding-right: 0 !important;
      }

      &:last-of-type {
        border-width: 0 1px 0 0 !important;
        padding-left: 0 !important;
        padding-right: 18px !important;
      }
    }
    @media (max-width: 500px) {
      margin-bottom: 15px;
      border: none;
      padding: 0 18px !important;
      &:nth-of-type(2) {
        padding-right: 18px !important;
      }

      &:last-of-type {
        border-width: 0 1px 0 0 !important;
        padding-left: 18px !important;
        padding-right: 18px !important;
      }
    }

    & h3 {
      margin-bottom: 13px;
    }

    &:first-of-type {
      border: none;
      padding-left: 0;
    }

    &:last-of-type {
      border-width: 0;
      padding-right: 0;
    }
  }
`;
const CateItem = styled.div``;
