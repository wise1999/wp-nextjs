import { API_URL } from "@/constants"
import jwt_decode from "jwt-decode";
import NextAuth, { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials"

async function refreshAccessToken(tokenObject: JWT) {
  try {
    // Get a new set of tokens with a refreshToken
    const refreshTokenRequest = await fetch(API_URL + "?rest_route=/simple-jwt-login/v1/auth/validate", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokenObject.accessToken}`
      }
    })

    const refreshTokenResponse = await refreshTokenRequest.json()

    const decodedToken = jwt_decode(refreshTokenResponse) as JWT

    return {
      ...tokenObject,
      accessToken: refreshTokenResponse.data.jwt,
      accessTokenExpiry: decodedToken.exp,
    }
  } catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "mail@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(API_URL + "?rest_route=/simple-jwt-login/v1/auth", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })

        const token = await res.json()

        if (!token.success) {
          throw new Error(token.data.message)
        }

        const decodedToken = jwt_decode(token.data.jwt) as JWT

        return {
          name: decodedToken.username,
          email: decodedToken.email,
          accessToken: token.data.jwt,
          accessTokenExpiry: decodedToken.exp,
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.accessTokenExpiry = user.accessTokenExpiry;
      }

      const tokenExpiry = token.accessTokenExpiry as number;
      const shouldRefreshTime = Math.round((tokenExpiry - 60 * 30) - Math.floor(Date.now() / 1000));

      if (shouldRefreshTime > 0) {
        return Promise.resolve(token);
      }

      token = await refreshAccessToken(token);
      return Promise.resolve(token);
    },

    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.accessTokenExpiry = token.accessTokenExpiry;
      session.error = token?.error;
      return Promise.resolve(session);
    },
  },
  secret: process.env.SECRET_KEY,
  session: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
}

export default NextAuth(authOptions)