import { CREATE, UPDATE, DELETE, FETCH_ALL } from "../constants/actionTypes";

const userReducer = (users = [], action) => {
  switch (action.type) {
    case DELETE:
      return users.filter((user) => user._id !== action.payload);
    case UPDATE:
      return users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...users, action.payload];
    default:
      return users;
  }
};

export default userReducer;
