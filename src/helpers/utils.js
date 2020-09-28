import { estados } from "./cityStates.json";

export const getAllStates = () => {
  return estados;
};

export const loggedUser = async () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

export const getStateBySigla = (sigla) => {
    var state = {};
    estados.forEach(e => {
        if (e.sigla === sigla){
            state = e;
        }
    });
  return state;
};

