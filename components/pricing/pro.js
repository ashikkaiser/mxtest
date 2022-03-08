import styled from "@emotion/styled";
import { FaCheckCircle } from "react-icons/fa";

const ProPricing = () => {
  return (
    <ContentWrapper>
      <ContentHeader>
        <h4 className="color-primary">Pro</h4>
        <Price>
          <h2>
            $8<sup>.00</sup>
          </h2>
        </Price>
        <p>Per month, paid yearly</p>
        <Button>Go Pro Now</Button>
        <p>
          Best for students and practicing professionals who want to improve
          their design skills.
        </p>
        <ListWrapper>
          <List>
            <FaCheckCircle />
            First Level of All cources
          </List>
          <List>
            <FaCheckCircle />
            Lorem ipsum dolor
          </List>
          <List>
            <FaCheckCircle />
            Lorem ipsum dolor
          </List>
          <List>
            <FaCheckCircle />
            Lorem ipsum dolor
          </List>
          <List>
            <FaCheckCircle />
            Lorem ipsum dolor
          </List>
        </ListWrapper>
      </ContentHeader>
    </ContentWrapper>
  );
};

export default ProPricing;
const ContentWrapper = styled.div`
  padding: 1.5rem 2rem;
  border: 1px solid var(--lighter);
  border-radius: 20px;
  position: relative;
`;
const ContentHeader = styled.div``;
const Price = styled.div`
  & sup {
    font-size: var(--sm-p);
    vertical-align: revert;
    margin-left: 5px;
  }
`;

const Button = styled.button`
  margin: 25px 0;
  background: var(--primary);
  padding: 7px 34px;
  color: var(--white);
  border-radius: 8px;
  border: 2px solid var(--primary);
  font-weight: 500;
  font-family: ProximaNovo;
  transition: all ease-in-out 300ms;
  &:hover {
    background: transparent;
    color: var(--primary);
    box-shadow: var(--shadow);
  }
`;
const ListWrapper = styled.ul`
  list-style: none;
  padding-left: 0;
  line-height: 35px;
  margin-top: 30px;
`;
const List = styled.li`
  & svg {
    margin-right: 10px;
  }
`;
