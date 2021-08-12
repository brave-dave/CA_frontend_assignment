import { createStore, combineReducers, CombinedState } from "redux";
import charactersReducer from "./characters";

const rootReducer = combineReducers({ characters: charactersReducer });

const store = createStore(rootReducer);

export type ReduxState = ReturnType<typeof rootReducer> extends CombinedState<
  infer S
>
  ? S
  : never;

export type ReduxSelector<R> = (state: ReduxState) => R;

export default store;
