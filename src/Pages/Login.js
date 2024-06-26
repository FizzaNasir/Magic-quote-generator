import React, { useState } from "react";

import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";

import { LockOutlined, MailOutlined} from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { useNavigate , Link} from "react-router-dom";
import { LoginStyles } from "../styles";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

 function Login() {
  
  const [form] = Form.useForm();
  const { token } = useToken();
  const screens = useBreakpoint();

  const Users = useSelector(state=> state.Users.UsersArray)
  var navigate = useNavigate();
  const [error, seterror] = useState('')
  
  function ValidateUser(LoginUser){
    
      const found = Users.find(user => user.email === LoginUser.email && user.password === LoginUser.password)
      return found!=null ?
        (
        localStorage.setItem('loginUserId', found.id),
        true
        ) : false 
      
  }
  const onFinish = async (values) => {
    try {
      await form.validateFields(); 
      const currUser ={
        email: values.email,
        password: values.password
      }
      ValidateUser(currUser)? navigate('/Home') : seterror('Invalid email or password')

    } catch (errorInfo) {
    }
  };

  const styles = LoginStyles(token, screens);

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
            <path
              d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
              fill="white"
            />
            <path
              d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
              fill="white"
            />
            <path
              d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
              fill="white"
            />
          </svg>

          <Title style={styles.title}>Login</Title>
          <Text style={styles.text}>
           Please login to continue
          </Text>
        </div>
        <Form
          form={form}
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a style={LoginStyles.forgotPassword} href="">
              Forgot password?
            </a>
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block="true" type="primary" htmlType="submit" >
              Log in
            </Button>
            {error && <Text type="danger">{error}</Text>}
            <div style={LoginStyles.footer}>
              <Text style={LoginStyles.text}>Don't have an account?</Text>{" "}
              
              <Link to="/SignUp">Sign Up</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
export default Login