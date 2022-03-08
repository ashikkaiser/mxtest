import styled from "@emotion/styled";
import React from "react";

const Score = ({ score }) => {
  return score > 0 ? (
    <ProductScore>
      <ScoreNumber>
        <span>{score?.toFixed(1)} / 10</span>
      </ScoreNumber>
      <p>Spot Score</p> 
    </ProductScore>
  ) : null;
};

export default Score;
const ProductScore = styled.div`
  box-sizing: border-box;
  margin-top: -10px;
  padding: 5px 10px;
  position: absolute;
  top: 0;
  left: -10px;
  background: var(--primary);
  color: var(--white);
  border-radius: 9px;
  min-width: max-content;
  box-shadow: var(--shadow);

  & p {
    margin: 0;
    line-height: 16px;
    font-size: 12px !important;
    color: var(--white);
  }
`;
const ScoreNumber = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  color: var(--white);

  & span {
    margin: 0;
    line-height: 14px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    color: var(--white);
  }
`;
