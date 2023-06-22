import jwt, { Secret } from 'jsonwebtoken';

const createToken = (
  payload: { id: string; role: string },
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

export const JwtHelpers = {
  createToken,
};
