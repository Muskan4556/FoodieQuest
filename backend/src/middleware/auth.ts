import { auth } from "express-oauth2-jwt-bearer";

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

/**
 * express-oauth2-jwt-bearer is a middleware library for Express.js that helps validate JWTs issued by an OAuth2 provider (like Auth0) in your Express application.
 * Security: It ensures that only requests with valid JWTs are allowed to access protected resources. This helps secure your API endpoints against unauthorized access.
 *
 * The provided code sets up JWT validation middleware for an Express.js application using express-oauth2-jwt-bearer. The jwtCheck middleware ensures that requests are authenticated by verifying JWTs against the specified audience, issuer, and signing algorithm. This setup enhances the security of your application by ensuring that only requests with valid tokens can access protected resources.
 */
