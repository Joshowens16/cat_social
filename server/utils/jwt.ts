import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const JWT_ACCESS = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH = process.env.JWT_REFRESH_SECRET;
// Usually I keep the token between 5 minutes - 15 minutes
function generateAccessToken(user: { id: any }) {
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
function generateRefreshToken(user: { id: any }, jti: any) {
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

function generateTokens(user: any, jti: any) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
