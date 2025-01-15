import React, { useState } from 'react';
import { Input, notification, Spin, DatePicker, Button } from 'antd';
import { LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ADD_EXPENSE } from '../../api/api';


const AddExpense = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState({});
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const ADD_API = async () => {
        setLoader(true);
        const FORM_DATA = new FormData();
        FORM_DATA.append("date", date);
        FORM_DATA.append('category', category);
        FORM_DATA.append('amount', amount);
        FORM_DATA.append('description', description);

        try {
            const API_RESPONSE = await ADD_EXPENSE(FORM_DATA);
            console.log("Expense API Response:", API_RESPONSE);
            if (API_RESPONSE?.data?.status) {
                notification.open({
                    message: 'Success!!',
                    description: 'New Expense Successfully added.',
                    icon: <SmileOutlined style={{ color: 'green' }} />,
                });
                navigate('/Dashboard/expense-list-view');
            } else {
                setErrors(API_RESPONSE?.data?.errors || {});
                setLoader(false);
            }
        } catch (error) {
            console.error("API Error:", error);
            setLoader(false);
        }
    };

    return (
        <div>
            <div className='theme-content-head'>
                <div className='theme-content-left-head'>
                    <h3>Expense Management</h3>
                    <br />
                    <h3>Add Expense</h3>
                </div>
                <div className='theme-content-right-head'></div>
            </div>
            <div className='common-form'>
                {errors?.try && <span style={{ color: "red" }}>{errors?.try[0]}</span>}
                {errors?.catch && <span style={{ color: "red" }}>{errors?.catch[0]}</span>}

                <div className='row'>
                    <div className="col-6">
                        <div className='input-box'>
                            <label>Date
                                <i style={{ color: "red" }}>*</i>
                            </label>
                            <DatePicker style={{ width: "100%" }} onChange={(date, dateString) => setDate(dateString)} />
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
                                type="number"
                                onChange={(e) => {
                                    console.log("Entered Amount:", e.target.value);
                                    setAmount(e.target.value);
                                }}
                                value={amount}
                            />
                            {errors?.amount && <span style={{ color: "red" }}>{errors?.amount[0]}</span>}
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='input-box'>
                            <label htmlFor="category">Category<i style={{ color: "red" }}>*</i></label>
                            <Input
                                placeholder="Category"
                                id='Category'
                                onChange={(e) => {
                                    console.log("Selected Category:", e.target.value);
                                    setCategory(e.target.value);
                                }}
                                value={category}
                            />
                            {errors?.category && <><span style={{ color: "red" }}>{errors?.category[0]}</span></>}
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='input-box'>
                            <label htmlFor="description">Description</label>
                            <Input
                                placeholder="Enter description"
                                id="description"
                                onChange={(e) => {
                                    console.log("Entered Description:", e.target.value);
                                    setDescription(e.target.value);
                                }}
                                value={description}
                            />
                            {errors?.description && <span style={{ color: "red" }}>{errors?.description[0]}</span>}
                        </div>
                    </div>

                    <div className='col-12'>
                        <div className='input-box'>
                            {loader ? (
                                <Button type='primary'>
                                    <Spin indicator={<LoadingOutlined style={{ fontSize: '12px', color: '#fff', marginRight: '5px' }} />} /> Add Inventory
                                </Button>
                            ) : (
                                <Button type='primary' onClick={ADD_API}>
                                    Add Expense
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddExpense;
