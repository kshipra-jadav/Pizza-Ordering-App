import { FC, useEffect, useState } from "react"

import axios from "axios"
import { Collapse } from "antd"
import './orders.styles.css'

const { Panel } = Collapse

interface OrderType {
	id: number
	UserId: number
	pizza_price: string
}


const Orders: FC = (): JSX.Element => {
	const [ orders, setOrders ] = useState<OrderType[]>([])
	useEffect(() => {
		const email = localStorage.getItem("userEmail")
		const token = localStorage.getItem("accessToken")
		
		async function getOrders() {
			const headerConfig = { headers: { Authorization: `Bearer ${ token }` } }
			const response = await axios.get(`http://localhost:5001/api/users/id/${ email }`, headerConfig)
			const userId: number = await response.data.userId
			const { data } = await axios.get(`http://localhost:5001/api/orders/${ userId }`, headerConfig)
			setOrders(data)
		}
		
		getOrders()
	}, [])
	
	if (orders.length) {
		const parsedArray = orders.map(order => JSON.parse(order.pizza_price))
		parsedArray.map(arr => console.log(arr))
	}
	let total = 0
	return (
		<>
			<div className="orderTitle">
				My Orders
			</div>
			<div className="mainOrderContainer">
				<Collapse defaultActiveKey={ [ '1' ] } accordion={ true }>
					{
						orders.map(order => {
							total++
							return (
								<Panel
									key={ total }
									header={ `Pizza Order #${ total }` }
									className={ "orderPanel" }
								>
									<ol>
										{
											JSON.parse(order.pizza_price).map((item: any) => {
												return (
													<li>{ item.pizza } :-  <b>{ item.price } ₹</b></li>
												)
											})
										}
									</ol>
								</Panel>
							)
						})
						
					}
				</Collapse>
			</div>
		
		</>
	)
}

export default Orders
