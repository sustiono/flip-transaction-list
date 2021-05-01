import axios from "axios";
import { actionTypes } from "../../constantas";

export const getTransactions = () => {
  return async (dispacth, getState) => {
    try {
      axios
        .get("https://nextar.flip.id/frontend-test")
        .then(function (response) {
          // handle success
          dispacth({
            type: actionTypes.SET_TRANSACTIONS,
            data: Object.values(response.data),
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
