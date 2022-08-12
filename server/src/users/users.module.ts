import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { SequelizeModule } from "@nestjs/sequelize"
import { User } from "./user.model"
import { HashPasswordMiddleware } from "./hash-password.middleware"

@Module({
	imports: [ SequelizeModule.forFeature([ User ]) ],
	controllers: [ UsersController ],
	providers: [ UsersService ]
})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer): any {
		consumer.apply(HashPasswordMiddleware)
			.forRoutes({
				path: 'users/create',
				method: RequestMethod.POST
			})
	}
}
