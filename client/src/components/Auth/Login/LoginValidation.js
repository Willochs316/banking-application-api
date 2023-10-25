const MIN_PASSWORD_LENGTH = 6;

export const validateUsername = (username) => {
  const re = /^[a-zA-Z0-9]+$/;
  return re.test(username);
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  const re = new RegExp(`^[a-zA-Z0-9]{${MIN_PASSWORD_LENGTH},100}$`);
  return re.test(password);
};
