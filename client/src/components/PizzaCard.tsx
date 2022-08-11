import { FC, useEffect, useState } from "react"
import { Button, Card, Checkbox, Col, Dropdown, Menu, MenuProps } from "antd"
import 'antd/dist/antd.css'

import { Pizza } from "../types/Pizza"
import "./pizzacard.styles.css"
import veg from "../assets/veg.jpg"
import non_veg from "../assets/non veg.png"
import { CheckboxChangeEvent } from "antd/es/checkbox"

interface PizzaCardProps {
	item: Pizza
}

const PizzaCard: FC<PizzaCardProps> = ({ item }): JSX.Element => {
	const [ visible, setVisible ] = useState(false)
	const [ price, setPrice ] = useState(0)
	const [ checked, setChecked ] = useState(true)
	
	useEffect(() => {
		setPrice(item.price)
	}, [])
	
	const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
		setVisible(true)
		console.log(`menu item clicked :- ${ key }`)
		checked && changePrice(parseInt(key))
	}
	
	const handleVisibleChange = (flag: boolean) => {
		setVisible(flag)
	}
	
	const onChange = (e: CheckboxChangeEvent) => {
		setChecked(!e.target.checked)
	}
	
	const changePrice = (key: number): void => {
		switch (key){
			case 1:
				setPrice((price + 20))
				break
			case 2:
				setPrice((price + 30))
				break
			case 3:
				setPrice((price + 10))
				break
			case 4:
				setPrice((price + 50))
				break
			case 5:
				setPrice((price + 20))
				break
		}
	}
	
	const ingredients = (
		<Menu
			items={ [
				{
					key: "1",
					label: <Checkbox onChange={onChange}>Onion - 20₹</Checkbox>
				},
				{
					key: "2",
					label: <Checkbox>Capsicum - 30₹</Checkbox>
				},
				{
					key: "3",
					label: <Checkbox>Olives - 10₹</Checkbox>
				},
				{
					key: "4",
					label: <Checkbox>Jalapeno - 50₹</Checkbox>
				},
				{
					key: "5",
					label: <Checkbox>Baby Corn - 20₹</Checkbox>
				},
			
			] }
			onClick={ handleMenuClick }
		/>
	)
	
	
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
						<Dropdown overlay={ ingredients }
						          placement="bottomLeft"
						          trigger={ [ "click" ] }
						          onVisibleChange={ handleVisibleChange }
						          visible={ visible }
						>
							<Button>Ingredients</Button>
						</Dropdown>
					</div>
				
				</Card>
			</Col>
		</>
	)
}

export default PizzaCard