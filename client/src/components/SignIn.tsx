import { FC } from "react"
import { Button, Form, Input } from "antd"

const SignIn: FC = (): JSX.Element => {
	const handleFinish = (e: any) => {
		console.log(e)
	}
	return (
		<>
			<div className="head" style={{backgroundColor: "#fefae0"}}>
				Sign In Into Your Account!
			</div>
			<div className="form">
				<Form labelCol={ { span: 10 } } wrapperCol={ { span: 50 } } onFinish={handleFinish}>
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
					<Form.Item name={ "submit" }>
						<Button block type={ "primary" } htmlType={ "submit" } style={ { width: "100%" } }> Submit </Button>
					</Form.Item>
				</Form>
			</div>
		</>
	)
}

export default SignIn