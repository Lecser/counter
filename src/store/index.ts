import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { counterReducer } from "./reducers/counterReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { loadState, saveState } from "../localStorage";

export type AppStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({ counter: counterReducer });
export const store = createStore(
  rootReducer,
  loadState(),
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);
store.subscribe(() => {
  saveState({ counter: store.getState().counter });
});
