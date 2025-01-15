import React, { useState } from "react";
import { Button, Input, notification, Spin } from "antd";
import {
  LoadingOutlined,
  SmileOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { SIGN_IN_API } from "../api/api";
import "./registration.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [loader, set_loader] = useState(false);
  const [errors, set_errors] = useState([]);
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [confirm_password, set_confirm_password] = useState("");


  const Company_user_registration_api = async () => {
    try {
      set_loader(true);
      const formData = { first_name,last_name,email,password,confirm_password };
      const REGISTER_API_RESPONSE = await SIGN_IN_API(formData); 
      console.log("Registration Response:", REGISTER_API_RESPONSE); 
  
      if (REGISTER_API_RESPONSE?.data?.status) {
        notification.open({
          message: "Congratulation",
          description: "Registration Successful",
          icon: <SmileOutlined style={{ color: "green" }} />,
        });
        navigate("/");  
      } else {
        set_errors(REGISTER_API_RESPONSE?.data?.errors); 
      }
    } catch (error) {
      console.error("Registration error: ", error);
      notification.open({
        message: "Error Occurred",
        description: "There was an error during registration.",
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
    } finally {
      set_loader(false);
    }
  };
  

  return (
    <>
      <div className="row theme-box">

        <div className="col">
          <div className="theme-content-head">
            <div className="theme-content-left-head">
              <h3> Admin Registration</h3>
            </div>
          </div>

          {/* First Name  */}
          <div className="row">
            <div className="col-12">
              <div className="input-box">
                <label>
                  First Name <i style={{ color: "red" }}>*</i>
                </label>
                <Input
                  placeholder="First Name"
                  onChange={(e) => {
                    set_first_name(e.target.value);
                  }}
                />
                {errors?.first_name && (
                  <span style={{ color: "red", fontSize: "11px" }}>
                    {errors?.first_name}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Last Name  */}
          <div className="row">
            <div className="col-12">
              <div className="input-box">
                <label>
                  Last Name <i style={{ color: "red" }}>*</i>
                </label>
                <Input
                  placeholder="last name"
                  onChange={(e) => {
                    set_last_name(e.target.value);
                  }}
                />
                {errors?.last_name && (
                  <span style={{ color: "red", fontSize: "11px" }}>
                    {errors?.last_name}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Email */}
          <div className="row">
            <div className="col-12">
              <div className="input-box">
                <label htmlFor="email">
                  Email <i style={{ color: "red" }}>*</i>
                </label>
                <Input
                  id="email"
                  placeholder="exampleABC@gmail.com"
                  onChange={(e) => {
                    set_email(e.target.value);
                  }}
                />
                {errors?.email && (
                  <span style={{ color: "red", fontSize: "11px" }}>
                    {errors?.email}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Password */}
          <div className="row">
            <div className="col-12">
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
            </div>
          </div>
          {/* confirm Password */}
          <div className="row">
            <div className="col-12">
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
          </div>

          <br />
          {loader ? (
            <Button className="save_btn" type="primary">
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{
                      fontSize: "12px",
                      color: "#fff",
                      marginRight: "5px",
                    }}
                  />
                }
              />
              Submit
            </Button>
          ) : (
            <Button
              className="save_btn"
              onClick={Company_user_registration_api}
              type="primary"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Registration;
