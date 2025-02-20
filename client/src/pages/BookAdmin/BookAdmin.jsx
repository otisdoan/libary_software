import { Select, Input, Table, Pagination, Modal, Button, Alert } from 'antd';
import { useEffect, useState } from 'react';
import { categoryApi } from '../../api/categoryApi';
import { Link, Outlet } from 'react-router-dom';
import { bookApi } from '../../api/bookApi';

function BookAdmin() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBook, setTotalBook] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [currentBook, setCurrentBook] = useState();
    const [idBookCurrent, setIdBookCurrent] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const showModal = (id, name) => {
        setIdBookCurrent(id);
        setCurrentBook(name);
        setIsModalOpen(true);

    };
    const handleOk = async () => {
        try {
            const result = await categoryApi.updateCategory(idBookCurrent, { name: currentBook });
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
            title: 'Sản phẩm',
            dataIndex: ['image', 'title'],
            render: (_, record) => (
                <div className='flex items-center gap-x-1 justify-start'>
                    <img src={record.image}  />
                    <span>{record.title}</span>
                </div>
            )
        },
        {
            title: 'Kho'
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
                                <h1 className='text-center text-[1.4rem]'>Update Category</h1>
                                <div>
                                    <span>Name</span>
                                    <Input value={currentBook} onChange={(e) => setCurrentBook(e.target.value)} />
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            )
        },
    ];
    const fetchApiDelete = async (id) => {
        const result = await categoryApi.deleteCategory(id);
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
            const bookList = await bookApi.getAllBook(page, pageSize, 'id');
            console.log(bookList);
            setBooks(bookList.data);
            setTotalBook(bookList.totalElements);
            setCurrentPage(bookList.currentPage);
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

    const handleCreate = () => {

    }
    return (
        <>
            <div className="w-full flex items-center justify-center mt-[50px] ">
                {showAlert && (
                    <Alert message="Cập nhập thành công" type="success" showIcon closable className="w-[250px]" />
                )}
            </div>
            <div className="px-[20px] py-[50px]">
                <h1 className="text-[1.2rem] font-bold mb-[20px]">Quản lý sách</h1>
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
                <div className='mt-[10px]'>
                    <Link to='/admin/book/new-book'><Button type="primary" onClick={handleCreate}>Create</Button></Link>
                </div>
                <div className='mt-[30px] mb-[40px]'>
                    <Table columns={columns} dataSource={books} pagination={false} />
                </div>
                <div className='flex items-center justify-center'>
                    <Pagination current={currentPage} total={totalBook} pageSize={pageSize}
                        onChange={handlePageChange} />
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default BookAdmin;