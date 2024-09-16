import { auth } from "express-oauth2-jwt-bearer";
import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

// auth0
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  // Bearer 1231654848 // Bearer <token>
  const token = authorization?.split(" ")[1]; // 1231654848

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload; // decodes the JWT to read its payload (without verifying the signature).
    const auth0Id = decoded.sub;

    const user = await User.findOne({ auth0Id });
    if (!user) return res.sendStatus(401);

    req.auth0Id = auth0Id as string;
    // mongodb id
    req.userId = user._id.toString();

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
};

// Decoded JWT Payload:
// {
//   "sub": "auth0|1234567890",
//   "name": "John Doe",
//   "email": "john.doe@example.com",
//   "iss": "https://your-auth0-domain/",
//   "aud": "your-audience-id",
//   "exp": 1694528347,
//   "iat": 1694524747
// }
/**
 * express-oauth2-jwt-bearer is a middleware library for Express.js that helps validate JWTs issued by an OAuth2 provider (like Auth0) in your Express application.
 * Security: It ensures that only requests with valid JWTs are allowed to access protected resources. This helps secure your API endpoints against unauthorized access.
 *
 * The provided code sets up JWT validation middleware for an Express.js application using express-oauth2-jwt-bearer. The jwtCheck middleware ensures that requests are authenticated by verifying JWTs against the specified audience, issuer, and signing algorithm. This setup enhances the security of your application by ensuring that only requests with valid tokens can access protected resources.
 */
