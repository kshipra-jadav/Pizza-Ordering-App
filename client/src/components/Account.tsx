import { FC } from "react"

import "./account.styles.css"

const Account: FC = (): JSX.Element => {
	return (
		<>
			<div className="account">
				<div className="account-items">
					<div>Kshipra Jadav</div>
					<hr />
					<div>My Account</div>
					<hr />
					<div>My Cart</div>
					<hr />
					<div>Previous Orders</div>
				</div>
			</div>
		</>
	)
}

export default Account
