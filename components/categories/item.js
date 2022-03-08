/** @format */

import styled from "@emotion/styled";
import Link from "next/link";
import { RiShareBoxLine } from "react-icons/ri";

const Item = ({ item }) => {
  return (
    <Link href={`/category/${item.slug}`}>
      <a>
        <CategoryItem>
          <h5>{item.name}</h5>
          <CategoryInfo>
            <h5>{item.productCount}</h5>
            <RiShareBoxLine />
          </CategoryInfo>
        </CategoryItem>
      </a>
    </Link>
  );
};

export default Item;

const CategoryItem = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  background: var(--white);
  color: var(--primary);
  box-shadow: var(--shadow);
  border-radius: 8px;
  padding: 16px 20px;
  transition: all ease-in-out 300ms;
  margin-bottom: 16px;

  & h5 {
    margin: 0;
  }

  &:hover {
    background: var(--primary);
    color: var(--white);
  }
`;
const CategoryInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  & svg {
    font-size: 20px;
  }
`;
