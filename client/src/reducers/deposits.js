import { CREATE, UPDATE, DELETE, FETCH_ALL } from "../constants/actionTypes";

const depositReducer = (deposits = [], action) => {
  switch (action.type) {
    case DELETE:
      return deposits.filter((deposit) => deposit._id !== action.payload);
    case UPDATE:
      return deposits.map((deposit) =>
        deposit._id === action.payload._id ? action.payload : deposit
      );
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...deposits, action.payload];
    default:
      return deposits;
  }
};

export default depositReducer;
