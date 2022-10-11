import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import classes from "./Button.module.css";

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonPropsType = DefaultButtonPropsType & {};

export const UniversalButton: React.FC<ButtonPropsType> = ({
  className,
  ...restProps
}) => {
  const finalClassName = `${classes.default} `;

  return <button className={finalClassName} {...restProps} />;
};
