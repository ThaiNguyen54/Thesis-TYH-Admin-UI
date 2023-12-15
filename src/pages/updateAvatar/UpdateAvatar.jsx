import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import React, {useRef, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Form, Input, Button, Space, Divider, Radio, Image, Modal, Spin} from 'antd'
import {Header} from "../../components";
import {RadioChangeEvent} from "antd";
import constant from "../../constants/constants";
import api from "../../api/api";


const UpdateAvatar = ({ title }) => {
    const [file, setFile] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)
    const fileInputRef = useRef(null)
    const [avatarUrl, setAvatarUrl] = useState({AvatarUrl: null})
    const navigate = useNavigate();

    const { TextArea } = Input;

    const success = () => {
        Modal.success({
            content: 'Upload your avatar successfully',
            okType: 'default',
            onOk: () => {
                navigate('/Hair')
            }
        });
    };

    const handleSelectFile = (e) => {
        setFile(e.target.files[0]);
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64Image = event.target.result;
                setAvatarUrl({ ...avatarUrl, AvatarUrl: base64Image})
            };

            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setIsModalOpen(true)
            const res = await axios.put(`${api.UPDATE_AVATAR}/${localStorage.getItem(constant.ID)}`, avatarUrl, {
                headers: {
                    access_token: localStorage.getItem(constant.TOKEN)
                }
            })
            setIsModalOpen(false)
            window.localStorage.setItem(constant.AVATAR, res.data.data.AvatarUrl)
            success()

        } catch (error) {
            console.log(error)
            setIsModalOpen(false)
            Modal.error({
                title: 'Update your avatar failed',
                content: 'An error occurred. Please try again',
                okType: "default"
            })
        }
    }


    return (
        <div className="New">
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

                <Header title="Update Your Avatar"/>

                <Form
                    name="wrap"
                    labelCol={{ flex: '200px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={true}

                >
                    <Form.Item label="Upload your avatar">
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
                    title="Uploading your avatar"
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

export default UpdateAvatar;

