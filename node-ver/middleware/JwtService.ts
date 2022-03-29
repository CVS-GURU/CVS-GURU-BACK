import express from 'express';
import jwt from 'jsonwebtoken';

export default class JwtService {
  static getUserIdFromRequest = (req: express.Request): string | null => {
    const token = this.extractTokenFromRequest(req)
    if (!token) {
      return null
    }
    const jwtPayload = this.decodeJWT(token)
    return (jwtPayload as any)?.id || null
  }

  static extractTokenFromRequest = (req: express.Request): string | undefined => {
    const TOKEN_PREFIX = 'Bearer '
    const auth = req.headers.authorization
    const token = auth?.includes(TOKEN_PREFIX) ? auth.split(TOKEN_PREFIX)[1] : auth
    return token
  }

  static decodeJWT = (token: string) => {
    try {
      const decodedToken = jwt.verify(token, 'cvs_guru_token')
      return decodedToken
    } catch (error) {
      return null
    }
  }

  // user type정의 필요
  static createJWT = (user: any) => {
    const token = jwt.sign(
      {id: user.id},
    'cvs_guru_token'
    )

    return token
  }

}