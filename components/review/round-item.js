import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { useEffect, useState } from "react";

const RoundItem = ({ getValue }) => {
  const [value, setValue] = useState(50);
  useEffect(() => {
    if (getValue) {
      const one = 20;
      const two = 40;
      const three = 60;
      const four = 80;
      const five = 100;
      if (getValue === 1) {
        setValue(one);
      } else if (getValue === 2) {
        setValue(two);
      } else if (getValue === 2.1) {
        setValue(42);
      } else if (getValue === 2.2) {
        setValue(44);
      } else if (getValue === 2.3) {
        setValue(46);
      } else if (getValue === 2.4) {
        setValue(48);
      } else if (getValue === 2.5) {
        setValue(50);
      } else if (getValue === 2.6) {
        setValue(52);
      } else if (getValue === 2.7) {
        setValue(54);
      } else if (getValue === 2.8) {
        setValue(56);
      } else if (getValue === 2.9) {
        setValue(59);
      } else if (getValue === 3) {
        setValue(three);
      } else if (getValue === 4) {
        setValue(four);
      } else if (getValue === 4.1) {
        setValue(82);
      } else if (getValue === 4.2) {
        setValue(84);
      } else if (getValue === 4.3) {
        setValue(86);
      } else if (getValue === 4.4) {
        setValue(88);
      } else if (getValue === 4.5) {
        setValue(90);
      } else if (getValue === 4.6) {
        setValue(92);
      } else if (getValue === 4.7) {
        setValue(94);
      } else if (getValue === 4.8) {
        setValue(96);
      } else if (getValue === 4.9) {
        setValue(99);
      } else if (getValue === 5) {
        setValue(five);
      }
    }
  }, [getValue]);
  return (
    <CircularProgressbarWithChildren value={value}>
      {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
      <div style={{ fontSize: 12, marginTop: -5 }}>
        <h1>4.7 / 5</h1>
      </div>
    </CircularProgressbarWithChildren>
  );
};
export default RoundItem;
