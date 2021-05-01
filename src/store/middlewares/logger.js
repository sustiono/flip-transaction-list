const logger = (store) => (next) => (action) => {
  if (process.env.NODE_ENV === "development") {
    console.group(action.type);
    console.info("dispatching", action);
    console.log("next state", store.getState());
    console.groupEnd();
  }
  let result = next(action);
  return result;
};

export default logger;
