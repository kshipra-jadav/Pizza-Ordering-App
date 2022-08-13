import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	Req,
	UseGuards
} from '@nestjs/common'
import { UsersService } from "./users.service"
import { User } from "./user.model"
import { oneUser } from "./oneUser.type"
import { Request } from "express"
import { JwtAuthGuard } from "./jwt-auth.guard"

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}
	
	@Post('/create')
	async createUser(@Body() user: User) {
		const usr = await this.userService.createUser(user)
		if(usr) return {msg: "User Created"}
		else return new HttpException("Something went wrong in creating the user", HttpStatus.BAD_REQUEST)
	}
	
	@Post('/authUser')
	async authorizeUser(@Req() req: Request, @Body() user: oneUser) {
		return req.body.access_token
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('/mycart')
	async getMyCart() {
		return {msg: "My Cart"}
	}
	
	@UseGuards(JwtAuthGuard)
	@Get('/:email')
	async getUserByEmail(@Param('email') email: string) {
		const user = await this.userService.findByEmail(email)
		return {
			fullName: user.fullName,
			email: user.email,
			phoneNumber: user.phoneNumber,
			address: user.address,
			imgUrl: user.imageUrl
		}
	}
	
	@Get('/id/:id')
	async getUserById(@Param('id', ParseIntPipe) id: number) {
		return await this.userService.findById(id)
	}
	
	
	
	
}
