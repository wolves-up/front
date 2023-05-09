const passwordIsValid = (password) => {
  return password.length > 6;
}

const invalidPasswordErrorMessage = 'Password must be at least 8 characters in length';

export { passwordIsValid, invalidPasswordErrorMessage }