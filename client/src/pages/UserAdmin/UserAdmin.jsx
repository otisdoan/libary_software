import { Select, Input, Table, Tag, Pagination, Modal, Button } from 'antd';
import { useEffect, useState } from 'react';
import { authApi } from '../../api/authApi';

function UserAdmin() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [emailCurrent, setEmailCurrent] = useState('');
    const [roleCurrent, setRoleCurrent] = useState('');
    const [statusCurrent, setStatusCurrent] = useState('');

    const showModal = (email, role, status) => {
        setRoleCurrent(role);
        setStatusCurrent(status);
        setEmailCurrent(email);
        setIsModalOpen(true);
    };
    const handleOk = async (id, role) => {
        console.log(role);
        try {
            const result = await authApi.updateRoleUser(id, role);
            console.log(result);
            fetchApi(currentPage);
        } catch (error) {
            console.log(error)
        }
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChangeRole = (value) => {
        setRoleCurrent(value);
    }
    const handleChangeStatus = (value) => {
        setStatusCurrent(value);
    }
    const fetchApi = async (page) => {
        try {
            const userList = await authApi.getAllUser(page, pageSize, 'email');
            console.log(userList);
            setUsers(userList.data);
            setTotalUsers(userList.totalElements);
            setCurrentPage(userList.currentPage);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApi(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
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
            render: (_, record) => (
                <div className='flex gap-x-3'>
                    <div>
                        <Button type='default'>Delete</Button>
                    </div>
                    <div className=''>
                        <Button onClick={() => showModal(record.email, record.role, record.status)}>
                            Update
                        </Button>
                        <Modal open={isModalOpen} onOk={() => handleOk(record.id, roleCurrent)} onCancel={handleCancel} okText='Update'>
                            <div className='flex flex-col gap-y-4'>
                                <h1 className='text-center text-[1.4rem]'>User informations</h1>
                                <span>Email: {emailCurrent}</span>
                                <div className='flex flex-col'>
                                    <span>Role</span>
                                    <Select
                                        value={roleCurrent}
                                        onChange={handleChangeRole}
                                        options={[
                                            {
                                                value: 'user',
                                                label: 'user'
                                            },
                                            {
                                                value: 'admin',
                                                label: 'admin'
                                            }
                                        ]}
                                    />
                                </div>
                                <div className='flex flex-col mb-[50px]'>
                                    <span>Status</span>
                                    <Select
                                        onChange={handleChangeStatus}
                                        value={statusCurrent}
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
    ];


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
                    <Table columns={columns} dataSource={users} pagination={false} />
                </div>
                <div className='flex items-center justify-center'>
                    <Pagination current={currentPage} total={totalUsers} pageSize={pageSize}
                        onChange={handlePageChange} />
                </div>
            </div>
        </>
    );
}

export default UserAdmin;