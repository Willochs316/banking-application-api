import { CREATE, DELETE, FETCH_ALL } from "../constants/actionTypes";
import * as api from "../api";

//Action Creators --- funtions that return an action;
export const getDeposits = () => async (dispatch) => {
  try {
    const { data } = await api.fetchDeposits();

    dispatch({
      type: FETCH_ALL,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createDeposit = (deposit) => async (dispatch) => {
  try {
    const { data } = await api.createDeposit(deposit);

    dispatch({
      type: CREATE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDeposit = (id) => async (dispatch) => {
  try {
    await api.deleteDeposit(id);
    dispatch({
      type: DELETE,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
