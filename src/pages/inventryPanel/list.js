import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import SisLoader from "../../widgets/loader";
import { DeleteOutlined, EditOutlined, SmileOutlined } from '@ant-design/icons';
import { INVENTRY_DELETE, INVENTRY_LIST } from '../../api/api';

const ViewInventryList = () => {
    const navigate = useNavigate();
    const [loader, set_loader] = useState(false)
    const [errors, setErrors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [inventryList, setInventryList] = useState([]);


    const InventryListApi = async () => {
        try {
            const API_RESPONSE = await INVENTRY_LIST();
            console.log("invnetry List 22", API_RESPONSE)
            if (API_RESPONSE?.data?.status) {
                setInventryList(API_RESPONSE?.data?.inventories);
                setFilteredData(API_RESPONSE?.data.inventories);
            } else {
                setErrors(API_RESPONSE?.data?.errors);
                console.error(API_RESPONSE?.data?.errors);
            }
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = inventryList.filter(item =>
            item.productName.toLowerCase().includes(query.toLowerCase()) ||
            item.date.toLowerCase().includes(query.toLowerCase())
        );
        if (query === '') {
            setFilteredData(inventryList);
        } else {
            setFilteredData(filtered);
        }
    };


    const DELETE_API = async (id) => {
        set_loader(true);
        const FORM_DATA = new FormData();
        FORM_DATA.append("id", id);
        const API_RESPONSE = await INVENTRY_DELETE(FORM_DATA);
        if (API_RESPONSE?.data?.status) {
            notification.open({
                message: "Success!!",
                description: "Inventry List  Successfully deleted.",
                icon: <SmileOutlined style={{ color: "green" }} />,
            });
            InventryListApi()
            set_loader(false);
        } else {
            notification.open({
                description: "inventry delete Error",
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
            title: 'Product ID',
            dataIndex: '_id',
            key: '_id',
            sorter: (a, b) => a._id - b._id,
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },

        {
            title: ' Day Starting Inventory',
            dataIndex: 'startingInventory',
            key: 'startingInventory'
        },

        {
            title: ' Remaining Inventory',
            dataIndex: 'remainingInventory',
            key: 'remainingInventory'
        },
        {
            title: 'Location',
            dataIndex: 'product_location',
            key: 'product_location'
        },
        {
            title: 'Date Updated',
            dataIndex: 'date',
            key: 'date'
        },

        {
            title: 'Action',
            key: 'Action',
            render: (text, record) => (
                <>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => navigate('/dashboard/update-inventry/' + (record?.id))}
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
        InventryListApi();
    }, []);

    return (
        <div>
            <div className='theme-content-head'>
                <div className='theme-content-left-head'>
                    <h3>Inventory List</h3>
                </div>
                <div className='theme-content-right-head'>
                    <Button type='primary' onClick={() => navigate('/Dashboard/new-inventry-add')}>Add Inventry</Button>
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

export default ViewInventryList;
