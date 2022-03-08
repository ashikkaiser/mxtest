import styled from "@emotion/styled";
import PopularSoft from "../popular-softwares";

const Integrations = ({data}) => {
	return (
		<IntegrationsWrapper id="integrations">
			<PopularSoft
				className="integrations_slider"
				title="Integrations"
				noButton
				data={data}
			/>
		</IntegrationsWrapper>
	);
};
export default Integrations;
const IntegrationsWrapper = styled.div`
  border-bottom: 1px solid var(--lighter);
  padding-top: 190px;
  margin-top: -140px;
  
  @media (max-width:900px){
	margin-top: -170px;
  }

  & .integrations_slider {
    padding: 0 0 20px 0 !important;
  }

  & .swiper-wrapper .swiper-slide {
    width: 274.5px !important;
  }
`;
