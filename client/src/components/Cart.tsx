import { FC, useEffect, useState } from "react"
import axios from "axios"

import "./cart.styles.css"
import CartItem from "./CartItem"
import CartItemType from "../types/CartItemType"
import { Pizza_Price } from "../types/Pizza_Price"
import { message } from "antd"
import success from "../assets/success.png"

const Cart: FC = (): JSX.Element => {
	const [ price, setPrice ] = useState(0)
	const [ serverResponse, setServerResponse ] = useState<CartItemType[]>([])
	const [ userId, setUserId ] = useState(0)
	
	const successConfig = {
		content: <h1>Order Successfully Placed!</h1>,
		icon: <img src={ success } alt={ "" } width={ "60px" } height={ "60px" }/>
	}
	
	useEffect(() => {
		async function getCartItems() {
			const token = localStorage.getItem("accessToken")
			const email = localStorage.getItem('userEmail')
			const headerConfig = { headers: { Authorization: `Bearer ${ token }` } }
			
			const { data } = await axios.get(`http://localhost:5001/api/users/id/${ email }`, headerConfig)
			const userId = await data.userId
			setUserId(userId)
			const response = await axios.get(`http://localhost:5001/api/cart/${ userId }`, headerConfig)
			setServerResponse(response.data)
			
		}
		
		getCartItems()
		
	}, [])
	
	useEffect(() => {
		let total = 0
		serverResponse.forEach((response: CartItemType) => {
			total += response.pizzaPrice
		})
		setPrice(total)
	}, [ serverResponse ])
	
	
	const handleCheckout = async () => {
		if (!serverResponse.length) return
		const pizza_price: Pizza_Price[] = []
		serverResponse.forEach(res => {
			const obj = {
				"pizza": res.pizza,
				"price": res.pizzaPrice
			}
			pizza_price.push(obj)
		})
		const orderItem = {
			"UserId": userId,
			"pizza_price": JSON.stringify(pizza_price)
		}
		const token = localStorage.getItem('accessToken')
		const headerConfig = { headers: { Authorization: `Bearer ${ token }` } }
		try {
			await axios.post('http://localhost:5001/api/orders/create', orderItem, headerConfig)
			await axios.delete(`http://localhost:5001/api/cart/${ userId }`, headerConfig)
			message.success(successConfig)
			
		} catch (e) {
			console.log(e)
		}
		
		setServerResponse([])
	}
	
	return (
		<>
			<div className="mainCartContainer">
				
				<div className="cartTitle">
					My Cart
				</div>
				<div className="pizzaContainer">
					{
						serverResponse.map(item => {
							return <CartItem item={ item } key={ item.id }/>
						})
					}
				</div>
				<div className="footer">
					
					<button className="orderButton" onClick={ handleCheckout }>
						<div className="totalItems">
							{ serverResponse.length } Items
						</div>
						<div className="checkout">
							Checkout
						</div>
						<div className="totalPrice">
							{ price } ₹
						</div>
					
					</button>
				</div>
			</div>
		</>
	)
}

export default Cart