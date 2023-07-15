import React, { useState, useEffect } from 'react';

import { Button, Table, Modal, Input } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { useNavigate } from "react-router-dom";

const Hair = () => {

  const onDelete = (record) => {
    Modal.confirm({
      title: 'Are you sure to delete this hairstyle?',
      okText: 'Yes',
      okType: 'danger',
      onOk:() => {
        setHairData(pre => {
          console.log(pre.filter((hair) => hair._id !== record._id))
          return pre.filter((hair) => hair._id !== record._id)
        })
        Axios.delete(`http://localhost:7000/ver1/hairstyle/${record._id}`).then(response => {
          console.log(response)
        })
      },
    })
  }

  const onEdit = (record) => {
    setEditing(true)
    setEditingHair({...record})
  }

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
      render: (record) => (
        <>
          <EditOutlined onClick={ () => { onEdit(record) }} style={{ marginRight: '10px' }} />
          <DeleteOutlined onClick={ () => { onDelete(record) }} style={{ color: 'red' }}/>
        </>
      ),
    },
  ];

  const [HairDataSource, setHairData] = useState('');
  const [isEditing, setEditing] = useState(false)
  const [editingHair, setEditingHair] = useState(null)
  const [EditData, setEditData] = useState({Name: '', Des: ''})

  const navigate = useNavigate()

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
      <Modal
      title={isEditing ? `Editing ${editingHair.Name} hairstyle` : "Editing hairstyle"}
      okText="Save"
      okType="default"
      visible={isEditing}
      onCancel={() => {
        setEditing(false)
      }}
      onOk={ async (e) => {
        try {
          e.preventDefault()
          await Axios.put(`http://localhost:7000/ver1/hairstyle/${editingHair._id}`, EditData)
              .then(result => {
                alert("Update a new hairstyle successfully")
                navigate("/Hair")
              })
          setEditing(false)
        } catch (error) {
          alert(error.message)
        }
      }}>
        <h2><b>Name</b></h2>
        <Input placeholder={isEditing ? `${editingHair.Name}` : ''} onChange={ (e) => setEditData({
          Name: e.target.value.toString() === "" ? editingHair.Name : e.target.value
        })}/>
        <h2 style={{ marginTop: '10px' }}><b>Description</b></h2>
        <Input placeholder={isEditing ? `${editingHair.Des}`: ''} onChange={ (e) => setEditData({
          Des: e.target.value.toString() === "" ? editingHair.Des : e.target.value
        })}/>
      </Modal>
    </div>
  );
};
export default Hair;
