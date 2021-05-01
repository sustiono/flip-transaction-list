import { actionTypes } from "../../constantas";

let newState;
let initialState = {
  data: [],
};
const transactions = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRANSACTIONS:
      newState = { ...state, data: action.data };
      return newState;
    default:
      return state;
  }
};

export default transactions;
