import axios from "axios";

const API_URL = "http://localhost:5000/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "signup", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Update user by ID
const update = async (id, user) => {
  const response = await axios.put(API_URL + `${id}`, user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  update,
  logout,
};

export default authService;

// Update user profile by ID
// const update = async (id, userData) => {
//   try {
//     // Send a PUT request to update the user's profile in the database
//     const response = await axios.put(API_URL + `${id}`, userData);

//     if (response.data) {
//       // Update the user data in local storage only if the database update is successful
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (user && user._id === id) {
//         const updatedUser = { ...user, ...userData };
//         localStorage.setItem("user", JSON.stringify(updatedUser));
//       }
//     }

//     return response.data;
//   } catch (error) {
//     // Handle any errors here, such as network issues or server errors
//     console.error("Error updating user profile:", error);
//     throw error;
//   }
// };
