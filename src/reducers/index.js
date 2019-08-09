import { combineReducers } from "redux";

import { authorBooks } from "./author.reducer";

const rootReducer = combineReducers({
  authorBooks
});

export default rootReducer;
