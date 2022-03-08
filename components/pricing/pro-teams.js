import styled from "@emotion/styled";
import { FaCheckCircle } from "react-icons/fa";

const ProTeamsPricing = () => {
  return (
    <ContentWrapper>
      <ContentHeader>
        <h4>
          Pro <span className="color-primary">Teams</span>
        </h4>
        <Price>
          <h2>
            $12<sup>.00</sup>
          </h2>
        </Price>
        <p>Per seat, per month, paid yearly</p>
        <Button>Create Team</Button>
        <p>
          If you’re looking to up skill your design team, this is the plan for
          you!
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
      <Offer>
        <span>Want to hire qualified design talent?</span>
      </Offer>
    </ContentWrapper>
  );
};

export default ProTeamsPricing;
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
  margin: 30px 0;
`;
const List = styled.li`
  & svg {
    margin-right: 10px;
  }
`;
const Offer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background: var(--light-primary);
  font-size: var(--sm-p);
  font-weight: 500;
  padding: 7px;
  border-radius: 0 0 18px 18px;
  border: 2px solid transparent;
  color: var(--white);
`;
