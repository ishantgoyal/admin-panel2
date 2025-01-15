import React, { useState } from 'react';
import { Button, Input, notification, Spin, DatePicker } from 'antd';
import { LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ADD_INVOICE } from '../../api/api';

const InvoiceAdd = () => {
  const navigate = useNavigate();
  const [loader, set_loader] = useState(false);
  const [errors, set_errors] = useState([]);
  const [invoice_number, set_invoice_number] = useState('');
  const [vendor_name, set_vendor_name] = useState('');
  const [credit_sale, set_credit_sale] = useState('');
  const [cash_sale, set_cash_sale] = useState('');
  const [receiving_date, set_receiving_date] = useState('');
  const [paid_date, set_paid_date] = useState('');

  const ADD_API = async () => {
    set_loader(true);
    const FORM_DATA = {
      invoice_number,
      vendor_name,
      credit_sale,
      cash_sale,
      receiving_date,
      paid_date
    };

    const API_RESPONSE = await ADD_INVOICE(FORM_DATA);
    console.log('Invoice API response', API_RESPONSE);
    if (API_RESPONSE?.data?.status) {
      notification.open({
        message: 'Success!!',
        description: 'New Invoice Successfully added.',
        icon: <SmileOutlined style={{ color: 'green' }} />,
      });
      navigate('/Dashboard/invoice-list-view');
    } else {
      set_errors(API_RESPONSE?.data?.errors);
      set_loader(false);
    }
  };

  return (
    <div>
      <div className="theme-content-head">
        <div className="theme-content-left-head">
          <h3>Add Invoice</h3>
        </div>
      </div>
      <div className="common-form">
        {errors?.try && <span style={{ color: "red" }}>{errors?.try[0]}</span>}
        <div className="row">
          <div className="col-6">
            <div className="input-box">
              <label htmlFor="InvoiceNumber">
                Invoice Number<i style={{ color: "red" }}>*</i>
              </label>
              <Input
                placeholder="Invoice Number"
                id="InvoiceNumber"
                onChange={(e) => set_invoice_number(e.target.value)}
              />
              {errors?.invoice_number && (
                <span style={{ color: "red" }}>{errors?.invoice_number[0]}</span>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="input-box">
              <label htmlFor="VendorName">
                Vendor Name<i style={{ color: "red" }}>*</i>
              </label>
              <Input
                placeholder="Vendor Name"
                id="VendorName"
                onChange={(e) => set_vendor_name(e.target.value)}
              />
              {errors?.vendor_name && (
                <span style={{ color: "red" }}>{errors?.vendor_name[0]}</span>
              )}
            </div>
          </div>
        </div>
  
        <div className="row">
          <div className="col-6">
            <div className="input-box">
              <label htmlFor="CreditSale">Credit Sale</label>
              <Input
                placeholder="Credit Sale"
                id="CreditSale"
                onChange={(e) => set_credit_sale(e.target.value)}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="input-box">
              <label htmlFor="CashSale">Cash Sale</label>
              <Input
                placeholder="Cash Sale"
                id="CashSale"
                onChange={(e) => set_cash_sale(e.target.value)}
              />
            </div>
          </div>
        </div>
  
        <div className="row">
          <div className="col-6">
            <div className="input-box">
              <label>Receiving Date</label>
              <DatePicker
                style={{ width: "100%" }}
                onChange={(date, dateString) => set_receiving_date(dateString)}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="input-box">
              <label>Paid Date</label>
              <DatePicker
                style={{ width: "100%" }}
                onChange={(date, dateString) => set_paid_date(dateString)}
              />
            </div>
          </div>
        </div>
  
        <div className="row">
          <div className="col-12">
            <div className="input-box">
              {loader ? (
                <Button type="primary">
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{ fontSize: "12px", color: "#fff", marginRight: "5px" }}
                      />
                    }
                  />
                  Add Invoice
                </Button>
              ) : (
                <Button type="primary" onClick={ADD_API}>
                  Add Invoice
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default InvoiceAdd;
