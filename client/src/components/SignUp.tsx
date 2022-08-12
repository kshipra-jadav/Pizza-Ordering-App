import { FC } from "react"
import { Form, Button, Input, InputNumber } from "antd"

import "./signup.styles.css"


const SignUp: FC = (): JSX.Element => {
	const handleFinish = (e: any): void => {
		console.log(e)
	}
	return (
		<>
			<div className="head" style={{backgroundColor: "#fefae0"}}>
				Make an Account!
			</div>
			<div className="form"  style={{backgroundColor: "#fefae0"}} >
				<Form labelCol={ { span: 10 } } wrapperCol={ { span: 50 } } onFinish={handleFinish}>
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
						rules={[
							{
								required: true,
							},
							
						]}
						hasFeedback
					>
						<Input.Password placeholder="Type your password" />
					</Form.Item>
					
					<Form.Item
						name="confirmPassword"
						label="Confirm Password"
						dependencies={["password"]}
						rules={[
							{
								required: true,
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										"The two passwords that you entered does not match."
									);
								},
							}),
						]}
						hasFeedback
					>
						<Input.Password placeholder="Confirm your password" />
					</Form.Item>
					
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
					<Form.Item label={ "Phone Number" } name={ "phoneNumber" } rules={[{type: "integer"}]}>
						<InputNumber placeholder={"Enter Your Phone Number"} style={{width: "100%"}} />
					</Form.Item>
					<Form.Item label={ "Address" } name={ "address" } rules={[{required: true, message: "Please Fill Out Your Address"}]}>
						<Input.TextArea placeholder={ "Enter Your Address" } />
					</Form.Item>
					<Form.Item name={ "submit" }>
						<Button block type={ "primary" } htmlType={ "submit" } style={ { width: "100%" } }> Submit </Button>
					</Form.Item>
				</Form>
			</div>
		</>
	)
}

export default SignUp
