import {GiRoundStar} from "react-icons/gi";
import styled from "@emotion/styled";

const ActiveStar = ({width}) => {
	 return (
			<Star width={width} className="review-star active">
				 <GiRoundStar/>
			</Star>
	 );
}

export default ActiveStar;
const Star = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
  position: relative;
  background-color: var(--lighter);

  &.active {
    &::after {
      content: '';
      width: ${props => props.width === '00' ? '0%' : `${props.width}%`};
      height: 100%;
      position: absolute;
      justify-content: start;
      display: flex;
      background-color: var(--warning);
    }
  }

  & svg {
    display: block;
    width: 100%;
    height: 80%;
    z-index: 2;
    color: var(--white);
  }
`;