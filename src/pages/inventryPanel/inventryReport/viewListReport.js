import {  Select, Table } from "antd";
import { useEffect, useState } from "react";
import { INVENTRY_LIST } from "../../../api/api";

const ViewListReport = () => {
    const [loader, set_loader] = useState(false);
    const [errors, set_errors] = useState([]);
    const [inventories, setInventryList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedStartingInventory, setSelectedStartingInventory] = useState(null);
    const [selectedRemainingInventory, setSelectedRemainingInventory] = useState(null);

    const InventryListApi = async () => {
        try {
            const API_RESPONSE = await INVENTRY_LIST();
            console.log("Inventory List:", API_RESPONSE);
            if (API_RESPONSE?.data?.status) {
                setInventryList(API_RESPONSE?.data?.inventories);
            } else {
                set_errors(API_RESPONSE?.data?.errors);
                console.error(API_RESPONSE?.data?.errors);
            }
        } catch (error) {
            console.error('Error fetching inventory list:', error);
        }
    };

    useEffect(() => {
        InventryListApi();
    }, []);

    // Filter data based on selected dropdown values
    const filteredData = inventories.filter((item) => {
        return (
            (selectedProduct ? item.id === selectedProduct : true) &&
            (selectedStartingInventory ? item.startingInventory === selectedStartingInventory : true) &&
            (selectedRemainingInventory ? item.remainingInventory === selectedRemainingInventory : true)
        );
    });

    // Define columns for the table
    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Starting Inventory',
            dataIndex: 'startingInventory',
            key: 'startingInventory',
        },
        {
            title: 'Remaining Inventory',
            dataIndex: 'remainingInventory',
            key: 'remainingInventory',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }
    ];

    return (
        <>
            <h2>Generate Inventory Reports</h2>
            <div className="row">
                {/* Product Dropdown */}
                <div className="col-3">
                    <div className="input-box" style={{ width: "100%" }}>
                        <label>
                            Select Product Name <i style={{ color: "red" }}>*</i>
                        </label>
                        <br />
                        <Select
                            placeholder="--Select Product Name--"
                            style={{ width: "100%", height: "40px" }}
                            onChange={(value) => setSelectedProduct(value)}
                            value={selectedProduct}
                            options={inventories.map((item) => ({
                                value: item.id,
                                label: item.productName,
                            }))}
                        />
                    </div>
                </div>

                {/* Day Starting Inventory Dropdown */}
                <div className="col-3">
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
                </div>

                {/* Remaining Inventory Dropdown */}
                <div className="col-3">
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
                </div>
            </div>

            {/* Display "No Record Found" if no data matches */}
            {filteredData.length === 0 && selectedProduct && selectedStartingInventory && selectedRemainingInventory ? (
                <h3 style={{ textAlign: "center", color: 'red' }}>No Record Found</h3>
            ) : (
                <div>
                    {/* Table to show filtered data */}
                    {selectedProduct && selectedStartingInventory && selectedRemainingInventory && (
                        <Table
                            columns={columns}
                            dataSource={filteredData}
                            rowKey="id"
                            pagination={false}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default ViewListReport;
