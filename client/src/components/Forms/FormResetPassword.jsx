import { Form, Input, Button } from 'antd';

const onFinish = (values) => {
    console.log(values.user.password);
};
function FormResetPassword() {
    return (
        <>
            <div className=''>
                <Form
                    name='form-reset'
                    onFinish={onFinish}
                    className=''
                >

                    <Form.Item
                        name={['user', 'password']}
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
                        name={['user', 'repeat-password']}
                        dependencies={['user', 'password']}
                        rules={[
                            {
                                required: true,
                                message: "Repeat password is required"
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue(['user', 'password']) === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Mật khẩu phải giống như trên!"));
                                }
                            })
                        ]}
                    >
                        <Input.Password placeholder='New password' />
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