
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
      localStorage.setItem('role', response.user.role);
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

  return (
    <>
      <div className=''>
        <Form
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          autoComplete="on"
        >
          <Form.Item>
            <h1 className="text-[1.5rem] font-bold">Log In</h1>
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
            <Input.Password placeholder='Password' size='large' />
          </Form.Item>

          <Form.Item >
            <Button type="primary" danger className='w-full' htmlType='submit'>
              Login
            </Button>
          </Form.Item>

          <div className='flex justify-end'>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <Form.Item >
            <div className='flex items-center justify-center mt-[20px]'>
              <div className='border-[1px] border-[#ddd] w-full'></div>
              <span className='text-[0.8rem]'>Or</span>
              <div className='border-[1px] border-[#ddd] w-full'></div>
            </div>
          </Form.Item>

          <Form.Item >
            <Accounts />
          </Form.Item>

          <Form.Item >
            <div className='text-center'>
              <span >Dont have an account?<Link to="/register" className='ml-[5px] text-red-500'>Sign Up</Link></span>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default LoginForm;