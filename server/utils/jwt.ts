import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const JWT_ACCESS = process.env.ACCESS_TOKEN_SECRET;
const JWT_REFRESH = process.env.JWT_REFRESH_SECRET;
// Usually I keep the token between 5 minutes - 15 minutes
export function generateAccessToken(user: { id: string }) {
  if (!JWT_ACCESS) {
    throw new Error("JWT access token is not defined.");
  }
  return jwt.sign({ userId: user.id }, JWT_ACCESS, {
    expiresIn: "5m",
  });
}

// I choose 8h because i prefer to make the user login again each day.
// But keep him logged in if he is using the app.
// You can change this value depending on your app logic.
// I would go for a maximum of 7 days, and make him login again after 7 days of inactivity.
export function generateRefreshToken(user: { id: string }, jti: string) {
  if (!JWT_REFRESH) {
    throw new Error("JWT refresh token is not defined.");
  }
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    JWT_REFRESH,
    {
      expiresIn: "8h",
    }
  );
}

export function generateTokens(user: { id: string }, jti: string) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}
