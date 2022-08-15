import { FC, useContext, useState } from "react"
import { Alert, Button, Form, Input, message } from "antd"
import axios from "axios"
import UserContext from "../UserContext"
import success from "../assets/success.png"
import error from "../assets/error.png"
import { useNavigate } from "react-router-dom"

const SignIn: FC = (): JSX.Element => {
	const [errorDesc, setErrorDesc] = useState("")

	const [form] = Form.useForm()

	const { loggedIn, setLoggedIn }: any = useContext(UserContext)

	const successConfig = {
		content: <h1>Successfully Logged In!</h1>,
		icon: <img src={success} alt={""} width={"60px"} height={"60px"} />,
	}

	const navigate = useNavigate()

	const handleFinish = async (e: any): Promise<void> => {
		const { email, password } = e
		form.resetFields()

		try {
			const { data } = await axios.post(
				"http://localhost:5001/api/users/authUser",
				{ email, password },
			)
			localStorage.setItem("accessToken", data.access_token)
			localStorage.setItem("userEmail", email)
			setLoggedIn(true)
			message.success(successConfig)
			setTimeout(() => {
				navigate("/pizzas")
			}, 2000)
		} catch (e: any) {
			message.error({
				content: <h1>{e.response.data}</h1>,
				icon: <img src={error} alt={""} width={"60px"} height={"60px"} />,
			})
		}
	}
	return (
		<>
			<div className="head" style={{ backgroundColor: "#fefae0" }}>
				Sign In Into Your Account!
			</div>
			<div className="form" style={{ backgroundColor: "#fefae0" }}>
				<Form
					labelCol={{ span: 10 }}
					wrapperCol={{ span: 50 }}
					onFinish={handleFinish}
					form={form}
				>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								required: true,
								message: "Please enter your email",
							},
							{ type: "email", message: "Please enter a valid email" },
						]}
						hasFeedback
					>
						<Input placeholder="Enter Your Email" />
					</Form.Item>

					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
							},
						]}
						hasFeedback
					>
						<Input.Password placeholder="Type your password" />
					</Form.Item>
					<Form.Item name={"submit"}>
						<Button
							block
							type={"primary"}
							htmlType={"submit"}
							style={{ width: "100%" }}
						>
							{" "}
							Submit{" "}
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	)
}

export default SignIn
