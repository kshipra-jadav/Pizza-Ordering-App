import React, { useEffect } from 'react'
import './App.css'
import Navbar from "./components/Navbar"
import Pizzas from "./components/Pizzas"

function App() {
	useEffect(() => {
		document.title = "PizzFlux | Pizza Ordering App"
	}, [])
	return (
		<>
			<Navbar />
			<Pizzas />
		</>
	)
}

export default App
