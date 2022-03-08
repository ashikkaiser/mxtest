import {GiRoundStar} from "react-icons/gi";
import styled from "@emotion/styled";

const Star = () => {
	 return (
			<Item className="review-star">
				 <GiRoundStar/>
			</Item>
	 )
}

export default Star;

const Item = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
  position: relative;

  &.review-star {
    width: 16px;
    height: 16px;
    background-color: var(--lighter);
  }

  & svg {
    display: block;
    width: 100%;
    height: 80%;
    z-index: 2;
    color: var(--white);
  }
`;