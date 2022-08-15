import { FC, useState, MouseEvent, MouseEventHandler, useEffect, useContext } from "react"
import axios, { AxiosResponse } from "axios"

import "./navbar.styles.css"
import logo from "../assets/logo.png"
import dp from "../assets/dp but jpeg.jpg"
import empty from "../assets/empty.webp"
import { Button, Dropdown, Menu } from "antd"
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../UserContext"

type UserType = {
	fullName: string
	email: string
	address: string
	phoneNumber: string
	imgUrl: string
}

const Navbar: FC = (): JSX.Element => {
	const emptyUser: UserType = {
		fullName: "",
		email: "",
		address: "",
		phoneNumber: "",
		imgUrl: ""
	}
	const [ menuItems, setMenuItems ] = useState<any>([]) // sorry :P
	
	const { loggedIn, setLoggedIn }: any = useContext(UserContext)
	
	const [ user, setUser ] = useState<UserType>(emptyUser)
	
	const navigate = useNavigate()
	
	useEffect(() => {
		async function validateUser() {
			const email = localStorage.getItem('userEmail')
			const token = localStorage.getItem('accessToken')
			try {
				
				const { data } = await axios.get('http://localhost:5001/api/users/validate', {
					headers: {
						Authorization: `Bearer ${ token }`
					}
				})
				if (email && token && data.statusCode===200) {
					setLoggedIn(true)
				}
			} catch(e: any) {
				console.error(e.message)
			}
		}
		validateUser()
	}, [])
	
	useEffect(() => {
		if (loggedIn) {
			// @ts-ignore // sorry :P
			async function setNavbar() {
				const email = localStorage.getItem('userEmail')
				const token = localStorage.getItem('accessToken')
				const {data} = await axios.get(`http://localhost:5001/api/users/${email}`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				setUser(data)
			}
			
			setNavbar()
		}
	}, [ loggedIn ])
	
	const handleSignOut = () => {
		localStorage.removeItem('userEmail')
		localStorage.removeItem('accessToken')
		setLoggedIn(false)
		navigate('/pizzas')
	}
	
	// TODO - Add Type Declaration
	const loggedInItems: any = [
		{
			key: '1',
			label: (
				user.fullName
			),
			disabled: true
		},
		{
			type: "divider"
		},
		{
			key: '2',
			label: (
				<Link to={'/cart'}>Your Cart</Link>
			),
		},
		{
			type: "divider"
		},
		
		{
			key: '3',
			label: (
				<a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
					Previous Orders
				</a>
			),
		},
		{
			type: "divider"
		},
		{
			key: '4',
			label: (
				<Link to={ '/pizzas' }> Order Pizza! </Link>
			),
		},
		{
			type: "divider"
		},
		{
			key: '5',
			label: (
				<div onClick = {handleSignOut}>Sign Out</div>
			),
		},
	]
	const loggedOutItems: any = [
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
	
	const menu = (
		<Menu
			items={ loggedIn ? loggedInItems : loggedOutItems }
			style={ {
				width: "300px",
				height: "200px",
				textAlign: "center"
			} }
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
						<Dropdown overlay={ menu } placement="bottomLeft" arrow trigger={ [ 'click' ] }>
							<img src={ loggedIn ? user.imgUrl : empty } alt="" className="profilepic"/>
						</Dropdown>
					</div>
				</div>
			</div>
		
		</>
	)
}

export default Navbar
