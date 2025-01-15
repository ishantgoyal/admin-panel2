import React, { useEffect, useState } from 'react';
import { Button, Input, notification, Select, Spin, } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined, SmileOutlined, } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ADD_USER, ROLE_LIST } from '../../api/api';

const AddUser = () => {
    const navigate = useNavigate();
    const [loader, set_loader] = useState(false);
    const [errors, set_errors] = useState([]);
    const [role_list, set_role_list] = useState([]);
    const [phoneerror, set_Phone_Error] = useState('');
    const [name, set_name] = useState('');
    const [phone, set_phone] = useState('');
    const [email, set_email] = useState('');
    const [address, set_address] = useState('');
    const [role_permission_id, set_permission_role_id] = useState('');
    const [password, set_password] = useState("");
    const [confirm_password, set_confirm_password] = useState("");

    const roleListApi = async () => {
        try {
            const ROLE_LIST_API_RESPONSE = await ROLE_LIST();
            if (ROLE_LIST_API_RESPONSE?.data?.status) {
                set_role_list(ROLE_LIST_API_RESPONSE?.data?.roles);
            } else {
                set_errors(ROLE_LIST_API_RESPONSE?.data?.errors);
                console.error(ROLE_LIST_API_RESPONSE?.data?.errors);
            }
        } catch (error) {
            console.error('Error fetching role list:', error);
        }
    };

    useEffect(() => {
        roleListApi();
    }, []);


    const ADD_API = async () => {
        if (!phoneerror) {
            set_loader(true)
            const FORM_DATA = new FormData();
            FORM_DATA.append('name', name);
            FORM_DATA.append('phone', phone);
            FORM_DATA.append('email', email);
            FORM_DATA.append('role_permission_id', role_permission_id);
            FORM_DATA.append('address', address);
            FORM_DATA.append('password', password);
            FORM_DATA.append('confirm_password', confirm_password);

            const API_RESPONSE = await ADD_USER(FORM_DATA);
            console.log("user Api response", API_RESPONSE)
            if (API_RESPONSE?.data?.status) {
                notification.open({
                    message: 'Success!!',
                    description: 'User Successfully added.',
                    icon: <SmileOutlined style={{ color: 'green' }} />,
                });
                navigate('/Dashboard/new-user-view')
            } else {
                set_errors(API_RESPONSE?.data?.errors);
                set_loader(false)
            }
        }
    }
    return (
        <div>
            <div className='theme-content-head'>
                <div className='theme-content-left-head'>
                    <h3>Add User</h3>
                </div>
                <div className='theme-content-right-head'>
                </div>
            </div>
            <div className='common-form'>
                {errors?.try && <><span style={{ color: "red" }}>{errors?.try[0]}</span></>}
                {errors?.catch && <><span style={{ color: "red" }}>{errors?.catch[0]}</span></>}
                <div className='row'>
                    <div className='col-12'>
                        <div className='input-box'>
                            <label htmlFor="name">Name<i style={{ color: "red" }}>*</i></label>
                            <Input placeholder="Name" id='name' onChange={(e) => set_name(e.target.value)} />
                            {errors?.name && <><span style={{ color: "red" }}>{errors?.name[0]}</span></>}
                        </div>
                        <div className='input-box'>
                            <label htmlFor="phone">Phone Number<i style={{ color: "red" }}>*</i></label>
                            <Input
                                value={phone}
                                maxLength={12}
                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                                placeholder="Phone Number" id='phone'
                                onChange={(e) => {
                                    const phoneNumber = e.target.value;

                                    const cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
                                    if (cleanedPhoneNumber.length <= 10) {
                                        set_Phone_Error('')
                                        let formattedPhoneNumber = '';
                                        for (let i = 0; i < cleanedPhoneNumber.length; i++) {
                                            if (i === 3 || i === 6) {
                                                formattedPhoneNumber += '-';
                                            }
                                            formattedPhoneNumber += cleanedPhoneNumber[i];
                                        }
                                        set_phone(formattedPhoneNumber);
                                        set_Phone_Error('')
                                    }
                                    else {
                                        set_phone(cleanedPhoneNumber)
                                        set_Phone_Error("Phone Number Maximum Length Should be 10 Digit ")
                                    }

                                }}
                            />
                            {
                                errors?.phone && <><span style={{ color: "red" }}>{errors?.phone[0]}</span></>
                                || phoneerror && <><span style={{ color: "red" }}>{phoneerror}</span></>
                            }
                        </div>
                        <div className='input-box'>
                            <label htmlFor="email">Email<i style={{ color: "red" }}>*</i></label>
                            <Input placeholder="Email" id='email' onChange={(e) => set_email(e.target.value)} />
                            {errors?.email && <><span style={{ color: "red" }}>{errors?.email[0]}</span></>}
                        </div>
                        <div className='input-box'>
                            <label htmlFor="Select-Role">Select Role<i style={{ color: "red" }}>*</i></label><br></br>
                            <Select
                                placeholder="Select Role"
                                onChange={(value) => set_permission_role_id(value)}
                                style={{ width: '100%' }}
                                allowClear
                                showSearch
                                filterOption={(inputValue, option) => {
                                    return !option.label.toLowerCase().indexOf(inputValue.toLowerCase())
                                }}
                                options={role_list.map((item) => {
                                    if (item.status === 1) {
                                        return ({
                                            value: item.id,
                                            label: item.role_name,
                                        })
                                    } else {
                                        return ({
                                            value: item.id,
                                            label: item.role_name,

                                        })
                                    }
                                })}
                            />
                            {errors?.permission_role_id && <><span style={{ color: "red" }}>{errors?.permission_role_id[0]}</span></>}
                        </div>
                        <div className='input-box'>
                            <label htmlFor="address">Address</label>
                            <Input placeholder="address" id='address' onChange={(e) => set_address(e.target.value)} />
                            {errors?.address && <><span style={{ color: "red" }}>{errors?.address[0]}</span></>}
                        </div>
                        <div className="input-box">
                            <label>
                                Password <i style={{ color: "red" }}>*</i>
                            </label>
                            <Input.Password
                                placeholder="Password"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                                onChange={(e) => {
                                    set_password(e.target.value);
                                }}
                            />
                            {errors?.password && (
                                <span style={{ color: "red", fontSize: "11px" }}>
                                    {errors?.password}
                                </span>
                            )}
                        </div>
                        <div className="input-box">
                            <label>
                                Confirm Password <i style={{ color: "red" }}>*</i>
                            </label>
                            <Input.Password
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                                placeholder=" Confirm Password"
                                onChange={(e) => {
                                    set_confirm_password(e.target.value);
                                }}
                            />
                            {errors?.confirm_password && (
                                <span style={{ color: "red", fontSize: "11px" }}>
                                    {errors?.confirm_password}
                                </span>
                            )}
                        </div>

                    </div>
                    <div className='col-12'>
                        <div className='input-box'>
                            {loader ? <>
                                <Button type="primary"><Spin indicator={<LoadingOutlined style={{ fontSize: '12px', color: "#fff", marginRight: "5px" }} />} /> Add User</Button>
                            </> : <>
                                <Button type="primary"
                                    onClick={ADD_API}
                                >Add User</Button>
                            </>}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AddUser;