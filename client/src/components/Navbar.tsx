import { FC, useState, MouseEvent, MouseEventHandler, useEffect } from "react"

import "./navbar.styles.css"
import logo from "../assets/logo.png"
import dp from "../assets/dp but jpeg.jpg"
import empty from "../assets/empty.webp"
import { Button, Dropdown, Menu } from "antd"
import { Link } from "react-router-dom"

const Navbar: FC = (): JSX.Element => {
	const [ loggedIn, setLoggedIn ] = useState(false)
	const [ menuItems, setMenuItems ] = useState<any>([]) // sorry :P
	useEffect(() => {
		if (loggedIn) {
			let myItems = [
				{
					key: '1',
					label: (
						"Kshipra Jadav"
					),
					disabled: true
				},
				{
					type: "divider"
				},
				{
					key: '2',
					label: (
						<a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
							Your Account
						</a>
					),
				},
				{
					type: "divider"
				},
				{
					key: '3',
					label: (
						<a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
							Your Cart
						</a>
					),
				},
				{
					type: "divider"
				},
				{
					key: '4',
					label: (
						<a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
							Previous Orders
						</a>
					),
				},
			]
			setMenuItems(myItems)
		} else {
			let myItems = [
				{
					key: '1',
					label: (
						"You Are Not Signed In"
					),
					disabled: true
				},
				{
					type: "divider"
				},
				{
					key: '2',
					label: ( <Link to={ "/signIn" }> Sign In If You Already Have An Account </Link> )
				},
				{
					type: "divider"
				},
				{
					key: '3',
					label: ( <Link to={ "/signUp" }>Sign Up To Make An Account</Link> )
				}
			]
			setMenuItems(myItems)
		}
	}, [])
	const menu = (
		<Menu
			items={menuItems}
			style={{
				width: "300px",
				height: "160px",
				textAlign: "center"
			}}
		/>
	)
	
	return (
		<>
			<div className={ "navbar" }>
				<div className="info">
					<img src={ logo } alt={ "" } className={ "logo" }/>
					<div className="logo-title">PizzFlux</div>
				</div>
				<div className="profile">
					<div className="pic">
						<Dropdown overlay={ menu } placement="bottomLeft" arrow trigger={['click']} >
							<img src={ loggedIn ? dp : empty } alt="" className="profilepic"/>
						</Dropdown>
					</div>
				</div>
			</div>
			
		</>
	)
}

export default Navbar
