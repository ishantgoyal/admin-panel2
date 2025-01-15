import React, { useEffect, useState } from 'react';
import { Button, Input, notification, Spin, DatePicker } from 'antd';
import { LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { INVOICE_UPDATE } from '../../api/api';
import dayjs from 'dayjs';

const InvoiceUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [loader, set_loader] = useState(false);
    const [errors, set_errors] = useState([]);
    const [invoice_number, set_invoice_number] = useState('');
    const [vendor_name, set_vendor_name] = useState('');
    const [credit_sale, set_credit_sale] = useState('');
    const [cash_sale, set_cash_sale] = useState('');
    const [receiving_date, set_receiving_date] = useState('');
    const [paid_date, set_paid_date] = useState('');


    const VIEW_API = async () => {
        const FORM_DATA = new FormData();
        FORM_DATA.append("id", id);
        const API_RESPONSE = await INVOICE_UPDATE(FORM_DATA);
        console.log("update eshu invoice", API_RESPONSE)
        if (API_RESPONSE?.data?.status) {
            set_invoice_number(API_RESPONSE?.data?.data?.invoice_number);
            set_vendor_name(API_RESPONSE?.data?.data?.vendor_name);
            set_credit_sale(API_RESPONSE?.data?.data?.credit_sale);
            set_cash_sale(API_RESPONSE?.data?.data?.cash_sale);
            set_receiving_date(API_RESPONSE?.data?.data?.receiving_date);
            set_paid_date(API_RESPONSE?.data?.data?.paid_date);
            set_loader(false);
        } else {
            set_errors(API_RESPONSE?.data?.errors);
        }
    };


    useEffect(() => {
        VIEW_API();
    }, []);

    const UPDATE_API = async () => {
        set_loader(true);
        const FORM_DATA = {
            id,
            invoice_number,
            vendor_name,
            credit_sale,
            cash_sale,
            receiving_date,
            paid_date
        };

        const API_RESPONSE = await INVOICE_UPDATE(FORM_DATA);
        console.log('Invoice updte  API response', API_RESPONSE);
        if (API_RESPONSE?.data?.status) {
            notification.open({
                message: 'Success!!',
                description: 'Invoice Successfully update .',
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
            <div className='theme-content-head'>
                <div className='theme-content-left-head'>
                    <h3>Update Invoice</h3>
                </div>
            </div>
            <div className='common-form'>
                {errors?.try && <span style={{ color: 'red' }}>{errors?.try[0]}</span>}
                <div className='row'>
                    <div className='col-6'>
                        <div className='input-box'>
                            <label htmlFor='InvoiceNumber'>Invoice Number<i style={{ color: 'red' }}>*</i></label>
                            <Input value={invoice_number} placeholder='Invoice Number' id='InvoiceNumber' onChange={(e) => set_invoice_number(e.target.value)} />
                            {errors?.invoice_number && <><span style={{ color: "red" }}>{errors?.invoice_number[0]}</span></>}
                        </div>

                        <div className='input-box'>
                            <label htmlFor='VendorName'>Vendor Name<i style={{ color: 'red' }}>*</i></label>
                            <Input value={vendor_name} placeholder='Vendor Name' id='VendorName' onChange={(e) => set_vendor_name(e.target.value)} />
                            {errors?.vendor_name && <><span style={{ color: "red" }}>{errors?.vendor_name[0]}</span></>}
                        </div>

                        <div className='input-box'>
                            <label htmlFor='CreditSale'>Credit Sale</label>
                            <Input value={credit_sale} placeholder='Credit Sale' id='CreditSale' onChange={(e) => set_credit_sale(e.target.value)} />
                        </div>

                        <div className='input-box'>
                            <label htmlFor='CashSale'>Cash Sale</label>
                            <Input value={cash_sale} placeholder='Cash Sale' id='CashSale' onChange={(e) => set_cash_sale(e.target.value)} />
                        </div>

                        <div className='input-box'>
                            <label> Receiving Date</label>
                            <DatePicker value={dayjs(receiving_date)} style={{ width: "100%" }} onChange={(date, dateString) => set_receiving_date(dateString)} />
                        </div>

                        <div className='input-box'>
                            <label> Paid Date</label>
                            <DatePicker value={dayjs(paid_date)} style={{ width: "100%" }} onChange={(date, dateString) => set_paid_date(dateString)} />
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='input-box'>
                            {loader ? (
                                <Button type='primary'>
                                    <Spin indicator={<LoadingOutlined style={{ fontSize: '12px', color: '#fff', marginRight: '5px' }} />} /> Save Invoice
                                </Button>
                            ) : (
                                <Button type='primary' onClick={UPDATE_API}>
                                    Save Invoice
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceUpdate;
