/** @format */

import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useContext } from "react";
import { FaCheck } from "react-icons/fa";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import HeaderContext from "../../context/headerContext";

const InputItem = ({ name, Id, value, show, hide, ...restProps }) => {
  const {
    pricingId,
    setPricingId,
    pricingCheckedId,
    pricingName,
    featureId,
    featureCheckedId,
    marketSegmentId,
    marketSegmentCheckedId,
    DeploymentId,
    DeploymentCheckedId,
  } = useContext(HeaderContext);
  const allItems = pricingId.concat(
    pricingCheckedId,
    featureId,
    featureCheckedId,
    marketSegmentId,
    marketSegmentCheckedId,
    DeploymentId,
    DeploymentCheckedId
  );
  const idThere = [...new Set(allItems)];
  const router = useRouter();

  return (
    <Item
      {...restProps}
      id={Id}
      className={`${idThere.includes(Id) ? "active" : ""}`}
    >
      <div className="d-flex gap-2 w-100">
        <div className="checkbox_icon on_show" onClick={() => show(Id, name)} />
        <div
          className="checkbox_icon checked_icon close_item"
          onClick={() => hide(Id, name)}
        >
          <FaCheck />
        </div>
        <Value>
          <span className="on_show" onClick={() => show(Id, name)}>
            {name ? name : "Lorem Ipsum Diem"}
          </span>
          <span className="close_item" onClick={() => hide(Id, name)}>
            {name ? name : "Lorem Ipsum Diem"}
          </span>
          <ValueCount>
            <span>{value ? value : "0"}</span>
          </ValueCount>
        </Value>
      </div>
    </Item>
  );
};

export default InputItem;

export const OneReviewInput = ({ count, show, hide, domRef, value }) => {
  const { reviewId, reviewCheckedId } = useContext(HeaderContext);
  const sum = reviewId.concat(reviewCheckedId);
  const newArray = [...new Set(sum)];
  const there = newArray.filter((value) => value.includes(1));
  return (
    <Item
      ref={domRef}
      className={`reviews_${count} ${there.length > 0 ? "active" : ""}`}
    >
      <div className="d-flex gap-2 w-100 align-items-end">
        <div
          className={`checkbox_icon on_show ${
            there.length > 0 ? "active" : ""
          }`}
          onClick={() => show(count)}
        />
        <div
          className="checkbox_icon checked_icon close_item"
          onClick={() => hide(count)}
        >
          <FaCheck />
        </div>
        <div className="position-relative w-100">
          <div
            className={`on_show ${there.length > 0 ? "active" : ""}`}
            onClick={() => show(count)}
          >
            <div className="d-flex gap-1">
              <ImStarFull />
              <ImStarEmpty />
              <ImStarEmpty />
              <ImStarEmpty />
              <ImStarEmpty />
              <p>& Up</p>
            </div>
          </div>
          <div className="close_item" onClick={() => hide(count)}>
            <div className="d-flex gap-1">
              <ImStarFull />
              <ImStarEmpty />
              <ImStarEmpty />
              <ImStarEmpty />
              <ImStarEmpty />
              <p>& Up</p>
            </div>
          </div>
          <ValueCount>
            <span>{value}</span>
          </ValueCount>
        </div>
      </div>
    </Item>
  );
};

export const TwoReviewInput = ({ count, show, hide, domRef, value }) => {
  const { reviewId, reviewCheckedId } = useContext(HeaderContext);
  const sum = reviewId.concat(reviewCheckedId);
  const newArray = [...new Set(sum)];
  const there = newArray.filter((value) => value.includes(2));
  return (
    <Item
      ref={domRef}
      className={`reviews_${count} ${there.length > 0 ? "active" : ""}`}
    >
      <div className="d-flex gap-2 w-100 align-items-end">
        <div
          className={`checkbox_icon on_show ${
            there.length > 0 ? "active" : ""
          }`}
          onClick={() => show(count)}
        />
        <div
          className="checkbox_icon checked_icon close_item"
          onClick={() => hide(count)}
        >
          <FaCheck />
        </div>
        <div className="position-relative w-100">
          <div
            className={`on_show ${there.length > 0 ? "active" : ""}`}
            onClick={() => show(count)}
          >
            <div className="d-flex gap-1">
              <ImStarFull />
              <ImStarFull />
              <ImStarEmpty />
              <ImStarEmpty />
              <ImStarEmpty />
              <p>& Up</p>
            </div>
          </div>
          <div className="close_item" onClick={() => hide(count)}>
            <div className="d-flex gap-1">
              <ImStarFull />
              <ImStarFull />
              <ImStarEmpty />
              <ImStarEmpty />
              <ImStarEmpty />
              <p>& Up</p>
            </div>
          </div>
          <ValueCount>
            <span>{value}</span>
          </ValueCount>
        </div>
      </div>
    </Item>
  );
};

export const ThreeReviewInput = ({ count, show, hide, domRef, value }) => {
  const { reviewId, reviewCheckedId } = useContext(HeaderContext);
  const sum = reviewId.concat(reviewCheckedId);
  const newArray = [...new Set(sum)];
  const there = newArray.filter((value) => value.includes(3));
  return (
    <Item
      ref={domRef}
      className={`reviews_${count} ${there.length > 0 ? "active" : ""}`}
    >
      <div className="d-flex gap-2 w-100 align-items-end">
        <div
          className={`checkbox_icon on_show ${
            there.length > 0 ? "active" : ""
          }`}
          onClick={() => show(count)}
        />
        <div
          className="checkbox_icon checked_icon close_item"
          onClick={() => hide(count)}
        >
          <FaCheck />
        </div>
        <div className="position-relative w-100">
          <div
            className={`on_show ${there.length > 0 ? "active" : ""}`}
            onClick={() => show(count)}
          >
            <div className="d-flex gap-1">
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarEmpty />
              <ImStarEmpty />
              <p>& Up</p>
            </div>
          </div>
          <div className="close_item" onClick={() => hide(count)}>
            <div className="d-flex gap-1">
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarEmpty />
              <ImStarEmpty />
              <p>& Up</p>
            </div>
          </div>
          <ValueCount>
            <span>{value}</span>
          </ValueCount>
        </div>
      </div>
    </Item>
  );
};

export const FourReviewInput = ({ count, show, hide, domRef, value }) => {
  const { reviewId, reviewCheckedId } = useContext(HeaderContext);
  const sum = reviewId.concat(reviewCheckedId);
  const newArray = [...new Set(sum)];
  const there = newArray.filter((value) => value.includes(4));
  return (
    <Item
      ref={domRef}
      className={`reviews_${count} ${there.length > 0 ? "active" : ""}`}
    >
      <div className="d-flex gap-2 w-100 align-items-end">
        <div
          className={`checkbox_icon on_show ${
            there.length > 0 ? "active" : ""
          }`}
          onClick={() => show(count)}
        />
        <div
          className="checkbox_icon checked_icon close_item"
          onClick={() => hide(count)}
        >
          <FaCheck />
        </div>
        <div className="position-relative w-100">
          <div
            className={`on_show ${there.length > 0 ? "active" : ""}`}
            onClick={() => show(count)}
          >
            <div className="d-flex gap-1">
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarEmpty />
              <p>& Up</p>
            </div>
          </div>
          <div className="close_item" onClick={() => hide(count)}>
            <div className="d-flex gap-1">
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarEmpty />
              <p>& Up</p>
            </div>
          </div>
          <ValueCount>
            <span>{value}</span>
          </ValueCount>
        </div>
      </div>
    </Item>
  );
};

export const FiveReviewInput = ({ count, show, hide, domRef, value }) => {
  const { reviewId, reviewCheckedId } = useContext(HeaderContext);
  const sum = reviewId.concat(reviewCheckedId);
  const newArray = [...new Set(sum)];
  const there = newArray.filter((value) => value.includes(5));
  return (
    <Item
      ref={domRef}
      className={`reviews_${count} ${there.length > 0 ? "active" : ""}`}
    >
      <div className="d-flex gap-2 w-100 align-items-end">
        <div
          className={`checkbox_icon on_show ${
            there.length > 0 ? "active" : ""
          }`}
          onClick={() => show(count)}
        />
        <div
          className="checkbox_icon checked_icon close_item"
          onClick={() => hide(count)}
        >
          <FaCheck />
        </div>
        <div className="position-relative w-100">
          <div
            className={`on_show ${there.length > 0 ? "active" : ""}`}
            onClick={() => show(count)}
          >
            <div className="d-flex gap-1">
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
            </div>
          </div>
          <div className="close_item" onClick={() => hide(count)}>
            <div className="d-flex gap-1">
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
            </div>
          </div>
          <ValueCount>
            <span>{value}</span>
          </ValueCount>
        </div>
      </div>
    </Item>
  );
};

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  cursor: pointer;

  & .on_show,
  .close_item {
    & p {
      margin: 0;
      line-height: 20px;
      text-transform: lowercase;
      margin-left: 5px;
    }
  }

  & .checkbox_icon {
    border-radius: 0.25em;
    width: 20px;
    height: 18px;
    margin: 0;
    border: 1px solid var(--lighter);
  }

  & .checked_icon {
    background-color: var(--primary);
    border-color: var(--primary);
    box-shadow: var(--shadow);
    justify-content: center;

    & svg {
      font-size: 12px;
      color: var(--white);
      padding: 3px 0 0;
    }
  }

  &.active {
    & .on_show {
      display: none;
    }

    & .close_item {
      display: flex;
    }
  }

  & .close_item {
    display: none;
  }

  & .form-check-inline {
    display: flex;
    gap: 10px;
  }

  & .form-check-input {
    &:focus {
      border-color: var(--primary);
      box-shadow: none;
    }

    &:checked {
      background-color: var(--primary);
      border-color: var(--primary);
      box-shadow: var(--shadow);
    }

    &[type="checkbox"] {
      border-radius: 0.25em;
      width: 20px;
      height: 18px;
      margin: 0;
    }
  }

  & svg {
    font-size: 20px;
    color: var(--warning);
    @media (max-width: 1080px) {
      font-size: 18px;
    }
    @media (max-width: 500px) {
      font-size: 16px;
    }
  }
`;
const Value = styled.div`
  width: 100%;
  position: relative;
  line-height: 18px;

  & > span {
    width: 100%;
    display: inline-block;
    padding-right: 25px;
  }
`;
const ValueCount = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;
