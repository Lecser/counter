import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from "react";
import classes from "./Input.module.css";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputPropsType = DefaultInputPropsType & {
  onChangeNumber?: (value: number) => void;
  onEnter?: () => void;
  error?: ReactNode;
  value: number;
};

export const Input: React.FC<InputPropsType> = ({
  className,
  onKeyUp,
  onEnter,
  value,
  error,
  onChangeNumber,
  ...restProps
}) => {
  const finalInputClassName =
    classes.input +
    (error ? " " + classes.inputError : " " + classes.Input) +
    (className ? " " + classes.className : "");
  const onKeyUpCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyUp?.(e);

    onEnter && // если есть пропс onEnter
      e.key === "Enter" && // и если нажата кнопка Enter
      onEnter(); // то вызвать его
  };
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeNumber?.(
      isNaN(e.currentTarget.valueAsNumber)
        ? 0
        : Math.floor(e.currentTarget.valueAsNumber)
    );
  };
  return (
    <input
      type={"number"}
      value={value.toFixed()}
      onChange={onChangeCallback}
      className={finalInputClassName}
      onKeyUp={onKeyUpCallback}
      {...restProps}
    />
  );
};
