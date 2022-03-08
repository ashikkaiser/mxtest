import styled from "@emotion/styled";
import {Accordion} from "react-bootstrap";
import {FiveReviewInput, FourReviewInput, OneReviewInput, ThreeReviewInput, TwoReviewInput} from "./input-item";

const RatingsFilter = () => {
    return (
        <div>
            <FilterTitle>Filter Results by</FilterTitle>
            <FormBox>
                {/* Ratings */}
                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Ratings</Accordion.Header>
                        <Accordion.Body>
                            <FiveReviewInput/>
                            <FourReviewInput/>
                            <ThreeReviewInput/>
                            <TwoReviewInput/>
                            <OneReviewInput/>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </FormBox>
        </div>
    );
};

export default RatingsFilter;
const FilterTitle = styled.h4`
  margin-bottom: 35px;
`;
const FormBox = styled.div`
  & > div {
    margin-bottom: 16px;

    &:last-of-type {
      margin: 0;
    }
  }

  & .accordion-body {
    font-size: 14px;
  }

  & .form-check {
    display: inline-flex;
    padding: 0;

    & label {
      line-height: 18px;
      margin-left: 10px;
    }
  }

  & .accordion-button {
    padding: 0.5rem 1.25rem;

    &:focus {
      border: none;
      box-shadow: none;
    }

    &:not(.collapsed) {
      color: var(--dark);
      background-color: transparent;
      box-shadow: none;
    }

    &::after {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='var(--primary)'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    }
  }

  & .sps-btn {
    margin: 0 1.25rem;
  }
`;
