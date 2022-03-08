import styled from "@emotion/styled";
import { Container } from "react-bootstrap";
import PopularSoft from "../popular-softwares";
import Link from "next/link";

const Alternatives = ({ data, slug, isPricingModelShow }) => {

  return (
    <AlternativesWrapper id="alternatives">
      <Container className="p-0">
        <PopularSoft
          className="alternatives_slider"
          title="Alternatives"
          data={data}
          isPricingModelShow={isPricingModelShow}
        />
      </Container>
      {data.length > 0 && (
        <div
          style={{
            textAlign: `center`,
          }}
        >
          <Link href={`${slug}/alternatives`}>
            <a className="sps-btn sps-btn-primary">View All Alternatives</a>
          </Link>
        </div>
      )}
    </AlternativesWrapper>
  );
};
export default Alternatives;
const AlternativesWrapper = styled.div`
  border-bottom: 1px solid var(--lighter);
  padding-top: 190px;
  margin-top: -140px;

  @media (max-width: 900px) {
    margin-top: -170px;
  }

  & .container {
    @media (max-width: 900px) {
      max-width: 100%;
      margin: 0;
    }
  }

  & .swiper-wrapper .swiper-slide {
    width: 274.5px !important;
  }

  & .alternatives_slider {
    padding: 0 0 20px 0 !important;
  }
`;
