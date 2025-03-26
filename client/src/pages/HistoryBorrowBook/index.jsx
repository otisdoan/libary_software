import { Breadcrumb, Input, Pagination, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { bookBorrowApi } from "../../api/bookBorrowApi";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";

function HistoryBorrowBook() {
    const token = localStorage.getItem('accessToken');
    const [listBorrow, setListBorrow] = useState([]);
    const [totalBorrow, setTotalBorrow] = useState(0);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [size, setSize] = useState(10);
    const userId = localStorage.getItem('userId');
    const columns = [
        {
            title: 'Tên sách',
            dataIndex: 'bookId',
            render: (_, record) => {
                return record?.bookId?.title || '';
            }
        },
        {
            title: 'Ngày mượn sách',
            dataIndex: 'borrowDate',
            render: (_, record) => {
                return dayjs(record.borrowDate).format('DD/MM/YYYY');
            }
        },
        {
            title: 'Ngày trả sách',
            dataIndex: 'returnDate',
            render: (_, record) => {
                return dayjs(record.returnDate).format('DD/MM/YYYY');
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (_, record) => {
                if (record.status === 'pending') {
                    return (
                        <div className="flex items-center gap-x-3">
                            <Spin size="small" />
                            <span className="text-red-600">Pending</span>
                        </div>
                    )
                } else if (record.status === 'approved') {
                    return <span className="text-orange-400">Approved</span>
                }
                else {
                    return <span className="text-green-600">Returned</span>
                }
            }
        },
    ]

    const onChangePage = (page) => {
        setPageCurrent(page);
    }

    useEffect(() => {
        const fetchBorrowBook = async () => {
            try {
                if (token && userId) {
                    const result = await bookBorrowApi.getHistoryBorrowBook(userId, pageCurrent, size);
                    console.log('History', result);
                    if (result) {
                        setListBorrow(result.data);
                        setTotalBorrow(result.totalElements);
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchBorrowBook();
    }, [pageCurrent, size, userId, token])

    return (
        <>
            <div className="my-[10px] bg-white rounded-lg p-2 shadow-md">
                <Breadcrumb separator='>'>
                    <Breadcrumb.Item>
                        <Link to="/">
                            <div className="flex items-center gap-x-1">
                                <MdHome className="text-[1.2rem] text-orange-600" />
                                <span>Trang chủ</span>
                            </div>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Lịch sử mượn sách</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="flex flex-col p-5 mt-[20px]">
                <h1 className="text-[1.4rem] font-bold">Lịch sử mượn sách</h1>
                <div className="flex justify-center">
                    <Input placeholder="Tìm kiếm theo tên sách" className="w-1/3 h-[35px]" />
                </div>
                <div className="mt-[30px]">
                    <Table pagination={false} dataSource={listBorrow} columns={columns} />
                </div>
                <div className="flex justify-center mt-[30px]">
                    <Pagination total={totalBorrow} pageSize={size} current={pageCurrent} onChange={onChangePage} />
                </div>
            </div>
        </>
    )
}
export default HistoryBorrowBook;