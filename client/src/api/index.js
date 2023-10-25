import axios from "axios";

const url = "http://localhost:5000/users";

export const fetchUsers = () => axios.get(url);
export const registerUser = (newUser) => axios.post(url, newUser);
export const loginUser = (newPost) => axios.post(url, newPost);
export const updateUser = (id, updateUserDto) =>
  axios.put(`${url}/${id}`, updateUserDto);
export const deleteUser = (id) => axios.delete(`${url}/${id}`);

// Fetching Deposit Endpoint
const depositUrl = "http://localhost:5000/deposit";

export const fetchDeposits = () => axios.get(depositUrl);
export const createDeposit = (newDeposit) => axios.post(depositUrl, newDeposit);
export const deleteDeposit = (id) => axios.delete(`${depositUrl}/${id}`);

// Fetching Withdraw Endpoint
const withdrawUrl = "http://localhost:5000/withdraw";

export const fetchWithdraws = () => axios.get(withdrawUrl);
export const createWithdraw = (newWithdraw) =>
  axios.post(withdrawUrl, newWithdraw);
export const updateWithdraw = (id, updatedWithdraw) =>
  axios.patch(`${withdrawUrl}/${id}`, updatedWithdraw);
export const deleteWithdraw = (id) => axios.delete(`${withdrawUrl}/${id}`);
