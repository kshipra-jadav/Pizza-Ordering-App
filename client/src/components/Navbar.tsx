import { FC, useState, MouseEvent, MouseEventHandler } from "react"

import "./navbar.styles.css"
import logo from "../assets/logo.png"
import dp from "../assets/dp but jpeg.jpg"
import Account from "./Account"

const Navbar: FC = (): JSX.Element => {
	const [clicked, setClicked] = useState(false)

	const handleClick: MouseEventHandler = (
		e: MouseEvent<HTMLImageElement>,
	): void => {
		if (!clicked) setClicked(true)
		if (clicked) setClicked(false)
	}

	return (
		<>
			<div className={"navbar"}>
				<div className="info">
					<img src={logo} alt={""} className={"logo"} />
					<div className="logo-title">PizzFlux</div>
				</div>
				<div className="profile">
					<div className="pic">
						<img src={dp} alt="" className="profilepic" onClick={handleClick} />
					</div>
				</div>
			</div>
			{clicked && <Account />}
		</>
	)
}

export default Navbar
