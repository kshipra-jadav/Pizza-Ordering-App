import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"

import * as bcrypt from 'bcrypt'


@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
	private saltRounds = 10
	
	async use(req: Request, res: Response, next: NextFunction) {
		const plainPassword = req.body.password
		
		req.body.password = await bcrypt.hash(plainPassword, this.saltRounds)
		
		next()
	}
	
}