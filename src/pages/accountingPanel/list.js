import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import SisLoader from "../../widgets/loader";
import { DeleteOutlined, EditOutlined, SmileOutlined, StopOutlined } from '@ant-design/icons';
import { EXPENSE_DELETE, EXPENSE_LIST } from '../../api/api';


const ViewExpenseList = () => {
    const navigate = useNavigate();
    const [loader, set_loader] = useState(false)
    const [errors, setErrors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [ExpenseList, setExpenseListList] = useState([]);


    const ExpenseListApi = async () => {
        try {
            const API_RESPONSE = await EXPENSE_LIST();
            console.log(" List 22", API_RESPONSE)
            if (API_RESPONSE?.data?.status) {
                setExpenseListList(API_RESPONSE?.data?.expenses);
                setFilteredData(API_RESPONSE?.data.expenses);
            } else {
                setErrors(API_RESPONSE?.data?.errors);
                console.error(API_RESPONSE?.data?.errors);
            }
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.trim().toLowerCase(); 
        setSearchQuery(query);
    
        if (query === '') {
            setFilteredData(ExpenseList); 
            return;
        }
    
        const filtered = ExpenseList.filter(item => {
          
            const amount = String(item.amount || '').toLowerCase();
            const date = String(item.date || '').toLowerCase();
            const category = String(item.category || '').toLowerCase();
    
            return (
                amount.includes(query) ||
                date.includes(query) ||
                category.includes(query)
            );
        });
    
        setFilteredData(filtered);
    };
    

   


    const DELETE_API = async (id) => {
        set_loader(true);
        const FORM_DATA = new FormData();
        FORM_DATA.append("id", id);
        const API_RESPONSE = await EXPENSE_DELETE(FORM_DATA);
        if (API_RESPONSE?.data?.status) {
            notification.open({
                message: "Success!!",
                description: "Expense List  Successfully deleted.",
                icon: <SmileOutlined style={{ color: "green" }} />,
            });
            ExpenseListApi()
            set_loader(false);
        } else {
            notification.open({
                description: "expense delete Error",
                icon: <SmileOutlined style={{ color: "red" }} />,
            });
            setErrors(API_RESPONSE.data.errors);
            set_loader(false);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },

        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },

        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category'
        },

        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            
        },
        {
            title: 'Action',
            key: 'Action',
            render: (text, record) => (
                <>
                    
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => navigate('/dashboard/update-expense/' + (record?.id))}
                        style={{ marginRight: "5px" }}
                    >
                        <div className="tooltip">
                            <EditOutlined />
                            <span className="tooltiptext">Edit & View</span>
                        </div>
                    </Button>
                    <Popconfirm
                        title="Change Status"
                        description="Are you sure to delete this user?"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            onClick={() => DELETE_API(record?.id)}
                            type="primary" size="small" danger>
                            <div className="tooltip">
                                <DeleteOutlined />
                                <span className="tooltiptext">Delete</span>
                            </div>
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    useEffect(() => {
        ExpenseListApi();
    }, []);

    return (
        <div>
            <div className='theme-content-head'>
                <div className='theme-content-left-head'>
                    <h3>Expense List</h3>
                </div>
                <div className='theme-content-right-head'>
                    <Button type='primary' onClick={() => navigate('/Dashboard/new-expense-add')}>Add Expense</Button>
                    {/* <Tooltip title="Download Users List CSV">
                        <Button type='primary' onClick={() => window.location = BACKEND_URL + '/download-users/' + JSON.parse(localStorage.getItem('sis_user_data')).token} ghost style={{ marginLeft: "5px" }}><CloudDownloadOutlined /></Button>
                    </Tooltip> */}

                    {/* PDF Download button  */}
                    {/* <Tooltip title="Download Users List PDF">
                        <Button type='primary' onClick={() => window.location = BACKEND_URL + '/download-users-pdf/' + JSON.parse(localStorage.getItem('sis_user_data')).token} ghost style={{ marginLeft: "5px" }}><FilePdfOutlined /></Button>
                    </Tooltip> */}
                </div>
            </div>
            <div className='theme-content-head'>
                <div className='input-box'>
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    {errors?.code && <span style={{ color: "red" }}>{errors?.code[0]}</span>}
                </div>
            </div>

            {loader ? <SisLoader /> : <Table columns={columns} dataSource={filteredData} />}

        </div>
    );
};

export default ViewExpenseList;
