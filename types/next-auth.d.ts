import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    accessToken: string,
    accessTokenExpiry: number,
  }
  interface Session {
    accessToken: string,
    accessTokenExpiry: number,
    error: string,
  }

}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string,
    accessTokenExpiry: number,
    username: string,
    exp: number,
    error: string,
  }

}