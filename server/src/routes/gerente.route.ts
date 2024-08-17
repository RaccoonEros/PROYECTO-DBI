import { Router, Request, Response } from "express";
import sql from "mssql";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/authMiddleware";

export const gerenteRouter: Router = Router();

gerenteRouter.post("/login", async (req: Request, res: Response) => {
  const user: string = req.body.user;
  if (!user) return res.status(400).json({ message: "Missing parameters" });
  try {
    const dbRes = await sql.query(
      `SELECT * FROM Administradores WHERE usuario LIKE '${user}'`
    );
    const userResult = dbRes.recordset[0];
    if (!userResult)
      return res.status(401).json({ message: "Invalid Credentials", data: {} });

    const password: string = req.body.password;
    if (userResult.contrasena !== password)
      return res.status(401).json({ message: "Invalid credentials", data: {} });

    const dbWorkerRes = await sql.query(
      `SELECT * FROM EMPLEADOS WHERE ID = ${userResult.ID_empleado}`
    );
    const worker = dbWorkerRes.recordset[0];

    const payload = {
      idGerente: userResult.ID,
      empleado: worker,
    };
    const SECRET_KEY: string = process.env.SECRET_KEY || "";
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .cookie("access_token", token, {
        sameSite: "strict",
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60,
      })
      .json({
        message: "login successfully",
        data: worker,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error while login" });
  }
});

gerenteRouter.get("/gerente", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "GERENTE VIEW",
  });
});
