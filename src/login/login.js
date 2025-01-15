import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Input, Spin, notification } from 'antd';
import './login.css';
import Cookies from 'js-cookie';
import { EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { LOGIN_API } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, set_email] = useState('');
    const [password, set_password] = useState('');
    const [remember_me, set_remember_me] = useState(false);
    const [loader, set_loader] = useState(false);
    const [errors, set_errors] = useState([]);

    useEffect(() => {
        const savedEmail = Cookies.get('email');
        const savedPassword = Cookies.get('password');
        if (savedEmail && savedPassword) {
            set_email(savedEmail);
            set_password(savedPassword);
            set_remember_me(true);
        }
    }, []);

    const login = async () => {
        if (loader) return;
        set_loader(true);
        try {
            const formData = { email, password };
            localStorage.removeItem('authToken');
            const LOGIN_API_RESPONSE = await LOGIN_API(formData);
            if (LOGIN_API_RESPONSE?.data?.status) {
                localStorage.setItem('authToken', LOGIN_API_RESPONSE.data.token);
                set_errors([]);
                notification.open({
                    message: 'Success!!',
                    description: 'Login Successfully',
                    icon: <SmileOutlined style={{ color: 'green' }} />,
                    duration: 3,
                });
                navigate("/dashboard");
            } else {
                set_errors(LOGIN_API_RESPONSE?.data?.errors);
            }
        } catch (errors) {
            notification.open({
                description: 'An error occurred during login.',
                icon: <SmileOutlined style={{ color: 'red' }} />,
            });
        } finally {
            set_loader(false);
        }
    };

    return (
        <div className='login-box'>
            <div className='login-box-head'>
                <h5>Login to Manage Inventory, Invoices, and Accounting</h5>
                <h2>Login</h2>
                {errors?.try && <span style={{ color: "red" }}>{errors?.try}</span>}
                {errors?.catch && <span style={{ color: "red" }}>{errors?.catch}</span>}
            </div>
            <div className='login-box-body'>
                <div className='input-box'>
                    <Input
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => set_email(e.target.value)}
                        autoComplete="off"
                    />
                    {errors?.email && <span style={{ color: "red" }}>{errors?.email}</span>}
                </div>
                <div className='input-box'>
                    <Input.Password
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => set_password(e.target.value)}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                    {errors?.password && <span style={{ color: "red" }}>{errors?.password}</span>}
                </div>
                <Checkbox checked={remember_me} onClick={(e) => {
                    set_remember_me(e.target.checked)
                }} > Remember me</Checkbox>
                <div className='input-box' style={{ textAlign: "left" }}>
                    {loader ? (
                        <Button className="save_btn" type="primary" >
                            <Spin indicator={<LoadingOutlined style={{ fontSize: '12px', color: "#fff", marginRight: "5px" }} />} /> Login
                        </Button>
                    ) : (
                        <Button className="save_btn" type="primary" onClick={login}>Login</Button>
                    )}
                    <span style={{ float: "right", cursor: "pointer" }} onClick={() => navigate('/reset-password')}>Forgot Password</span>
                </div>
            </div>
            <hr />
            <span style={{ textAlign: "center", display: "flow" }}>Don't have an account? <Link className='sign_up_btn' to="/registration">Sign up</Link></span>
        </div>
    );
};

export default Login;