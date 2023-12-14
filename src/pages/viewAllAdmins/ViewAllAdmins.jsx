import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, Modal, Popconfirm, Table, Typography} from 'antd';
import {Header} from "../../components";
import axios from "axios";
import api from "../../api/api";
import constant from "../../constants/constants";

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
const ViewAllAdmin = () => {
    const [admin, setAdmin] = useState(null)
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record._id === editingKey;

    const GetAllAdmins = async () => {
        try {
            const res = await axios.get(api.GET_ADMIN, {
                headers: {
                    access_token: localStorage.getItem(constant.TOKEN)
                }
            })
            setAdmin(res.data.data)
        } catch (error) {
            Modal.error({
                title: 'Get all admins fail',
                content: error.message,
                okType: "default"
            })
        }
    }
    useEffect(() => {
        GetAllAdmins()
    }, []);
    const edit = (record) => {
        form.setFieldsValue({
            DisplayName: '',
            UserName: '',
            ...record,
        });
        setEditingKey(record._id);
    };
    const deleteRow = async (record) => {
        try {
            const res = await axios.delete(`${api.DELETE_ADMIN}/${record._id}`, {
                headers: {
                    access_token: localStorage.getItem(constant.TOKEN)
                }
            })
            const newAdminData = admin.filter(item => item._id !== record._id)
            // console.log('this is new data: ', newAdminData)
            setAdmin(newAdminData)
        }
        catch (error) {
            console.log(error)
        }

    }
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...admin];
            const index = newData.findIndex((item) => key === item._id);

            const res = await axios.put(`${api.UPDATE_ADMIN}/${key}`, row, {
                headers: {
                    access_token: localStorage.getItem(constant.TOKEN)
                }
            })

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setAdmin(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setAdmin(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
            Modal.error({
                title: 'Update fail',
                content: errInfo,
                okType: "default"
            })
        }
    };
    const columns = [
        {
            key: '_id',
            title: 'id',
            dataIndex: '_id',
            editable: false,
            fixed: 'left'
        },
        {
            key: 'DisplayName',
            title: 'Display Name',
            dataIndex: 'DisplayName',
            editable: true,
            fixed: 'left'
        },
        {
            key: 'UserName',
            title: 'Username',
            dataIndex: 'UserName',
            editable: false,
            fixed: 'left'
        },
        {
            key: 'Role',
            title: 'Role',
            dataIndex: 'Role',
            editable: false,
        },
       {
            key: 'CreatedAt',
            title: 'Created at',
            dataIndex: 'CreatedAt',
            editable: false,
       },
       {
            key: 'CreatedBy',
            title: 'Created by',
            dataIndex: 'CreatedBy',
            editable: false,
        },
       {
            key: 'UpdatedAt',
            title: 'Updated at',
            dataIndex: 'UpdatedAt',
            editable: false,
        },
       {
            key: 'UpdatedBy',
            title: 'Updated by',
            dataIndex: 'UpdatedBy',
            editable: false,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            fixed: 'right',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link
                onClick={() => save(record._id)}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel} okType='default'>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <span>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>

                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record)} okType='default'>
                          <Typography.Link style={{marginLeft: 10}} disabled={editingKey !== ''}>Delete</Typography.Link>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <div className="New">
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

                <Header title="Admins"/>

                <Form form={form} component={false}>
                    <Table
                        rowKey='_id'
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={admin}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: cancel,
                        }}
                        scroll={{
                            x: 'max-content'
                        }}
                        tableLayout='auto'
                    />
                </Form>

            </div>
        </div>
);
};
export default ViewAllAdmin;
