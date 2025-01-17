import React, { useEffect, useState } from 'react';
import { Button, Input, notification, Spin, DatePicker, Select } from 'antd';
import { LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ADD_INVENTRY, PRODUCT_LIST } from '../../api/api';


const InventryAdd = () => {
  const navigate = useNavigate();
  const [loader, set_loader] = useState(false);
  const [errors, set_errors] = useState([]);
  const [productId, set_productId] = useState('');
  const [productName, set_productName] = useState('');
  const [product_color, set_product_color] = useState('');
  const [product_location, set_product_location] = useState('');
  const [startingInventory, set_startingInventory] = useState('');
  const [soldInventory, set_soldInventory] = useState(0);
  const [defectiveInventory, set_defectiveInventory] = useState(0);
  const [date, set_date] = useState('');
  const [stock_avilable, set_stock_avilable] = useState('');
  const [products, setProductList] = useState([]);

  const ADD_API = async () => {
    set_loader(true);
    const FORM_DATA = {
      productId,
      productName,
      product_color,
      startingInventory,
      soldInventory,
      defectiveInventory,
      product_location,
      date,
      stock_avilable
    };

    const API_RESPONSE = await ADD_INVENTRY(FORM_DATA);
    console.log('Inventory API response', API_RESPONSE);
    if (API_RESPONSE?.data?.status) {
      notification.open({
        message: 'Success!!',
        description: 'New Inventory Successfully added.',
        icon: <SmileOutlined style={{ color: 'green' }} />,
      });
      navigate('/Dashboard/inventry-list-view');
    } else {
      set_errors(API_RESPONSE?.data?.errors);
      set_loader(false);
    }
  };

  const ProductListApi = async () => {
    try {
      const API_RESPONSE = await PRODUCT_LIST();
      console.log("PRODUCT_LIST:", API_RESPONSE);
      if (API_RESPONSE?.data?.status) {
        setProductList(API_RESPONSE?.data?.products);
      } else {
        set_errors(API_RESPONSE?.data?.errors);
        console.error(API_RESPONSE?.data?.errors);
      }
    } catch (error) {
      console.error('Error fetching produt list:', error);
    }
  };

  useEffect(() => {
    ProductListApi();
  }, []);

  return (
    <div>
      <div className="theme-content-head">
        <div className="theme-content-left-head">
          <h3>Add Inventory</h3>
        </div>
      </div>
      <div className="common-form">
        {errors?.try && <span style={{ color: 'red' }}>{errors?.try[0]}</span>}

        <div className="row">
          <div className="col-6">
            <div className="input-box">
              <label htmlFor="productId">
                Product ID<i style={{ color: 'red' }}>*</i>
              </label>
              <Input
                placeholder="Product ID"
                id="productId"
                onChange={(e) => set_productId(e.target.value)}
              />
              {errors?.productId && (
                <span style={{ color: 'red' }}>{errors?.productId[0]}</span>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="input-box">
              <label>
                Select Product Name<i style={{ color: 'red' }}>*</i>
              </label>
              <Select
                onChange={(value, option) => {
                  set_productName(option?.label || '');

                }}
                style={{ width: "100%" }}
                placeholder="--Select Product Name--"
              >
                {products?.length > 0 ? (
                  <>
                    <Select.Option value="" label="Select Product Name">
                      Select Product Name
                    </Select.Option>
                    {products.map((item) => (
                      <Select.Option
                        key={item.id}
                        value={item.id}
                        label={item.productName}
                      >
                        {item.productName}
                      </Select.Option>
                    ))}
                  </>
                ) : (
                  <Select.Option value="">No Product Available</Select.Option>
                )}
              </Select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="input-box">
              <label>
                Select Product Color<i style={{ color: 'red' }}>*</i>
              </label>
              <Select
                onChange={(value, option) => {
                  set_product_color(option?.label || '');
                }}
                style={{ width: "100%" }}
                placeholder="--Select Product Color--"
              >
                {products?.length > 0 ? (
                  <>
                    <Select.Option value="" label="Select Product Color">
                      Select Product Color
                    </Select.Option>
                    {products.map((item) => (
                      <Select.Option
                        key={item.id}
                        value={item.id}
                        label={item.product_color}
                      >
                        {item.product_color}
                      </Select.Option>
                    ))}
                  </>
                ) : (
                  <Select.Option value="">No Product Color</Select.Option>
                )}
              </Select>
            </div>
          </div>

          <div className="col-6">
            <div className="input-box">
              <label>
                Select Product Location<i style={{ color: 'red' }}>*</i>
              </label>
              <Select
                onChange={(value, option) => {
                  set_product_location(option?.label || '');

                }}
                style={{ width: "100%" }}
                placeholder="--Select Product Location--"
              >
                {products?.length > 0 ? (
                  <>
                    <Select.Option value="" label="Select Product Color">
                      Select Product Location
                    </Select.Option>
                    {products.map((item) => (
                      <Select.Option
                        key={item.id}
                        value={item.id}
                        label={item.product_location}
                      >
                        {item.product_location}
                      </Select.Option>
                    ))}
                  </>
                ) : (
                  <Select.Option value="">No Location</Select.Option>
                )}
              </Select>
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-6">
            <div className="input-box">
              <label htmlFor="startingInventory">
                Starting Inventory<i style={{ color: 'red' }}>*</i>
              </label>
              <Input
                placeholder="Starting Inventory"
                id="startingInventory"
                type="number"
                onChange={(e) => set_startingInventory(e.target.value)}
              />
              {errors?.startingInventory && (
                <span style={{ color: 'red' }}>{errors?.startingInventory[0]}</span>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="input-box">
              <label htmlFor="soldInventory">Sold Inventory</label>
              <Input
                placeholder="Sold Inventory"
                id="soldInventory"
                type="number"
                onChange={(e) => set_soldInventory(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="input-box">
              <label htmlFor="defectiveInventory">Defective Inventory</label>
              <Input
                placeholder="Defective Inventory"
                id="defectiveInventory"
                type="number"
                onChange={(e) => set_defectiveInventory(e.target.value)}
              />
            </div>
          </div>

          <div className="col-6">
            <div className="input-box">
              <label>
                Date<i style={{ color: 'red' }}>*</i>
              </label>
              <DatePicker
                style={{ width: '100%' }}
                onChange={(date, dateString) => set_date(dateString)}
              />
              {errors?.date && <span style={{ color: 'red' }}>{errors?.date}</span>}
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-6">
            <div className="input-box">
              <label>
                Available<i style={{ color: 'red' }}>*</i>
              </label>
              <Select
                onChange={(value, option) => {
                  set_stock_avilable(option?.label || '');

                }}
                style={{ width: "100%" }}
                placeholder="--Select Product Location--"
              >

                <Select.Option value="available" label="Available">
                  Available
                </Select.Option>
                <Select.Option value="out_of_stock" label="Out of Stock">
                  Out of Stock
                </Select.Option>
              </Select>
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
                        style={{ fontSize: '12px', color: '#fff', marginRight: '5px' }}
                      />
                    }
                  />
                  Add Inventory
                </Button>
              ) : (
                <Button type="primary" onClick={ADD_API}>
                  Add Inventory
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventryAdd;
