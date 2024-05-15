import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });

export const register = (userData) => API.post("/users/signup", userData);
export const login = (userData) => API.post("/users/login", userData);
export const updateUser = (id, updateUserDto) =>
  API.put(`/users/${id}`, updateUserDto);
export const deleteUser = (id) => API.delete(`/users/${id}`);

// Fetching Deposit Endpoint
export const fetchDeposits = () => API.get("/deposit");
export const createDeposit = (newDeposit) => API.post("/deposit", newDeposit);
export const deleteDeposit = (id) => API.delete(`/deposit/${id}`);

// Fetching Withdraw Endpoint
export const fetchWithdraws = () => API.get("/withdraw");
export const createWithdraw = (newWithdraw) =>
  API.post("/withdraw", newWithdraw);
export const updateWithdraw = (id, updatedWithdraw) =>
  API.patch(`/withdraw/${id}`, updatedWithdraw);
export const deleteWithdraw = (id) => API.delete(`/withdraw/${id}`);
