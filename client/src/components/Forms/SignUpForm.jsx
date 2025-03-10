import { Button, Form, Input, Modal } from 'antd';
import Accounts from '../Accounts/Accounts';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { useState } from 'react';

function SignUpForm() {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onFinish = async (values) => {
        try {
            const { email, password } = values;
            const response = await authApi.register(email, password);
            console.log('Register successful:', response);
            setIsModalVisible(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
        navigate("/login");
    };

    return (
        <>
            <Modal
                title="Registration Successful"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <p>Registration successful! Please check your email to verify your account.</p>
                <Button key="ok" type="primary" onClick={handleOk} style={{ marginTop: '16px' }}>
                    OK
                </Button>
            </Modal>
            <Form
                onFinish={onFinish}
                wrapperCol={{
                    span: 24,
                }}
            >
                <Form.Item >
                    <h1 className="text-[1.5rem] font-bold">Sign Up</h1>
                </Form.Item>
                <Form.Item
                    name={'email'}
                    rules={[
                        {
                            required: true,
                            message: "Email is required",
                        },
                        {
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Email is not valid!"
                        }
                    ]}
                    className='w-full'
                >
                    <Input placeholder='Enter your email' />
                </Form.Item>
                <Form.Item
                    name={'password'}
                    rules={[
                        {
                            required: true,
                            message: "Password is required"
                        },
                        {
                            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            message: "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ và số!"
                        }
                    ]}
                >
                    <Input.Password placeholder='New password' size='large'/>
                </Form.Item>

                <Form.Item
                    name={'confirmPassword'}
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: "Repeat password is required"
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Mật khẩu phải giống như trên!"));
                            }
                        })
                    ]}
                >
                    <Input.Password placeholder='Repeat password' size='large'/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className='w-full' danger>
                        Sign up
                    </Button>
                </Form.Item>

                <Form.Item>
                    <div className='flex items-center justify-center mt-[20px]'>
                        <div className='border-[1px] border-[#ddd] w-full'></div>
                        <span className='text-[0.8rem]'>Or</span>
                        <div className='border-[1px] border-[#ddd] w-full'></div>
                    </div>
                </Form.Item>

                <Form.Item>
                    <Accounts />
                </Form.Item>

                <Form.Item>
                    <div className='text-center'>
                        <span>Already have an account?<Link to="/login" className='ml-[5px] text-red-500'>Log In</Link></span>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}
export default SignUpForm;