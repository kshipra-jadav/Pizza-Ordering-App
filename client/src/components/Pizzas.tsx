import { FC, useEffect, useState } from "react"

import axios from "axios"
import { Pizza } from "../types/Pizza"
import PizzaCard from "./PizzaCard"
import { Row } from "antd"
import { Ingredient } from "../types/Ingredient"

const Pizzas: FC = (): JSX.Element => {
	const [ items, setItems ] = useState<Pizza[]>([])
	const [ ingredients, setIngredients ] = useState<Ingredient[]>([])
	
	useEffect(() => {
		async function getItems() {
			const { data } = await axios.get('http://localhost:5001/api/pizza/all')
			setItems(data)
		}
		async function getIngredients() {
			const { data } = await axios.get('http://localhost:5001/api/ingredients/all')
			setIngredients(data)
		}
		getItems()
		getIngredients()
	}, [])
	return (
		<>
			
			<Row gutter={[5, 30]} style={{backgroundColor: "#fefae0"}}>
				{
					items.map(item => {
						return <PizzaCard item={item} key={item.id} ingredients={ingredients} />
					})
				}
			</Row>
		</>
	)
}

export default Pizzas