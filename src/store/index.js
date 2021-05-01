import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import logger from "./middlewares/logger";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  storage,
  key: "root",
  whitelist: ["transactions"],
};
const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk, logger);
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);

export { persistor, store };
