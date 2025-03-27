import { Form, Input, Button, notification } from 'antd';
import { authApi } from '../../api/authApi';

function InputEmail() {
    const [api, contextHolder] = notification.useNotification();
    const onFinish = async (values) => {
        try {
            const response = await authApi.sendResetPasswordEmail(values.user.email);
            if (response) {
                api["info"]({
                    message: "Email xác nhận đã được gửi",
                    description: "Vui lòng kiểm tra hộp thư đến hoặc thư rác để kích hoạt tài khoản của bạn.",
                });
            }
        } catch (error) {
            console.log(error);
            api["error"]({
                message: "Gửi email thất bại",
                description: "Đã xảy ra lỗi khi gửi email. Vui lòng thử lại sau.",
            });

        }
    };

    return (
        <>
            {contextHolder}
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