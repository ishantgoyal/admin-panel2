import React, { useEffect, useState } from 'react';
import { Button, Input, notification, Select, Spin, DatePicker } from 'antd';
import { LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { EXPENSE_UPDATE } from '../../api/api';
import dayjs from 'dayjs';

const ExpenseUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState({});
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const VIEW_API = async () => {
        const FORM_DATA = new FormData();
        FORM_DATA.append("id", id);
        const API_RESPONSE = await EXPENSE_UPDATE(FORM_DATA);
        console.log("update eshu expense", API_RESPONSE)
        if (API_RESPONSE?.data?.status) {
            setDate(API_RESPONSE?.data?.data?.date);
            setCategory(API_RESPONSE?.data?.data?.category);
            setAmount(API_RESPONSE?.data?.data?.amount);
            setDescription(API_RESPONSE?.data?.data?.description);
            setErrors(false);
        } else {
            setErrors(API_RESPONSE?.data?.errors);
        }
    };
    useEffect(() => {
        VIEW_API();
    }, []);


    const UPDATE_API = async () => {
        setLoader(true);
        const FORM_DATA = {
            id,
            category,
            amount,
            description,
            date
        };

        const API_RESPONSE = await EXPENSE_UPDATE(FORM_DATA);
        console.log('expense update API response', API_RESPONSE);
        if (API_RESPONSE?.data?.status) {
            notification.open({
                message: 'Success!!',
                description: 'expense Successfully Update.',
                icon: <SmileOutlined style={{ color: 'green' }} />,
            });
            navigate('/Dashboard/expense-list-view');
        } else {
            setErrors(API_RESPONSE?.data?.errors);
            setLoader(false);
        }
    };

    return (
        <div>
            <div className='theme-content-head'>
                <div className='theme-content-left-head'>
                    <h3>Update Expense</h3>
                </div>
                <div className='theme-content-right-head'></div>
            </div>
            <div className='common-form'>
                {errors?.try && <span style={{ color: "red" }}>{errors?.try[0]}</span>}
                {errors?.catch && <span style={{ color: "red" }}>{errors?.catch[0]}</span>}
                <div className='row'>
                    <div className="col-6">
                        <div className='input-box'>
                            <label>Date</label>
                            <DatePicker value={dayjs(date)} style={{ width: "100%" }} onChange={(date, dateString) => setDate(dateString)} />
                            {errors?.date && (
                                <span style={{ color: "red" }}>{errors?.date}</span>
                            )}
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='input-box'>
                            <label htmlFor="amount">Amount <i style={{ color: "red" }}>*</i></label>
                            <Input
                                placeholder="Enter amount"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            {errors?.amount && <span style={{ color: "red" }}>{errors?.amount[0]}</span>}
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='input-box'>
                            <label htmlFor="category">Category <i style={{ color: "red" }}>*</i></label>
                            <Select
                                placeholder="Select Category"
                                id="category"
                                value={category}
                                onChange={(value) => setCategory(value)}
                                style={{ width: '100%' }}
                            >
                                {/* Replace with dynamic category options */}
                                <Select.Option value="Rent">Rent</Select.Option>
                                <Select.Option value="Salary">Salary</Select.Option>
                                <Select.Option value="Utilities">Utilities</Select.Option>
                            </Select>
                            {errors?.category && <span style={{ color: "red" }}>{errors?.category[0]}</span>}
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='input-box'>
                            <label htmlFor="description">Description</label>
                            <Input
                                placeholder="Enter description"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {errors?.description && <span style={{ color: "red" }}>{errors?.description[0]}</span>}
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='input-box'>
                            {loader ? (
                                <Button type="primary" disabled>
                                    <Spin
                                        indicator={
                                            <LoadingOutlined
                                                style={{ fontSize: '12px', color: "#fff", marginRight: "5px" }}
                                            />
                                        }
                                    /> save  Expense...
                                </Button>
                            ) : (
                                <Button type="primary" onClick={UPDATE_API}>
                                    Save
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseUpdate;
