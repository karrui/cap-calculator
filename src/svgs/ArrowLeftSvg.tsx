import * as React from "react";

interface IArrowLeftProps {
  handleClick: (() => void) | undefined;
  disabled: boolean;
}

const ArrowLeftSvg: React.FunctionComponent<IArrowLeftProps> = ({
  handleClick,
  disabled,
}) => (
  <svg
    onClick={handleClick}
    className={`arrow-left ${disabled ? "disabled" : ""}`}
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
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default ArrowLeftSvg;
