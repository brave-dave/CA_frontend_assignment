import {
  createStore,
  combineReducers,
  CombinedState,
  Store,
  applyMiddleware,
} from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import charactersReducer from "./characters";

const rootReducer = combineReducers({ characters: charactersReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));

export type ReduxState = ReturnType<typeof rootReducer> extends CombinedState<
  infer S
>
  ? S
  : never;

export type ReduxActions = typeof store extends Store<any, infer A> ? A : never;

export type ReduxThunkAction = ThunkAction<
  void,
  ReduxState,
  void,
  ReduxActions
>;

export type ReduxThunkDispatch = ThunkDispatch<ReduxState, void, ReduxActions>;

export type ReduxSelector<R> = (state: ReduxState) => R;

export default store;
