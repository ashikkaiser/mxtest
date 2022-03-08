import styled from "@emotion/styled";
import Link from "next/link";
import {RiCheckLine} from "react-icons/ri";
import {AiOutlineQuestionCircle} from "react-icons/ai";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import _ from "lodash";

const Features = ({data}) => {
	return (
		<FeaturesWrapper id="features">
			<FeaturesTitle>Features</FeaturesTitle>
			<CheckLists>
				{_.map(data, (item, index) => (
					<li key={index}>
						<Link href={`/glossary#${item.toLowerCase().replace(/ /g, "-")}`}>
							<a>
								<RiCheckLine/> {item}
								<OverlayTrigger
									placement="top"
									overlay={
										<Tooltip id={`popover-positioned-top`}>
											Features tooltip content will be here. when api have the info.
										</Tooltip>
									}
								>
									<Button className={`sps_overlay_trigger`}><AiOutlineQuestionCircle className="font-small"/></Button>
								</OverlayTrigger>
							</a>
						</Link>
					</li>
				))}
			</CheckLists>
		</FeaturesWrapper>
	);
};
export default Features;
const FeaturesWrapper = styled.div`
  border-bottom: 1px solid var(--lighter);
  padding-bottom: 20px;
  padding-top: 190px;
  margin-top: -140px;
  
  @media (max-width:900px){
	margin-top: -170px;
  }
`;
const FeaturesTitle = styled.h3`
  margin-bottom: 10px;
`;
const CheckLists = styled.ul`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  & a {
    color: var(--black);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }

  & .sps_overlay_trigger {
    background: transparent;
    padding: 0 5px;
    border-color: transparent;
    color: var(--darker);
  }

  & li {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 22px;

    & svg {
      font-size: 25px;
    }

    & .font-small {
      font-size: var(--sm-p) !important;
    }
  }
`;
