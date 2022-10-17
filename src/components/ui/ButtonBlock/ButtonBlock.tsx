import React, {FC, memo, ReactNode} from "react";
import classes from "./ButtonBlock.module.css";

type ButtonBlockPropsType = {
  children: ReactNode;
};

export const ButtonBlock: FC<ButtonBlockPropsType> = memo(({ children }) => {
    return <div className={classes.btnContainer}>{children}</div>;
});
