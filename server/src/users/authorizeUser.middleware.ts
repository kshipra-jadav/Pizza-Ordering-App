import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"
import { UsersService } from "./users.service"

import * as bcrypt from "bcrypt"

@Injectable()
export class AuthorizeUserMiddleware implements NestMiddleware {
	
	constructor(private readonly userService: UsersService) {}
	
	async use(req: Request, res: Response, next: NextFunction) {
		const email = req.body.email
		
		const user = await this.userService.findByEmail(email)
		
		if(!user) return res.status(HttpStatus.NOT_FOUND).send("User Not Found")
		
		const plainPassword = req.body.password
		const hashedPassword = user.getDataValue("password")
		
		const compare = await bcrypt.compare(plainPassword, hashedPassword)
		
		if(!compare) return res.status(HttpStatus.FORBIDDEN).send("Wrong Password")
		
		req.body.user = user
		
		next()
	}
}