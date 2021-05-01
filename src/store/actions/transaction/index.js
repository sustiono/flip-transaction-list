import { batch } from "react-redux";
import axios from "axios";
import { actionTypes } from "../../constantas";

const setSubmiting = () => {
  return { type: actionTypes.SET_SUBMITING };
};

const getTransactions = () => {
  return async (dispacth, getState) => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_HOST}/frontend-test`)
        .then(function (response) {
          // handle success
          let data = Object.values(response.data);
          batch(() => {
            dispacth({
              data,
              type: actionTypes.SET_TRANSACTIONS,
            });
            dispacth({
              filteredData: data,
              type: actionTypes.SET_FILTERED_TRANSACTIONS,
            });
            dispacth(setSubmiting());
          });
        })
        .catch(function (error) {
          // handle error
          dispacth(setSubmiting());
          console.log("error: ", error);
        });
    } catch (error) {
      dispacth(setSubmiting());
      console.log("error: ", error);
    }
  };
};

const searchTransaction = (term) => {
  return async (dispacth, getState) => {
    const { data } = getState().transactions;
    const filteredData = data.filter((dt) => {
      const termLower = term.toLowerCase();
      return (
        (dt.beneficiary_name.toLowerCase().includes(termLower) ||
          dt.beneficiary_bank.toLowerCase().includes(termLower) ||
          dt.sender_bank.toLowerCase().includes(termLower)) &&
        dt
      );
    });
    dispacth({
      filteredData,
      type: actionTypes.SET_FILTERED_TRANSACTIONS,
    });
  };
};

const sortTransaction = (sortType) => {
  return async (dispacth, getState) => {
    const { data } = getState().transactions;
    let filteredData;
    if (sortType === "name-asc") {
      filteredData = data.sort((a, b) =>
        a.beneficiary_name.localeCompare(b.beneficiary_name)
      );
    } else if (sortType === "name-desc") {
      filteredData = data.sort((a, b) =>
        b.beneficiary_name.localeCompare(a.beneficiary_name)
      );
    } else if (sortType === "date-asc") {
      filteredData = data.sort((a, b) => {
        const x = new Date(a.completed_at);
        const y = new Date(b.completed_at);
        return x - y;
      });
    } else if (sortType === "date-desc") {
      filteredData = data.sort((a, b) => {
        const x = new Date(a.completed_at);
        const y = new Date(b.completed_at);
        return y - x;
      });
    }
    dispacth({
      filteredData,
      type: actionTypes.SET_FILTERED_TRANSACTIONS,
    });
  };
};

export { getTransactions, searchTransaction, sortTransaction, setSubmiting };
