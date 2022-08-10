import React, { useEffect } from 'react'
import './App.css'
import Navbar from "./components/Navbar"

function App() {
	useEffect(() => {
		document.title = "PizzFlux | Pizza Ordering App"
	}, [])
	return (
		<>
			<Navbar />
		</>
	)
}

export default App
