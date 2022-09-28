import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import s from "./Button.module.css";

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonPropsType = DefaultButtonPropsType & {};

const UniversalButton: React.FC<ButtonPropsType> = ({
  className,
  ...restProps
}) => {
  const finalClassName = `${s.default} ${className}`;

  return <button className={finalClassName} {...restProps} />;
};

export default UniversalButton;
