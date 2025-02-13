import { Form, Input, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { authApi } from '../../api/authApi';

function FormResetPassword() {
    const { token } = useParams();

    const onFinish = async (values) => {
        const { password, confirmPassword } = values;
        try {
            const response = await authApi.resetPassword(token, password, confirmPassword);
            console.log('Password reset successful:', response);
        } catch (error) {
            console.error('Password reset failed:', error);
        }
    };

    return (
        <>
            <div className=''>
                <Form
                    name='form-reset'
                    onFinish={onFinish}
                    className=''
                >
                    <Form.Item
                        name={['password']}
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
                        <Input.Password placeholder='New password' />
                    </Form.Item>
                    <Form.Item
                        name={['confirmPassword']} // Changed from 'confirm-password' to 'confirmPassword'
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: "Repeat password is required"
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue(['password']) === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Mật khẩu phải giống như trên!"));
                                }
                            })
                        ]}
                    >
                        <Input.Password placeholder='Repeat password' />
                    </Form.Item>

                    <Form.Item className='w-full'>
                        <Button htmlType='submit' type='primary' className='w-full'>
                            Send
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
export default FormResetPassword;