import React, { useState, useEffect } from 'react';

import { Button, Table, Modal, Input } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const handleSelectFile = (e) => setFile(e.target.files[0])

  const handleUpload = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("my_file", file);
      const result = await axios.post("http://localhost:7000/ver1/hairstyle/upload", data);
      setRes(result.data);
      console.log(res)
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
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
  const [file, setFile] = useState(null)
  const [res, setRes] = useState({})
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const getHair = () => {
    Axios.get('http://localhost:7000/ver1/hairstyle').then((response) => {
      // eslint-disable-next-line no-console
      console.log(response.data.Hairstyles);
      setHairData(response.data.Hairstyles);
    });
  };

  useEffect(() => {
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
              for (const key in EditData) {
                if (EditData[key] === '' || EditData[key] === undefined) {
                  delete EditData[key]
                }
              }
              console.log(EditData)
              const data = new FormData();
              if (file !== null) {
                setLoading(true);
                data.append("my_file", file);
                data.append("isUpdateImage", true)
              } else {
                data.append("isUpdateImage", false)
              }
              const updateData = JSON.stringify(EditData)
              data.append('update', updateData)

              await Axios.put(`http://localhost:7000/ver1/hairstyle/${editingHair._id}`, data)
                  .then(async result => {
                    alert("Update a new hairstyle successfully")
                    await setFile(null)
                    navigate("/Hair")
                  })
              setEditing(false)
              getHair()
            } catch (error) {
              alert(error.message)
            }
          }}
          destroyOnClose={true}
      >
        <h2><b>Name</b></h2>
        <Input placeholder={isEditing ? `${editingHair.Name}` : ''}
               onChange={ (e) => setEditData({...EditData, Name: e.target.value !== '' ? e.target.value : editingHair.Name})}/>

        <h2 style={{ marginTop: '10px' }}><b>Description</b></h2>
        <Input style={{ marginBottom: '10px'}}
               placeholder={isEditing ? `${editingHair.Des}`: ''}
               onChange={ (e) => setEditData({...EditData, Des: e.target.value !== '' ? e.target.value : editingHair.Des})}/>

        <label htmlFor='file'>
          {' '}
          <b style={{ marginRight: '5px' }}>Select Image</b>
        </label>
        <input
            id='file'
            type={'file'}
            onChange={handleSelectFile}
            multiple={false}
        />

      </Modal>
    </div>
  );
};
export default Hair;
