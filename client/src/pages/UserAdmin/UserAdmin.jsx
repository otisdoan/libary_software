import { Select, Input, Table, Tag, Pagination, Modal, Button, Alert } from 'antd';
import { useEffect, useState } from 'react';
import { authApi } from '../../api/authApi';

function UserAdmin() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [emailCurrent, setEmailCurrent] = useState('');
    const [roleCurrent, setRoleCurrent] = useState('');
    const [statusCurrent, setStatusCurrent] = useState('');
    const [userIdCurrent, setUserIdCurrent] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const showModal = (id, email, role, status) => {
        setUserIdCurrent(id);
        setRoleCurrent(role);
        setStatusCurrent(status);
        setEmailCurrent(email);
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        try {
            const resultRole = await authApi.updateRoleUser(userIdCurrent, roleCurrent);
            const resultStatus = await authApi.updateStatusUser(userIdCurrent, statusCurrent);
            if (resultRole || resultStatus ) {
                setShowAlert(true);
                setIsModalOpen(false);
                fetchApi(currentPage);
            }
            setTimeout(() => {
                setShowAlert(false);
            }, 1500)
        } catch (error) {
            console.log(error)
        }
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
    const handleDelete = () => {

    }

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
                    <div className=''>
                        <Button type='primary' onClick={() => showModal(record.id, record.email, record.role, record.status)}>
                            Update
                        </Button>
                        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='Update'>
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
                                                value: 'active',
                                                label: 'active'
                                            },
                                            {
                                                value: 'deleted',
                                                label: 'deleted'
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
            <div className="w-full flex items-center justify-center mt-[50px] ">
                {showAlert && (
                    <Alert message="Cập nhập thành công" type="success" showIcon closable className="w-[250px]" />
                )}
            </div>
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