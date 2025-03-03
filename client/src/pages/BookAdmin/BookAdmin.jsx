import { Select, Input, Table, Pagination, Modal, Button, Alert } from 'antd';
import { useEffect, useState } from 'react';
import { categoryApi } from '../../api/categoryApi';
import { Link, Outlet } from 'react-router-dom';
import { bookApi } from '../../api/bookApi';
import AddBook from '../AddBook/AddBook';
import UpdateBook from '../../components/UpdateBook/UpdateBook';

function BookAdmin() {
    const [bookUpdate, setBookUpdate] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBook, setTotalBook] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [currentBook, setCurrentBook] = useState();
    const [idBookCurrent, setIdBookCurrent] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const showModal = async (id) => {
        setIdBookCurrent(id);
        try {
            const result = await bookApi.getBookById(id);
            setCurrentBook(result);
        } catch (error) {
            console.log(error)
        }
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        console.log(bookUpdate);
        try {
            const result = await bookApi.updateBook(idBookCurrent, bookUpdate);
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
    const handleBookUpdate = (updateDataBook) => {
        setBookUpdate(updateDataBook);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Sản phẩm',
            dataIndex: ['image', 'title'],
            render: (_, record) => (
                <div className='flex items-center gap-x-1 justify-start w-full'>
                    <img src={record.image} className='w-[60px]' />
                    <span>{record.title}</span>
                </div>
            )
        },
        {
            title: 'Kho',
            dataIndex: 'totalBook'
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            render: (_, record) => (
                <div className='flex gap-x-3'>
                    <div>
                        <Button type='primary' danger onClick={() => handleDelete(record.id)}>Delete</Button>
                    </div>
                    <div>
                        <Button type='primary' onClick={() => showModal(record.id)}>
                            Update
                        </Button>
                        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='Update'>
                            <UpdateBook book={currentBook} onBookUpdate={handleBookUpdate} />
                        </Modal>
                    </div>
                </div>
            )
        },
    ];
    const fetchApiDelete = async (id) => {
        const result = await bookApi.deleteBook(id);
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
    const handleChange = async (e) => {
        try {
            const searchBook = [];
            const result = await bookApi.searchBookByTitle(e.target.value);
            if (result) {
                searchBook.push(result);
                console.log(searchBook);
                setBooks(searchBook);
            } else {
                fetchApi(currentPage);
            }
        } catch (error) {
            console.error("Lỗi khi tìm kiếm sách:", error);
        }
    };
    return (
        <>
            <div className="w-full flex items-center justify-center mt-[50px] ">
                {showAlert && (
                    <Alert message="Cập nhập thành công" type="success" showIcon closable className="w-[250px]" />
                )}
            </div>
            <div className="px-[20px] py-[50px]">
                <h1 className="text-[1.5rem] font-bold mb-[20px]">Quản lý sách</h1>
                <div className='flex items-center justify-center'>
                    <div>
                        <Input placeholder="Tìm kiếm sách theo title..." className='w-[300px] h-[33px]' onChange={handleChange} />
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