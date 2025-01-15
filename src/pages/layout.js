import React, { useEffect, useState } from "react";
import "./layout.css";
import Sider from "antd/es/layout/Sider";
import { Button, Layout, Spin, theme } from "antd";
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
  SnippetsOutlined,
  UserOutlined,
  UserSwitchOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";

const SisLayout = () => {
  const navigate = useNavigate();
  const [inventoryDropdown, setInventoryDropdown] = useState(false);
  const [accountingDropdown, setAccountingDropdown] = useState(false);
  const [InvoiceDropdown, setInvoiceDropdown] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [loader, setLoader] = useState(false);
  const locationPathname = window.location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [locationPathname]);

  return (
    <>
      {loader ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spin />
        </div>
      ) : (
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ backgroundColor: "#ffffff" }}
          >
            <div className="logo-user-box">
              <div className="logo-area">
                {/* <img className="theme-logo" src={logoTheme} /> */}
              </div>
              {!collapsed && (
                <>
                  <h1 style={{ textAlign: "center", color: "#ff7f2b" }}>
                   Super Admin :
                  </h1>
                  <h4 style={{ textAlign: "center" }}>
                    Manage Inventory, Invoices, and Accounting
                  </h4>
                  <hr />
                </>
              )}
            </div>
            <ul className="main-menu">
              <li
                className={locationPathname === "/Dashboard" && "active"}
                onClick={() => navigate("/Dashboard")}
              >
                <DashboardOutlined /> Dashboard
              </li>
              <li
                className={locationPathname === "new-role-view" && "active"}
                onClick={() => navigate("new-role-view")}
              >
                <UserSwitchOutlined /> Roles
              </li>
              <li
                className={locationPathname === "new-user-view" && "active"}
                onClick={() => navigate("new-user-view")}
              >
                <UserOutlined /> User
              </li>
              <li>
                {inventoryDropdown ? (
                  <>
                    <span onClick={() => setInventoryDropdown(false)}>
                      <SnippetsOutlined /> Inventory <UpOutlined className="main-menu-arrow" />
                    </span>
                    <ul id="inventory-dropdown">
                      <li
                        className={locationPathname.includes("inventry-list-view") ? "active" : ""}
                        onClick={() => navigate("/Dashboard/inventry-list-view")}
                      >
                         Manage Inventory 
                      </li>
                      <li
                        className={locationPathname.includes("inventry-list-report-view") ? "active" : ""}
                        onClick={() => navigate("/Dashboard/inventry-list-report-view")}
                      >
                        Inventory Report
                      </li>
                    </ul>
                  </>
                ) : (
                  <span onClick={() => setInventoryDropdown(true)}>
                    <SnippetsOutlined /> Inventory <DownOutlined className="main-menu-arrow" />
                  </span>
                )}
              </li>

              <li>
                {accountingDropdown ? (
                  <>
                    <span onClick={() => setAccountingDropdown(false)}>
                      <SnippetsOutlined /> Accounting <UpOutlined className="main-menu-arrow" />
                    </span>
                    <ul id="accounting-dropdown">
                      <li
                        className={locationPathname.includes("expense-list-view") ? "active" : ""}
                        onClick={() => navigate("/Dashboard/expense-list-view")}
                      >
                       Manage Expense
                      </li>
                      <li
                        className={locationPathname.includes("expense-list-report-view") ? "active" : ""}
                        onClick={() => navigate("/Dashboard/expense-list-report-view")}
                      >
                        Accounting Report
                      </li>
                    </ul>
                  </>
                ) : (
                  <span onClick={() => setAccountingDropdown(true)}>
                    <SnippetsOutlined /> Accounting <DownOutlined className="main-menu-arrow" />
                  </span>
                )}
              </li>

              <li>
                {InvoiceDropdown ? (
                  <>
                    <span onClick={() => setInvoiceDropdown(false)}>
                      <SnippetsOutlined /> Invoices <UpOutlined className="main-menu-arrow" />
                    </span>
                    <ul id="invoice-dropdown">
                      <li
                        className={locationPathname.includes("invoice-list-view") ? "active" : ""}
                        onClick={() => navigate("/Dashboard/invoice-list-view")}
                      >
                        Manage Invoice
                      </li>
                      <li
                        className={locationPathname.includes("invoice-list-report-view") ? "active" : ""}
                        onClick={() => navigate("/Dashboard/invoice-list-report-view")}
                      >
                        Invoice Report
                      </li>
                    </ul>
                  </>
                ) : (
                  <span onClick={() => setInvoiceDropdown(true)}>
                    <SnippetsOutlined /> Invoices <DownOutlined className="main-menu-arrow" />
                  </span>
                )}
              </li>

              <li
                onClick={() => {
                  localStorage.clear();
                  window.location = "/";
                }}
              >
                <LoginOutlined /> Logout
              </li>
            </ul>
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: window.innerHeight,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default SisLayout;
