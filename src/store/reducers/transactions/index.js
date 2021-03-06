import { actionTypes } from "../../constantas";

let newState;
let initialState = {
  data: [],
  filteredData: [],
  submiting: true,
  term: "",
  sortType: "",
};
const transactions = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRANSACTIONS:
      newState = { ...state, data: action.data };
      return newState;
    case actionTypes.SET_FILTERED_TRANSACTIONS:
      newState = { ...state, filteredData: action.filteredData };
      return newState;
    case actionTypes.SET_SUBMITING:
      newState = { ...state, submiting: action.submiting };
      return newState;
    case actionTypes.SET_TERM:
      newState = { ...state, term: action.term };
      return newState;
    case actionTypes.SET_SORT_TYPE:
      newState = { ...state, sortType: action.sortType };
      return newState;
    default:
      return state;
  }
};

export default transactions;
