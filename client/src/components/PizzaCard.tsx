import { FC, useEffect, useState, MouseEvent, useContext } from "react"
import { Button, Card, Checkbox, Col, Dropdown, Menu, MenuProps, message, Space } from "antd"
import 'antd/dist/antd.css'
import { ShoppingCartOutlined } from "@ant-design/icons"
import Select, { Options } from "react-select"
import axios from "axios"

import { Pizza } from "../types/Pizza"
import "./pizzacard.styles.css"
import veg from "../assets/veg.jpg"
import non_veg from "../assets/non veg.png"
import error from '../assets/error.png'
import success from '../assets/success.png'
import { Ingredient } from "../types/Ingredient"
import { Topping } from "../types/Topping"
import UserContext from "../UserContext"

interface PizzaCardProps {
	item: Pizza
	ingredients: Ingredient[]
}

const PizzaCard: FC<PizzaCardProps> = ({ item, ingredients }): JSX.Element => {
	const [ price, setPrice ] = useState(0)
	const [ total, setTotal ] = useState(0)
	const [ toppings, setToppings ] = useState<Topping[]>([])
	const [ pizza, setPizza ] = useState("")
	
	const { loggedIn, setLoggedIn }: any = useContext(UserContext)
	
	const errorConfig = {
		content: <h1>You Should Be Logged In To Add Your Pizza To Cart!</h1>,
		icon: <img src={ error } alt={ "" } width={ "60px" } height={ "60px" }/>,
	}
	
	const successConfig = {
		content: <h1>Pizza Successfully Added To Cart!</h1>,
		icon: <img src={ success } alt={ "" } width={ "60px" } height={ "60px" }/>
	}
	
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
	
	const addToCart = async (e: MouseEvent<HTMLButtonElement>) => {
		if (loggedIn) {
			const token = localStorage.getItem("accessToken")
			const email = localStorage.getItem('userEmail')
			const headerConfig = { headers: { Authorization: `Bearer ${ token }` } }
			
			const { data } = await axios.get(`http://localhost:5001/api/users/id/${ email }`, headerConfig)
			const userId = await data.userId
			
			const postData = {
				"UserId": userId,
				"pizza": pizza,
				"ingredients": JSON.stringify(toppings),
				"pizzaPrice": ( price + total ),
				"ingredientsPrice": total
			}
			try {
				
				await axios.post(`http://localhost:5001/api/cart/create`, postData, headerConfig)
			} catch(e) {
				message.error(errorConfig)
			}
			
			message.success(successConfig)
			
		} else {
			message.error(errorConfig)
		}
		
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