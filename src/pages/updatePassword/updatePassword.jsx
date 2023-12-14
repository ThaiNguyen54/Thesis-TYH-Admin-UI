import constant from "../../constants/constants";
import api from "../../api/api";
import React, {useState} from 'react';
import {Button, Checkbox, Divider, Form, Image, Input, Modal, Radio, Spin} from 'antd';
import {Header} from "../../components";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const UpdatePassword = () => {
    const decodedToken = jwtDecode(localStorage.getItem(constant.TOKEN))
    const [updateData, setUpdateData] = useState({oldPassword: null, newPassword: null})
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const res = await axios.put(`${api.UPDATE_PASS}/${decodedToken.id}`, updateData, {
                headers: {
                    access_token: localStorage.getItem(constant.TOKEN)
                }
            })
            Modal.success({
                title: 'Update password successfully',
                onOk() {
                    navigate('/Hair')
                },
                okType: "default"
            })
        } catch (error) {
            Modal.error({
                title: 'Update password fail',
                content: error.message,
                okType: "default"
            })
        }

    }

    return (
        <div className="New">
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

                <Header title="Update Your Password"/>

                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Old password"
                        name="oldpassword"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your old password!',
                            },
                        ]}
                    >
                        <Input.Password onChange={(e) => setUpdateData({ ...updateData, oldPassword: e.target.value})}/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password!',
                            },
                        ]}
                    >
                        <Input.Password onChange={(e) => {setUpdateData({ ...updateData, newPassword: e.target.value})}}/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button onClick={handleClick} type="default" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>


            </div>
        </div>


)

};

export default UpdatePassword;

