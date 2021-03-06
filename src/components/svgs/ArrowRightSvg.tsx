import * as React from "react";

interface IArrowLeftProps {
  handleClick: (() => void) | undefined;
  disabled: boolean;
}

const ArrowRightSvg: React.FunctionComponent<IArrowLeftProps> = ({
  handleClick,
  disabled,
}) => (
  <svg
    onClick={handleClick}
    className={`arrow-svg ${disabled ? "disabled" : ""}`}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default ArrowRightSvg;
