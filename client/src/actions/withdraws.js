import { CREATE, UPDATE, DELETE, FETCH_ALL } from "../constants/actionTypes";
import * as api from "../api";

//Action Creators --- funtions that return an action;
export const getWithdraws = () => async (dispatch) => {
  try {
    const { data } = await api.fetchWithdraws();

    dispatch({
      type: FETCH_ALL,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createWithdraw = (withdraw) => async (dispatch) => {
  try {
    const { data } = await api.createDeposit(withdraw);

    dispatch({
      type: CREATE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateWithdraw = (id, withdraw) => async (dispatch) => {
  try {
    const { data } = await api.updateWithdraw(id, withdraw);
    dispatch({
      type: UPDATE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteWithdraw = (id) => async (dispatch) => {
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
