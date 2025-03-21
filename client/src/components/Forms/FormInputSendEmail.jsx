import { Form, Input, Button, message } from 'antd';
import { authApi } from '../../api/authApi';

function InputEmail() {
    const onFinish = async (values) => {
        try {
            const response = await authApi.sendResetPasswordEmail(values.user.email);
            message.success('Email sent successfully!');
        } catch (error) {
            message.error('Failed to send email.');
        }
    };

    return (
        <>
            <div>
                <Form
                    name="email"
                    onFinish={onFinish}
                    className='w-[400px] flex flex-col justify-center'
                >
                    <Form.Item
                        name={['user', 'email']}
                        label=""
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

                    <Form.Item className='w-full'>
                        <Button htmlType='submit' type='primary' className='w-full'>
                            Send
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default InputEmail;