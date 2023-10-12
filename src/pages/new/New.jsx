import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Form, Input, Button, Space, Divider, Radio, Image} from 'antd'
import {Header} from "../../components";
import { message, Upload } from "antd";
import {blue} from "@mui/material/colors";


const New = ({ title }) => {
  const [file, setFile] = useState('');
  const [inputData, setInputData] = useState({ Name: '', Des: '' });
  const navigate = useNavigate();

  const FormItem = Form.Item;
  const { TextArea } = Input;
  const { Dragger } = Upload;

  const handleSelectFile = (e) => setFile(e.target.files[0]);


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const data = new FormData();
      data.append("my_file", file);
      console.log('this is file')
      console.log(file)
      data.name = file.name;
      data.append("Name", inputData.Name)
      data.append("Des", inputData.Des)
      // data.Name = inputData.Name;
      // data.Des = inputData.Des;
      console.log(data)
      const res = await axios.post("https://geminisoftvn.ddns.net:7001/ver1/hairstyle", data).then(result => {
        alert("Added a new hairstyle successfully")
        navigate('/Hair')
      });

    } catch (error) {
      alert(error.message);
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
              <Input rows={4} onChange={(e) => setInputData({ ...inputData, Des: e.target.value })}/>
            </Form.Item>

            <Form.Item style={{ width: "100%"}} label="Hairstyle category">
              <Input rows={4} onChange={(e) => setInputData({ ...inputData, Des: e.target.value })}/>
            </Form.Item>

            <Form.Item style={{ width: "100%"}} label="Hairstyle description">
              <TextArea rows={4} onChange={(e) => setInputData({ ...inputData, Des: e.target.value })}/>
            </Form.Item>

            <Form.Item label="Trending">
              <Radio.Group>
                <Radio value="1">Yes</Radio>
                <Radio value="0">No</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Upload hairstyle image">
              <input type="file" name="file" id="file" onChange={ handleSelectFile } multiple={false}/>
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



        </div>

      </div>

  );
};

export default New;

