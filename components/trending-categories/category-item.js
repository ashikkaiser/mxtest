import styled from "@emotion/styled";

const CategoryItem = ({ item, ...restProps }) => {
  return (
    <Item {...restProps}>
      <h5>{item.name}</h5>
    </Item>
  );
};

export default CategoryItem;

const Item = styled.div`
  margin-bottom: 24px;

  & h5 {
    background: var(--white);
    box-shadow: var(--shadow);
    border-radius: 8px;
    margin: 0;
    padding: 16px 20px !important;
    color: var(--dark);
    display: block;
    cursor: pointer;
    transition: all ease-in-out 300ms;

    &:hover {
      background: var(--primary);
      color: var(--white);
    }
  }
`;
