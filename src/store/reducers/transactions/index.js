import { actionTypes } from "../../constantas";

let newState;
let initialState = {
  data: [],
  filteredData: [],
};
const transactions = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRANSACTIONS:
      newState = { ...state, data: action.data };
      return newState;
    case actionTypes.SET_FILTERED_TRANSACTIONS:
      newState = { ...state, filteredData: action.filteredData };
      return newState;
    default:
      return state;
  }
};

export default transactions;
