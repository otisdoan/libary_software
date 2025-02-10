
import { Button, Form, Input } from 'antd';
import Accounts from '../Accounts/Accounts';
import { Link } from 'react-router-dom';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
        password: '${label} is not a valid password!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
const onFinish = (values) => {
    console.log(values);
};
function SignUpForm() {

    return (
        <>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                validateMessages={validateMessages}
            >
                <Form.Item label={null}>
                    <h1 className="text-[1.5rem] font-bold">Sign Up</h1>
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label={null}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Your email" />
                </Form.Item>
                <Form.Item
                    name={['user', 'password']}
                    label={null}
                    rules={[
                        {
                            required: true,
                            types: 'password',
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                    name={['user', 'password']}
                    label={null}
                    rules={[
                        {
                            required: true,
                            types: 'password',
                        },
                    ]}
                >
                    <Input.Password placeholder="Repeat password" />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit" className='w-full' danger>
                        Sign up
                    </Button>
                </Form.Item>

                <Form.Item label={null}>
                    <div className='flex items-center justify-center mt-[20px]'>
                        <div className='border-[1px] border-[#ddd] w-full'></div>
                        <span className='text-[0.8rem]'>Or</span>
                        <div className='border-[1px] border-[#ddd] w-full'></div>
                    </div>
                </Form.Item>

                <Form.Item label={null}>
                    <Accounts />
                </Form.Item>

                <Form.Item label={null}>
                    <span>Already have an account?<Link to="/login" className='ml-[5px]'>Log In</Link></span>
                </Form.Item>
            </Form>
        </>
    )
}
export default SignUpForm;