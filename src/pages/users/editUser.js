import React, { useEffect, useState } from "react";
import { Button, Input, Select, Spin, notification, } from "antd";
import { LoadingOutlined, SmileOutlined, } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { ROLE_LIST, UPDATE_USER } from "../../api/api";


const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loader, set_loader] = useState(false);
  const [errors, set_errors] = useState([]);
  const [role_list, set_role_list] = useState([]);
  const [phoneerror, set_Phone_Error] = useState('');
  const [name, set_name] = useState("");
  const [phone, set_phone] = useState("");
  const [email, set_email] = useState("");
  const [address, set_address] = useState("");
  const [permission_role_id, set_permission_role_id] = useState();


  const VIEW_API = async () => {
    const FORM_DATA = new FormData();
    FORM_DATA.append("id", id);
    const API_RESPONSE = await UPDATE_USER(FORM_DATA);
    console.log("shubhan", API_RESPONSE)
    if (API_RESPONSE?.data?.status) {
      set_name(API_RESPONSE?.data?.data?.name);
      set_phone(API_RESPONSE?.data?.data?.phone);
      set_email(API_RESPONSE?.data?.data?.email);
      set_address(API_RESPONSE?.data?.data?.address);
      set_permission_role_id(
        parseInt(API_RESPONSE?.data?.data?.permission_role_id)
      );
      set_loader(false);
    } else {
      set_errors(API_RESPONSE?.data?.errors);
    }
  };

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
    VIEW_API();
  }, []);



  const UPDATE_API = async () => {
    if (!phoneerror) {
      set_loader(true);
      const FORM_DATA = new FormData();
      FORM_DATA.append("id", id);
      FORM_DATA.append("name", name);
      FORM_DATA.append("phone", phone);
      FORM_DATA.append("email", email);
      FORM_DATA.append("permission_role_id", permission_role_id);
      FORM_DATA.append("address", address);
      const API_RESPONSE = await UPDATE_USER(FORM_DATA);
      if (API_RESPONSE?.data?.status) {
        notification.open({
          message: "Success!!",
          description: "User Successfully Updated.",
          icon: <SmileOutlined style={{ color: "green" }} />,
        });
        navigate('/Dashboard/new-user-view')
      }
      else {
        set_errors(API_RESPONSE?.data?.errors);
        set_loader(false);
      }
    }
  };

  return (
    <div>
      <div className='theme-content-head'>
        <div className='theme-content-left-head'>
          <h3>Update User</h3>
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
              <Input value={name} placeholder="Name" id='name' onChange={(e) => set_name(e.target.value)} />
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
              }
            </div>
            <div className='input-box'>
              <label htmlFor="email">Email<i style={{ color: "red" }}>*</i></label>
              <Input value={email} placeholder="Email" id='email' onChange={(e) => set_email(e.target.value)} />
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
              <Input value={address} placeholder="address" id='address' onChange={(e) => set_address(e.target.value)} />
              {errors?.address && <><span style={{ color: "red" }}>{errors?.address[0]}</span></>}
            </div>
          </div>
          <div className='col-12'>
            <div className='input-box'>
              {loader ? <>
                <Button type="primary"><Spin indicator={<LoadingOutlined style={{ fontSize: '12px', color: "#fff", marginRight: "5px" }} />} /> Save User</Button>
              </> : <>
                <Button type="primary"
                  onClick={UPDATE_API}
                >Save User</Button>
              </>}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default EditUser;
