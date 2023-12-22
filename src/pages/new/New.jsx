import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import React, {useRef, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Form, Input, Button, Space, Divider, Radio, Image, Modal, Spin} from 'antd'
import {Header} from "../../components";
import {RadioChangeEvent} from "antd";
import constant from "../../constants/constants";
import api from "../../api/api";


const New = ({ title }) => {
  const [file, setFile] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false)
  const fileInputRef = useRef(null)

  const [inputData, setInputData] = useState({
    Name: '',
    Des: '',
    Trending: 0,
    Celeb: '',
    Category: ''
  });
  const navigate = useNavigate();

  const { TextArea } = Input;

  const handleSelectFile = (e) => {
    // setFile(e.target.files[0]);
    if (constant.ALLOW_IMAGE_TYPE.includes(e.target.files[0].type)) {
      setFile(e.target.files[0]);
    } else {
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      setFile(null)
      setIsModalOpen(false)
      Modal.error({
        title: 'Invalid file type',
        content: 'Invalid image type, accept images in the following format: .jpg, .jpeg, .png',
        okType: "default"
      })
    }
  }

  const onChangeRadio = (e: RadioChangeEvent) => {
    setInputData({ ...inputData, Trending: e.target.value })
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setIsModalOpen(true)
      const data = new FormData();
      data.append("my_file", file);
      console.log('this is file')
      console.log(file)
      data.name = file.name;
      data.append("Name", inputData.Name)
      data.append("Des", inputData.Des)
      data.append("Trending", inputData.Trending)
      data.append("Celeb", inputData.Celeb)
      data.append("Category", inputData.Category)
      console.log(data)
      const res = await axios.post(api.ADD_HAIR, data, {
        headers: {
          access_token: localStorage.getItem(constant.TOKEN)
        }
      }).then(result => {
        // alert("Added a new hairstyle successfully")
        setIsModalOpen(false)
        Modal.success({
          title: 'Added a new hairstyle successfully',
          onOk() {navigate('/Hair')},
          okType: "default"
        })
      });

    } catch (error) {
      setIsModalOpen(false)
      Modal.error({
        title: 'Add the new hairstyle failed',
        content: 'An error occurred. Please try again',
        okType: "default"
      })
    }
  }


  return (
      <div className="New">
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

          <Header title="Add new hairstyle"/>

          <Form
            name="wrap"
            labelCol={{ flex: '200px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={true}

          >
            <Form.Item align="center" style={{ width: "100%"}} label="Hairstyle name">
              <Input onChange={(e) => setInputData({ ...inputData, Name: e.target.value })}/>
            </Form.Item>

            <Form.Item style={{ width: "100%"}} label="Hairstyle of celebrity">
              <Input rows={4} onChange={(e) => setInputData({ ...inputData, Celeb: e.target.value })}/>
            </Form.Item>

            <Form.Item style={{ width: "100%"}} label="Hairstyle category">
              <Input rows={4} onChange={(e) => setInputData({ ...inputData, Category: e.target.value })}/>
            </Form.Item>

            <Form.Item style={{ width: "100%"}} label="Hairstyle description">
              <TextArea rows={4} onChange={(e) => setInputData({ ...inputData, Des: e.target.value })}/>
            </Form.Item>

            <Form.Item label="Trending">
              <Radio.Group>
                <Radio onChange={(e) => setInputData({...inputData, Trending: e.target.value})} value={1}>Yes</Radio>
                <Radio onChange={(e) => setInputData({...inputData, Trending: e.target.value})} value={0}>No</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Upload hairstyle image">
              <input type="file" name="file" id="file" onChange={ handleSelectFile } multiple={false} ref={fileInputRef}/>
            </Form.Item>

            <Form.Item>
              <Image
                  width={350}
                  src={
                    file
                        ? URL.createObjectURL(file)
                        : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
              ></Image>
            </Form.Item>

            <Divider/>

            <Form.Item label="">
              <Button type="default" htmlType="submit" style={{ width: "10%"}} onClick={ handleSubmit }>
                Add
              </Button>
            </Form.Item>
          </Form>


          <Modal
            title="Adding The New Hairstyle"
            open={isModalOpen}
            footer={null}
            closable={false}
            keyboard={false}
            style={{ textAlign: "center"}}
          >
            <Spin size="large"/>

          </Modal>
        </div>
      </div>

  );
};

export default New;

