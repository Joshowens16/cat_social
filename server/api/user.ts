import express, { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";

// User fields:
// username: string
// password: string
// email: string
// firstName: string
// lastName: string
const router = express.Router();
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("hitting route");
    const users = await prisma.user.findMany();
    res.send(users);
  } catch (error) {
    next(error);
  }
});
router.get(
  "/user/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
);
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const userInfo = req.body;
  console.log(req.body);
  try {
    const newUser = await prisma.user.create({
      data: {
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
      },
    });
    res.send(newUser);
  } catch (error) {
    next(error);
  }
});
export default router;
