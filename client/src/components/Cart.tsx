import { FC, useEffect, useState } from "react"

import "./cart.styles.css"
import CartItem from "./CartItem"
import CartItemType from "../types/CartItemType"

const Cart: FC = (): JSX.Element => {
	const [ price, setPrice ] = useState(0)
	const serverResponse: CartItemType[] = [
		{
			"id": 1,
			"UserId": 1,
			"pizza": "Margherita",
			"ingredients": "[]",
			"pizzaPrice": 449,
			"ingredientsPrice": 0,
			"createdAt": "2022-08-15T08:49:13.164Z",
			"updatedAt": "2022-08-15T08:49:13.164Z",
		},
		{
			"id": 2,
			"UserId": 1,
			"pizza": "Tandoori Paneer",
			"ingredients": "[\"Jalapenos\",\"Olives\"]",
			"pizzaPrice": 579,
			"ingredientsPrice": 50,
			"createdAt": "2022-08-15T08:49:18.347Z",
			"updatedAt": "2022-08-15T08:49:18.347Z",
			
		},
		{
			"id": 3,
			"UserId": 1,
			"pizza": "Double Paneer Supreme",
			"ingredients": "[\"Tomatoes\",\"Olives\",\"Onion\"]",
			"pizzaPrice": 659,
			"ingredientsPrice": 90,
			"createdAt": "2022-08-15T08:49:22.395Z",
			"updatedAt": "2022-08-15T08:49:22.395Z",
			
		},
		{
			"id": 4,
			"UserId": 1,
			"pizza": "Chicken Tikka",
			"ingredients": "[\"Tomatoes\",\"Baby Corn\",\"Capsicum\",\"Cheese\"]",
			"pizzaPrice": 749,
			"ingredientsPrice": 180,
			"createdAt": "2022-08-15T08:49:27.342Z",
			"updatedAt": "2022-08-15T08:49:27.342Z",
			
		}
	]
	useEffect(() => {
		let total = 0
		serverResponse.forEach((response: CartItemType) => {
			total += response.pizzaPrice
		})
		setPrice(total)
	}, [])
	
	return (
		<>
			<div className="cartTitle">
				My Cart
			</div>
			<div className="pizzaContainer">
				{
					serverResponse.map(item => {
						return <CartItem item={ item } key={item.id}/>
					})
				}
			</div>
			<div className="footer">
				
				<button className="orderButton">
					<div className="totalItems">
						{ serverResponse.length } Items
					</div>
					<div className="checkout">
						Checkout
					</div>
					<div className="totalPrice">
						{price} ₹
					</div>
				
				</button>
			</div>
		</>
	)
}

export default Cart