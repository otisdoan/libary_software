import { Select, Input, Table, Pagination, Modal, Button, Alert } from 'antd';
import { useEffect, useState } from 'react';
import { categoryApi } from '../../api/categoryApi';
import { Link, Outlet } from 'react-router-dom';

function CategoryAdmin() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCategory, setTotalCategory] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [currentCategory, setCurrentCategory] = useState();
    const [idCategoryCurrent, setIdCategoryCurrent] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const showModal = (id, name) => {
        setIdCategoryCurrent(id);
        setCurrentCategory(name);
        setIsModalOpen(true);

    };
    const handleOk = async () => {
        try {
            const result = await categoryApi.updateCategory(idCategoryCurrent, { name: currentCategory });
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
                                <h1 className='text-center text-[1.4rem]'>Update Category</h1>
                                <div>
                                    <span>Name</span>
                                    <Input value={currentCategory} onChange={(e) => setCurrentCategory(e.target.value)} />
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
            const categoryList = await categoryApi.getAllCategories(page, pageSize, 'name');
            console.log(categoryList);
            setCategories(categoryList.data);
            setTotalCategory(categoryList.totalElements);
            setCurrentPage(categoryList.currentPage);
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
            const result = await categoryApi.getAllCategories(currentPage, pageSize, 'name', e.target.value);
            if (result) {
                setCategories(result.data);
                setCurrentPage(result.currentPage);
                setTotalCategory(result.totalElements);
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
                <h1 className="text-[1.2rem] font-bold mb-[20px]">Quản lý thể loại sách</h1>
                <div className='flex items-center justify-center'>
                    <div>
                        <Input placeholder="Tìm kiếm thể loại sách theo name..." className='w-[300px] h-[33px]' onChange={handleChange} />
                    </div>
                </div>
                <div className='mt-[10px]'>
                    <Link to='/admin/category/new-category'><Button type="primary" onClick={handleCreate}>Create</Button></Link>
                </div>
                <div className='mt-[30px] mb-[40px]'>
                    <Table columns={columns} dataSource={categories} pagination={false} />
                </div>
                <div className='flex items-center justify-center'>
                    <Pagination current={currentPage} total={totalCategory} pageSize={pageSize}
                        onChange={handlePageChange} />
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default CategoryAdmin;