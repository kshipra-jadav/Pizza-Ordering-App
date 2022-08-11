import { FC, useEffect, useState, MouseEvent } from "react"
import { Button, Card, Checkbox, Col, Dropdown, Menu, MenuProps } from "antd"
import 'antd/dist/antd.css'
import { ShoppingCartOutlined } from "@ant-design/icons"
import Select, { Options } from "react-select"
import axios from "axios"

import { Pizza } from "../types/Pizza"
import "./pizzacard.styles.css"
import veg from "../assets/veg.jpg"
import non_veg from "../assets/non veg.png"
import { Ingredient } from "../types/Ingredient"
import { Topping } from "../types/Topping"

interface PizzaCardProps {
	item: Pizza
	ingredients: Ingredient[]
}

const PizzaCard: FC<PizzaCardProps> = ({ item, ingredients }): JSX.Element => {
	const [ price, setPrice ] = useState(0)
	const [ total, setTotal ] = useState(0)
	const [ toppings, setToppings ] = useState<Topping[]>([])
	const [ pizza, setPizza ] = useState("")
	
	
	useEffect(() => {
		setPrice(item.price)
		setPizza(item.name)
	}, [])
	
	
	
	const handleSelect = (option: any) => {
		let total = 0
		let finalToppings: Topping[] = []
		option.forEach((item: any) => {
			total += item.additionalCost
			finalToppings.push(item.value)
		})
		setTotal(total)
		setToppings(finalToppings)
	}
	
	const addToCart = (e: MouseEvent<HTMLButtonElement>) => {
		console.log(`Pizza Taken :- ${pizza}`)
		console.log(`Toppings Total :- ${total}`)
		console.log(`Ingredients :- ${JSON.stringify(toppings)}`)
		console.log(`Total Prize of Pizza :- ${price + total}`)
		
	}
	
	return (
		<>
			<Col className={ "gutter-row" } span={ 8 } style={ {
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				marginTop: "20px"
			} }>
				<Card
					hoverable
					style={ { width: 400 } }
					cover={ <img
						src={ item.img }
						alt={ "" } className={ "cover-image" }/> }
				>
					<div className="text-container">
						<div className="title">
							<div>{ item.name }</div>
							<div>
								{ item.veg ? <img src={ veg } className={ "vegIcon" } alt={ "" }/> :
									<img src={ non_veg } className={ "vegIcon" } alt={ "" }/> }
							</div>
						</div>
						<div className="price">{ price } ₹</div>
						<div className="desc">{ item.description.replaceAll(/\\/g, "\n") }</div>
					</div>
					
					<div className="dropdown">
						<div className="select" style={ { width: "250px" } }>
							
							<Select options={ ingredients }
							        closeMenuOnSelect={ false }
							        isMulti={ true }
							        onChange={ handleSelect }
							        placeholder={ "Ingredients" }
							/>
						</div>
						<Button type="ghost" shape="round" icon={ <ShoppingCartOutlined/> } size={ 'large' }
						        onClick={ addToCart }/>
					</div>
				
				</Card>
			</Col>
		</>
	)
}

export default PizzaCard