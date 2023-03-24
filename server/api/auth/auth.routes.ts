// IMPORTS
import express from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../../utils/jwt";
import {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
} from "./auth.services";
import jwt, { JwtPayload } from "jsonwebtoken";
import hashToken from "../../utils/hashToken";
import {
  findUserByUsername,
  createUserByEmailAndPassword,
  findUserById,
} from "./user.services";
import * as dotenv from "dotenv";
// init .env config so we can pull in secrets
dotenv.config();
// init Express router
const router = express.Router();
// JWT Refresh is our way of reauthenticating users
const JWT_REFRESH = process.env.JWT_REFRESH_SECRET;
// POST - '/api/auth/register': route to register a user, gives them a Json Web Token and hashes their password
router.post("/register", async (req, res, next) => {
  try {
    const { email, password, username, firstName, lastName } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("You must provide an email and a password.");
    }

    const existingUser = await findUserByUsername(username);

    if (existingUser) {
      res.status(400);
      throw new Error("Email already in use.");
    }

    const user = await createUserByEmailAndPassword({
      email,
      password,
      username,
      firstName,
      lastName,
    });
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
});
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400);
      throw new Error("You must provide an email and a password.");
    }

    const existingUser = await findUserByUsername(username);

    if (!existingUser) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: existingUser.id,
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/refreshToken", async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400);
      throw new Error("Missing refresh token.");
    }
    if (!JWT_REFRESH) {
      throw new Error("No valid JWT refresh token");
    }

    const payload = jwt.verify(refreshToken, JWT_REFRESH) as JwtPayload;
    if (!payload.jti) {
      throw new Error("Invalid payload ID");
    }
    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }
});

// This endpoint is only for demo purpose.
// Move this logic where you need to revoke the tokens( for ex, on password reset)
router.post("/revokeRefreshTokens", async (req, res, next) => {
  try {
    const { userId } = req.body;
    await revokeTokens(userId);
    res.json({ message: `Tokens revoked for user with id #${userId}` });
  } catch (err) {
    next(err);
  }
});
export default router;
