import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PizzaModule } from './pizza/pizza.module'
import { SequelizeModule } from "@nestjs/sequelize"
import { IngredientsModule } from './ingredients/ingredients.module';
import { UsersModule } from './users/users.module';
import { CartModule } from './cart/cart.module';

@Module({
	imports: [ SequelizeModule.forRoot({
		dialect: 'postgres',
		host: 'localhost',
		port: 5425,
		username: 'postgres',
		password: 'postgres',
		database: 'pizzastore',
		autoLoadModels: true,
		synchronize: true,
	}), PizzaModule, IngredientsModule, UsersModule, CartModule ],
	controllers: [ AppController ],
	providers: [ AppService ],
})
export class AppModule {
}
