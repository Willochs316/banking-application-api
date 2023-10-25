import { CREATE, UPDATE, DELETE, FETCH_ALL } from "../constants/actionTypes";

const withdrawReducer = (withdraws = [], action) => {
  switch (action.type) {
    case DELETE:
      return withdraws.filter((withdraw) => withdraw._id !== action.payload);
    case UPDATE:
      return withdraws.map((withdraw) =>
        withdraw._id === action.payload._id ? action.payload : withdraw
      );
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...withdraws, action.payload];
    default:
      return withdraws;
  }
};

export default withdrawReducer;
