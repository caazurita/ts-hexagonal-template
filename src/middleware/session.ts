import { NextFunction, Request, Response } from "express";
import { JwtTokenAdapter } from "src/lib/auth/infraestructure/JwtTokenAdapter";
import { JwtPayload } from "jsonwebtoken";

const jwtTokenAdapter = new JwtTokenAdapter();
const checkSession = async (req: any, res: Response, next: NextFunction) => {
  const accessToken = req.headers["authorization"];
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken && !refreshToken) {
    res.status(401).send("NO_TOKEN_PROVIDED");
  } else {
    try {
      const jwt = accessToken ? accessToken.split(" ").pop() : "";
      const decoded = jwtTokenAdapter.verifyAccessToken(jwt);
      req.user = decoded;
      next();
    } catch (error) {
      if (!refreshToken) {
        res.status(401).send("NO_REFRESH_TOKEN_PROVIDED");
      } else {
        try {
          const decode: any = jwtTokenAdapter.verifyAccessToken(refreshToken);
          const accessToken = jwtTokenAdapter.generateAccessToken(decode, "1m");

          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.ENVIRONMENT === "production",
            sameSite: "none",
          });
          res.json({ accessToken });
        } catch (error) {
          res.status(401);
          res.send("SESSION_NOT_VALID");
        }
      }
    }
  }
};

export default checkSession;
