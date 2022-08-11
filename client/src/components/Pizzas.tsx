import { FC, useEffect, useState } from "react"

import axios from "axios"
import { Pizza } from "../types/Pizza"
import PizzaCard from "./PizzaCard"
import { Row } from "antd"

const Pizzas: FC = (): JSX.Element => {
	const [ items, setItems ] = useState<Pizza[]>([])
	useEffect(() => {
		async function getItems() {
			const { data } = await axios.get('http://localhost:5001/api/pizza/all')
			setItems(data)
		}
		
		getItems()
	}, [])
	return (
		<>
			
			<Row gutter={[5, 30]} style={{backgroundColor: "#fefae0"}}>
				{
					items.map(item => {
						return <PizzaCard item={item} key={item.id} />
					})
				}
			</Row>
		</>
	)
}

export default Pizzas