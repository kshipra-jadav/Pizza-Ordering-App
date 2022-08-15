import { FC, useEffect, useState } from "react"
import axios from "axios"

import "./cart.styles.css"
import CartItem from "./CartItem"
import CartItemType from "../types/CartItemType"

const Cart: FC = (): JSX.Element => {
	const [ price, setPrice ] = useState(0)
	const [ serverResponse, setServerResponse ] = useState<CartItemType[]>([])
	useEffect(() => {
		async function getCartItems() {
			const token = localStorage.getItem("accessToken")
			const email = localStorage.getItem('userEmail')
			const headerConfig = { headers: { Authorization: `Bearer ${ token }` } }
			
			const { data } = await axios.get(`http://localhost:5001/api/users/id/${ email }`, headerConfig)
			const userId = await data.userId
			
			const response = await axios.get(`http://localhost:5001/api/cart/${ userId }`, headerConfig)
			setServerResponse(response.data)
			
		}
		
		getCartItems()
		
		console.log(serverResponse)
	}, [])
	
	useEffect(() => {
		let total = 0
		serverResponse.forEach((response: CartItemType) => {
			total += response.pizzaPrice
		})
		setPrice(total)
	}, [ serverResponse ])
	
	const handleCheckout = () => {
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