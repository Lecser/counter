import React, { FC, ReactNode } from "react";
import classes from "./Display.module.css";

type DisplayPropsType = {
  children: ReactNode;
};

export const Display: FC<DisplayPropsType> = ({ children }) => {
  return <div className={classes.displayContainer}>{children}</div>;
};
