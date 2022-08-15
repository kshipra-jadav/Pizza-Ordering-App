import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home: FC = (): JSX.Element => {
	const navigate = useNavigate()
	useEffect(() => {
		navigate('/pizzas')
	}, [])
	return (
		<>
		</>
	)
}

export default Home
