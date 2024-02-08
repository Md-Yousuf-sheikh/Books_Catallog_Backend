import bcrypt from 'bcrypt';
import config from '../config';

export const isUserPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(givenPassword, savedPassword);

  return isMatch;
};

export const isUserPasswordConvertBcrypt = async function (
  password: string
): Promise<string> {
  const res = await bcrypt.hash(password, Number(config.bycrypt_salt_rounds));
  return res;
};
