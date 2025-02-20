
import { Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import Accounts from '../Accounts/Accounts';
import { authApi } from '../../api/authApi';


function LoginForm() {
  const onFinish = async (values) => {
    try {
      const response = await authApi.login(values.email, values.password);
      console.log('Login successful:', response);
      localStorage.setItem('accessToken', response.tokens.accessToken);
      localStorage.setItem('refreshToken', response.tokens.refreshToken);
      localStorage.setItem('email', response.user.email);
      localStorage.setItem('userId', response.user.id);
      message.success("Đăng nhập thành công!");
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Có lỗi xảy ra, vui lòng thử lại!");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <div className=''>
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
            name={'email'}
            label={null}
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
            label={null}
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
            <Input.Password placeholder='Password' />
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
              <div className='border-[1px] border-[#ddd] w-full'></div>
            </div>
          </Form.Item>

          <Form.Item label={null}>
            <Accounts />
          </Form.Item>

          <Form.Item label={null}>
            <span>Dont have an account?<Link to="/register" className='ml-[5px]'>Sign Up</Link></span>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default LoginForm;