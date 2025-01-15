import { Select, Table } from "antd";
import { useEffect, useState } from "react";
import { EXPENSE_LIST } from "../../../api/api";

const ViewAccountingListReport = () => {
    const [loader, set_loader] = useState(false);
    const [errors, set_errors] = useState([]);
    const [expenses, setExpenseList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedStartingInventory, setSelectedStartingInventory] = useState(null);
    const [selectedRemainingInventory, setSelectedRemainingInventory] = useState(null);


    const ExpenseListApi = async () => {
        try {
            const API_RESPONSE = await EXPENSE_LIST();
            console.log(" List 22", API_RESPONSE)
            if (API_RESPONSE?.data?.status) {
                setExpenseList(API_RESPONSE?.data?.expenses);

            } else {
                set_errors(API_RESPONSE?.data?.errors);
                console.error(API_RESPONSE?.data?.errors);
            }
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    useEffect(() => {
        ExpenseListApi();
    }, []);



    // Filter data based on selected dropdown values
    // const filteredData = inventories.filter((item) => {
    //     return (
    //         (selectedProduct ? item.id === selectedProduct : true) &&
    //         (selectedStartingInventory ? item.startingInventory === selectedStartingInventory : true) &&
    //         (selectedRemainingInventory ? item.remainingInventory === selectedRemainingInventory : true)
    //     );
    // });

    // Define columns for the table
    // const columns = [
    //     {
    //         title: 'Product Name',
    //         dataIndex: 'productName',
    //         key: 'productName',
    //     },
    //     {
    //         title: 'Starting Inventory',
    //         dataIndex: 'startingInventory',
    //         key: 'startingInventory',
    //     },
    //     {
    //         title: 'Remaining Inventory',
    //         dataIndex: 'remainingInventory',
    //         key: 'remainingInventory',
    //     },
    //     {
    //         title: 'Location',
    //         dataIndex: 'location',
    //         key: 'location',
    //     },
    //     {
    //         title: 'Status',
    //         dataIndex: 'status',
    //         key: 'status',
    //     }
    // ];

    return (
        <>
            <h2>Generate Accounting  Reports</h2>
            <div className="row">
                {/* Product Dropdown */}
                <div className="col-3">
                    <div className="input-box" style={{ width: "100%" }}>
                        <label>
                            Select Category <i style={{ color: "red" }}>*</i>
                        </label>
                        <br />
                        <Select
                            placeholder="--Select Category--"
                            style={{ width: "100%", height: "40px" }}
                            // onChange={(value) => setSelectedProduct(value)}
                            options={expenses.map((item) => ({
                                value: item.id,
                                label: item.category,
                            }))}
                        />
                    </div>
                </div>

                {/* Day Starting Inventory Dropdown */}
                {/* <div className="col-3">
                    <div className="input-box" style={{ width: "100%" }}>
                        <label>
                            Select Day Starting Inventory<i style={{ color: "red" }}>*</i>
                        </label>
                        <br />
                        <Select
                            placeholder="--Select Day Starting Inventory--"
                            style={{ width: "100%", height: "40px" }}
                            onChange={(value) => setSelectedStartingInventory(value)}
                            value={selectedStartingInventory}
                            options={inventories.map((item) => ({
                                value: item.startingInventory,
                                label: item.startingInventory,
                            }))}
                        />
                    </div>
                </div> */}

                {/* Remaining Inventory Dropdown */}
                {/* <div className="col-3">
                    <div className="input-box" style={{ width: "100%" }}>
                        <label>
                            Remaining Inventory<i style={{ color: "red" }}>*</i>
                        </label>
                        <br />
                        <Select
                            placeholder="--Remaining Inventory--"
                            style={{ width: "100%", height: "40px" }}
                            onChange={(value) => setSelectedRemainingInventory(value)}
                            value={selectedRemainingInventory}
                            options={inventories.map((item) => ({
                                value: item.remainingInventory,
                                label: item.remainingInventory,
                            }))}
                        />
                    </div>
                </div> */}
            </div>

            
            {/* {filteredData.length === 0 && selectedProduct && selectedStartingInventory && selectedRemainingInventory ? (
                <h3 style={{ textAlign: "center", color: 'red' }}>No Record Found</h3>
            ) : (
                <div>
                   
                    {selectedProduct && selectedStartingInventory && selectedRemainingInventory && (
                        <Table
                            columns={columns}
                            dataSource={filteredData}
                            rowKey="id"
                            pagination={false}
                        />
                    )}
                </div>
            )} */}
        </>
    );
};

export default ViewAccountingListReport;
