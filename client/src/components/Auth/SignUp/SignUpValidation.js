const MIN_PASSWORD_LENGTH = 6;

export const validateFullname = (fullname) => {
  const re = /^[a-zA-Z\s]+$/;
  return re.test(fullname);
};

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

export const validatePhoneNumber = (phoneNumber) => {
  const re = /^[0-9]+$/;
  return re.test(phoneNumber);
};

export const validateAddress = (address) => {
  const re = /^\d+\s[A-Za-z\s]+$/i;
  return re.test(address);
};

export const validateCity = (city) => {
  const re = /^[A-Za-z\s.'-]+$/;
  return re.test(city);
};

export const validateState = (state) => {
  const re = /^[A-Za-z\s.'-]+$/;
  return re.test(state);
};

export const validatePostalCode = (postalCode) => {
  const re = /^[0-9]{5}$/;
  return re.test(postalCode);
};
