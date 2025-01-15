import React, { useEffect, useState } from 'react';
import { Button, Input, notification, Spin, DatePicker } from 'antd';
import { LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { INVENTRY_UPDATE } from '../../api/api';
import dayjs from 'dayjs';

const InventryUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loader, set_loader] = useState(false);
  const [errors, set_errors] = useState([]);
  const [productId, set_productId] = useState('');
  const [productName, set_productName] = useState('');
  const [startingInventory, set_startingInventory] = useState('');
  const [soldInventory, set_soldInventory] = useState('');
  const [defectiveInventory, set_defectiveInventory] = useState('');
  const [location, set_location] = useState('');
  const [date, set_date] = useState('');


  const VIEW_API = async () => {
    const FORM_DATA = new FormData();
    FORM_DATA.append("id", id);
    const API_RESPONSE = await INVENTRY_UPDATE(FORM_DATA);
    console.log("update eshu inventry", API_RESPONSE)
    if (API_RESPONSE?.data?.status) {
      set_date(API_RESPONSE?.data?.data?.date);
      set_productId(API_RESPONSE?.data?.data?.productId);
      set_productName(API_RESPONSE?.data?.data?.productName);
      set_startingInventory(API_RESPONSE?.data?.data?.startingInventory);
      set_soldInventory(API_RESPONSE?.data?.data?.soldInventory);
      set_defectiveInventory(API_RESPONSE?.data?.data?.defectiveInventory);
      set_location(API_RESPONSE?.data?.data?.location);
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
      productId,
      productName,
      startingInventory,
      soldInventory,
      defectiveInventory,
      location,
      date
    };

    const API_RESPONSE = await INVENTRY_UPDATE(FORM_DATA);
    console.log('Inventory API response', API_RESPONSE);
    if (API_RESPONSE?.data?.status) {
      notification.open({
        message: 'Success!!',
        description: 'Inventory Successfully update.',
        icon: <SmileOutlined style={{ color: 'green' }} />,
      });
      navigate('/Dashboard/inventry-list-view');
    } else {
      set_errors(API_RESPONSE?.data?.errors);
      set_loader(false);
    }
  };

  return (
    <div>
      <div className='theme-content-head'>
        <div className='theme-content-left-head'>
          <h3>Update Inventory</h3>
        </div>
      </div>
      <div className='common-form'>
        {errors?.try && <span style={{ color: 'red' }}>{errors?.try[0]}</span>}
        <div className='row'>
          <div className='col-6'>
            <div className='input-box'>
              <label htmlFor='productId'>Product ID<i style={{ color: 'red' }}>*</i></label>
              <Input value={productId} placeholder='Product ID' id='productId' disabled onChange={(e) => set_productId(e.target.value)} />
            </div>
            <div className='input-box'>
              <label htmlFor='productName'>Product Name<i style={{ color: 'red' }}>*</i></label>
              <Input value={productName} placeholder='Product Name' id='productName' onChange={(e) => set_productName(e.target.value)} />
            </div>
            <div className='input-box'>
              <label htmlFor='startingInventory'>Starting Inventory<i style={{ color: 'red' }}>*</i></label>
              <Input
                value={startingInventory}
                placeholder='Starting Inventory'
                id='startingInventory'
                type='number'
                onChange={(e) => set_startingInventory(e.target.value)}
              />
            </div>
            <div className='input-box'>
              <label htmlFor='soldInventory'>Sold Inventory</label>
              <Input
                value={soldInventory}
                placeholder='Sold Inventory'
                id='soldInventory'
                type='number'
                onChange={(e) => set_soldInventory(e.target.value)}
              />
            </div>
            <div className='input-box'>
              <label htmlFor='defectiveInventory'>Defective Inventory</label>
              <Input
                value={defectiveInventory}
                placeholder='Defective Inventory'
                id='defectiveInventory'
                type='number'
                onChange={(e) => set_defectiveInventory(e.target.value)}
              />
            </div>
            <div className='input-box'>
              <label htmlFor='location'>Location<i style={{ color: 'red' }}>*</i></label>
              <Input value={location} placeholder='Location' id='location' onChange={(e) => set_location(e.target.value)} />
            </div>
            <div className='input-box'>
              <label>Date</label>
              <DatePicker value={dayjs(date)} style={{ width: "100%" }} onChange={(date, dateString) => set_date(dateString)} />
              {errors?.date && (
                <span style={{ color: "red" }}>{errors?.date}</span>
              )}
            </div>
          </div>
          <div className='col-12'>
            <div className='input-box'>
              {loader ? (
                <Button type='primary'>
                  <Spin indicator={<LoadingOutlined style={{ fontSize: '12px', color: '#fff', marginRight: '5px' }} />} /> Save  Inventory
                </Button>
              ) : (
                <Button type='primary' onClick={UPDATE_API}>
                  Save  Inventory
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventryUpdate;
