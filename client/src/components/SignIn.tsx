import { FC, useState } from "react"
import { Alert, Button, Form, Input } from "antd"
import axios from "axios"

const SignIn: FC = (): JSX.Element => {
	const [ success, setSuccess ] = useState(false)
	const [ error, setError ] = useState(false)
	const [ errorDesc, setErrorDesc ] = useState("")
	
	const [ form ] = Form.useForm()
	
	const handleFinish = async (e: any): Promise<void> => {
		const { email, password } = e
		form.resetFields()
		
		try {
			const { data } = await axios.post('http://localhost:5001/api/users/authUser', { email, password })
			setSuccess(true)
		} catch (e: any) {
			setErrorDesc(e.response.data)
			setError(true)
			
		}
	}
	return (
		<>
			<div className="head" style={ { backgroundColor: "#fefae0" } }>
				Sign In Into Your Account!
				{ success && <Alert
						message="Success!"
						description="You're A Valid User!"
						type="success"
						showIcon
						style={ { width: "50%" } }
				/>
				}
				{ error && <Alert
						message="Login Error"
						description={errorDesc}
						type="error"
						showIcon
						style={ { width: "50%" } }
				/>
				}
			</div>
			<div className="form" style={ { backgroundColor: "#fefae0", marginTop: "-50px" } }>
				<Form labelCol={ { span: 10 } } wrapperCol={ { span: 50 } } onFinish={ handleFinish } form={ form }>
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
						<Input placeholder="Enter Your Email" />
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
					<Form.Item name={ "submit" }>
						<Button block type={ "primary" } htmlType={ "submit" }
						        style={ { width: "100%" } }> Submit </Button>
					</Form.Item>
				</Form>
			</div>
		</>
	)
}

export default SignIn