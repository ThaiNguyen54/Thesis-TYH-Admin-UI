import React, { useState, useEffect } from 'react';

import { Button, Table } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../components';

const Hair = () => {
  const HairColumns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: '_id',
    },
    {
      key: '2',
      title: 'Image',
      dataIndex: 'Url',
      width: 200,
      height: 200,
      // eslint-disable-next-line jsx-a11y/img-redundant-alt
      render: (t, r) => <img src={`${r.Url}`} alt="customer image" />,
    },
    {
      key: '3',
      title: 'Name',
      dataIndex: 'Name',
    },
    {
      key: '4',
      title: 'Description',
      dataIndex: 'Des',
    },
    {
      key: '5',
      title: 'Action',
      render: () => (
        <>
          <EditOutlined style={{ marginRight: '10px' }} />
          <DeleteOutlined />
        </>
      ),
    },
  ];
  const [HairDataSource, setHairData] = useState('');

  useEffect(() => {
    const getHair = () => {
      Axios.get('http://localhost:7000/ver1/hairstyle').then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data.Hairstyles);
        setHairData(response.data.Hairstyles);
      });
    };
    getHair();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <Link to="/Hair/new">
        <Button>Add a new hairstyle</Button>
      </Link>

      <Table style={{ marginTop: '10px' }} columns={HairColumns} dataSource={HairDataSource} />
    </div>
  );
};

export default Hair;
