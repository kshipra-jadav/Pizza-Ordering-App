import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class CreateJWTMiddleware implements NestMiddleware {
	
	constructor(private readonly jwtService: JwtService) {
	}
	
	use(req: Request, res: Response, next: NextFunction) {
		const userId = req.body.user.userId
		const email = req.body.user.email
		req.body.access_token = { access_token: this.jwtService.sign({ userId, email }) }
		
		next()
	}
}