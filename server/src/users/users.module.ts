import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { JwtModule } from "@nestjs/jwt"
import { JwtStrategy } from "./jwt.strategy"
import { SequelizeModule } from "@nestjs/sequelize"

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from "./user.model"
import { HashPasswordMiddleware } from "./hash-password.middleware"
import { AuthorizeUserMiddleware } from "./authorizeUser.middleware"
import { CreateJWTMiddleware } from "./createJWT.middleware"
import { GenerateImageMiddleware } from "./generateImage.middleware"

import * as dotenv from 'dotenv'

dotenv.config()

@Module({
	imports: [ SequelizeModule.forFeature([ User ]), JwtModule.register({
		secret: process.env.JWT_SECRET,
		signOptions: { expiresIn: "5m" }
	}) ],
	controllers: [ UsersController ],
	providers: [ UsersService, JwtStrategy ]
})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(HashPasswordMiddleware)
			.forRoutes({
				path: 'users/create',
				method: RequestMethod.POST
			})
		
		consumer.apply(GenerateImageMiddleware)
			.forRoutes({
				path: "users/create",
				method: RequestMethod.POST
			})
		
		consumer.apply(AuthorizeUserMiddleware)
			.forRoutes({
				path: "users/authUser",
				method: RequestMethod.POST
			})
		consumer.apply(CreateJWTMiddleware)
			.forRoutes({
				path: "users/authUser",
				method: RequestMethod.POST
			})
	}
}
