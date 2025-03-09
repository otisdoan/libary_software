import { Select, Input, Table, Pagination, Modal, Button, Alert } from 'antd';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { authorApi } from '../../api/authorApi';

function AuthorAdmin() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authors, setAuthors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalAuthors, setTotalAuthors] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [currentAuthors, setCurrentAuthors] = useState();
    const [idAuthorCurrent, setIdAuthorCurrent] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const showModal = (id, name) => {
        setIdAuthorCurrent(id);
        setCurrentAuthors(name);
        setIsModalOpen(true);

    };
    const handleOk = async () => {
        try {
            const result = await authorApi.updateAuthor(idAuthorCurrent, { name: currentAuthors });
            if (result) {
                setShowAlert(true);
                fetchApi(currentPage);
                setIsModalOpen(false);
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

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            render: (_, record) => (
                <div className='flex gap-x-3'>
                    <div>
                        <Button type='primary' danger onClick={() => handleDelete(record.id)}>Delete</Button>
                    </div>
                    <div className=''>
                        <Button type='primary' onClick={() => showModal(record.id, record.name)}>
                            Update
                        </Button>
                        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='Update'>
                            <div className='flex flex-col gap-y-4'>
                                <h1 className='text-center text-[1.4rem]'>Update Author</h1>
                                <div>
                                    <span>Name</span>
                                    <Input value={currentAuthors} onChange={(e) => setCurrentAuthors(e.target.value)} />
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            )
        },
    ];
    const fetchApiDelete = async (id) => {
        const result = await authorApi.deleteAuthor(id);
        return result;
    }
    const handleDelete = async (id) => {
        try {
            const data = await fetchApiDelete(id);
            fetchApi(currentPage);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchApi = async (page) => {
        try {
            const categoryList = await authorApi.getAllAuthor(page, pageSize, 'id');
            console.log(categoryList);
            setAuthors(categoryList.data);
            setTotalAuthors(categoryList.meta.total);
            setCurrentPage(categoryList.meta.page);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApi(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        console.log(page);
        setCurrentPage(page);
    };

    const handleCreate = () => {

    }
    const handleChange = async (e) => {
        try {
            const result = await authorApi.getAllAuthor(currentPage, pageSize, 'name', e.target.value);
            console.log(result);
            if (result) {
                setAuthors(result.data);
                setCurrentPage(result.meta.page);
                setTotalAuthors(result.meta.total);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="w-full flex items-center justify-center mt-[50px] ">
                {showAlert && (
                    <Alert message="Cập nhập thành công" type="success" showIcon closable className="w-[250px]" />
                )}
            </div>
            <div className="px-[20px] py-[50px]">
                <h1 className="text-[1.2rem] font-bold mb-[20px]">Quản lý tác giả</h1>
                <div className='flex items-center justify-center'>
                    <div>
                        <Input placeholder="Tìm kiếm tác giả theo name..." className='w-[300px] h-[33px]' onChange={handleChange}/>
                    </div>
                </div>
                <div className='mt-[10px]'>
                    <Link to='/admin/author/new-author'><Button type="primary" onClick={handleCreate}>Create</Button></Link>
                </div>
                <div className='mt-[30px] mb-[40px]'>
                    <Table columns={columns} dataSource={authors} pagination={false} />
                </div>
                <div className='flex items-center justify-center'>
                    <Pagination current={currentPage} total={totalAuthors} pageSize={pageSize}
                        onChange={handlePageChange} />
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default AuthorAdmin;