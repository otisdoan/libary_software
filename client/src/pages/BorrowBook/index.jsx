import { Button, Input, message, Pagination, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { bookBorrowApi } from "../../api/bookBorrowApi";
import dayjs from "dayjs";

function BorrowBook() {
    const [listBorrow, setListBorrow] = useState([]);
    const [totalBorrow, setTotalBorrow] = useState(0);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [size, setSize] = useState(10);
    const [messageError, setMessageError] = useState();
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
        {
            title: 'Thao tác',
            dataIndex: 'action',
            render: (_, record) => {
                return (
                    <div className="flex items-center gap-x-4" >
                        {record.status === 'approved' ? (
                            <>
                                <Button className="bg-red-600 text-white" onClick={() => handleReject(record.id)}>Hủy</Button>
                                <Button className="bg-blue-600 text-white" onClick={() => handleReturn(record.id)}>Trả sách</Button>
                            </>
                        ) : (
                            record.status === 'pending' ? (
                                <>
                                    <Button className="bg-blue-600 text-white" onClick={() => handleAccept(record.id)}>Phê duyệt</Button>
                                </>
                            ) : (
                                null
                            )
                        )}
                    </div>
                )
            }
        },
    ]

    const onChangePage = (page) => {
        setPageCurrent(page);
    }

    const handleAccept = async (id) => {
        try {
            const result = await bookBorrowApi.acceptRequestBorrowBook(id, 'approved');
            console.log(result);
            if (result) {
                setMessageError(result)
                messageApi.open({
                    type: 'success',
                    content: 'Phê duyệt thành công',
                });
            }
        } catch (error) {
            console.log(error)
            messageApi.open({
                type: 'error',
                content: error.response?.data?.message,
            });
        }
    }

    const handleReject = async (id) => {
        try {
            const resultReject = await bookBorrowApi.acceptRequestBorrowBook(id, 'pending');
            if (resultReject) {
                setMessageError(resultReject)
                messageApi.open({
                    type: 'success',
                    content: 'Đã hủy phê duyệt',
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleReturn = async (id) => {
        try {
            const result = await bookBorrowApi.returnBook(id);
            if (result) {
                setMessageError(result);
                await bookBorrowApi.acceptRequestBorrowBook(id, 'returned');
                messageApi.open({
                    type: 'success',
                    content: 'Sách đã trả thành công',
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchBorrowBook = async () => {
            try {
                const result = await bookBorrowApi.getAllBorrowBook(pageCurrent, size, 'userId');
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
    }, [pageCurrent, size, messageError])

    return (
        <>
            {contextHolder}
            <div className="flex flex-col p-5 mt-[20px]">
                <h1 className="text-[1.4rem] font-bold">Quản lý mượn trả sách</h1>
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
export default BorrowBook;