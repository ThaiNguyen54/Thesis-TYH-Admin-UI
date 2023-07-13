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
import Axios from "axios";
import {useEffect} from "react";
import {Link} from "react-router-dom";

const Hair = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  const HairColumns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: '_id'
    },
    {
      key: '2',
      title: 'Image',
      dataIndex: 'Url',
      width: 200,
      height: 200,
      render: (t, r) => <img src={`${r.Url}`} alt={'customer image'}/>
    },
    {
      key: '3',
      title: 'Name',
      dataIndex: 'Name'
    },
    {
      key: '4',
      title: 'Description',
      dataIndex: 'Des'
    },
    {
      key: '5',
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
  const [HairDataSource, setHairData] = useState('')

  useEffect(() => {
    const getHair = () => {
      Axios.get('http://localhost:7000/ver1/hairstyle').then((response) => {
        console.log(response.data.Hairstyles)
        setHairData(response.data.Hairstyles)
      })
    }
    getHair();
  }, [])


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
        <Link to={"/Hair/new"}>
          <Button>Add a new hairstyle</Button>
        </Link>

        <Table style={{marginTop: '10px'}} columns={HairColumns} dataSource={HairDataSource}></Table>
    </div>
  );
};

export default Hair;
