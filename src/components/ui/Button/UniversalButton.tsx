import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import classes from "./Button.module.css";

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonPropsType = DefaultButtonPropsType & {};

const UniversalButton: React.FC<ButtonPropsType> = ({
  className,
  ...restProps
}) => {
  const finalClassName = `${classes.default} `;

  return <button className={finalClassName} {...restProps} />;
};

export default UniversalButton;
