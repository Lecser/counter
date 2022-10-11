import { StatusType } from "../../App";

type CounterReducerActionType =
  | counterIncACType
  | counterResetACACType
  | setCounterMinValueACType
  | setCounterMaxValueACType
  | setStartMessageStatusACACType
  | setErrorStatusACType
  | setCountStatusACType
  | setCounterValueACType;

const initialState = {
  counterMinValue: 0,
  counterMaxValue: 5,
  count: 0,
  status: "startMessage" as StatusType,
};
type initialStateType = typeof initialState;
export const counterReducer = (
  state: initialStateType = initialState,
  action: CounterReducerActionType
): initialStateType => {
  switch (action.type) {
    case COUNTER_INC: {
      return { ...state, count: state.count + 1 };
    }
    case SET_COUNT_VALUE: {
      return { ...state, count: action.payload.counterMinValue };
    }
    case COUNTER_RESET: {
      return { ...state, count: action.payload.counterMinValue };
    }
    case SET_COUNTER_MIN_VALUE: {
      return { ...state, counterMinValue: action.payload.counterMinValue };
    }
    case SET_COUNTER_MAX_VALUE: {
      return { ...state, counterMaxValue: action.payload.counterMaxValue };
    }
    case SET_START_MESSAGE_STATUS: {
      return { ...state, status: "startMessage" };
    }
    case SET_ERROR_STATUS: {
      return { ...state, status: "error" };
    }
    case SET_COUNT_STATUS: {
      return { ...state, status: "count" };
    }
    default:
      return state;
  }
};
const COUNTER_INC = "COUNTER_INC";
const COUNTER_RESET = "COUNTER_RESET";
const SET_COUNTER_MIN_VALUE = "SET_COUNTER_MIN_VALUE";
const SET_COUNTER_MAX_VALUE = "SET_COUNTER_MAX_VALUE";
const SET_START_MESSAGE_STATUS = "SET_START_MESSAGE_STATUS";
const SET_ERROR_STATUS = "SET_ERROR_STATUS";
const SET_COUNT_STATUS = "SET_COUNT_STATUS";
const SET_COUNT_VALUE = "SET_COUNT_VALUE";

type counterIncACType = ReturnType<typeof counterIncAC>;
type counterResetACACType = ReturnType<typeof counterResetAC>;
type setCounterMinValueACType = ReturnType<typeof setCounterMinValueAC>;
type setCounterMaxValueACType = ReturnType<typeof setCounterMaxValueAC>;
type setStartMessageStatusACACType = ReturnType<typeof setStartMessageStatusAC>;
type setErrorStatusACType = ReturnType<typeof setErrorStatusAC>;
type setCountStatusACType = ReturnType<typeof setCountStatusAC>;
type setCounterValueACType = ReturnType<typeof setCounterValueAC>;

export const counterIncAC = () => {
  return {
    type: COUNTER_INC,
  } as const;
};
export const counterResetAC = (counterMinValue: number) => {
  return {
    type: COUNTER_RESET,
    payload: { counterMinValue },
  } as const;
};
export const setCounterValueAC = (counterMinValue: number) => {
  return {
    type: SET_COUNT_VALUE,
    payload: { counterMinValue },
  } as const;
};
export const setCounterMinValueAC = (counterMinValue: number) => {
  return {
    type: SET_COUNTER_MIN_VALUE,
    payload: { counterMinValue },
  } as const;
};
export const setCounterMaxValueAC = (counterMaxValue: number) => {
  return {
    type: SET_COUNTER_MAX_VALUE,
    payload: { counterMaxValue },
  } as const;
};
export const setStartMessageStatusAC = () => {
  return {
    type: SET_START_MESSAGE_STATUS,
  } as const;
};
export const setErrorStatusAC = () => {
  return {
    type: SET_ERROR_STATUS,
  } as const;
};
export const setCountStatusAC = () => {
  return {
    type: SET_COUNT_STATUS,
  } as const;
};
