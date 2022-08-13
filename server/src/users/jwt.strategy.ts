import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { Injectable } from "@nestjs/common"

import * as dotenv from 'dotenv'
import { UsersService } from "./users.service"
import { User } from "./user.model"

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET
		})
	}
	
	async validate(payload: any) {
		const user: User = await this.userService.findById(payload.userId)
		const { fullName, email, phoneNumber, address } = user.toJSON()
		const finalPayload = { fullName, email, phoneNumber, address }
		
		console.log(finalPayload)
		return payload
	}
}