
import * as jose from "jose";

//https://github.com/panva/jose/blob/HEAD/docs/classes/jwt_sign.SignJWT.md
export const createAuthJWT = async (data: User) => {
  const jwt = await new jose.SignJWT(data  as unknown as jose.JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(new TextEncoder().encode(import.meta.env.JWT_SECRET));
  return jwt;
};

export const verifyAuthJWT = async (token: string) => {
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(import.meta.env.JWT_SECRET)
    );
    return payload as unknown as User;
  } catch {
    return null;
  }
};