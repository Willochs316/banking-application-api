const apiUrl = "/users/";

// Register user
const register = async (userData) => {
  const response = await fetch(apiUrl + "signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Unable to register user");
  }

  return response.json();
};

// Login user
const login = async (userData) => {
  const response = await fetch(apiUrl + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Invalid email or password");
  }

  return response.json();
};

const authService = {
  register,
  login,
  // logout,
};

export default authService;
