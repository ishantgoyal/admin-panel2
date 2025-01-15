import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import SisLoader from "../../widgets/loader";
import { DeleteOutlined, EditOutlined, StopOutlined, SmileOutlined } from '@ant-design/icons';
import { USER_DELETE, USER_LIST } from '../../api/api';

const UserList = () => {
    const navigate = useNavigate();
    const [loader, set_loader] = useState(false)
    const [errors, setErrors] = useState([]);
    const [popStatusDescription, setPopStatusDescription] = useState('Do you want to change Status of Roles');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [userList, setUserList] = useState([]);


    const userListApi = async () => {
        try {
            const USER_LIST_API_RESPONSE = await USER_LIST();
            console.log("User List 22", USER_LIST_API_RESPONSE)
            if (USER_LIST_API_RESPONSE?.data?.status) {
                setUserList(USER_LIST_API_RESPONSE?.data?.users);
                setFilteredData(USER_LIST_API_RESPONSE.data.users);
            } else {
                setErrors(USER_LIST_API_RESPONSE?.data?.errors);
                console.error(USER_LIST_API_RESPONSE?.data?.errors);
            }
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = userList.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
        if (query === '') {
            setFilteredData(userList);
        } else {
            setFilteredData(filtered);
        }
    };

    // Handle status change text
    const handleStatusText = (id, status) => {
        if (status === 1) {
            setPopStatusDescription('Do you want to make this role Inactive');
        } else {
            setPopStatusDescription('Do you want to make this role Active');
        }
    };


    const DELETE_API = async (id) => {
        set_loader(true);
        const FORM_DATA = new FormData();
        FORM_DATA.append("id", id);
        const API_RESPONSE = await USER_DELETE(FORM_DATA);
        if (API_RESPONSE?.data?.status) {
            notification.open({
                message: "Success!!",
                description: "User List  Successfully deleted.",
                icon: <SmileOutlined style={{ color: "green" }} />,
            });
            userListApi()
            set_loader(false);
        } else {
            notification.open({
                description: "Role delete Error",
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
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                if (record.status) {
                    return <span className="table-status-activate">Active</span>;
                } else {
                    return <span className="table-status-deactivate">Inactive</span>;
                }
            },
        },
        {
            title: 'Action',
            key: 'Action',
            render: (text, record) => (
                <>
                    <Popconfirm
                        title="Change Status"
                        description={popStatusDescription}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="primary"
                            size="small"
                            style={{ backgroundColor: "#888888", marginRight: "5px" }}
                            onClick={() => handleStatusText(record.id, record.status)}
                        >
                            <div className="tooltip">
                                <StopOutlined />
                                <span className="tooltiptext">Status Change</span>
                            </div>
                        </Button>
                    </Popconfirm>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => navigate('/dashboard/update-user/' + (record?.id))}
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
                        <Button onClick={() => DELETE_API(record?.id)} type="primary" size="small" danger>
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
        userListApi();
    }, []);

    return (
        <div>
            <div className='theme-content-head'>
                <div className='theme-content-left-head'>
                    <h3>Users List</h3>
                </div>
                <div className='theme-content-right-head'>
                    <Button type='primary' onClick={() => navigate('/Dashboard/new-user-add')}>Add User</Button>
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

export default UserList;
