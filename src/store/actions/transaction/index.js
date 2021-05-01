import { batch } from "react-redux";
import axios from "axios";
import { actionTypes } from "../../constantas";

const getTransactions = () => {
  return async (dispacth, getState) => {
    try {
      axios
        .get("https://nextar.flip.id/frontend-test")
        .then(function (response) {
          // handle success
          batch(() => {
            dispacth({
              type: actionTypes.SET_TRANSACTIONS,
              data: Object.values(response.data),
            });
            dispacth({
              type: actionTypes.SET_FILTERED_TRANSACTIONS,
              filteredData: Object.values(response.data),
            });
          });
        })
        .catch(function (error) {
          // handle error
          console.log("error: ", error);
        });
    } catch (error) {
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

export { getTransactions, searchTransaction };
