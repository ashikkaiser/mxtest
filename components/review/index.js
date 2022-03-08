import styled from "@emotion/styled";
import {ImStarEmpty, ImStarFull, ImStarHalf} from "react-icons/im";

const Reviews = ({value}) => {
	return (
		<Icons className="review-wrapper">
			{(() => {
				const number = Math.floor(value);
				const lastValue = (value % 1).toFixed(2).substring(2);
				if (number === 1) {
					return (
						<>
							<ImStarFull/>
							{lastValue !== '00' ? <ImStarHalf/> : <ImStarEmpty/>}
							<ImStarEmpty/>
							<ImStarEmpty/>
							<ImStarEmpty/>
						</>
					)
				} else if (number === 2) {
					return (
						<>
							<ImStarFull/>
							<ImStarFull/>
							{lastValue !== '00' ? <ImStarHalf/> : <ImStarEmpty/>}
							<ImStarEmpty/>
							<ImStarEmpty/>
						</>
					)
				} else if (number === 3) {
					return (
						<>
							<ImStarFull/>
							<ImStarFull/>
							<ImStarFull/>
							{lastValue !== '00' ? <ImStarHalf/> : <ImStarEmpty/>}
							<ImStarEmpty/>
						</>
					)
				} else if (number === 4) {
					return (
						<>
							<ImStarFull/>
							<ImStarFull/>
							<ImStarFull/>
							<ImStarFull/>
							{lastValue !== '00' ? <ImStarHalf/> : <ImStarEmpty/>}
						</>
					)
				} else if (number === 5) {
					return (
						<>
							<ImStarFull/>
							<ImStarFull/>
							<ImStarFull/>
							<ImStarFull/>
							<ImStarFull/>
						</>
					)
				}
				
			})()}
		</Icons>
	)
}
export default Reviews;
const Icons = styled.div`
  display: flex;
  gap: 5px;
  color: var(--warning);
  align-items: center;
  font-size: 20px;
  @media (max-width: 1080px) {
    font-size: 18px;
  }
  @media (max-width: 500px) {
    font-size: 16px;
  }

  & p {
    font-weight: 500 !important;

    &:last-child::after {
      content: "|";
      margin-left: 10px;
      font-weight: 500;
      @media (max-width: 500px) {
        margin-left: 7px;
      }
    }

    @media (max-width: 500px) {
      font-size: 12px !important;
    }
  }
`;