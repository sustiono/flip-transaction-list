import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import logger from "./middlewares/logger";

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

export default store;
