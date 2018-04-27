import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const checkPassword = async (plaintextPassword, hashPass) => {
  const match = await bcrypt.compare(plaintextPassword, hashPass);
  return match;
};
