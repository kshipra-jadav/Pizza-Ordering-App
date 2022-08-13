import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"

@Injectable()
export class GenerateImageMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: NextFunction) {
		let userName = req.body.fullName
		userName = userName.replaceAll(" ", "")
		
		req.body.imageUrl = `https://robohash.org/${ userName }`
		
		next()
	}
}