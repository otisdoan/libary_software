import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import Accounts from '../Accounts/Accounts';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
function LoginForm() {
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label={null}>
          <h1 className="text-[1.5rem] font-bold">Log In</h1>
        </Form.Item>
        <Form.Item
          label={null}
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input placeholder='Username'/>
        </Form.Item>

        <Form.Item
          label={null}
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password placeholder='Password'/>
        </Form.Item>


        <Form.Item label={null}>
          <Button type="primary" danger className='w-full' htmlType='submit'>
            Login
          </Button>
        </Form.Item>

        <div className='flex justify-end'>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <Form.Item label={null}>
          <div className='flex items-center justify-center mt-[20px]'>
            <div className='border-[1px] border-[#ddd] w-full'></div>
            <span className='text-[0.8rem]'>Or</span>
            <div  className='border-[1px] border-[#ddd] w-full'></div>
          </div>
        </Form.Item> 

        <Form.Item label={null}>
          <Accounts />
        </Form.Item>

        <Form.Item label={null}>
          <span>Don’t have an account?<Link to="/signin" className='ml-[5px]'>Sign Up</Link></span>
        </Form.Item>
      </Form>
    </>
  )
}
export default LoginForm;