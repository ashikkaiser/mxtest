import styled from "@emotion/styled";
import { FaCheckCircle } from "react-icons/fa";

const FreePricing = () => {
  return (
    <ContentWrapper>
      <ContentHeader>
        <h4>Free</h4>
        <Price>
          <h2>
            $0<sup>.00</sup>
          </h2>
        </Price>
        <p>Alway free, explore away</p>
        <Button>Sign Up</Button>
        <p>
          Get a taste of Uxcel’s powerful design education functionality, and
          sample every course in our library.
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
          <List>
            <FaCheckCircle />
            Lorem ipsum dolor
          </List>
        </ListWrapper>
      </ContentHeader>
    </ContentWrapper>
  );
};

export default FreePricing;
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
  background: transparent;
  padding: 7px 34px;
  color: black;
  border-radius: 8px;
  border: 2px solid var(--dark);
  font-weight: 500;
  font-family: ProximaNovo;
  transition: all ease-in-out 300ms;
  &:hover {
    background: var(--dark);
    color: var(--white);
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
