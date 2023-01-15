import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    accessToken: string,
    accessTokenExpiry: number,
  }

  interface User {
    accessToken: string,
    accessTokenExpiry: number,
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string,
    accessTokenExpiry: number,
    username: string,
    exp: number,
  }
}