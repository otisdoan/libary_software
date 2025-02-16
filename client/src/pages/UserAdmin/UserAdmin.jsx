import { Select, Input, Table, Tag, Pagination, Modal, Button } from 'antd';
import { useEffect, useState } from 'react';
import { authApi } from '../../api/authApi';

function UserAdmin() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState({});
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'ID',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
        },
        {
            title: 'Quyền hạn',
            dataIndex: 'role',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status) => {
                let color = (status === 'active' ? 'green' : 'red');
                return <Tag color={color}>{status.toUpperCase()}</Tag>
            }
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            render: (action) => (
                <div className='flex gap-x-3'>
                    <div>
                        <Button type='default'>{action[1]}</Button>
                    </div>
                    <div className=''>
                        <Button onClick={showModal}>
                            {action[0]}
                        </Button>
                        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='Update'>
                            <div className='flex flex-col gap-y-4'>
                                <h1 className='text-center text-[1.4rem]'>User informations</h1>
                                <span>User: </span>
                                <span>Email: </span>
                                <div className='flex flex-col'>
                                    <span>Role</span>
                                    <Select
                                        defaultValue={'User'}
                                        options={[
                                            {
                                                value: 'User',
                                                label: 'User'
                                            },
                                            {
                                                value: 'Admin',
                                                label: 'Admin'
                                            }
                                        ]}
                                    />
                                </div>
                                <div className='flex flex-col mb-[50px]'>
                                    <span>Status</span>
                                    <Select
                                        defaultValue={'Active'}
                                        options={[
                                            {
                                                value: 'Active',
                                                label: 'Active'
                                            },
                                            {
                                                value: 'Inactive',
                                                label: 'Inactive'
                                            }
                                        ]}
                                    />
                                </div>
                            </div>

                        </Modal>
                    </div>
                </div>
            )
        },
    ]
    const data = [
        {
            key: '1',
            ID: '01',
            email: 'ledoanhieu12a6@gmail.com',
            phone: '0344258554',
            role: 'Admin',
            status: 'active',
            action: ['Update', 'Delete']
        },
        {
            key: '2',
            ID: '01',
            email: 'ledoanhieu12a6@gmail.com',
            phone: '0344258554',
            role: 'Admin',
            status: 'active',
            action: ['Update', 'Delete']
        },

    ]
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const userList = await authApi.getAllUser(1, 10, 'email');
                console.log(userList);
                setUser(userList);
            } catch (error) {
                console.log(error)
            }
        }
        fetchApi();
    }, [])
    return (
        <>
            <div className="px-[20px] py-[50px]">
                <h1 className="text-[1.2rem] font-bold mb-[20px]">Quản lý người dùng</h1>
                <div className='flex items-center justify-between'>
                    <Select
                        defaultValue={'Tất cả'}
                        placeholder=""
                        options={[
                            {
                                value: 'Tất cả',
                                label: 'Tất cả',
                            },
                            {
                                value: 'Admin',
                                label: 'Admin',
                            },
                            {
                                value: 'Người dùng',
                                label: 'Người dùng',
                            },
                        ]}
                        className='w-[120px]'
                    />
                    <div>
                        <Input placeholder="Tìm kiếm người dùng theo email..." className='w-[300px] h-[33px]' />;
                    </div>
                </div>
                <div className='mt-[30px] mb-[40px]'>
                    <Table columns={columns} dataSource={data} pagination={false} />
                </div>
                <div className='flex items-center justify-center'>
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        </>
    )
}
export default UserAdmin;