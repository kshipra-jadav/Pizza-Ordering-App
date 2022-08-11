import { FC, useEffect, useState, MouseEvent } from "react"
import { Button, Card, Checkbox, Col, Dropdown, Menu, MenuProps } from "antd"
import 'antd/dist/antd.css'
import { ShoppingCartOutlined } from "@ant-design/icons"
import Select, { Options } from "react-select"

import { Pizza } from "../types/Pizza"
import "./pizzacard.styles.css"
import veg from "../assets/veg.jpg"
import non_veg from "../assets/non veg.png"

interface PizzaCardProps {
	item: Pizza
}

const PizzaCard: FC<PizzaCardProps> = ({ item }): JSX.Element => {
	const [ price, setPrice ] = useState(0)
	const [ pizzaDesc, setPizzaDesc ] = useState([])
	const [ total, setTotal ] = useState(0)
	
	useEffect(() => {
		setPrice(item.price)
	}, [])
	
	
	const ingredients = [
		{ value: "Onion", label: "Onion - 20₹", id: 1, pizza: item.name, additionalCost: 20 },
		{ value: "Capsicum", label: "Capsicum - 10₹", id: 2, pizza: item.name, additionalCost: 10 },
		{ value: "Olives", label: "Olives - 30₹", id: 3, pizza: item.name, additionalCost: 30 },
		{ value: "Baby Corn", label: "Baby Corn - 50₹", id: 4, pizza: item.name, additionalCost: 50 },
		{ value: "Jalapenos", label: "Jalapenos - 20₹", id: 5, pizza: item.name, additionalCost: 20 },
	]
	
	
	const handleSelect = (option: any) => {
		let total = 0
		option.forEach((item: any) => {
			total += item.additionalCost
		})
		setTotal(total)
		setPizzaDesc(option)
	}
	
	const handleBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
		const toppings = []
		
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
						        onClick={ handleBtnClick }/>
					</div>
				
				</Card>
			</Col>
		</>
	)
}

export default PizzaCard