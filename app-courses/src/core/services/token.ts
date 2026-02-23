import { env } from "@core/environment";
import * as jwt from "jsonwebtoken";

export const generateAccessToken = (
  id: number,
  name: string,
  lastname: string,
  roles: any[],
) => {
  const payload = {
    sub: id,
    name,
    lastname,
    roles,
    iss: "app-courses",
    aud: "api-courses",
  };

  return jwt.sign(payload, env.JWT_SECRET_KEY, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET_KEY);
    return { valid: true, expired: false, payload };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { valid: false, expired: true, payload: null };
    }
    return { valid: false, expired: false, payload: null };
  }
};
