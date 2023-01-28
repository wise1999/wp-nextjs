import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    userId: number,
    accessToken: string,
    accessTokenExpiry: number,
  }

  interface Session {
    userId: number,
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
    userId: number,
    exp: number,
    error: string,
  }
}