import Router from "@koa/router";
import UsersDAO from "../dao/users.dao";
import { validateRegistration, hashPassword } from "../middlewares/users";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { config } from "../config/config";

const router = new Router({
  prefix: "/api/users",
});

const usersDAO = new UsersDAO();

router.get("/",  async (ctx) => {
  try {
    const users =  await usersDAO.getAll();
    ctx.status = 200;
    ctx.body = users;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
});

router.post("/", validateRegistration, hashPassword, async (ctx) => {
  try {
    const { email } = ctx.request.body as { email: string };
    
    const existingUser = await usersDAO.findByEmail(email);
    if (existingUser) {
      ctx.status = 409;
      ctx.body = { error: "Email già registrata" };
      return;
    }
    
    const newUser = await usersDAO.create(ctx.request.body);
    if (!newUser || !newUser.id) {
      ctx.status = 400;
      ctx.body = { error: "400 Bad Request" };
      return;
    }
    
    ctx.status = 201;
    ctx.body = newUser;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
});
router.post("/login", async (ctx) => {
  try {
    const { email, password } = ctx.request.body as { email: string; password: string };

    const user = await usersDAO.findByEmail(email);
    if (!user) {
      ctx.status = 401;
      ctx.body = { error: "Credenziali non valide" };
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      ctx.status = 401;
      ctx.body = { error: "Credenziali non valide" };
      return;
    }

    const token = jwt.sign(
      { email: user.email },
      config.JWT_SECRET,
      { expiresIn: '30m' }
    );

    ctx.status = 200;
    ctx.body = { token };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
});

export default router;