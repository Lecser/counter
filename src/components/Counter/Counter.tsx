import React, {FC, memo, useCallback} from "react";
import {Display} from "../ui/Display/Display";
import {ButtonBlock} from "../ui/ButtonBlock/ButtonBlock";
import classes from "./Counter.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {StatusType} from "../../App";
import {counterIncAC, counterResetAC,} from "../../store/reducers/counterReducer";
import {UniversalButton} from "../ui/Button/UniversalButton";

export const Counter: FC = memo(() => {
    const count = useSelector<AppStateType, number>(
        (store) => store.counter.count
    );
    const counterMinValue = useSelector<AppStateType, number>(
        (store) => store.counter.counterMinValue
    );
    const counterMaxValue = useSelector<AppStateType, number>(
        (store) => store.counter.counterMaxValue
    );
    const status = useSelector<AppStateType, StatusType>(
        (store) => store.counter.status
    );
    const dispatch = useDispatch();

    const disableReset = count === counterMinValue;
    const disableInc = count === counterMaxValue;

    const buttonIncHandler = useCallback(() => {
        count < counterMaxValue && dispatch(counterIncAC());
    }, [count, counterMaxValue, dispatch]);
    const buttonResetHandler = useCallback(() => {
        dispatch(counterResetAC(counterMinValue));
    }, [counterMinValue, dispatch]);

    return (
        <div className={classes.counter}>
            <Display>
                {status === "error" ? (
                    <div className={classes.errorMessage}>Incorrect Value</div>
                ) : status === "startMessage" ? (
                    <div className={classes.startMessage}>
                        Enter values and press "Set"
                    </div>
                ) : (
                    <div
                        className={disableInc ? classes.counterRed : classes.counterDefault}
                    >
                        {count}
                    </div>
                )}
            </Display>
            <ButtonBlock>
                <UniversalButton
                    onClick={buttonIncHandler}
                    disabled={status !== "count" || disableInc}
                >
                    inc
                </UniversalButton>
                <UniversalButton
                    onClick={buttonResetHandler}
                    disabled={status !== "count" || disableReset}
                >
                    Reset
                </UniversalButton>
            </ButtonBlock>
        </div>
    );
});
