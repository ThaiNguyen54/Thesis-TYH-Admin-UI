import React, {useState} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';
import {Button, Table} from 'antd'
import avatar2 from "../data/avatar2.jpg";
import avatar3 from "../data/avatar3.png";
import avatar4 from "../data/avatar4.jpg";
import avatar from "../data/avatar.jpg";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

const Hair = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  const [customerDataSource, setCustomerData] = useState([
    {
      CustomerID: 1001,
      CustomerName: 'Nirav Joshi',
      CustomerEmail: 'nirav@gmail.com',
      CustomerImage:
      avatar2,
      ProjectName: 'Hosting Press HTML',
      Status: 'Active',
      StatusBg: '#8BE78B',
      Weeks: '40',
      Budget: '$2.4k',
      Location: 'India',
    },
    {
      CustomerID: 1002,

      CustomerName: 'Sunil Joshi',
      CustomerEmail: 'sunil@gmail.com',
      ProjectName: 'Elite Admin',
      Status: 'Active',
      CustomerImage:
      avatar3,

      StatusBg: '#8BE78B',
      Weeks: '11',
      Budget: '$3.9k',
      Location: 'India',
    },
    {
      CustomerID: 1003,

      CustomerName: 'Andrew McDownland',
      CustomerEmail: 'andrew@gmail.com',
      ProjectName: 'Real Homes WP Theme',
      Status: 'Pending',
      CustomerImage:
      avatar4,
      StatusBg: '#FEC90F',
      Weeks: '19',
      Budget: '$24.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1004,

      CustomerName: 'Christopher Jamil',
      CustomerEmail: 'jamil@gmail.com',
      ProjectName: 'MedicalPro WP Theme',
      Status: 'Completed',
      CustomerImage:
      avatar,
      StatusBg: '#8BE78B',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1005,

      CustomerName: 'Michael',
      CustomerEmail: 'michael@gmail.com',
      ProjectName: 'Weekly WP Theme',
      Status: 'Cancel',
      CustomerImage:
      avatar2,
      StatusBg: 'red',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1006,
      CustomerName: 'Nirav Joshi',
      CustomerEmail: 'nirav@gmail.com',
      CustomerImage:
      avatar2,
      ProjectName: 'Hosting Press HTML',
      Status: 'Active',
      StatusBg: '#8BE78B',
      Weeks: '40',
      Budget: '$2.4k',
      Location: 'India',
    },
    {
      CustomerID: 1007,

      CustomerName: 'Sunil Joshi',
      CustomerEmail: 'sunil@gmail.com',
      ProjectName: 'Elite Admin',
      Status: 'Active',
      CustomerImage:
      avatar3,

      StatusBg: '#8BE78B',
      Weeks: '11',
      Budget: '$3.9k',
      Location: 'India',
    },
    {
      CustomerID: 1008,

      CustomerName: 'Andrew McDownland',
      CustomerEmail: 'andrew@gmail.com',
      ProjectName: 'Real Homes WP Theme',
      Status: 'Pending',
      CustomerImage:
      avatar4,
      StatusBg: '#FEC90F',
      Weeks: '19',
      Budget: '$24.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1009,

      CustomerName: 'Christopher Jamil',
      CustomerEmail: 'jamil@gmail.com',
      ProjectName: 'MedicalPro WP Theme',
      Status: 'Completed',
      CustomerImage:
      avatar,
      StatusBg: '#8BE78B',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1010,

      CustomerName: 'Michael',
      CustomerEmail: 'michael@gmail.com',
      ProjectName: 'Weekly WP Theme',
      Status: 'Cancel',
      CustomerImage:
      avatar2,
      StatusBg: 'red',
      Weeks: '34',
      Budget: '$16.5k',
      Location: 'USA',
    },
    {
      CustomerID: 1011,
      CustomerName: 'Nirav Joshi',
      CustomerEmail: 'nirav@gmail.com',
      CustomerImage:
      avatar2,
      ProjectName: 'Hosting Press HTML',
      Status: 'Active',
      StatusBg: '#8BE78B',
      Weeks: '40',
      Budget: '$2.4k',
      Location: 'India',
    },
    {
      CustomerID: 1012,

      CustomerName: 'Sunil Joshi',
      CustomerEmail: 'sunil@gmail.com',
      ProjectName: 'Elite Admin',
      Status: 'Active',
      CustomerImage:
      avatar3,

      StatusBg: '#8BE78B',
      Weeks: '11',
      Budget: '$3.9k',
      Location: 'India',
    },
  ])
  const columns = [
    {
      key: '1',
      title: 'CustomerID',
      dataIndex: 'CustomerID'
    },
    {
      key: '2',
      title: 'CustomerName',
      dataIndex: 'CustomerName'
    },
    {
      key: '3',
      title: 'CustomerEmail',
      dataIndex: 'CustomerEmail'
    },
    {
      key: '4',
      title: 'CustomerImage',
      dataIndex: 'CustomerImage',
      width: 50,
      height: 50,
      render: (t, r) => <img src={`${r.CustomerImage}`} alt={'customer image'}/>
    },
    {
      key: '5',
      title: 'ProjectName',
      dataIndex: 'ProjectName'
    },
    {
      key: '6',
      title: 'Status',
      dataIndex: 'Status'
    },
    {
      key: '7',
      title: 'StatusBg',
      dataIndex: 'StatusBg',
    },
    {
      key: '8',
      title: 'Weeks',
      dataIndex: 'Weeks'
    },
    {
      key: '9',
      title: 'Budget',
      dataIndex: 'Budget'
    },
    {
      key: '10',
      title: 'Location',
      dataIndex: 'Location'
    },
    {
      key: '11',
      title: 'Action',
      render: (record) => {
        return (
            <>
              <EditOutlined style={{marginRight: '10px'}}/>
              <DeleteOutlined/>
            </>
        )
      }
    }
  ]

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
        <Button>Add a new hairstyle</Button>
        <Table style={{marginTop: '10px'}} columns={columns} dataSource={customerDataSource}></Table>
    </div>
  );
};

export default Hair;
