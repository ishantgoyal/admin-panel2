import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import SisLoader from "../../widgets/loader";
import { DeleteOutlined, EditOutlined, SmileOutlined } from '@ant-design/icons';
import { INVOICE_DELETE, INVOICE_LIST } from '../../api/api';

const ViewInvoiceList = () => {
    const navigate = useNavigate();
    const [loader, set_loader] = useState(false)
    const [errors, setErrors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [invoiceList, setInvoiceList] = useState([]);


    const InvoiceListApi = async () => {
        try {
            const API_RESPONSE = await INVOICE_LIST();
            console.log("invoice List 22", API_RESPONSE)
            if (API_RESPONSE?.data?.status) {
                setInvoiceList(API_RESPONSE?.data?.invoices);
                setFilteredData(API_RESPONSE?.data.invoices);
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
    
        const filtered = invoiceList.filter(item => {
            // Checked  undefined or null values use of Lowercase case  
            return (
                (item.productName && item.productName.toLowerCase().includes(query.toLowerCase())) ||
                (item.date && item.date.toLowerCase().includes(query.toLowerCase())) ||
                (item.invoice_number && item.invoice_number.toLowerCase().includes(query.toLowerCase())) || 
                (item.vendor_name && item.vendor_name.toLowerCase().includes(query.toLowerCase())) || 
                (item.receiving_date && item.receiving_date.toLowerCase().includes(query.toLowerCase())) || 
                (item.paid_date && item.paid_date.toLowerCase().includes(query.toLowerCase()))
            );
        });
    
        if (query === '') {
            setFilteredData(invoiceList);
        } else {
            setFilteredData(filtered);
        }
    };
    
    


    const DELETE_API = async (id) => {
        set_loader(true);
        const FORM_DATA = new FormData();
        FORM_DATA.append("id", id);
        const API_RESPONSE = await INVOICE_DELETE(FORM_DATA);
        if (API_RESPONSE?.data?.status) {
            notification.open({
                message: "Success!!",
                description: "Invoice List Successfully deleted.",
                icon: <SmileOutlined style={{ color: "green" }} />,
            });
            InvoiceListApi()
            set_loader(false);
        } else {
            notification.open({
                description: "invoice delete Error",
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
            title: 'Invoice Number ',
            dataIndex: 'invoice_number',
            key: 'invoice_number',
        },

        {
            title: 'Vendor Name',
            dataIndex: 'vendor_name',
            key: 'vendor_name'
        },

        {
            title: 'Receiving Date',
            dataIndex: 'receiving_date',
            key: 'receiving_date'
        },
        {
            title: 'Paid Date',
            dataIndex: 'paid_date',
            key: 'paid_date'
        },
        {
            title: 'Credit Sale',
            dataIndex: 'credit_sale',
            key: 'credit_sale'
        },
        {
            title: 'Cash Sale',
            dataIndex: 'cash_sale',
            key: 'cash_sale'
        },
        {
            title: 'Action',
            key: 'Action',
            render: (text, record) => (
                <>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => navigate('/dashboard/update-invoice/' + (record?.id))}
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
        InvoiceListApi();
    }, []);

    return (
        <div>
            <div className='theme-content-head'>
                <div className='theme-content-left-head'>
                    <h3>Invoice List</h3>
                </div>
                <div className='theme-content-right-head'>
                    <Button type='primary' onClick={() => navigate('/Dashboard/new-invoice-add')}>Add Invoice</Button>
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

export default ViewInvoiceList;
