import React, { createContext, useContext, useEffect, useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar"
import Pizzas from "./components/Pizzas"
import { Route, Routes, useNavigate } from "react-router-dom"
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import UserContext from './UserContext'
import Cart from "./components/Cart"
import Orders from "./components/Orders"


function App() {
	useEffect(() => {
		document.title = "PizzFlux | Pizza Ordering App"
	}, [])
	
	const [ loggedIn, setLoggedIn ] = useState(false)
	
	const navigate = useNavigate()
	return (
		<>
			{/*// TODO - Add type declaration*/ }
			<UserContext.Provider value={ { loggedIn, setLoggedIn } as any }>
				<Navbar/>
				<div style={{backgroundColor: "#fefae0"}}>
					<Routes>
						<Route path={ "/" } element={ <> <h1>Hello</h1></> }/>
						<Route path={ "/pizzas" } element={ <Pizzas/> }/>
						<Route path={ "/signIn" } element={ <SignIn/> }/>
						<Route path={ "/signUp" } element={ <SignUp/> }/>
						<Route path={"/cart"} element={<Cart />} />
						<Route path={"/orders"} element={<Orders />} />
					</Routes>
				</div>
			</UserContext.Provider>
		</>
	)
}

export default App
