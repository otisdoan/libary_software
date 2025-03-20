import { Input, message, Pagination, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { bookBorrowApi } from "../../api/bookBorrowApi";
import dayjs from "dayjs";

function BookReturned() {
    const [listBorrow, setListBorrow] = useState([]);
    const [totalBorrow, setTotalBorrow] = useState(0);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [size, setSize] = useState(10);
    const [messageApi, contextHolder] = message.useMessage();
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Tên sách',
            dataIndex: 'bookTitle',
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
                const result = await bookBorrowApi.getBookReturned(pageCurrent, size, 'id');
                console.log(result)
                if (result) {
                    setListBorrow(result.data);
                    setTotalBorrow(result.totalElements);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchBorrowBook();
    }, [pageCurrent, size])

    return (
        <>
            {contextHolder}
            <div className="flex flex-col p-5 mt-[20px]">
                <h1 className="text-[1.4rem] font-bold">Quản lý yêu cầu mượn sách</h1>
                <div className="flex justify-center">
                    <Input placeholder="Tìm kiếm theo id..." className="w-1/3 h-[35px]" />
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
export default BookReturned;