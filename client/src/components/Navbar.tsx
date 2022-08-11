import { FC, useState, MouseEvent, MouseEventHandler } from "react"

import "./navbar.styles.css"
import logo from "../assets/logo.png"
import dp from "../assets/dp but jpeg.jpg"
import { Button, Dropdown, Menu } from "antd"

const Navbar: FC = (): JSX.Element => {
	const menu = (
		<Menu
			items={ [
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
			] }
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
							<img src={ dp } alt="" className="profilepic"/>
						</Dropdown>
					</div>
				</div>
			</div>
			
		</>
	)
}

export default Navbar
