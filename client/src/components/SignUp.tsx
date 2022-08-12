import { FC, useState } from "react"
import { Form, Button, Input, InputNumber, Alert } from "antd"
import axios from "axios"

import "./signup.styles.css"
import { useNavigate } from "react-router-dom"


const SignUp: FC = (): JSX.Element => {
	let navigate = useNavigate()
	const [ success, setSuccess ] = useState(false)
	const [ error, setError ] = useState(false)
	const [ form ] = Form.useForm()
	
	
	const handleFinish = async (e: any): Promise<void> => {
		let { fullName, password, email, phoneNumber, address } = e
		form.resetFields()
		const user = {
			fullName,
			password,
			email,
			phoneNumber: phoneNumber.toString(),
			address
		}
		try {
			const { data } = await axios.post('http://localhost:5001/api/users/create', user)
			setSuccess(true)
			setTimeout(() => {
				navigate('/signIn')
			}, 5000)
		} catch (e) {
			setError(true)
		}
	}
	return (
		<>
			<div className="head" style={ { backgroundColor: "#fefae0" } }>
				Make an Account!
				{ success && <Alert
						message="Success!"
						description="Account Created Successfully! You'll be redirected to the SignIn page in 5 seconds"
						type="success"
						showIcon
						style={ { width: "50%" } }
				/>
				}
				{ error && <Alert
						message="Account Creation Error!"
						description="Something went wrong. Please Try Again"
						type="error"
						showIcon
						style={ { width: "50%" } }
				/>
				}
			</div>
			<div className="form" style={ { backgroundColor: "#fefae0" } }>
				<Form labelCol={ { span: 10 } } wrapperCol={ { span: 50 } } onFinish={ handleFinish } form={form}>
					<Form.Item
						label={ "Full Name" }
						name={ "fullName" }
						rules={ [
							{
								required: true,
								message: "Please Fill Out The Full Name"
							}
						] }>
						<Input placeholder={ "Enter Your Full Name" }/>
					</Form.Item>
					<Form.Item
						name="password"
						label="Password"
						rules={ [
							{
								required: true,
							},
						
						] }
						hasFeedback
					>
						<Input.Password placeholder="Type your password"/>
					</Form.Item>
					
					<Form.Item
						name="confirmPassword"
						label="Confirm Password"
						dependencies={ [ "password" ] }
						rules={ [
							{
								required: true,
							},
							({ getFieldValue }) => ( {
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve()
									}
									return Promise.reject(
										"The two passwords that you entered does not match."
									)
								},
							} ),
						] }
						hasFeedback
					>
						<Input.Password placeholder="Confirm your password"/>
					</Form.Item>
					
					<Form.Item
						name="email"
						label="Email"
						rules={ [
							{
								required: true,
								message: "Please enter your email",
							},
							{ type: "email", message: "Please enter a valid email" },
						] }
						hasFeedback
					>
						<Input placeholder="Enter Your Email"/>
					</Form.Item>
					<Form.Item label={ "Phone Number" } name={ "phoneNumber" } rules={ [ { type: "integer" } ] }>
						<InputNumber placeholder={ "Enter Your Phone Number" } style={ { width: "100%" } }/>
					</Form.Item>
					<Form.Item label={ "Address" } name={ "address" }
					           rules={ [ { required: true, message: "Please Fill Out Your Address" } ] }>
						<Input.TextArea placeholder={ "Enter Your Address" }/>
					</Form.Item>
					<Form.Item name={ "submit" }>
						<Button block type={ "primary" } htmlType={ "submit" }
						        style={ { width: "100%" } }> Submit </Button>
					</Form.Item>
				</Form>
			</div>
		</>
	)
}

export default SignUp
