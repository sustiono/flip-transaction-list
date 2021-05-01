import { batch } from "react-redux";
import axios from "axios";
import { actionTypes } from "../../constantas";

const setSubmiting = (submiting) => {
  return { submiting, type: actionTypes.SET_SUBMITING };
};

const setTerm = (term) => {
  return async (dispacth, getState) => {
    batch(() => {
      dispacth({ term, type: actionTypes.SET_TERM });
      dispacth(searchTransaction(term));
    });
  };
};

const setSortType = (sortType) => {
  return async (dispacth, getState) => {
    batch(() => {
      dispacth({ sortType, type: actionTypes.SET_SORT_TYPE });
      dispacth(sortTransaction(sortType));
    });
  };
};

const getTransactions = () => {
  return async (dispacth, getState) => {
    try {
      dispacth(setSubmiting(true));
      const { term, sortType } = getState().transactions;

      axios
        .get(`${process.env.REACT_APP_API_HOST}/frontend-test`)
        .then(function (response) {
          // handle success
          const data = Object.values(response.data);
          let filteredData = [...data];
          if (!!term) {
            filteredData = searching(filteredData, term);
          }
          if (!!sortType) {
            filteredData = sorting(filteredData, sortType);
          }
          batch(() => {
            dispacth({
              data,
              type: actionTypes.SET_TRANSACTIONS,
            });
            dispacth({
              filteredData,
              type: actionTypes.SET_FILTERED_TRANSACTIONS,
            });
            dispacth(setSubmiting(false));
          });
        })
        .catch(function (error) {
          // handle error
          dispacth(setSubmiting(false));
          console.log("error: ", error);
        });
    } catch (error) {
      dispacth(setSubmiting(false));
      console.log("error: ", error);
    }
  };
};

const searchTransaction = (term) => {
  return async (dispacth, getState) => {
    const { data, sortType } = getState().transactions;
    const sortedData = !!sortType ? sorting(data, sortType) : data;
    const filteredData = searching(sortedData, term);
    dispacth({
      filteredData,
      type: actionTypes.SET_FILTERED_TRANSACTIONS,
    });
  };
};

const sortTransaction = (sortType) => {
  return async (dispacth, getState) => {
    const { data, term } = getState().transactions;
    const searchedData = !!term ? searching(data, term) : data;
    const filteredData = sorting(searchedData, sortType);
    dispacth({
      filteredData,
      type: actionTypes.SET_FILTERED_TRANSACTIONS,
    });
  };
};

const searching = (data, term) => {
  if (!term) return data;

  return data.filter((dt) => {
    const termLower = term.toLowerCase();
    return (
      (dt.beneficiary_name.toLowerCase().includes(termLower) ||
        dt.beneficiary_bank.toLowerCase().includes(termLower) ||
        dt.sender_bank.toLowerCase().includes(termLower)) &&
      dt
    );
  });
};

const sorting = (data, sortType) => {
  if (!sortType) return data;

  if (sortType === "name-asc") {
    return data.sort((a, b) =>
      a.beneficiary_name.localeCompare(b.beneficiary_name)
    );
  } else if (sortType === "name-desc") {
    return data.sort((a, b) =>
      b.beneficiary_name.localeCompare(a.beneficiary_name)
    );
  } else if (sortType === "date-asc") {
    return data.sort((a, b) => {
      const x = new Date(a.completed_at);
      const y = new Date(b.completed_at);
      return x - y;
    });
  } else if (sortType === "date-desc") {
    return data.sort((a, b) => {
      const x = new Date(a.completed_at);
      const y = new Date(b.completed_at);
      return y - x;
    });
  }
};

export { getTransactions, setSubmiting, setTerm, setSortType };
