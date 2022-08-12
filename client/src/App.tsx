import React, { useEffect } from 'react'
import './App.css'
import Navbar from "./components/Navbar"
import Pizzas from "./components/Pizzas"
import { Route, Routes } from "react-router-dom"
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"

function App() {
	useEffect(() => {
		document.title = "PizzFlux | Pizza Ordering App"
	}, [])
	return (
		<>
			<Navbar />
			<Routes>
				<Route path={"/"} element={<h1>Home Route</h1>} />
				<Route path={"/pizzas"} element={<Pizzas />} />
				<Route path={"/signIn"} element={<SignIn />} />
				<Route path={"/signUp"} element={<SignUp />} />
			</Routes>
		</>
	)
}

export default App
